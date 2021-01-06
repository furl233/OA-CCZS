<template>
  <v-container>
    <v-layout justify-center  >
      <v-flex xs12 md6 >
        <v-card class="pa-2" elevation="20">
          <v-card-title class="justify-center display-1 mb-2">设置新密码</v-card-title>
          <div class="overline">{{ status }}</div>
          <div class="error--text mt-2 mb-4">{{ error }}</div>
            <a v-if="error" href="/">Back to Sign In</a>
            <v-text-field
            v-model="newPassword"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="showPassword ? 'text' : 'password'"
            :error="errorNewPassword"
            :error-messages="errorNewPasswordMessage"
            name="password"
            label="New Password"
            outlined
            class="mt-4"
            @change="resetErrors"
            @keyup.enter="confirmPasswordReset"
            @click:append="showPassword = !showPassword"
            ></v-text-field>
            <v-btn
            :loading="isLoading"
            block depressed x-large
            color="primary"
            @click="confirmPasswordReset"
            >设置并登录</v-btn>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
/*
|---------------------------------------------------------------------
| Reset Page Component
|---------------------------------------------------------------------
|
| Page Form to insert new password and proceed to sign in
|
*/
export default {
  data() {
    return {
      isLoading: false,

      showNewPassword: true,
      newPassword: "",

      // form error
      errorNewPassword: false,
      errorNewPasswordMessage: "",

      // show password field
      showPassword: false,

      status: "设置与原本不同的密码",
      error: null,

      // input rules
      rules: {
        required: (value) => (value && Boolean(value)) || "Required",
      },
    };
  },
  methods: {
    confirmPasswordReset() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    
    },
    resetErrors() {
      this.errorNewPassword = false;
      this.errorNewPasswordMessage = "";
    },
  },
};
</script>
