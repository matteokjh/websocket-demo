var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = require('../model/login.model.js');
var {getHash, getSalt} = require('../methods/cry');

mongoose.connect('mongodb://localhost:27017/chatroom', {
    useNewUrlParser: true
});



/* GET users listing. */

router.get('/', function (req, res, next) { // show all users
    User.find({},(err,data)=>{
        if(err) res.end(err);
        res.json({
            code: 200,
            msg: '查询所有成员',
            data: data
        });
    })
});

router.get('/login', function (req, res, next) { //登陆
    let username = req.query.username;
    let pwd = req.query.password;
    // console.log(req)
    User.find({
        username: username
    },(err,data)=>{
        if(err) res.end(err);
        if(data.length == 0){ // 找不到用户
            res.json({
                code: 8001,
                msg: '用户名不存在',
                data: data
            })
        }else{
            // let hashPwd = getHash(pwd,data.salt);
            console.log(data)
            res.json({
                code: 200,
                msg: '登陆成功',
                data: data
            });
        }
        
    })
});

router.get('/register', function (req, res, next) { //注册
    let salt = getSalt(6,8);
    let pwd = req.query.password;
    // console.log(req)
    let newPwd = getHash(pwd,salt);
    let user = new User({
        username: req.query.username,
        password: newPwd,
        email: req.query.email,
        salt: salt
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
