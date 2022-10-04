const {CartService} = require("../services/CartService")

class CartController {
    async create(req,res){
        let cart = new CartService();
        const {data} = req.body
        const user = req.user
        res.json(await cart.addCart(user,data));
    }
    async update(req,res){
        let cart = new CartService();
        const {data} = req.body
        const user = req.user
        res.json(await cart.modifyCart(user._id,data))
    }
    async addProduct(req,res){
        let cart = new CartService();
        const {productId,count} = req.body
        let user = req.user
        // if(!(await cart.findCart(user._id))) {res.json({message:"No cart found"});return;}
        
        res.json(await cart.addOneProduct(user._id,productId,count))
    }
    async delete(req,res){
        let cart = new CartService();
        const user = req.user
        res.json(await cart.deleteCart(user))
    }
    async find(req,res){
        let cart = new CartService();
        const user = req.user
        const result = await cart.findCart(user._id);
        if(!result){res.json({message:"No cart exist"});return;}
        res.json(result)
    }
}


module.exports = {CartController}