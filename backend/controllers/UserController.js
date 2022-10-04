const {AuthService} = require("../services/AuthService")
// const {User} = require("../DB/User")

class UserController {
    async addUser(req,res){
        let auth  = new AuthService();
        let {username,password} = req.body
        let data = {username,password}
        data.isAdmin = false;
        res.json(await auth.register(data));
        // res.json(data);
    }
    async login(req,res){
        let auth = new AuthService();
        let {username,password}= req.body;
        res.json(await auth.login(username,password));
    }
    async adminLogin(req,res){
        let auth = new AuthService();
        let {username,password}= req.body;
        let user = await auth.findUser(username);
        if(!user.isAdmin) {res.json({message:"Not an Admin!",status:false});return;}
        res.json(await auth.login(username,password));
    }
    async addAdminUser(req,res){
        let auth  = new AuthService();
        let {username,password} = req.body
        let data = {username,password}
        data.isAdmin = true;
        await auth.register(data);
        res.json(data);
    }

    async deleteUser(req,res){
        let auth = new AuthService();
        const {id} = req.body;
        res.json(await auth.delete(id));
        
    }
    async verifyAdmin(req,res){
        let auth = new AuthService();
        let message = {message:"Admin not verified",status:false,isAdmin:false}
        if(req.user.isAdmin){
            message = {message:"Admin verified",status:true,isAdmin:true}
        }
        res.json(message)
    }
    async resetPassword(req,res){
        let auth = new AuthService()
        console.log(req.user);
        const {oldPassword,newPassword} = req.body;
        res.json(await  auth.resetPassword(req.user,oldPassword,newPassword))
    }
    async forgotPassword(req,res){
        let auth = new AuthService();
        const {id,newPassword} = req.body;
        res.json(await auth.forgotPassword(id,newPassword))
    }

    async listAll(req,res){
        let auth = new AuthService();
        // let decToken = req.user;
        res.json(await auth.listUsers())
    }
    async activate(req,res){
        let auth = new AuthService();
        const {username} = req.body
        if(!req.user.isAdmin)res.json({message:"Unauthorized!"})
        res.json(await auth.activateUser(username))
    }
}


module.exports = {UserController}