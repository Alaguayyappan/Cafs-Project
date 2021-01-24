const express = require("express");
const bodyParser = require("body-parser");
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect('mongodb://localhost:27017/cafsDB', {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = {
  name: String,
  email: String,
  mobile: Number,
  gender: String,
  role: String
}

const Detail = mongoose.model("Detail", userSchema);

const detail1 = new Detail({
  name: "Alagu-1",
  email: "abc@gmail.com",
  mobile: "9940030097",
  gender: "Male",
  role: "Admin"
});

const detail2 = new Detail({
  name: "Alagu-2",
  email: "abc1@gmail.com",
  mobile: "9940030098",
  gender: "Male",
  role: "User"
});

const userData = [detail1, detail2];

app.get("/", function(req, res){
  res.render("home");
});

app.post("/index.html", function(req, res){
  console.log("success");
  res.sendFile(__dirname + "/index.html");
});

app.get("data.ejs", function(req, res){
  res.render("data.ejs");
});

app.post("/data", function(req,res){
  const name = req.body.Name;
  const email = req.body.Email;
  const mobile = req.body.Mobile;
  const gender = req.body.optradio;
  const role = req.body.Role;

  const userfill = new Detail({
    name : name,
    email: email,
    mobile: mobile,
    gender: gender,
    role: role
  });
   userfill.save();
   res.redirect("/home");
});

app.get("/home", function(req, res){
  res.render("data", {userData: userData});
});

app.listen(3000, function(req,res){
console.log("Server started successfully");
});
