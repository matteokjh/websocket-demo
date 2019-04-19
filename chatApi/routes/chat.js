var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/chatlist', function(req, res, next) {
    console.log(123123)
});

module.exports = router;