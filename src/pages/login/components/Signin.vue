<template>
  <v-container>
    <v-layout row warp justify-center>
      <v-flex xs12 md6 >
        <v-card class="mx-lg-auto mx-auto rounded-lg"  elevation="20"  :loading="isload" >
          <v-app-bar class="mb-5" color="indigo" dark prominent scroll-target="#scrolling-techniques-4">
            <v-toolbar-title><v-icon left dark>mdi-login-variant</v-icon>Login</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-app-bar>
          <v-text-field label="账号" 
            v-model="username"
            outlined class="px-5" 
            @input="$v.username.$touch()"
            @blur="$v.username.$touch()"
            required  :error-messages="usernameErrors"
            clearable 
            hint="Required"
            :rules="rules.name" 
            prepend-icon="mdi-account"
            ></v-text-field>
            <v-text-field label="密码" 
            v-model="password"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
            required  :error-messages="passwordErrors"
            outlined class="px-5" 
            clearable 
            :rules="rules.name" 
            hint="Required"
            prepend-icon="mdi-onepassword"
            :type="show2 ? 'text' : 'password'"
            @click:append="show2 = !show2"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            ></v-text-field>
            <v-card-actions>
              <v-btn block depressed large 
              elevation="10" 
              class="indigo white--text" 
              @click.stop="login" :loading="isload"
              :disabled='isload' 
              >登录</v-btn>
            </v-card-actions>
            <v-spacer></v-spacer>
            <v-card-text block class="grey--text text-center">
              <router-link to="/forgot">忘记密码了?</router-link>
            </v-card-text>
            <v-card-actions>
              <v-btn block depressed large 
                elevation="10" 
                class="indigo white--text" 
                @click="gosignup" 
                ><v-icon left dark>mdi-account-arrow-left-outline</v-icon>新用户注册
              </v-btn>
            </v-card-actions>
        </v-card>
        <v-snackbar v-model="snackbar">
          {{ text }}
          <template v-slot:action="{ attrs }">
            <v-btn :color="snackcolor" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
          </template>
        </v-snackbar>
      </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required} from "vuelidate/lib/validators";
import { login } from '../method/signin.js'
export default {
  mixins: [validationMixin],
  validations: {
    username: { required},
    password: { required}
  },
  data(){
    return{
      username:"",
      password:"",
      show1: true,
      show2: false,
      isload:false,
      snackbar:false,
      snackcolor:"red",
      text:"",
      rules: {
          name: [val => (val || '').length > 0 || 'This field is required'],
        },
    }
  },
  methods:{
    login,
    gosignup(){
      this.$router.push({path:'/signup'})
    }
  },
  computed:{
    usernameErrors() {
    const errors = []
    if (!this.$v.username.$dirty) return errors 
    !this.$v.username.required && errors.push('必须输入名字不不能为空.')
    return errors
    },
    passwordErrors() {
    const errors = []
    if (!this.$v.password.$dirty) return errors 
    !this.$v.password.required && errors.push('必须输入密码不不能为空.')
    return errors
    }
  }
}
</script>
