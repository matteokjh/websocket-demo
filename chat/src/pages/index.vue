<template>
  <div v-if="hasToken" class="index" @click='()=>setting=false'>
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
      <div slot="setting" class="setting" @click.stop='()=>setting=true'></div>
      <div slot="s-wrapper" v-show='setting' class="s-wrapper">
          <div class='idea'>意见反馈</div>
          <div class='logout' @click='logout()'>退出登录</div>
      </div>
    </left-bar>
    <!-- 中 -->
    <user-list :index="index" :chatList="chatList" :userList="userList" @changeName="changeName"></user-list>
    <!-- 右 -->
    <div class="right">
      <div v-show="index === 0 && chatChosen != ''" class="chat">
        <div class="title">
          <p>{{ name }}</p>
        </div>
        <chat-detail :chatDetail="chatDetail"></chat-detail>
        <send-box @send="send"></send-box>
      </div>

      <div class="contact" v-show="index === 1 && userChosen != ''">123</div>

    </div>
  </div>
</template>

<script>
import $ from "jquery";
import api from "@/api/api";
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
          name: "Issac",
          msg: "测试测issac",
          time: "3:51"
        },
        {
          avatar: require("../assets/you.png"),
          name: "milia",
          msg: "测试milia",
          time: "4:51"
        },
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
        }
      ],
      name: "", //当前聊天框
      hasToken: false,
      chatChosen: "",
      userChosen: "",
      setting: false
    };
  },
  components: {
    "left-bar": leftBar,
    "user-list": userList,
    "chat-detail": chatDetail,
    "send-box": sendBox
  },
  methods: {
    changeIndex(e) {
      this.index = e;
    },
    changeName(e) { // 点击列表请求聊天详情
      this.name = e.name;
      this.chatChosen = e;
    },
    send(msg) {
      msg.avatar = meAvatar;
      this.chatDetail.push(msg);
      var chatScroll = document.querySelector(".chat-detail");
      $(".chat-detail").animate(
        { scrollTop: $(".chat-detail")[0].scrollHeight },
        300
      ); //置底
      api.sendMsg(msg);
    },
    getDetail() {
      this.$nextTick(() => {
        this.name = this.chatList[0].name;
        let t = $(".chat-detail")[0].scrollHeight;
        $(".chat-detail").scrollTop(t); //置底
      });
    },
    logout(){
        localStorage.removeItem('token');
        this.$router.push('/login')
    }
  },
  mounted() {
      
    // 更新token，不需要设置什么，拦截器帮忙做了
    if (localStorage.getItem("token")) {
      api
        .getToken()
        .then(res => {
          this.hasToken = true;
          // 获取聊天列表
          api.getChatList().then(chatList => {
            console.log(chatList);
          });
        })
        .catch(err => {
          console.warn("token过期");
          this.$router.push("/login");
        });
    } else {
      // token 为空
      console.warn("token为空");
      this.$router.push("/login");
    }
  }
};
</script>

<style>
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
.s-wrapper {
    position: absolute;
    bottom: 10px;
    left: 60px;
    width: 150px;
    background-color: rgb(50,50,50);
}
.s-wrapper > div {
    text-align: center;
    color: #eee;
    background-color: rgb(30,30,30);
    padding: 15px 10px;
    cursor: pointer;
}
.s-wrapper > div:hover {
    background-color: rgb(50,50,50);
}
.right {
  width: 900px;
  height: 100vh;
  background-image: url("../assets/saan.png");
  background-size: 60%;
  background-position: center;
  background-repeat: no-repeat;
}

.chat {
  width: 900px;
  height: 100vh;
  background-image: url("../assets/saan.png");
  background-size: 80%;
  background-position: center;
  background-repeat: no-repeat;
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
