var crypto = require('crypto');
/**
 * @description: 生成随机字符串
 * @param {} 
 * @return {string}
 */
function getSalt(...args){
    let arr = [
        '0','1','2','3','4','5','6','7','8','9',
        'a','b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
        'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
        'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        '-','.','~','!','@','#','$','%','^','&','*','(',')','_',':','<','>','?'
    ];
    let str = '';
    let len = args.length; // 传入参数的长度
    if(len == 1){
        for(let i=0;i<args[0];i++){
            str = str.concat(arr[Math.round(Math.random()*(arr.length-1))])
        }
    }else if(len == 2 && args[0] <= args[1]){
        let pos = Math.round(Math.random()*(args[1]-args[0])) + args[0];
        for(let i=0;i<pos;i++){
            str = str.concat(arr[Math.round(Math.random()*(arr.length-1))])
        }
    }else{
        console.log('盐值生成失败')
        return false;
    }
    return str;
}

function getHash(str,salt){
    // let md5 = crypto.createHash('md5');
    // let password = md5.update(str.concat(salt)).digest('hex');
    // return password
    let pwd = crypto.pbkdf2Sync(
        str, //密码
        salt, //盐
        4096, //迭代次数
        256, //长度
        'sha256' //哈希算法
    ).toString('hex');
    return pwd
}

module.exports = {
    getSalt,
    getHash
}


