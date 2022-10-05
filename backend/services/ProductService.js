const { ObjectId } = require("mongodb");
const { Product } = require("../DB/Product");
// const collectionName = "Product"
// const URL = "mongodb://localhost:27017";

class ProductService {
  async add(data) {
    let product = new Product();
    data.isActive = true;
    await product.insertOne(data);
    return {
      message: "product added!",
      success: true,
    };
  }
  async findById(id) {
    let product = new Product();
    return await product.findOne({ _id: ObjectId(id) });
  }
  async findAll() {
    let product = new Product();
    return await product.findAll();
  }
  async modify(id, data) {
    let product = new Product();
    if (id.length != 24) {
      return { message: "Invalid product id!", success: false };
    }
    let result = await product.updateOne(id, data);
    // console.log(result);
    if (result.modifiedCount > 0) {
      return { message: "Product modified successfuly!", success: true };
    } else if (result.matchedCount > 0) {
      return { message: "Nothing modified", success: true };
    } else {
      return { message: "Something went wrong!", success: false };
    }
  }
  async delete(id) {
    let product = new Product();
    if (id.length != 24) {
      return { message: "Invalid product id!", success: false };
    }
    let result = await product.deleteOne(id);
    if (result.deletedCount == 1) {
      return { message: "Product deleted!", success: true };
    } else {
      return { message: "Something went wrong!", success: false };
    }
  }
}

module.exports = { ProductService };
