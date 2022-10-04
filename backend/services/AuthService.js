const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const { User } = require("../DB/User");
const jwt = require("jsonwebtoken");

class AuthService {
  async register(userData) {
    let user = new User();
    if (await this.usernameExist(userData.username)) return {message:"username taken",status:false};
    const encPassword = await this.encrypt(userData.password);
    const data = {
      username: userData.username,
      password: encPassword,
      isAdmin: userData.isAdmin,
      isActive: true,
    };
    await user.insertOne(data);
    return {message:"User Registered!",status:true};
  }
  async login(username, password) {
    // let user = new User();
    // console.log(username,password);
    let currentUser = await this.findUser(username);
    if (!currentUser) return { message: "Incorrect username!" ,status:false};
    if (!currentUser.isActive)
      return { message: "Account has been deactivated" ,status:false};
    if (!(await this.comparePassword(password, currentUser.password)))
      return { message: "Incorrect password!" ,status:false};
    return {token:jwt.sign(
      {
        username: currentUser.username,
        id: currentUser._id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      "secret"
    ),status:true};
  }
  async delete(id) {
    let user = new User();
    if (!this.findUserById(id)) return { message: "User not found" ,status:false};

    await user.updateOne(id, { isActive: false });
    return { message: "User Deleted!" ,status:true};
  }
  async resetPassword(currentUser, oldPassword, newPassword) {
    let user = new User();
    // let currentUser = await this.findUserById(token.id);
    if (!currentUser) return { message: "User not found" ,status:false};
    if (!(await this.comparePassword(oldPassword, currentUser.password)))
      return { message: "Incorrect password!" ,status:false};
    const encPassword = await this.encrypt(newPassword);
    // console.log(currentUser);
    return {message:await user.updateOne(currentUser._id, { password: encPassword }),status:true};
  }
  async forgotPassword(id, newPassword) {
    let user = new User();
    if (!(await this.findUserById(id))) return { message: "User not found" ,status:false};
    return {message:await user.updateOne(id, {
      password: await this.encrypt(newPassword),
    }),status:true};
  }
  async listUsers() {
    let user = new User();
    return await user.findAll();
  }
  async activateUser(username) {
    let user = new User();
    let currentUser = await this.findUser(username);
    return await user.updateOne(currentUser._id, { isActive: true });
  }
  async isAdminCheck(user){
    
  }
  async usernameExist(username) {
    let user = new User();
    return (await user.findOne({ username: username })) ? true : false;
  }
  async findUserById(id) {
    let user = new User();
    return await user.findOne({ _id: ObjectId(id) });
  }
  async findUser(username) {
    let user = new User();
    return await user.findOne({ username: username });
  }
  comparePassword(password, hash) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
  encrypt(password) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (error, hash) => {
        if (error) return reject(error);
        resolve(hash);
      });
    });
  }
}

module.exports = { AuthService };
