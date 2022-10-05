const express = require("express");
const { ProductController } = require("../controllers/ProductController");
const { UserController } = require("../controllers/UserController");
const { BrandController } = require("../controllers/BrandController");
const { CategoryController } = require("../controllers/CategoryController");
const adminApp = express();

let product = new ProductController();
let user = new UserController();
let brand = new BrandController();
let category = new CategoryController();

//Product
adminApp.post("/find-product", product.find);
adminApp.get("/browse-products", product.listAll);
adminApp.delete("/del-product", product.delete);
adminApp.post("/mod-product", product.modify);
adminApp.post("/add-product", product.add);
//Users
adminApp.get("/list-users", user.listAll);
adminApp.post("/activate-user",user.activate)
// adminApp.post("/login",user.adminLogin)
adminApp.post("/register",user.addAdminUser)
adminApp.get("/verify-admin",user.verifyAdmin)



//Brand
adminApp.post("/add-brand", brand.create);
adminApp.post("/edit-brand", brand.edit);
adminApp.delete("/delete-brand", brand.delete);
adminApp.get("/list-brands", brand.list);
//Category
adminApp.post("/add-category",category.create)
adminApp.post("/edit-category",category.edit)
adminApp.delete("/delete-category",category.delete)
adminApp.get("/list-categories",category.list)


module.exports = {
  adminApp,
};
