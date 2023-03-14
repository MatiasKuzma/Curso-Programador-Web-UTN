var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
const { path } = require('../app');
var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('formulario-trabajo', { title: 'Express' });
});




router.post('/', async (req, res, next) => {
  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var comentario = req.body.comentario;

  console.log(req.files.archivo)

  try {
    var cv_id = '';
    if(req.files && Object.keys(req.files).length > 0){
      archivo = req.files.archivo;
      cv_id = (await uploader(archivo.tempFilePath)).public_id;
    }

    const cv = cloudinary.url(cv_id)

    var obj = {
      to: 'matias.kuzma@gmail.com',
      subject: 'Contacto desde formulario de trabajo',
      html: "Hola, " + nombre + " " + apellido + " se contacto porque desea trabajar con nosotros. Lo podes contactar a travez del mail: " + email + "<br> Ademas nos dejo el siguiente comentario: " + comentario + "<br> Y adjunto su CV para que lo tengas en cuenta.",
      attachments: [{
        filename: nombre + ' ' + apellido +' cv.pdf',
        path: cv,
        contentType: 'application/pdf',
      }]
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

if(cv_id){
  await (destroy(cv_id));
}


  }
  catch (error){
    console.log(error)
    res.render('formulario-trabajo'), {
      message: 'No se pudo enviar el mensaje',
      error: true
    }
    
  }
})


module.exports = router;