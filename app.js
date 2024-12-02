require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post('/send-email', upload.single('file'), (req, res) => { 
  console.log(req.body); 
  console.log(req.file); 
  // Utilisation d'un fichier pour simplifier
  const { surname, name, enterprise, email, phoneNumber, urgent, message } = req.body;
  const file = req.file; // Utilise `req.file` au lieu de `req.files` pour un fichier unique


     // Create a nodemailer transporter
     const transporter = nodemailer.createTransport({
      service: 'Gmail', // or use your email provider
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,  
      }
  });

   // Setup email data with unicode symbols
      const mailOptions = {
          from: `${name} <${process.env.EMAIL_USER}>`,
          to: process.env.MAIL_USER,
          subject: "Demande de devis" + " From:" + email,
          text: ` 
          Surname: ${surname}
          Name: ${name}
          Entreprise: ${enterprise}
          Email: ${email}
          Phone number ${phoneNumber}
          Urgent: ${urgent}

          Message:
          ${message}
          `,
          attachments: [
              {
                  filename: file.originalname,
                  path: file.path
              }
          ]
      };

      // Send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return res.status(500).send(error.toString());
          }
          fs.unlinkSync(file.path);
          res.send('<script>alert("Email sent successfully!"); window.location.href = "/";</script>');
      });
  
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});