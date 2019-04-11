var expressJwt = require('express-jwt');

var jwtAuth = expressJwt({
    secret: 'secretKey'
}).unless({
    path: [
        '/users/register',
        '/users/login',
        '/users',
        '/admin',
    ]
})

module.exports = jwtAuth