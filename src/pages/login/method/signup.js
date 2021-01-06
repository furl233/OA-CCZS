export function save (birthdate) {
    this.$refs.menu.save(birthdate)
    console.log(this.birthdate)
    }

export function verifystep1(){
    if(!this.$v.repeatpassword.sameAsPassword || !this.$v.password.required || !this.$v.email.required || !this.$v.name.required){
      return false
    }else{this.complete[0]= 'green';return true}
    }
export function verifystep2(){
    if(!this.$v.native_place.required || !this.$v.Folk.required  ||  !this.$v.living_address.required ){
      return false
    }else{this.complete[1]= 'green';return true}
}
export function  verifystep3(){
    this.complete[2]= 'green';return true
}
export function  verifystep4(){
  this.complete[3]= 'green';return true
}
export function verifystep5(){
  this.complete[4]= 'green';return true
}
export function addrelable_person(){
  if(this.relable_person.length<3){
    this.relable_person.push({name:"",relationship:"",phone_number:null})
  }else{this.dialog1=true}
  
}
export function addemployments(){
  if(this.employments.length<5){
    this.employments.push({Start_stop_time:"",company:"",job:""})
  }else{this.dialog2 = true}
}
export function addeducations(){
  if(this.educations.length<3){
    this.educations.push({school:"",major:"",education_level:"",entrance_year:"",graduation_year:""})
  }else{this.dialog3 = true
        return}
}

//提交用户信息
//1）包含上传头像并且返回后端图片地址
//2）将更新过上传地址的人员资料打包上传，创建新人员用户
//将总体上传的方法放入返回头像后的异步函数中
// export function submit(){
//   this.$v.$touch();
//   if((this.nameErrors).length == 0  && (this.emailErrors).length == 0 && (this.phonenumberErrors).length == 0
//   && (this.passwordErrors).length == 0 && (this.identityErrors).length == 0){
//     this.dialog4 = false
//     this.submited = true
//     let formData = new FormData();
//     formData.append('file',this.avatar_object);
//     this.$http.post(`http://localhost:3000/upload/singlefileTopath?department=行政部&category=人员证照&subcategory=${this.name}`, 
//     formData, 
//     {
//       headers: {'Content-Type': 'multipart/form-data'},
//       _timeout:18000,
//     }).then(res=> {
//     this.avatar_url = res.data.url
//     this.$http.post('http://localhost:3000/users/register',{
//       "username":this.name,
//       "password":this.password,
//       "telephone":this.phonenumber,
//       "email":this.email,
//       "avatar_url":this.avatar_url,
//       "gender":this.gender,
//       "selfintro":this.selfintro,
//       "employments":this.employments,
//       "educations":this.educations,
//       "personal_data":{birthdate:this.birthdate,
//                       native_place:this.native_place,
//                       Folk:this.Folk,
//                       merrage:this.merrage,
//                       living_address:this.living_address},
//       "relable_person":this.relable_person,
//       "social_id":{id_Number:this.identity,id_image:this.identity_image}
//     }).then(res=> {
//       console.log(res)
//       this.submited = false
//       this.$router.push({path:'/signupcomplete'})
//     })
//     .catch(err => {
//       console.log(err)
//       this.submited = false
//     })

//   }).catch(err => {
//     console.log(err)
//     if(err.status == 0){
//       this.text = '没有连接上服务器'
//     }
//     if(err.status == 408){
//       this.text = '连接超时,可尝试再次注册，可能是当前网络不佳'
//     }
//     this.snacktext='头像上传失败',
//     this.snackbar = true
//   }) 
//   }else{this.snacktext='基本信息还是得填完'
//         this.snackbar = true
//         this.dialog4 = false
//         this.submited = false
//         }
// }

export async function submit(){
  this.$v.$touch();
  if((this.nameErrors).length == 0  && (this.emailErrors).length == 0 && (this.phonenumberErrors).length == 0
  && (this.passwordErrors).length == 0 && (this.identityErrors).length == 0){
    this.dialog4 = false
    this.submited = true
    if(this.avatar_object !== null){
      let formData = new FormData();
      formData.append('file',this.avatar_object);
      await this.$http.post(`http://localhost:3000/upload/singlefileTopath?department=行政部&category=人员证照&subcategory=${this.name}`, 
        formData, 
      {
        headers: {'Content-Type': 'multipart/form-data'},
        _timeout:18000,
      }).then(res=> {
        this.avatar_url = res.data.url
      }).catch(err => {
          console.log(err)
          if(err.status == 0){
          this.text = '没有连接上服务器'
          }
          this.snacktext='头像上传失败',
          this.snackbar = true
        }) 
    }
    await this.$http.post('http://localhost:3000/users/register',{
      "username":this.name,
      "password":this.password,
      "telephone":this.phonenumber,
      "email":this.email,
      "avatar_url":this.avatar_url,
      "gender":this.gender,
      "selfintro":this.selfintro,
      "employments":this.employments,
      "educations":this.educations,
      "personal_data":{birthdate:this.birthdate,
                      native_place:this.native_place,
                      Folk:this.Folk,
                      merrage:this.merrage,
                      living_address:this.living_address},
      "relable_person":this.relable_person,
      "social_id":{id_Number:this.identity,id_image:this.identity_image}
    }).then(res=> {
      console.log(res)
      this.submited = false
      this.$router.push({path:'/signupcomplete'})
    })
    .catch(err => {
      console.log(err)
      this.submited = false
    })
  }else{this.snacktext='基本信息还是得填完'
  this.snackbar = true
  this.dialog4 = false
  this.submited = false
  }       
}
    
  
