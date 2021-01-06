<template>
  <v-container>
    <v-layout justify-center  >
      <v-flex xs12 md6 >
        <v-card class="pa-4" elevation="20">
          <h1 block class="text-center">忘记密码?</h1>
          <div class="mb-6 overline text-center">输入您的帐户电子邮件地址，我们将向您发送一个链接以重置密码</div>
          <v-text-field label="E-mail" 
          outlined v-model="email"
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
          required  :error-messages="emailErrors"
          ></v-text-field>
          <v-btn :loading="isLoading" :disabled="disabled" block depressed
                  x-large color="indigo white--text" @click.stop="resend"
          >发送邮件{{ seconds }}</v-btn>
        </v-card>
        <p block class="text-center ma-5" >
          <router-link to="/signin" color="white">返回登陆?</router-link>
        </p>
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
import { required,email} from "vuelidate/lib/validators";
const TIMEOUT = 10
export default {
  mixins: [validationMixin],
  validations: {
    email: { required, email },
  },
  data() {
    return {
      text:'',
      snackbar:false,
      snackcolor:'green',
      email:'',
      isLoading: false,
      disabled: false,
      times: 0,
      resendInterval: null,
      secondsToEnable: TIMEOUT,
      seconds: ''
    }
  },
  computed:{
    emailErrors() {
    const errors = []
    if (!this.$v.email.$dirty) return errors 
    !this.$v.email.email && errors.push('邮箱必须符合邮箱地址格式')
    !this.$v.email.required && errors.push('必须输入邮箱不不能为空.')
    return errors
    }
  },
  beforeDestroy() {
    clearInterval(this.resendInterval)
  },
  methods: {
    async resend() {
      this.$v.$touch()
      if((this.emailErrors).length == 0){this.setTimer()}
    }, 
    setTimer() {
      this.snackbar = true
      this.text = "邮箱已经发送，请查收"
      this.disabled = true
      this.times++
      this.secondsToEnable = TIMEOUT * this.times

      this.resendInterval = setInterval(() => {
        if (this.secondsToEnable === 0) {
          clearInterval(this.resendInterval)
          this.seconds = ''
          this.disabled = false
          this.snackbar = false
        } else {
          this.seconds = `( ${this.secondsToEnable} )`
          this.secondsToEnable--
        }
      }, 1000)
    }
  }
}
</script>

<style scoped>
  a {
    color:white
}
</style>


