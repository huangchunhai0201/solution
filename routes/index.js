var express = require('express');
var userDao = require('../dao/userDao');

var router = express.Router();

/* GET home page. */
router.get('/addUser', function(req, res, next) {
  console.log('sb')
  userDao.add(req, res, next);
});
router.get('/', function(req, res, next) {
  console.log(2);
  res.render('index', { title: 'hello solution' });
});

module.exports = router;
