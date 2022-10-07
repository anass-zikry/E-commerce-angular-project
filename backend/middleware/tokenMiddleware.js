const jwt = require("jsonwebtoken");
const { AuthService } = require("../services/AuthService");


async function tokenMiddleware(req,res,next){
    // if(req.path ==="/website/register" ||req.path ==="/website/login" || req.path ==="/admin/login") next();
    console.log(req.path);
    let skippePaths = (req.path == "/login" || req.path == "/register" || req.path == "/browse-products");
    if(skippePaths)return next();
    let token = req.headers.authorization
    // if(req.path == "/verify-token"){
    //     let dToken = jwt.decode(token);
    //     if(dToken.exp > new Date)
    //     console.log(dToken);
    //     next();
    // }
    
    // console.log(req.headers.authorization);
    let dectoken;
    try {
        dectoken = jwt.verify(token,"secret");
    } catch (error) {
        // return res.json(error);
        if(error.name == 'TokenExpiredError'){
            res.json({expired:true})
            return;
        }
        console.log(dectoken);
        return next(error);
        
    }
    // if(!dectoken)next();
    // console.log(dectoken);
    let auth = new AuthService()
    let user = await auth.findUserById(dectoken.id)
    if(!user) res.json({message:"Unauthorized!"})
    // console.log(dectoken);
    req.user = user;
    next();
}

module.exports = {tokenMiddleware}