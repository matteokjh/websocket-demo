var express = require('express');
var router = express.Router();
var jwtAuth = require('../methods/jwt');

router.use(jwtAuth);
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
    next();
});

module.exports = router;
