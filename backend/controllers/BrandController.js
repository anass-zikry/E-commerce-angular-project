const { BrandService } = require("../services/BrandService");
const {AuthService} = require("../services/AuthService")
class BrandController {
  async create(req, res) {
    let brand = new BrandService();
    // if(!req.user.isAdmin) {res.json({message:"Unautorized!"});return;}
    const { title } = req.body;
    res.json(await brand.addBrand(title));
  }
  async edit(req, res) {
    let brand = new BrandService();
    const { title, newTitle } = req.body;

    res.json(await brand.editBrand(title, newTitle));
  }
  async delete(req, res) {
    let brand = new BrandService();
    const { title } = req.body;

    res.json(await brand.deleteBrand(title));
  }
  async list(req, res) {
    let brand = new BrandService();
    res.json(await brand.listAll());
  }
}

module.exports = { BrandController };
