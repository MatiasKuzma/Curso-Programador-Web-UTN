var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.render('user/home',{
      layout: 'user/layout',
    });
  });

  module.exports = router;