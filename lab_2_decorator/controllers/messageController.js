const messageSchema = require('../model/messageModel');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const alert = require("alert");
var LocalStorage = require("node-localstorage").LocalStorage;
const { request } = require("express");
localStorage = new LocalStorage("./scratch");
let express = require("express");
let cookieParser = require("cookie-parser");
//setup express app
const app = express();
app.use(cookieParser());

const { encrypt, decrypt} = require('./encryptDecrypt')

const encodePage = (req, res) => {
  res.sendFile("encoding.html", {
    root: "./views",
  });
};

const decodePage = (req, res) => {
  res.sendFile("decoding.html", {
    root: "./views",
  });
};

const encodeMessage = async (req, res) => {
  const {name,message} = req.body

  encryptMessage = encrypt(message)

  
  const newMessage = { name: name, message:encryptMessage.toString()};

  try {
    //await new messageSchema(newMessage).save();
    
    alert(
      `Copy encrypted message iv and content and paste in the box\niv: \n${encryptMessage.iv}\ncontent:\n${encryptMessage.content}`
    );

    res.redirect("/decode");
    
    //res.status(201).json({message:'New user created', data:newUser}).redirect('/')
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const decodeMessage = async (req, res) => {
  //const { name, message } = req.body;

  const decodeMessage = decrypt(req.body)

  alert(`Decoded message is:-\n\n${decodeMessage}`)

//   encryptMessage = encrypt(message);

//   const newMessage = { name: name, message: encryptMessage.toString() };

//   try {
//     await new messageSchema(newMessage).save();

//     alert(
//       `Copy encrypted message iv and content and paste in the box\niv: \n${encryptMessage.iv}\ncontent:\n${encryptMessage.content}`
//     );

//     //res.status(201).json({message:'New user created', data:newUser}).redirect('/')
//   } catch (error) {
//     res.status(409).json({ message: error.message });
//   }
};

module.exports = {encodePage,decodePage,encodeMessage,decodeMessage}