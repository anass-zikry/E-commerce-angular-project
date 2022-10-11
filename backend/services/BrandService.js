const { ObjectId } = require("mongodb");
const { Brand } = require("../DB/Brand");

class BrandService {
  async addBrand(title) {
    let brand = new Brand();
    if (await this.brandExist(title))
      return { message: "Brand already exist!", success: false };
    await brand.insertOne({ title: title });
    return { message: "Brand Created!", success: true };
  }
  async editBrand(title, newTitle) {
    let brand = new Brand();
    const id = await this.findBrandByTitle(title).then((b) => b._id);
    await brand.updateOne(id, { title: newTitle });
    return { message: "Brand Edited!", success: true };
  }
  async deleteBrand(title) {
    let brand = new Brand();
    let currentBrand = await this.findBrandByTitle(title);
    if (!currentBrand)
      return { message: "Brand doesnot exist", success: false };
    const id = currentBrand._id;
    await brand.deleteOne(id);
    return { message: "Brand Deleted!", success: true };
  }
  // async findBrandById(id){
  //     let brand = new Brand();
  //     return (await brand.findOne({_id:ObjectId(id)}))
  // }
  async findBrandByTitle(title) {
    let brand = new Brand();
    return await brand.findOne({ title: title });
  }
  async listAll() {
    let brand = new Brand();
    return await brand.findAll();
  }
  async brandExist(title) {
    return (await this.findBrandByTitle(title)) ? true : false;
  }
}

module.exports = { BrandService };
