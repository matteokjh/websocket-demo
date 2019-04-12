import axios from 'axios'

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

    return Promise.reject(error.message)
})


async function userLogin(usr, pwd) {
    const res = await axios.post('/users/login', {
        username: usr,
        password: pwd
    });
    return res;
}

async function getToken() {
    const res = await axios.get('/users/token');
    return res;
}

export default {
    userLogin,
    getToken
}
