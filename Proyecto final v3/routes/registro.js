var express = require('express');
var router = express.Router();
var registroModel = require('./../models/registroModel')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('registro',{
    layout: 'layout'
  });
});

router.post('/', async(req, res, next) =>{
  try{
      console.log(req.body);
  var usuario = req.body.usuario;
  var contraseña = req.body.contraseña;
  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var dni = req.body.dni;
  var telefono = req.body.telefono;


  var data= await registroModel.validarDniUsuario(dni)
  console.log(data)
  if (data == undefined)
  {
    var data = await registroModel.cargarUsuario(usuario, contraseña, nombre, apellido, dni, telefono);
    console.log(data)
    res.render('registro',{
      layout: 'layout',
      error: false
    })

    
  }
  else {
    res.render('registro',{
      layout: 'layout',
      error: true
    })
  }
  }
  catch (error){
    console.log(error)
  }
  
})

module.exports = router;