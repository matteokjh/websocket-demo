<template>
  <div v-if='!hasToken' class="login">
	<h1>{{ msg }}</h1>
	<h2>管理员请登录</h2>
	<div class="wrapper">
		<input v-model='usr' class='username' type="text" autocomplete="off" spellcheck="false">
		<input v-model='pwd' class='pwd' type="password" autocomplete="off" spellcheck="false">
		<div class="submit" @click='submit'>Submit</div>
	</div>
  </div>
  <div v-else>
      <div class="header">
          <h1>Casterの聊天室后台管理系统</h1>
      </div>
      <div class="logout" @click='logout'>登出</div>
  </div>
</template>

<script>
var origin = 'http://localhost:3000'
export default {
  name: 'HelloWorld',
  data () {
	return {
		msg: 'Casterの聊天室后台管理系统',
		usr: '',
        pwd: '',
        hasToken: false
	}
  },
  mounted(){
      let token = localStorage.getItem('token');
      if(token){
          this.hasToken = true;
      }
  },
  methods: {
      logout(){
          localStorage.removeItem('token');
          location.reload();
      },
	  submit(){
		  let usr = this.usr;
		  let pwd = this.pwd;
		  if(usr == '' || pwd == ''){
			  alert('用户名或密码不能为空！');
		  }else{
			  if(usr == 'root' && pwd == 'root'){
				  this.$http.get(`${origin}/admin`).then(res=>{
                      localStorage.setItem('token',res.data.token)
                      console.warn('登录成功！')
                      location.reload();
                  })
			  }else{
			  alert('用户名或密码错误！');
				  console.warn('用户名或密码错误！')
			  }
		  }
	  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
	padding-top: 60px;
}
h1 {
	margin-bottom: 20px;
	font-size: 40px;
}
h1, h2 {
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
	content: '用户名：';
	position: absolute;
	transform: translate(-138px,-34px);
}
.wrapper::after {
	content: '密码：';
	position: absolute;
	transform: translate(-130px,30px);
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
