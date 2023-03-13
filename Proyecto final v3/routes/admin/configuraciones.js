var express = require('express');
var router = express.Router();

var userModel = require('../../models/userModel');

router.get('/', async function (req, res, next) {
  var usuarios = await userModel.getUsuarios();

  res.render('admin/configuraciones', {
    layout: 'admin/layout',
    usuarios
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
  console.log(usuario);
  res.render('admin/updateUser', {
    layout: 'admin/layout',
    usuario
  })
})

router.post('/updateUser', async (req, res, next) => {
  console.log(req.body)
  try {
    var obj = {
      user: req.body.user,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      dni: req.body.dni,
      telefono: req.body.telefono
    }
    console.log(obj)
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


module.exports = router;