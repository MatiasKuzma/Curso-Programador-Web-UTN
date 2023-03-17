var express = require('express');
var router = express.Router();
var md5 = require('md5');
var userModel = require('../../models/userModel')


router.get('/', function (req, res, next) {
  res.render('user/cambioPass', {
    layout: 'user/layout'
  });
});

router.post('/', async function (req, res, next) {
  var id = req.session.id_usuario;
  var contraseñaAnterior = req.body.contraseñaAnterior;
  var contraseñaNueva = req.body.contraseñaNueva;
  var contraseñaNuevaConfir = req.body.contraseñaNuevaConfir

  var data = await userModel.getPasswordById(id);

  console.log(data.password)
  console.log(md5(contraseñaAnterior))


  try {
    if (md5(contraseñaAnterior) == data.password && contraseñaNueva == contraseñaNuevaConfir) {
      await userModel.updatePasswordById(id, contraseñaNueva)
      message1 = 'El cambio de contraseña fue exitoso'
      res.render('user/cambioPass', {
        layout: 'user/layout',
        message1
      })
    }
    else {

      if (md5(contraseñaAnterior) != data.password) {
        var message1 = 'Contraseña incorrecta'
      }
      if (contraseñaNueva != contraseñaNuevaConfir) {
        var message2 = 'Las contraseñas no coinciden'
      }
      res.render('user/cambioPass', {
        layout: 'user/layout',
        message1,
        message2,
        error: true
      })

    }

  }
  catch (error) {
    console.log(error)
  }

})


module.exports = router;