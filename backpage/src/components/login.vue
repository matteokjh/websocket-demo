<template>
  <div v-if="!hasToken" class="login">
    <h1>{{ msg }}</h1>
    <h2>管理员请登录</h2>
    <div class="wrapper">
      <input v-model="usr" type="text" autocomplete="off" spellcheck="false">
      <input v-model="pwd" type="password" autocomplete="off" spellcheck="false">
      <div class="submit" @click="submit">Submit</div>
    </div>
  </div>
  <div v-else class="index">
    <div class="header">
      <h1>Casterの聊天室后台管理系统</h1>
    </div>
    <div class="logout" @click="logout">登出</div>
    <div class="main">
      <div class="list">
        <p class="order">序号</p>
        <p class="_id">_id</p>
        <p class="usr">用户名</p>
        <p class="pwd">密码</p>
        <p class="email">邮箱</p>
        <p class="salt">salt</p>
        <p class="dele"></p>
      </div>
      <div class="list" :key="idx" v-for="(e,idx) in userList">
        <p class="order">{{ idx }}</p>
        <p class="_id">{{ e._id }}</p>
        <p class="usr">{{ e.username }}</p>
        <p class="pwd">{{ e.password }}</p>
        <p class="email">{{ e.email }}</p>
        <p class="salt">{{ e.salt }}</p>
        <p class="del" @click='del(e,idx)'></p>
      </div>
    </div>
  </div>
</template>

<script>
var origin = "http://localhost:3000";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Casterの聊天室后台管理系统",
      usr: "",
      pwd: "",
      hasToken: false,
      userList: []
    };
  },
  mounted() {
    let token = localStorage.getItem("token");
    if (token) {
      this.hasToken = true;
      this.$http.get(`${origin}/users`).then(res => {
        let arr = res.data.data;
        this.userList = arr;
      });
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      location.reload();
    },
    submit() {
      let usr = this.usr;
      let pwd = this.pwd;
      if (usr == "" || pwd == "") {
        alert("用户名或密码不能为空！");
      } else {
        if (usr == "root" && pwd == "root") {
          this.$http.get(`${origin}/admin`).then(res => {
            localStorage.setItem("token", res.data.token);
            console.warn("登录成功！");
            location.reload();
          });
        } else {
          alert("用户名或密码错误！");
          console.warn("用户名或密码错误！");
        }
      }
	},
	del(e,idx){
		console.warn('即将删除：',e)
		let ans = confirm('确定要删除：'+e.username+'吗？');
		if(ans){
			this.$http.delete(`${origin}/admin/deleteUser`,{
				data: { // delete传参问题
					token:localStorage.getItem('token'),
					_id: e._id
				}
			}).then(res=>{
				this.userList.splice(idx,1);
				console.warn('删除成功！',res)
			})
		}else{
			console.warn('不删除')
		}
	}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  display: inline-block;
}
.list {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #000;
  height: 50px;
}
.order {
  width: 5%;
}
._id {
  width: 18%;
}
.usr {
  width: 18%;
}
.pwd {
  width: 18%;
}
.email {
  width: 18%;
}
.salt {
  width: 18%;
}
.dele {
  width: 5%;
}
.del {
  width: 5%;
  background-image: url('../assets/delete.png');
  background-size: 40%;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
}
.list > p {
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border-right: 1px solid #000;
  height: 100%;
  line-height: 50px;
  box-sizing: border-box;
  padding: 0 10px;
}
.logout {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #6e6eff;
  width: 80px;
  height: 40px;
  color: #fff;
  line-height: 40px;
  cursor: pointer;
}
.header {
  text-align: left;
  padding-left: 30px;
  width: 100%;
  height: 80px;
  line-height: 80px;
  border-bottom: 2px solid #ffa8d8;
}
.main {
  background-color: #fff;
  width: 100%;
  height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
}
.login {
  padding-top: 60px;
}
h1 {
  margin-bottom: 20px;
  font-size: 40px;
}
h1,
h2 {
  font-weight: normal;
  color: #f38181;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.wrapper {
  background-color: #feffe5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 300px;
  margin: 40px auto;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 0 5% 5% 7%;
  box-shadow: 1px 0 3px 1px #f6de69;
  position: relative;
}
input {
  width: 200px;
  height: 40px;
  margin: 10px 0;
  padding-left: 5px;
}
.wrapper::before {
  content: "用户名：";
  position: absolute;
  transform: translate(-138px, -34px);
}
.wrapper::after {
  content: "密码：";
  position: absolute;
  transform: translate(-130px, 30px);
}
.submit {
  width: 100px;
  height: 50px;
  position: absolute;
  bottom: 30px;
  background-color: #6e6eff;
  line-height: 50px;
  cursor: pointer;
  color: #fff;
}
</style>
