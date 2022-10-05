const {CartService} = require("../services/CartService")

class CartController {
    async create(req,res){
        let cart = new CartService();
        const {productsIdArr} = req.body
        const user = req.user
        res.json(await cart.addCart(user,productsIdArr));
    }
    async update(req,res){
        let cart = new CartService();
        const {data} = req.body
        const user = req.user
        res.json(await cart.modifyCart(user._id,data))
    }
    async addProduct(req,res){
        let cart = new CartService();
        const {productId} = req.body
        let user = req.user
        res.json(await cart.addOneProduct(user._id,productId))
    }
    async removeProduct(req,res){
        let cart = new CartService();
        const {productId} = req.body;
        let user = req.user;
        res.json(await cart.removeOneProduct(user._id,productId))
    }
    async deleteProduct(req,res){
        let cart = new CartService();
        const {productId} = req.body;
        let user = req.user;
        res.json(await cart.deleteOneProduct(user._id,productId))
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
        if(!result){res.json({message:"No cart exist",success:false});}
        else{res.json({result:result,success:true})}
    }
}


module.exports = {CartController}