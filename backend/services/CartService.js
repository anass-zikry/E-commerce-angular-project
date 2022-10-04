const { ObjectId } = require("mongodb");
const { Cart } = require("../DB/Cart");

class CartService { //id refers to user id
  async addCart(user) {
    console.log(user._id);
    let cart = new Cart();
    if (await this.cartExist(user._id)) return { message: "Cart already exist" };
    let data = { userId: user._id ,products:[]};
    await cart.insertOne(data);
    return { message: "Cart created!" };
  }
  async modifyCart(userId, dataArr) {
    let cart = new Cart();
    let currentCart = await this.findCart(userId);
    if (!currentCart) return { message: "Cart doesnot exist" };
    return await cart.updateOne(currentCart._id, { products: dataArr });
  }
  async addOneProduct(userId,productId,count){
    let cart = new Cart();
    let currentCart = await this.findCart(userId);
    if(!currentCart) return {message:"No cart found!"}
    let index =currentCart.products.findIndex((p)=>p.productId == productId);
    if(index >= 0){currentCart.products[index].count += 1;}
    else{currentCart.products.push({productId:productId,count:count});}
    return (await cart.updateOne(currentCart._id,{products:currentCart.products}))
  }
  async deleteCart(user) {
    let cart = new Cart();
    if (!(await this.cartExist(user._id))) return { message: "Cart doesnot exist" };
    const cartId = await this.findCart(user._id).then((c) => c._id);
    await cart.deleteOne(cartId);
    return { message: "Cart deleted!" };
  }

  async findCart(id) {
    let cart = new Cart();
    let currentCart = await cart.findOne({ userId: id });
    if (!currentCart) return false;
    //{message:"No cart exist"}
    return currentCart;
  }
  async cartExist(id) {
    let cart = new Cart();
    return (await cart.findOne({ userId: id })) ? true : false;
  }
}

module.exports = { CartService };
