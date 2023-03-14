var express = require('express');
var router = express.Router();
var userModel = require('../../models/userModel');
var eventosModel = require('../../models/eventosModel');
var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

router.get('/', async function (req, res, next) {
  var usuarios = await userModel.getUsuarios();
  var eventos = await eventosModel.getEventos();

  eventos = eventos.map(evento =>{
    if(evento.img_id){
      const imagen = cloudinary.image(evento.img_id,{
        width:100,
        height: 100,
        crop: 'fill'
      });
      return {
        ...evento,
        imagen
      }
    }
    else{
      return{
        ...evento,
        imagen: ''
      }
    }
  })

  res.render('admin/configuraciones', {
    layout: 'admin/layout',
    usuarios,
    eventos
  });
});

router.get('/deleteUser/:id', async (req, res, next) => {
  const id = req.params.id;
  await userModel.deleteUserById(id);
  res.redirect('/admin/configuraciones');
})


router.get('/updateUser/:id', async (req, res, next) => {
  var id = req.params.id;

  var usuario = await userModel.getUserById(id);
  res.render('admin/updateUser', {
    layout: 'admin/layout',
    usuario
  })
})

router.post('/updateUser', async (req, res, next) => {
  try {
    var obj = {
      user: req.body.user,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      dni: req.body.dni,
      telefono: req.body.telefono
    }
    await userModel.updateUserById(obj, req.body.id)
    res.redirect('/admin/configuraciones');
  }
  catch (error) {
    console.log(error)
    res.render('admin/updateUser', {
      layout: 'admin/layout',
      error: true,
      message: "No se pudo modificar el usuario"
    })
  }
});

router.get('/uploadEvento', async function (req, res, next) {
  res.render('admin/uploadEvento', {
    layout: 'admin/layout'
  })
})

router.post('/uploadEvento', async (req, res, next) => {
  try {
    var img_id = '';
    if(req.files && Object.keys(req.files).length > 0){
      imagen = req.files.imagen;
      img_id = (await uploader(imagen.tempFilePath)).public_id;
    }

    if (req.body.titulo != "" && req.body.cuerpo != "") {
      await eventosModel.uploadEvento({
        ...req.body,
        img_id
      });
      res.redirect('/admin/configuraciones');
    }
    else {
      res.render('admin/uploadEvento', {
        layout: 'admin/layout',
        error: true,
        message: "Todos los campos son requeridos"
      })
    }
  }
  catch (error) {
    console.log(error)

  }
})






router.get('/deleteEvento/:id', async (req, res, next) => {
  const id = req.params.id;

  let evento = await eventosModel.getEventoById(id);
  if(evento.img_id){
    await (destroy(evento.img_id));
  }

  await eventosModel.deleteEventoById(id);
  res.redirect('/admin/configuraciones');
})


router.get('/updateEvento/:id', async (req, res, next) => {
  var id = req.params.id;

  var evento = await eventosModel.getEventoById(id);
  res.render('admin/updateEvento', {
    layout: 'admin/layout',
    evento
  })
})

router.post('/updateEvento', async (req, res, next) => {
  try {
    let img_id = req.body.img_original;
    let borrar_img_vieja = false;
    if(req.body.img_delete === "1"){
      img_id=null;
      borrar_img_vieja=true;
    }
    else{
      if(req.files && Object.keys(req.files).length > 0){
        imagen = req.files.imagen;
        img_id = (await uploader(imagen.tempFilePath)).public_id;
        borrar_img_vieja=true;
      }
    }
    if(borrar_img_vieja && req.body.img_original){
      await (destroy(req.body.img_original));
    }

    var obj = {
      titulo: req.body.titulo,
      cuerpo: req.body.cuerpo,
      img_id
    }
    await eventosModel.updateEventoById(obj, req.body.id)
    res.redirect('/admin/configuraciones');
  }
  catch (error) {
    console.log(error)
    res.render('admin/updateEvento', {
      layout: 'admin/layout',
      error: true,
      message: "No se pudo modificar el evento"
    })
  }
});



module.exports = router;