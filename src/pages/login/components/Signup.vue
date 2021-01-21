<template>
  <v-container>
    <v-layout row warp justify-center>
      <v-flex xs12 md6>
        <v-card>
          <v-toolbar flat color="indigo">
            <v-icon class="white--text">mdi-account</v-icon>
            <v-toolbar-title class="font-weight-bold white--text">
              Register</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-btn text color="white" class="ma-2 white--text font-weight-bold" @click="tosignin">
              回到登录页面
              <v-icon right dark>mdi-arrow-right-bold-outline</v-icon>
            </v-btn>
          </v-toolbar>
            <v-stepper v-model="el" vertical non-linear>
            <v-stepper-step
              :complete="el > 1"
              step="1"
              :rules="[verifystep1]"
              :color="complete[0]"
              edit-icon="mdi-check"
              editable
            >
              输入姓名,设置密码
              <small>作为用户登录和找回密码的必要信息</small>
            </v-stepper-step>
            <v-stepper-content step="1">
              <v-card elevation="4" outlined class="mb-6 pa-3" fill-height>
                <v-text-field
                  light
                  v-model="name"
                  :error-messages="nameErrors"
                  :counter="4"
                  prepend-icon="mdi-account"
                  label="姓名"
                  required
                  outlined
                  @input="$v.name.$touch()"
                  @blur="$v.name.$touch()"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  :error-messages="passwordErrors"
                  label="密码"
                  prepend-icon="mdi-form-textbox-password"
                  required
                  :counter="10"
                  outlined
                  @input="$v.password.$touch()"
                  @blur="$v.password.$touch()"
                ></v-text-field>
                <v-text-field
                  v-model="repeatpassword"
                  :error-messages="repeatpasswordErrors"
                  prepend-icon="mdi-onepassword"
                  label="重复密码"
                  required
                  :counter="10"
                  outlined
                  @input="$v.repeatpassword.$touch()"
                  @blur="$v.repeatpassword.$touch()"
                ></v-text-field>
                <v-text-field
                  v-model.number="phonenumber"
                  type="number"
                  :error-messages="phonenumberErrors"
                  label="电话号码"
                  prepend-icon="mdi-cellphone"
                  required
                  outlined
                  @input="$v.phonenumber.$touch()"
                  @blur="$v.phonenumber.$touch()"
                ></v-text-field>
                <v-text-field
                  v-model="email"
                  :error-messages="emailErrors"
                  label="邮箱"
                  prepend-icon="mdi-email"
                  required
                  outlined
                  @input="$v.email.$touch()"
                  @blur="$v.email.$touch()"
                ></v-text-field>
                <v-text-field
                  v-model="identity"
                  :error-messages="identityErrors"
                  label="身份证"
                  prepend-icon="mdi-identifier"
                  required
                  outlined
                  @input="$v.identity.$touch()"
                  @blur="$v.identity.$touch()"
                ></v-text-field>
                <v-row class="pa-3">
                  <v-avatar class="mx-2" color="indigo">
                    <img :src="avatar_url" alt="John" v-if="avatar_url!==''" id="img">
                    <v-icon dark v-if="avatar_url==''" @click="showavatar_object">mdi-account-circle</v-icon>
                  </v-avatar> 
                  <v-file-input
                    d-inline
                    :rules="avarules"
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="选个头像"
                    label="头像" 
                    ref="img"
                    @change="getevent"
                  ></v-file-input>   
                </v-row>
              </v-card>
              <v-btn color="primary font-weight-bold" @click="el++"
                >下一步</v-btn>
            </v-stepper-content>

            <v-stepper-step
              :complete="el > 2"
              step="2"
              :rules="[verifystep2]"
              :color="complete[1]"
              edit-icon="mdi-check"
              editable
              >完善个人信息
              <small>用于必要时候作为联系手段</small>
              </v-stepper-step>
            <v-stepper-content step="2" >
              <v-card elevation="4" outlined class="mb-6 pa-3" fill-height>
                <v-radio-group v-model="gender" row prepend-icon="fas fa-transgender" mandatory>
                  <div class="grey--text"><strong h1>性别:</strong></div>
                  <v-spacer hidden-md-up></v-spacer>
                  <v-radio label="男" value="男"></v-radio>
                  <v-radio label="女" value="女"></v-radio>
                  <v-spacer></v-spacer>
                </v-radio-group>
                <v-radio-group v-model="merrage" row prepend-icon="fas fa-venus-mars" mandatory>
                  <div class="grey--text"><strong h1>婚姻关系:</strong></div>
                  <v-spacer hidden-md-up></v-spacer>
                  <v-radio label="已婚" value="已婚"></v-radio>
                  <v-radio label="未婚" value="未婚"></v-radio>
                  <v-spacer></v-spacer>
                </v-radio-group>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <!-- v-slot:activator="{ on, attrs }"是插槽，让子组件text的点击事件绑定在了v-menu上面 -->
                    <v-text-field
                      v-model="birthdate"
                      outlined
                      required
                      label="出生日期"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="birthdate"
                    elevation="24"
                    :max="new Date().toISOString().substr(0, 10)"
                    @change="save"
                  ></v-date-picker>
                </v-menu>
                <v-autocomplete
                  v-model="native_place"
                  :items="states"
                  outlined
                  :error-messages="native_placeErrors"
                  @input="$v.native_place.$touch()"
                  @blur="$v.native_place.$touch()"
                  label="籍贯"
                  prepend-icon="mdi-city"
                >
                </v-autocomplete>
                <v-autocomplete
                  v-model="Folk"
                  :items="folk"
                  outlined
                  :error-messages="FolkErrors"
                  @input="$v.Folk.$touch()"
                  @blur="$v.Folk.$touch()"
                  label="民族"
                  prepend-icon="mdi-account-supervisor-circle"
                >
                </v-autocomplete>
                <v-text-field
                      v-model="living_address"
                      outlined
                      label="住址"
                      :error-messages="living_addressErrors"
                      @input="$v.living_address.$touch()"
                      @blur="$v.living_address.$touch()"
                      prepend-icon="mdi-home-account"
                    ></v-text-field>
                    <div class="grey--text"><strong h1>添加紧急联系人
                      <v-btn elevation="2" fab icon outlined x-small @click="addrelable_person"><v-icon>mdi-plus</v-icon></v-btn>
                    </strong></div>
                    <v-dialog v-model="dialog1" width="500" rounded-lg>
                      <v-card>
                        <v-card-title class="headline blue">注意</v-card-title>
                        <v-card-text class="grey--text">最多添加三个联系人</v-card-text>
                        <v-divider inset></v-divider>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="primary" text @click="dialog1 = false">知道了</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-row class="my-0" v-for="(i,index) in relable_person" :key="index">
                      <v-col cols="12" xs="4" md="4" class="ligne">
                        <v-text-field
                        v-model="i.name"
                        dense
                        outlined
                        label="名字"
                        prepend-icon="fas fa-user-circle"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" xs="4" md="4" class="ligne">
                        <v-text-field
                        v-model="i.relationship"
                        dense
                        outlined
                        label="关系"
                        prepend-icon="fas fa-user-friends"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" xs="4" md="4" class="ligne">
                        <v-text-field
                        v-model.number="i.phone_number"
                        dense
                        outlined
                        type="string"
                        label="电话"
                        prepend-icon="fas fa-mobile-alt"
                        ></v-text-field>
                      </v-col>
                      <v-divider inset></v-divider>
                    </v-row>
              </v-card>
              <v-btn color="primary font-weight-bold" @click="el++">下一步</v-btn>
              <v-btn text color="primary font-weight-bold" @click="el--">返回</v-btn>
            </v-stepper-content>

            <v-stepper-step
              :complete="el > 3"
              step="3"
              :rules="[verifystep3]"
              :color="complete[2]"
              edit-icon="mdi-check"
              editable
              >填写履历
              <small>了解过往工作经历</small>
              </v-stepper-step>
            <v-stepper-content step="3">
              <v-card elevation="4" outlined class="mb-6 pa-3" fill-height>
                <div class="grey--text"><strong h1>
                  工作经历
                  <v-btn elevation="2" fab icon outlined x-small  @click="addemployments"><v-icon>mdi-plus</v-icon></v-btn>
                  </strong>
                </div>
                <v-dialog v-model="dialog2" width="500" rounded-lg>
                      <v-card>
                        <v-card-title class="headline blue">注意</v-card-title>
                        <v-card-text class="grey--text">最多添加五个工作经历</v-card-text>
                        <v-divider inset></v-divider>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="primary" text @click="dialog2 = false">知道了</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                <v-row class="my-0" v-for="(i,index) in employments" :key="index">
                      <v-col cols="12" xs="4" md="4" class="ligne">
                        <v-text-field
                        v-model="i.company"
                        dense
                        outlined
                        label="公司"
                        prepend-icon="fas fa-building"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" xs="4" md="4" class="ligne">
                        <v-text-field
                        v-model="i.job"
                        dense
                        outlined
                        label="职位"
                        prepend-icon="fas fa-clipboard"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" xs="4" md="4" class="ligne">
                        <v-text-field
                        v-model="i.Start_stop_time"
                        dense
                        outlined
                        label="工作年限"
                        prepend-icon="fas fa-calendar-alt"
                        ></v-text-field>
                      </v-col>
                      <v-divider inset></v-divider>
                    </v-row>
              </v-card>
              <v-btn color="primary font-weight-bold" @click="el++">下一步</v-btn>
              <v-btn text color="primary font-weight-bold" @click="el--">返回</v-btn>
            </v-stepper-content>

            <v-stepper-step
              :complete="el > 4"
              step="4"
              :rules="[verifystep4]"
              :color="complete[3]"
              edit-icon="mdi-check"
              editable
              >教育程度
              <small>用以区别后期人员证照的报考门槛</small>
              </v-stepper-step
            >
            <v-stepper-content step="4">
              <v-card class="mb-12 pa-3" fill-height outlined elevation="4">
                <div class="grey--text"><strong h1>添加教育经历
                      <v-btn elevation="2" fab icon outlined x-small @click="addeducations"><v-icon>mdi-plus</v-icon></v-btn>
                    </strong></div>
                    <v-dialog v-model="dialog3" width="500" rounded-lg>
                      <v-card>
                        <v-card-title class="headline blue">注意</v-card-title>
                        <v-card-text class="grey--text">最多添加三个教育经历</v-card-text>
                        <v-divider inset></v-divider>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="primary" text @click="dialog3 = false">知道了</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                <v-row class="my-0" v-for="(i,index) in educations" :key="index" wrap>
                      <v-col cols="12" xs="4" md="4" class="ligne">
                        <v-text-field
                        v-model="i.school"
                        dense
                        outlined
                        label="毕业学校"
                        prepend-icon="fas fa-university"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" xs="4" md="4" class="ligne">
                        <v-text-field
                        v-model="i.major"
                        dense
                        outlined
                        label="专业"
                        prepend-icon="fas fa-book"
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" xs="4" md="4" class="ligne">
                        <v-text-field
                        v-model="i.education_level"
                        dense
                        outlined
                        label="教育程度"
                        prepend-icon="fas fa-glasses"
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" xs="4" md="4" class="ligne">
                            <v-menu
                            ref="menu2"
                            v-model="menucomplation.entrance_year"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                            >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="i.entrance_year"
                        dense
                        outlined
                        readonly
                        label="入学时间"
                        prepend-icon="fas fa-calendar-alt"
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                        </template>
                        <v-date-picker
                        ref="picker2"
                        v-model="i.entrance_year"
                        :max="new Date().toISOString().substr(0, 10)"
                        @change="save2"
                        ></v-date-picker>
                        </v-menu>
                        </v-col>

                        <v-col cols="12" xs="4" md="4" class="ligne">
                          <v-menu
                            ref="menu3"
                            v-model="menucomplation.graduation_year"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                            >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="i.graduation_year"
                        dense
                        outlined
                        readonly
                        label="毕业时间"
                        prepend-icon="fas fa-calendar-alt"
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                        </template>
                        <v-date-picker
                        ref="picker3"
                        v-model="i.graduation_year"
                        :max="new Date().toISOString().substr(0, 10)"
                        @change="save3"
                        ></v-date-picker>
                        </v-menu>
                        </v-col>
                    </v-row>
                    <v-divider inset></v-divider>
              </v-card>
             <v-btn color="primary font-weight-bold" @click="el++">下一步</v-btn>
              <v-btn text color="primary font-weight-bold" @click="el--">返回</v-btn>
            </v-stepper-content>

            <v-stepper-step
              step="5"
              :rules="[verifystep5]"
              :color="complete[4]"
              edit-icon="mdi-check"
              editable
              >自我介绍</v-stepper-step
            >
            <v-stepper-content step="5">
              <v-textarea class="mb-12 ma-4" outlined
              filled name="input-7-4"
              label="对岗位的理解和工作的期望"
              v-model="selfintro"
              ></v-textarea>
              <v-dialog v-model="dialog4" persistent max-width="290">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary font-weight-bold" @click="console" v-bind="attrs"  v-on="on"  :disabled="submited" :loading="submited">完成并提交</v-btn>
                <v-dialog v-model="submited" hide-overlay persistent width="300">
                  <v-card color="primary" dark>
                    <v-card-text>注册成功,正在创建个人资料
                      <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </template>
              <v-card>
              <v-card-title class="headline " color="primary">确定是否要提交资料?</v-card-title>
              <v-card-text>个人资料可以后期在个人设置中更改,可以在登录后完善.</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1 white--text" @click="dialog4 = false">再改改</v-btn>
                <v-btn color="blue darken-1 white--text" @click="submit">确定</v-btn>
              </v-card-actions>
              </v-card>
            </v-dialog>
              <v-btn text color="primary font-weight-bold" @click="el--"
                >Cancel</v-btn>
            </v-stepper-content>
          </v-stepper>
        </v-card>
        <v-snackbar v-model="snackbar">
          {{snacktext}}
          <template v-slot:action="{ attrs }">
            <v-btn color="red" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
          </template>
        </v-snackbar>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import {required,maxLength,minLength,sameAs,email,} from "vuelidate/lib/validators";
import {
  nameErrors,emailErrors,passwordErrors,repeatpasswordErrors,identityErrors,phonenumberErrors,
  living_addressErrors,FolkErrors,native_placeErrors
} from "../computed/signup.js";
import {
  save,submit,
  verifystep1,verifystep2,verifystep3,verifystep4,verifystep5,
  addrelable_person,addemployments,addeducations,
} from "../method/signup.js";
import { states, folk } from "@/assets/china/provience.js";

export default {
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(4) },
    password: { required, minLength: minLength(3) },
    repeatpassword: { required, sameAsPassword: sameAs("password") },
    phonenumber: { required },
    identity: { required },
    email: { required, email },
    native_place: { required },
    Folk: { required },
    living_address: { required }
  },
  data() {
    return {
      name: "",
      phonenumber:null,
      password: "",
      repeatpassword: "",
      email: "",
      identity:"",
      identity_image:"",
      birthdate: "",
      native_place: "",
      Folk: "",
      merrage: "",
      living_address: "",
      gender:"",
      relable_person:[{name:"",relationship:"",phone_number:""}],
      employments:[{Start_stop_time:"",company:"",job:""}],
      educations:[{school:"",major:"",education_level:"",entrance_year:"",graduation_year:""}],
      selfintro:"",
      avatar_url:"",
      avatar_object:null,

      snacktext:'',
      hasimage:false,
      snackbar:false,
      states,
      folk,
      menu: false,
      menucomplation:{entrance_year:false,graduation_year:false},
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      submited:false,
      complete: ["blue", "blue", "blue", "blue", "blue","blue"],
      el: 1,
      avarules:[
        value => !value || value.size < 10000000 || 'Avatar size should be less than 2 MB!',
      ],
    };
  },
  computed: {
    nameErrors,
    emailErrors,
    passwordErrors,
    repeatpasswordErrors,
    identityErrors,
    phonenumberErrors,
    living_addressErrors,
    FolkErrors,
    native_placeErrors
  },
  methods: {
    save,submit,
    verifystep1,verifystep2,verifystep3,verifystep4,verifystep5,
    addrelable_person,addemployments,addeducations,
    console(){
      console.log(
        this.name,this.phonenumber,this.password,
        this.repeatpassword,this.email,this.identity,
        this.birthdate,this.native_place,this.Folk,
        this.merrage,this.living_address,this.gender,
        this.relable_person,this.employments,this.educations,this.selfintro,
      )
    },
    save2(entrance_year) {
    this.$refs.menu.save(entrance_year)
    },
    save3(graduation_year) {
    this.$refs.menu.save(graduation_year)
    },
    tosignin(){
        this.$router.push({path:'/signin'})
    },
    //选择本地图片并且显示出来
    getevent(event){
      if(event){
      this.avatar_object = event
      console.log(this.avatar_object)
      var url = null;
      if (window.createObjectURL != undefined){
        url = window.createObjectURL(event)
      }else if (window.webkitURL != undefined){
        url = window.webkitURL.createObjectURL(event);
      }else if(window.URL != undefined){
        url = window.URL.createObjectURL(event);
      }
      console.log(url)
      this.avatar_url=url
      }else{this.avatar_url='',this.avatar_object=null}
    },
    showavatar_object(){
      console.log(this.avatar_object)
    }
  },
  watch: {
    //日期选择器从年份选择开始
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
    menu2(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
    menu3(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
};
</script>
