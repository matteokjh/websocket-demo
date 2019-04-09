var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// var crypto = require('crypto');

var User = require('../model/login.model.js');
var {getHash, getSalt} = require('../methods/cry');

mongoose.connect('mongodb://localhost:27017/chatroom', {
    useNewUrlParser: true
});



/* GET users listing. */

router.get('/', function (req, res, next) { // show all users
    // let salt = getSalt(6,8);
    // let pwd = '123';
    // let newPwd = getHash(pwd,salt);
    // console.log(salt,newPwd);
    User.find({},(err,data)=>{
        if(err) res.end(err);
        res.json({
            code: 200,
            msg: '查询所有成员',
            data: data
        });
    })
});

router.get('/register', function (req, res, next) { // show all users
    let user = new User({
        username: req.username,
        password: req.password,
        email: req.email
    })
    user.save((err,data)=>{
        if(err) res.end(err);
        res.json({
            code: 200,
            msg: '注册成功',
            data: data
        });
    })
});



module.exports = router;
