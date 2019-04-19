var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');

var User = require('../model/login.model.js');
var {getHash, getSalt} = require('../methods/cry');

mongoose.connect('mongodb://localhost:27017/chatroom', {
    useNewUrlParser: true
});

const EXPIRE = 60 * 60 * 24; // token一天过期




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

router.get('/token',(req,res)=>{ // 因为有拦截器，这里不需要验证token了，来到这里token必定通过
    let token = req.headers.authorization.split(' ')[1];
    jwt.verify(token,'secretKey',(err,r)=>{
        if(err) res.end(err)
        else{
            let a = jwt.sign(
                { // tokenObj
                    username: r.username
                },
                'secretKey', // 密钥，没有
                { // 过期时间/s
                    expiresIn: EXPIRE // 一天
                }
            )
            res.json({
                code: 200,
                msg: 'token',
                token: a
            })
        }
    })
})

router.post('/login', function (req, res, next) { //登陆
    let username = req.body.username;
    let pwd = req.body.password;
    if(pwd == undefined || username == undefined) 
        res.end(JSON.stringify({
            code: 8004,
            msg: '用户名或密码不能为空！'
        }));
    else{
        User.find({
            username: username
        },(err,data)=>{
            if(err) res.end(err);
            if(data.length == 0){ // 找不到用户
                res.json({
                    code: 8001,
                    msg: '用户名或密码错误！'
                })
            }else{
                let hashPwd = getHash(pwd,data[0].salt);
                if(hashPwd == data[0].password){
                    //验证通过，给用户发token
                    let token = jwt.sign(
                        { // tokenObj
                            username: data[0].username
                        },
                        'secretKey', // 密钥，没有
                        { // 过期时间/s
                            expiresIn: EXPIRE // 一天
                        }
                    )
                    res.json({
                        code: 200,
                        msg: '登陆成功',
                        token: token
                    });
                }else{
                    res.json({
                        code: 8002,
                        msg: '用户名或密码错误！'
                    })
                }
                
            }
            
        })
    }
});

router.get('/register', function (req, res, next) { //注册
    let username = req.query.username;
    User.find({
        username: username
    },(err,r)=>{
        if(err) res.end(err);
        if(r.length == 0){
            let email = req.query.email;
            let salt = getSalt(6,8);
            let pwd = req.query.password;
            // console.log(req)
            let newPwd = getHash(pwd,salt);
            let user = new User({
                username: username,
                password: newPwd,
                email: email,
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
        }else{
            res.json({
                code: 8003,
                msg: '用户名已存在！'
            })
        }
    })
    
});



module.exports = router;
