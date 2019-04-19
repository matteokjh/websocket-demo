import axios from 'axios'
import io from 'socket.io-client';

const socket = io('http://localhost:8088');
//切换环境
if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = 'http://localhost:3000';
} else if (process.env.NODE_ENV == 'debug') {
    axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = 'http://api.chat.sulpures.com/';
}
//设置拦截器
//拦截请求
axios.interceptors.request.use(req=>{
    const token = localStorage.getItem('token');
    if(token){
        req.headers['Authorization'] = `Bearer ${token}`;
    }
    return req;
})
//拦截响应
axios.interceptors.response.use(res=>{
    // console.log(res)
    if(res.data.token){
        console.log('token：',res.data.token);
        localStorage.setItem('token',res.data.token)
    }
    return res;
},error => {
    let err = error.response;
    if(err.status == 401){ // 过期
        localStorage.removeItem('token');
    }

    return Promise.reject(error)
})

// 以下为接口

//登录
async function userLogin(usr, pwd) {
    const res = await axios.post('/users/login', {
        username: usr,
        password: pwd
    });
    return res;
}
//获取token
async function getToken() {
    const res = await axios.get('/users/token');
    return res;
}
//获取聊天列表
async function getChatList() {
    const res = await axios.get('/chat/chatlist');
    return res;
}
//传消息
async function sendMsg(msg) {
    socket.emit('send',msg)
}

export default {
    userLogin,
    getToken,
    getChatList,
    sendMsg,
}
