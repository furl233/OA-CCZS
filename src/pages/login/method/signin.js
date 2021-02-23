export function login(){
        this.$v.$touch();
        if((this.usernameErrors).length == 0  && (this.passwordErrors).length == 0){
            this.isload = true
            console.log(this.isload)
            this.$http.post('http://localhost:3000/users/login',{
                "username":this.username,
                "password":this.password,
            }).then(res=> {
              this.snackbar = true
              this.snackcolor = 'green'
              this.text = '登陆成功,正在加载用户页面'
              this.isload = false
              console.log(typeof(res.data.token));  
              let token = res.data.token
              let user= res.data.user
              this.$store.commit("LOGIN_IN",{token,user});
              this.$router.push({path:'/administrator'})
            })
            .catch(err => {
              this.snackbar = true
              this.snackcolor = 'red'
              if(err.status == 0){
                this.text = '没有连接上服务器'
              }
              if(err.status == 422){
                this.text = '没有连接上服务器'
              }
              if(err.status == 401){
                this.text = '用户名或者密码不正确'
              }
              if(err.message.includes('timeout')){
                this.text = '连接超时,可尝试再次登录'
              }
              this.username = ''
              this.password = ''
              this.isload = false
            })
          }else{this.snackbar = true
            this.snackcolor = 'red'
            this.text = '名字和密码不能为空'}
}
