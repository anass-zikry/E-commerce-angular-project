

function adminMiddleware(req,res,next){
    if(req.path == 'login' || req.path == 'register'){return next()}
    if(!req.user.isAdmin) return res.json({message:"Unauthorized!",status:false})
    next();
}

module.exports = {adminMiddleware}