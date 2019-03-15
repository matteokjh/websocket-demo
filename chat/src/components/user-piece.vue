<template>
    <div class='user-piece' @click='change(name)'>
        <div class="avatar" :style="{
            backgroundImage: 'url('+avatar+')'
        }"></div>
        <p class='name'>{{ name }}</p>
        <p class='msg'>{{ msg }}</p>
        <p class='time'>{{ time }}</p>
    </div>
</template>

<script>
export default {
    props: [
        'avatar',
        'time',
        'name',
        'msg',
        'changeName'
    ],
    methods: {
        change(name){
            this.$emit('changeName',name)
        }
    }
}
</script>

<style lang="css" scope>
.user-piece {
    width: calc(100% - 20px);
    height: 50px;
    background-color: #f8f8f8;
    padding: 15px 10px;
    position: relative;
    user-select: none;
}
.user-piece:hover {
    background-color: rgba(200,200,200,.4);
}
.avatar {
    width: 50px;
    height: 50px;
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    display: inline-block;
}
.time {
    position: absolute;
    top: 15px;
    right: 10px;
    font-size: 12px;
    color: #aaa;
}
.name {
    position: absolute;
    top: 15px;
    left: 65px;
}
.msg {
    position: absolute;
    bottom: 15px;
    left: 65px;
    width: 55%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 13px;
    color: #aaa;
}
</style>