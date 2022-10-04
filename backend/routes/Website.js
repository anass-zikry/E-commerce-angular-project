const express = require("express")
const {UserController} = require("../controllers/UserController")
const {CartController} = require("../controllers/CartController")
const {ProductController} = require('../controllers/ProductController')

const Website=express();

let user = new UserController()
let cart = new CartController()
let product = new ProductController()

Website.get("/verify-token",(req,res)=>{
    res.json({status:true})
  })
//User
Website.post("/register",user.addUser)
Website.delete("/delete-user",user.deleteUser)
Website.post("/reset-password",user.resetPassword)
Website.post("/forgot-password",user.forgotPassword)
Website.post("/login",user.login)
//Products
Website.get("/browse-products", product.listAll)

//Cart
Website.post("/new-cart",cart.create)
Website.get("/find-cart",cart.find)
Website.post("/update-cart",cart.update)
Website.post("/add-product",cart.addProduct)
Website.delete("/delete-cart",cart.delete)

module.exports = {
    Website
}