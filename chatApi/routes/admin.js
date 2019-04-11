var express = require('express');
var router = express.Router();
var {getHash} = require('../methods/cry');
var User = require('../model/login.model.js')

/* GET home page. */
let token = getHash('root','root')

router.get('/', function(req, res, next) { // 返回管理员token
    
    res.json({
        code: 200,
        msg: '管理员token',
        token: token
    })
});

router.delete('/deleteUser', function(req, res, next) { // 删除成员
    if(token === req.body.token){
        let id = req.body._id;
        User.remove({
            _id: id
        },(err,r)=>{
            if(err) res.end(err);
            res.json(r)
        })
    }else{
        res.end('token无效！')
    }
});




module.exports = router;
