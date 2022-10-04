const express = require("express");
const path = require('path')
const {adminMiddleware} = require('./middleware/adminMiddleware')
const {tokenMiddleware} = require("./middleware/tokenMiddleware")
const cors = require('cors')
const { adminApp } = require("./routes/Admin");
const { Website } = require("./routes/Website");

const app = express();
app.use(cors())
app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  // res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  next();
});
app.use(express.urlencoded({extended:true}))
app.use(express.json())
// app.use(express.static(path.join(__dirname, 'dist')));
app.use("/admin",tokenMiddleware);
app.use("/website",tokenMiddleware);
app.use("/admin",adminMiddleware);
app.use("/verify-token",tokenMiddleware);
app.use("/admin", adminApp);
app.use("/website", Website);

app.listen(8080,'127.0.0.1', () => {
  console.log("Server running on port 8080 \n localhost:8080");
});