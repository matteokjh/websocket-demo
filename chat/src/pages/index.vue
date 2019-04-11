<template>
  <div class="user-login" v-if="!hasToken">
    <h1>Casterの聊天室</h1>
    <h2>用户登录</h2>
    <div class="login-box">
      <div>
        <p :class="{
				'focus': usrFocus
			}">username</p>
        <input
          id="usr"
          autocomplete="off"
          @focus="focus(0)"
          @blur="check"
          v-model="usr"
          type="text"
          spellcheck="false"
        >
      </div>
      <div>
        <p :class="{
				'focus': pwdFocus
			}">password</p>
        <input
          id="pwd"
          autocomplete="new-password"
          @focus="focus(1)"
          @blur="check"
          v-model="pwd"
          type="password"
          spellcheck="false"
        >
      </div>
      <p class="login" @click="login">登录</p>
    </div>
  </div>
  <div v-else-if="hasToken" class="index">
    <!-- 左 -->
    <left-bar>
      <div slot="avatar" class="me-avatar"></div>
      <div
        slot="chatList"
        class="chatList"
        @click="changeIndex(0)"
        :style="{
			backgroundImage: index === 0 ? 'url('+wechat2+')': 'url('+wechat1+')'
		}"
      ></div>
      <div
        slot="friends"
        class="friends"
        @click="changeIndex(1)"
        :style="{
					backgroundImage: index === 1 ? 'url('+contact2+')': 'url('+contact1+')'
				}"
      ></div>
      <div
        slot="collection"
        class="collection"
        @click="changeIndex(2)"
        :style="{
					backgroundImage: index === 2 ? 'url('+collection2+')': 'url('+collection1+')',
					backgroundSize: index === 2 ? '100%' : '92%'
				}"
      ></div>
      <div slot="setting" class="setting"></div>
    </left-bar>
    <!-- 中 -->
    <user-list :index="index" :chatList="chatList" :userList="userList" @changeName="changeName"></user-list>
    <!-- 右 -->
    <div v-show="index === 0" class="chat">
      <div class="title">
        <p>{{ name }}</p>
      </div>
      <chat-detail :chatDetail="chatDetail"></chat-detail>
      <send-box @send="send"></send-box>
    </div>

    <div class="contact" v-show="index === 1">123</div>
  </div>
</template>

<script>
import $ from "jquery";
import leftBar from "@/components/left-bar";
import userList from "@/components/user-list";
import chatDetail from "@/components/chat-detail";
import sendBox from "@/components/send-box";
var wechat1 = require("../assets/wechat1.png");
var wechat2 = require("../assets/wechat2.png");
var contact1 = require("../assets/contact1.png");
var contact2 = require("../assets/contact2.png");
var collection1 = require("../assets/cube1.png");
var collection2 = require("../assets/cube2.png");
var meAvatar = require("../assets/me.png");
var youAvatar = require("../assets/you.png");

export default {
  data() {
    return {
      wechat1: wechat1,
      wechat2: wechat2,
      contact1: contact1,
      contact2: contact2,
      collection1: collection1,
      collection2: collection2,
      index: 0,
      userList: [
        {
          avatar: require("../assets/you.png"),
          name: "尼古拉斯·赵四"
        },
        {
          avatar: require("../assets/you.png"),
          name: "尼古拉斯·赵四"
        },
        {
          avatar: require("../assets/you.png"),
          name: "尼古拉斯·赵四"
        },
        {
          avatar: require("../assets/you.png"),
          name: "尼古拉斯·赵四"
        },
        {
          avatar: require("../assets/you.png"),
          name: "尼古拉斯·赵四"
        },
        {
          avatar: require("../assets/you.png"),
          name: "尼古拉斯·赵四"
        },
        {
          avatar: require("../assets/you.png"),
          name: "尼古拉斯·赵四"
        },
        {
          avatar: require("../assets/you.png"),
          name: "尼古拉斯·赵四"
        },
        {
          avatar: require("../assets/you.png"),
          name: "尼古拉斯·赵四"
        },
        {
          avatar: require("../assets/you.png"),
          name: "尼古拉斯·赵四"
        },
        {
          avatar: require("../assets/you.png"),
          name: "尼古拉斯·赵四"
        },
        {
          avatar: require("../assets/you.png"),
          name: "尼古拉斯·赵四"
        }
      ],
      chatList: [
        {
          avatar: require("../assets/you.png"),
          name: "尼古拉斯·赵四",
          msg: "测试测试测试123456123123123",
          time: "3:51"
        },
        {
          avatar: require("../assets/you.png"),
          name: "sulpures1",
          msg: "asdfasdf",
          time: "4:51"
        },
        {
          avatar: require("../assets/you.png"),
          name: "sulpures2",
          msg: "134634745143",
          time: "5:51"
        },
        {
          avatar: require("../assets/you.png"),
          name: "sulpures3",
          msg: "99999999999999",
          time: "6:51"
        },
        {
          avatar: require("../assets/you.png"),
          name: "sulpures4",
          msg: "zcvnnnnnnnnnn",
          time: "7:51"
        },
        {
          avatar: require("../assets/you.png"),
          name: "sulpures",
          msg: "测试测试测试123456123123123",
          time: "3:51"
        },
        {
          avatar: require("../assets/you.png"),
          name: "sulpures1",
          msg: "asdfasdf",
          time: "4:51"
        },
        {
          avatar: require("../assets/you.png"),
          name: "sulpures2",
          msg: "134634745143",
          time: "5:51"
        },
        {
          avatar: require("../assets/you.png"),
          name: "sulpures3",
          msg: "99999999999999",
          time: "6:51"
        },
        {
          avatar: require("../assets/you.png"),
          name: "sulpures4",
          msg: "zcvnnnnnnnnnn",
          time: "7:51"
        }
      ],
      chatDetail: [
        {
          name: "me",
          avatar: meAvatar,
          content: "say something",
          isMe: true
        },
        {
          name: "sulpures",
          avatar: youAvatar,
          content: "ok",
          isMe: false
        },
        {
          name: "me",
          avatar: meAvatar,
          content: "go on",
          isMe: true
        },
        {
          name: "me",
          avatar: meAvatar,
          content: "say something",
          isMe: true
        },
        {
          name: "sulpures",
          avatar: youAvatar,
          content: "ok",
          isMe: false
        },
        {
          name: "me",
          avatar: meAvatar,
          content: "go on",
          isMe: true
        },
        {
          name: "sulpures",
          avatar: youAvatar,
          content:
            "尽量克服静安寺覅欧健儿佛法加强我放假啊佛圣诞节佛问佛农夫酒啊就给山东分局干撒放假啊送发觉尽量克服静安寺覅欧健儿佛法加强我放假啊佛圣诞节佛问佛农夫酒啊就给山东分局干撒放假啊送发觉尽量克服静安寺覅欧健儿佛法加强我放假啊佛圣诞节佛问佛农夫酒啊就给山东分局干撒放假啊送发觉尽量克服静安寺覅欧健儿佛法加强我放假啊佛圣诞节佛问佛农夫酒啊就给山东分局干撒放假啊送发觉尽量克服静安寺覅欧健儿佛法加强我放假啊佛圣诞节佛问佛农夫酒啊就给山东分局干撒放假啊送发觉",
          isMe: false
        },
        {
          name: "me",
          avatar: meAvatar,
          content:
            "尽量克服静安寺覅欧健儿佛法加强我放假啊佛圣诞节佛问佛农夫酒啊就给山东分局干撒放假啊送发觉尽量克服静安寺覅欧健儿佛法加强我放假啊佛圣诞节佛问佛农夫酒啊就给山东分局干撒放假啊送发觉尽量克服静安寺覅欧健儿佛法加强我放假啊佛圣诞节佛问佛农夫酒啊就给山东分局干撒放假啊送发觉尽量克服静安寺覅欧健儿佛法加强我放假啊佛圣诞节佛问佛农夫酒啊就给山东分局干撒放假啊送发觉尽量克服静安寺覅欧健儿佛法加强我放假啊佛圣诞节佛问佛农夫酒啊就给山东分局干撒放假啊送发觉",
          isMe: true
        }
      ],
      name: "", //当前聊天框
      hasToken: false,
      usrFocus: false,
      pwdFocus: false,
      pwd: "",
      usr: ""
    };
  },
  components: {
    "left-bar": leftBar,
    "user-list": userList,
    "chat-detail": chatDetail,
    "send-box": sendBox
  },
  methods: {
    check() {
      if(event.target.value){
		  if(event.target.id == 'pwd'){
			  this.pwdFocus = true;
		  }else if(event.target.id == 'usr'){
			  this.usrFocus = true;
		  }
	  }else{
		  if(event.target.id == 'pwd'){
			  this.pwdFocus = false;
		  }else if(event.target.id == 'usr'){
			  this.usrFocus = false;
		  }
	  }
    //   this.usr == "" ? (this.usrFocus = false) : "";
    //   this.pwd == "" ? (this.pwdFocus = false) : "";
    },
    focus(n) {
      if (n == 0) {
        this.usrFocus = true;
      } else if (n == 1) {
        // event.target.removeAttribute('readonly')
        this.pwdFocus = true;
      }
    },
    login() {
      console.warn("登录");
    },
    changeIndex(e) {
      this.index = e;
    },
    changeName(e) {
      this.name = e.name;
    },
    send(msg) {
      msg.avatar = meAvatar;
      this.chatDetail.push(msg);
      var chatScroll = document.querySelector(".chat-detail");
      $(".chat-detail").animate(
        { scrollTop: $(".chat-detail")[0].scrollHeight },
        300
      ); //置底
      console.log(WebSocket);
    }
  },
  mounted() {
    if (this.hasToken) {
      // 登录了
      this.name = this.chatList[0].name;
      $(".chat-detail").scrollTop($(".chat-detail")[0].scrollHeight); //置底
    } else {
      //未登录
      console.log(document.cookie);
    }
  }
};
</script>

<style>
.user-login {
  user-select: none;
  text-align: center;
  background-color: #eee;
  width: 100vw;
  height: 100vh;
}
.user-login > h1 {
  padding-top: 50px;
  margin-bottom: 40px;
}
.login-box {
  width: 500px;
  height: 200px;
  margin: 30px auto;
  padding-top: 50px;
  background-color: #fff;
}
.login-box > div {
  display: block;
  position: relative;
  width: 200px;
  margin: 0 auto;
}
.login-box > div input {
  display: block;
  position: relative;
  height: 40px;
  padding-left: 20px;
  margin: 0 auto 30px auto;
  border: none;
  border-radius: 20px;
  outline: none;
  box-sizing: border-box;
  border: 1px solid #7575ff;
}
.login-box > div p {
  color: #7575ff;
  z-index: 2;
  pointer-events: none;
  position: absolute;
  font-size: 16px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.5s;
}
.login-box > div p.focus {
  font-size: 12px;
  transform: translate(-130%, -200%);
  background-color: #fff;
  padding: 0 3px;
}
.login {
  display: inline;
  padding: 10px 20px;
  background-color: #7d7dff;
  color: #fff;
  cursor: pointer;
}
.index {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  background-color: rgb(50, 50, 50);
  min-width: 1200px;
}
.user-list {
  width: 250px;
  height: 100vh;
  background-color: rgb(255, 255, 255);
  border-right: 5px solid #eee;
}
.contact {
  width: 900px;
  height: 100vh;
  background-color: rgb(255, 255, 255);
}
.chat {
  width: 900px;
  height: 100vh;
  background-color: rgb(255, 255, 255);
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
  background-image: url("../assets/wechat1.png");
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
  background-image: url("../assets/wechat1.png");
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
  background-image: url("../assets/wechat1.png");
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
  background-image: url("../assets/menu1.png");
  background-size: 100%;
  cursor: pointer;
}
.setting:hover {
  background-image: url("../assets/menu2.png");
}
.me-avatar {
  width: 40px;
  height: 40px;
  margin: 25px auto;
  cursor: pointer;
  background-size: 100%;
  background-image: url("../assets/me.png");
}
.left-bar {
  width: 60px;
  height: 100vh;
  position: relative;
  background-color: rgb(50, 50, 50);
}
</style>
