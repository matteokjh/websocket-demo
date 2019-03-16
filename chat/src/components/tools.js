/**
 * @description: 小工具
 * @param {functions} 
 * @return {functions}
 */
function throttle(fn,time){ //节流
    let state = true; //标记是否可以执行
    return function(){
        if(!state) return; //如果false就不执行
        state = false; //立即设为false
        fn.apply(this, arguments); //调用函数
        setTimeout(()=>{
            state = true; //执行完毕就设回为true
        }, time)
    }
}
function debounce(fn,time){ //防抖
    let timeout = null;
    let state = true;
    return function(){
        clearTimeout(timeout); //当用户触发高频事件时重置时间
        if(state){fn.apply(this, arguments);}
        state = false;
        timeout = setTimeout(()=>{
            state = true;
        },time); //时间自己设置
    }
}

export {
    throttle,
    debounce
}