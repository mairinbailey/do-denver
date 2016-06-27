var express = require('express');
var router = express.Router();
var knex = require('../../db/knex');
var db = require('../../db/api');
var auth = require('../../auth');

router.get('/havedone', auth.isNotLoggedIn, function(req, res, next){
  db.getPlaces(req.session.userId).then(function(places){
  res.render('clients/havedone', {places: places});
  })
});

router.post('/havedone', function (req, res, next) {
  knex('place').where('place.id', req.session.userId).update(req.body)
    .then(function(){
      res.render('clients/havedone');
    })
});


module.exports = router;
