const { ObjectId } = require("mongodb");
const { Cart } = require("../DB/Cart");

class CartService {
  //id refers to user id
  async addCart(user, productsIdArr = []) {
    console.log(user._id);
    let cart = new Cart();
    if (await this.cartExist(user._id))
      return { message: "Cart already exist", success: false };
    let data = { userId: user._id, products: productsIdArr };
    await cart.insertOne(data);
    return {
      message: "Cart created!",
      result: await this.findCart(user._id),
      success: true,
    };
  }
  async modifyCart(userId, dataArr) {
    let cart = new Cart();
    let currentCart = await this.findCart(userId);
    if (!currentCart) return { message: "Cart doesnot exist" };
    return await cart.updateOne(currentCart._id, { products: dataArr });
  }
  async deleteOneProduct(userId, productId) {
    let cart = new Cart();
    let currentCart = await this.findCart(userId);
    if (!currentCart) return { message: "No cart found!", success: false };
    let index = currentCart.products.findIndex((p) => p.productId == productId);
    if (index >= 0) {
      currentCart.products.splice(index, 1);
    } else {
      return { message: "Product not found!", success: false };
    }
    return {
      result: await cart.updateOne(currentCart._id, {
        products: currentCart.products,
      }),
      success: true,
    };
  }
  async removeOneProduct(userId, productId) {
    let cart = new Cart();
    let currentCart = await this.findCart(userId);
    if (!currentCart) return { message: "No cart found!", success: false };
    let index = currentCart.products.findIndex((p) => p.productId == productId);
    if (index >= 0) {
      currentCart.products[index].count -= 1;
      if (currentCart.products[index].count == 0) {
        currentCart.products.splice(index, 1);
      }
    } else {
      return { message: "Product not found!", success: false };
    }
    return {
      result: await cart.updateOne(currentCart._id, {
        products: currentCart.products,
      }),
      success: true,
    };
  }
  async addOneProduct(userId, productId) {
    let cart = new Cart();
    let currentCart = await this.findCart(userId);
    if (!currentCart) return { message: "No cart found!", success: false };
    let index = currentCart.products.findIndex((p) => p.productId == productId);
    if (index >= 0) {
      currentCart.products[index].count += 1;
    } else {
      currentCart.products.push({ productId: productId, count: 1 });
    }
    return {
      result: await cart.updateOne(currentCart._id, {
        products: currentCart.products,
      }),
      success: true,
    };
  }
  async deleteCart(user) {
    let cart = new Cart();
    if (!(await this.cartExist(user._id)))
      return { message: "Cart doesnot exist" };
    const cartId = await this.findCart(user._id).then((c) => c._id);
    await cart.deleteOne(cartId);
    return { message: "Cart deleted!" };
  }

  async findCart(id) {
    let cart = new Cart();
    let currentCart = await cart.findOne({ userId: id });
    if (!currentCart) return false;
    return currentCart;
  }
  async cartExist(id) {
    let cart = new Cart();
    return (await cart.findOne({ userId: id })) ? true : false;
  }
}

module.exports = { CartService };
