const {CategoryService} = require("../services/CategoryService")

class CategoryController {
    async create(req,res){
        let category = new CategoryService();
        const {title,products} = req.body;
        res.json(await category.addCategory(title,products));
    }
    async edit(req,res){
        let category = new CategoryService();
        const {title,dataObj} = req.body;
        res.json(await category.updateCategory(title,dataObj))
    }
    async delete(req,res){
        let category = new CategoryService();
        const {title} = req.body;
        res.json(await category.deleteCategory(title))
    }
    async list(req,res){
        let category = new CategoryService();
        res.json(await category.listAll())
    }
}

module.exports = {CategoryController}