var express = require('express');
var router = express.Router();
var eventosModel = require('./../models/eventosModel')
var cloudinary = require('cloudinary').v2;

/* GET home page. */

router.get('/',async function(req, res, next) {
eventos=await eventosModel.getEventos()

const listaEventos = eventos.reverse();

eventos = listaEventos.splice(0, 3);

console.log(eventos.length)

eventos = eventos.map(evento =>{
  if(evento.img_id){
    const imagen = cloudinary.url(evento.img_id,{
      width:500,
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
      imagen: '/images/imagen no disponible evento.jpg'
    }
  }
})

  res.render('index',{
    eventos
  });
});



module.exports = router;
