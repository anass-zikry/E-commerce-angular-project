const Mongo = require("mongodb");
const MongoClient = Mongo.MongoClient;

const DBName = "E-Commerce";

function MongoConnect(url) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, (error, db) => {
      if (error) return reject(error);
      resolve(db);
    });
  });
}

function insertOne(url, collectionName, data) {
  return new Promise((resolve, reject) => {
    MongoConnect(url).then((db) => {
      const dbo = db.db(DBName);
      dbo.collection(collectionName).insertOne(data, (error, result) => {
        if (error) return reject(error);
        resolve(result);
        db.close();
      });
    });
  });
}

function findOne(url, collectionName, searchObj) {
  return new Promise((resolve, reject) => {
    MongoConnect(url).then((db) => {
      const dbo = db.db(DBName);
      dbo
        .collection(collectionName)
        .findOne(searchObj, (error, result) => {
          if (error) return reject(error);
          resolve(result);
          db.close();
        });
    });
  });
}

function findAll(url, collectionName, filter = {}) {
  return new Promise((resolve, reject) => {
    MongoConnect(url).then((db) => {
      const dbo = db.db(DBName);
      dbo
        .collection(collectionName)
        .find(filter)
        .toArray((error, result) => {
          if (error) return reject(error);
          resolve(result);
          db.close();
        });
    });
  });
}
function updateOne(url, collectionName, id, data) {
  return new Promise((resolve, reject) => {
    MongoConnect(url).then((db) => {
      const dbo = db.db(DBName);
      dbo
        .collection(collectionName)
        .updateOne(
          { _id: Mongo.ObjectId(id) },
          { $set: data },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
            db.close();
          }
        );
    });
  });
}
function deleteOne(url, collectionName, id) {
  return new Promise((resolve, reject) => {
    MongoConnect(url).then((db) => {
      const dbo = db.db(DBName);
      dbo
        .collection(collectionName)
        .deleteOne(
          { _id: Mongo.ObjectId(id) },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
            db.close();
          }
        );
    });
  });
}

module.exports = {
  insertOne,
  findOne,
  findAll,
  updateOne,
  deleteOne
};
