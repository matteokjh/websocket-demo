<template>
    <div class='send-box'>
        <bar>
            <span slot='emoji' :style="{
                backgroundImage: 'url('+emoji+')'
            }" @click='sendEmoji()'></span>
            <span slot='file' :style="{
                backgroundImage: 'url('+file+')'
            }" @click='sendFile()'></span>
            <span slot='cut' :style="{
                backgroundImage: 'url('+cut+')'
            }" @click='goCut()'></span>
            <span slot='phone' class='phone' :style="{
                backgroundImage: 'url('+phone+')'
            }" @click='goPhone()'></span>
        </bar>
        <textarea v-model='msg' placeholder="输入内容 200字以内" name="msg" rows="5"  maxlength="200" onchange="this.value=this.value.substring(0, 200)" onkeydown="this.value=this.value.substring(0, 200)" onkeyup="this.value=this.value.substring(0, 200)" spellcheck="false"></textarea>
        <p class="send" @click='sendMsg(msg)'>发送</p>
        <p class="showTips" v-show='showTips'>不能发送空白信息！</p>
    </div>
</template>

<script>

import emoji from '@/assets/emoji.png'
import phone from '@/assets/phone.png'
import file from '@/assets/file.png'
import cut from '@/assets/cut.png'

import bar from './bar'

export default {
    data(){
        return {
            msg: '',
            showTips:false,
            state: false,
            emoji: emoji,
            cut: cut,
            file: file,
            phone: phone,
        }
    },
    components: {
        bar
    },
    props: [
        'send'
    ],
    methods: {
        empty(){ //简单节流
            this.showTips = true;
            let timer;
            if(this.state === false){
                this.state = true;
                timer = setTimeout(()=>{
                    this.showTips = false;
                    this.state = false;
                },2000)
            }
        },
        sendMsg(msg){
            if(msg===''){
                this.empty();
            }else{
                let data = {
                    content: msg,
                    isMe: true
                }
                this.$emit('send',data);
                this.msg = '';
            }
        },
        sendEmoji(){
            console.warn('发送表情---未完成')
        },
        sendFile(){
            console.warn('发送文件---未完成')
        },
        goCut(){
            console.warn('截图---未完成')
        },
        goPhone(){
            console.warn('语音聊天---未完成')
        },
    },
}
</script>

<style lang="css" scope>
.bar {
    height: 30px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
}
textarea {
    width: 100%;
    height: 60%;
    outline: none;
    border: none;
    background-color: #fff;
    font-size: 16px;
    line-height: 1.5em;
    letter-spacing: 1px;
    resize: none;
    padding: 15px 45px;
    box-sizing: border-box;
}
textarea::-webkit-input-placeholder { /* WebKit browsers */
  color: #aaa;
  font-size: 16px;
  font-style: italic;
}
.send {
    padding: 10px 20px;
    border: 1px solid #eee;
    cursor: pointer;
    display: inline;
    border-radius: 3px;
    user-select: none;
    position: absolute;
    right: 40px;
    bottom: 8px;
    background-color: #eee;
}
.showTips {
    user-select: none;
    display: inline-block;
    position: absolute;
    bottom: 68px;
    right: 40px;
    padding: 10px;
    border: 1px solid #eee;
    background-color: #fff;
}
.showTips::after {
    content: '';
    position: absolute;
    bottom: -11px;
    right: 10px;
    border-top: 10px solid #eee;
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
}
.bar span{
    width: 20px;
    height: 20px;
    background-size: 100%;
    margin: 0 10px;
    cursor: pointer;
}
.bar span:first-child{
    margin-left: 45px;
}
.phone {
    position: absolute;
    right: 20px;
}
</style>