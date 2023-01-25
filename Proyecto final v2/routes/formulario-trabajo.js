var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
const { path } = require('../app');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('formulario-trabajo', { title: 'Express' });
});

router.post('/', async (req, res, next) => {
  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var comentario = req.body.comentario;
  var cv = req.body.cv;

  var obj = {
    to: 'matias.kuzma@gmail.com',
    subject: 'Contacto desde formulario de trabajo',
    html: "Hola " + nombre + " " + apellido + " se contacto porque decea trabajar con nosotros. Lo podes contactar a travez del mail: " + email + "<br> Ademas nos dejo el siguiente comentario: " + comentario + "<br> Y adjunto su CV para que lo tengas en cuenta.",
    // attachments: [{
    //   filename: 'cv.pdf',
    //   path: 'file:'+ cv,
    //   contentType: 'application/pdf',
    // }]
  }

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
  })

  var info = await transport.sendMail(obj);

  res.render('formulario-trabajo', {
    message: 'Mensaje enviado correctamente',
  })
})

module.exports = router;