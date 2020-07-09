const { Router } = require('express');
const router = Router();
const connection = require('./conf');

const nodemailer = require("nodemailer");

// Création de la méthode de transport de l'email 
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "lingling.tabuteau@gmail.com",
        pass: "userpass"
    }
});

smtpTransport.sendMail({
  from: "Deer Wild <deer@wild.com>", // Expediteur
  to: "lingling.tabuteau@gmail.com", // Destinataires
  subject: "Coucou !", // Sujet
  text: "Hello world ✔", // plaintext body
  html: "<b>Hello world ✔</b>" // html body
}, (error, response) => {
  if(error){
      console.log(error);
  }else{
      console.log("Message sent: " + response.message);
  }
});

router.post('/nodemailer', (req, res) => {
  
});