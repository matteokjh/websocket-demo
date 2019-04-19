<template>
    <div class="user-login">
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
</template>

<script>
import api from '@/api/api'
export default {
    data() {
        return {   
            usrFocus: false,
            pwdFocus: false,
            pwd: "",
            usr: ""
        }
    },
    mounted(){
        if(localStorage.getItem('token')){
            this.goIndex();
        }
    },
    methods: {
        check() {
            if (event.target.value) {
                if (event.target.id == "pwd") {
                this.pwdFocus = true;
                } else if (event.target.id == "usr") {
                this.usrFocus = true;
                }
            } else {
                if (event.target.id == "pwd") {
                this.pwdFocus = false;
                } else if (event.target.id == "usr") {
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
            // 用户登录
            let pwd = this.pwd;
            let usr = this.usr;
            if (pwd == "" || usr == "") {
                alert("用户名或密码不能为空！");
            } else {
                console.warn("用户登录：", {
                username: usr
                });
                api.userLogin(usr, pwd).then(res => {
                    let data = res.data;
                    if (data.code == 200) {
                        //登录成功
                        console.log(data);
                        this.goIndex();
                    } else {
                        alert("用户名或密码错误！");
                        this.usr = "";
                        this.pwd = "";
                    }
                });
            }
        },
        goIndex(){
            this.$router.push('/');
        }
    }
}
</script>

<style lang="css" scoped>
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
  transition: all 0.3s;
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
</style>