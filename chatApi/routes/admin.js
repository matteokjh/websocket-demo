var express = require('express');
var router = express.Router();
var {getHash} = require('../methods/cry');

/* GET home page. */
router.get('/', function(req, res, next) { // 返回管理员token
    let token = getHash('root','root')
    res.json({
        code: 200,
        msg: '管理员token',
        token: token
    })
});



module.exports = router;
