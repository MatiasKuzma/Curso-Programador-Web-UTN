var express = require('express');
var router = express.Router();
var userModel = require('./../../models/userModel')


router.get('/', function(req, res, next) {
    res.render('user/login',{
      layout: 'layout'
    });
  });

  router.get('/logout', function(req, res, next){
    req.session.destroy();
    res.render('user/login',{
        layout: 'layout'
    });
});
  

  router.post('/', async(req, res, next) =>{
    try{
        console.log(req.body);
    var usuario = req.body.usuario;
    var password = req.body.password;

    var data = await userModel.getUserAndPassword(usuario, password);
console.log(data)
if (data != undefined){
    req.session.id_usuario = data.id;
    req.session.nombre = data.nombre;
    res.redirect('/user/home')
}
else{
    res.render('user/login',{
        layout: 'layout',
        error:true
    })
}
}   catch (error){
    console.log(error);
}
})

module.exports = router;

