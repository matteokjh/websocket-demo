<template>
    <div class="index">
        <!-- 左 -->
        <left-bar>
            <div slot='avatar' class='me-avatar'></div>
            <div slot='chatList' class='chatList' @click='changeIndex(0)' 
                :style="{
                    backgroundImage: index === 0 ? 'url('+wechat2+')': 'url('+wechat1+')'
                }"
            ></div>
            <div slot='friends' class='friends' @click='changeIndex(1)'
                :style="{
                    backgroundImage: index === 1 ? 'url('+contact2+')': 'url('+contact1+')'
                }"
            ></div>
            <div slot='collection' class='collection' @click='changeIndex(2)'
                :style="{
                    backgroundImage: index === 2 ? 'url('+collection2+')': 'url('+collection1+')',
                    backgroundSize: index === 2 ? '100%' : '92%'
                }"
            ></div>
            <div slot='setting' class='setting'></div>
        </left-bar>
        <!-- 中 -->
        <user-list
            :index='index'
            :chatList='chatList'
            @changeName="changeName"
        ></user-list>
        <!-- 右 -->
        <div class="chat">
            <div class="title">
                <p>{{ name }}</p>
            </div>
            <chat-detail
                :chatDetail='chatDetail'
            ></chat-detail>
            <send-box></send-box>
        </div>
    </div>
</template>

<script>
import leftBar from '@/components/left-bar'
import userList from '@/components/user-list'
import chatDetail from '@/components/chat-detail'
import sendBox from '@/components/send-box'
var wechat1 = require('../assets/wechat1.png');
var wechat2 = require('../assets/wechat2.png');
var contact1 = require('../assets/contact1.png');
var contact2 = require('../assets/contact2.png');
var collection1 = require('../assets/cube1.png');
var collection2 = require('../assets/cube2.png');
export default {
    data(){
        return {
            wechat1: wechat1,
            wechat2: wechat2,
            contact1: contact1,
            contact2: contact2,
            collection1: collection1,
            collection2: collection2,
            index: 0,
            chatList: [
                {
                    avatar: require('../assets/you.png'),
                    name: '尼古拉斯·赵四',
                    msg: '测试测试测试123456123123123',
                    time: '3:51',
                },
                {
                    avatar: require('../assets/you.png'),
                    name: 'sulpures1',
                    msg: 'asdfasdf',
                    time: '4:51',
                },
                {
                    avatar: require('../assets/you.png'),
                    name: 'sulpures2',
                    msg: '134634745143',
                    time: '5:51',
                },
                {
                    avatar: require('../assets/you.png'),
                    name: 'sulpures3',
                    msg: '99999999999999',
                    time: '6:51',
                },
                {
                    avatar: require('../assets/you.png'),
                    name: 'sulpures4',
                    msg: 'zcvnnnnnnnnnn',
                    time: '7:51',
                },
                {
                    avatar: require('../assets/you.png'),
                    name: 'sulpures',
                    msg: '测试测试测试123456123123123',
                    time: '3:51',
                },
                {
                    avatar: require('../assets/you.png'),
                    name: 'sulpures1',
                    msg: 'asdfasdf',
                    time: '4:51',
                },
                {
                    avatar: require('../assets/you.png'),
                    name: 'sulpures2',
                    msg: '134634745143',
                    time: '5:51',
                },
                {
                    avatar: require('../assets/you.png'),
                    name: 'sulpures3',
                    msg: '99999999999999',
                    time: '6:51',
                },
                {
                    avatar: require('../assets/you.png'),
                    name: 'sulpures4',
                    msg: 'zcvnnnnnnnnnn',
                    time: '7:51',
                },
            ],
            chatDetail: [
                {
                    name: 'me',
                    avatar: require('../assets/me.png'),
                    content: 'say something',
                    isMe: true
                },
                {
                    name: 'sulpures',
                    avatar: require('../assets/you.png'),
                    content: 'ok',
                    isMe: false
                },
                {
                    name: 'me',
                    avatar: require('../assets/me.png'),
                    content: 'go on',
                    isMe: true
                },
                {
                    name: 'me',
                    avatar: require('../assets/me.png'),
                    content: 'say something',
                    isMe: true
                },
                {
                    name: 'sulpures',
                    avatar: require('../assets/you.png'),
                    content: 'ok',
                    isMe: false
                },
                {
                    name: 'me',
                    avatar: require('../assets/me.png'),
                    content: 'go on',
                    isMe: true
                },
            ],
            name: '', //当前聊天框
        }
    },
    components: {
        'left-bar': leftBar,
        'user-list': userList,
        'chat-detail': chatDetail,
        'send-box': sendBox,
    },
    methods: {
        changeIndex(e){
            this.index = e;
        },
        changeName(e){
            this.name = e;
        }
    },
    mounted(){
        this.name = this.chatList[0].name
    }
}
</script>

<style>
.index {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    background-color: rgb(50,50,50);
    min-width: 1200px;
}
.user-list {
    width: 250px;
    height: 100vh;
    background-color: rgb(255,255,255);
    border-right: 5px solid #eee;
}
.chat {
    width: 900px;
    height: 100vh;
    background-color: rgb(255,255,255);
    box-shadow: 0px 0px 2px 1px #d7d7d7;
}
.chat-detail {
    width: 100%;
    height: 60%;
    box-sizing: border-box;
    overflow: auto;
}
.send-box {
    border-top: 5px solid #eee;
    height: 30%;
    background-color: #fff;
    position: relative;
}

.chatList {
    width: 25px;
    height: 25px;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    position: relative;
    background-image: url('../assets/wechat1.png');
    background-size: 100%;
    cursor: pointer;
}

.friends {
    width: 25px;
    height: 25px;
    left: 50%;
    top: 30px;
    transform: translateX(-50%);
    position: relative;
    background-image: url('../assets/wechat1.png');
    background-size: 100%;
    cursor: pointer;
}

.collection {
    width: 25px;
    height: 25px;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    position: relative;
    background-image: url('../assets/wechat1.png');
    background-size: 90%;
    cursor: pointer;
    background-repeat: no-repeat;
}

.setting {
    width: 25px;
    height: 25px;
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    background-image: url('../assets/menu1.png');
    background-size: 100%;
    cursor: pointer;
}
.setting:hover {
    background-image: url('../assets/menu2.png');
}
.me-avatar {
    width: 40px; 
    height: 40px;
    margin: 25px auto;
    cursor: pointer;
    background-size: 100%;
    background-image: url('../assets/me.png')
}
.left-bar {
    width: 60px;
    height: 100vh;
    position: relative;
    background-color: rgb(50,50,50);
}
</style>
