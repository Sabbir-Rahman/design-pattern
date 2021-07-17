const messageSchema = require('../model/messageModel');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const alert = require("alert");
var LocalStorage = require("node-localstorage").LocalStorage;
const { request } = require("express");
let express = require("express");
let cookieParser = require("cookie-parser");

const zlib = require('zlib')
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

  //encrypted message has two parts iv and content. iv is a random number can be use as a private key
  encryptMessage = encrypt(message)

  //compress the encrypted message content
  var deflated = zlib.deflateSync(encryptMessage.content).toString("base64");
  

  const newMessage = { name: name, message:deflated};

  try {
    const dbMessage = await new messageSchema(newMessage).save();
    
   
    alert(
      `Copy message id and iv and paste in the box\nmessage id:- ${dbMessage.id}\niv:- ${encryptMessage.iv}`
    );

    res.redirect("/decode");
    
    //res.status(201).json({message:'New user created', data:newUser}).redirect('/')
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const decodeMessage = async (req, res) => {
  //const { name, message } = req.body;
  

  const result = await messageSchema.findById(req.body.id)

  //extract the encrypted content req.body.iv is the random number can be use as private key 
  var inflatedContent = zlib
    .inflateSync(new Buffer.from(result.message, "base64"))
    .toString();

  //ready object for decrypt
  const decodeMessageObj = {
      'iv': req.body.iv,
      'content': inflatedContent
  }


  const decodeMessage = decrypt(decodeMessageObj)
  

  alert(`Decoded message is:-\n\n${decodeMessage}`)


};

module.exports = {encodePage,decodePage,encodeMessage,decodeMessage}