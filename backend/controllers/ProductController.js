// const {ProductService} = require("../services/ProductService")
const { ObjectId } = require("mongodb");
const { ProductService } = require("../services/ProductService");
const jwt = require("jsonwebtoken");

class ProductController {
  async add(req, res) {
    let product = new ProductService();
    let {data} = req.body;

    res.json(await product.add(JSON.parse(data)));
  }

  async find(req, res) {
    let product = new ProductService();
    const { id } = req.body;
    
    res.json(await product.findById(id));
  }

  async listAll(req, res) {
    let product = new ProductService();
    res.json(await product.findAll());
  }
  async modify(req, res) {
    let product = new ProductService();
    const { id, dataObj } = req.body;
    
    res.json(await product.modify(id, dataObj));
  }
  async delete(req, res) {
    let product = new ProductService();
    const { id } = req.body;
    
    res.json(await product.delete(id));
  }
}

module.exports = {
  ProductController,
};
