const { insertOne, findOne, findAll,updateOne,deleteOne } = require("./Base");
const URL = "mongodb://localhost:27017";
class BaseModel {
  name;

  insertOne(data) {
    return insertOne(URL, this.name, data);
  }

  findOne(searchObj) {
    return findOne(URL, this.name, searchObj);
  }

  findAll(filter = {}) {
    return findAll(URL, this.name, filter);
  }
  updateOne(id,data){
    return updateOne(URL,this.name,id,data)
  }
  deleteOne(id){
    return deleteOne(URL,this.name,id);
  }
}

module.exports = {BaseModel}