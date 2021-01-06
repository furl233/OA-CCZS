<template>
   <v-app class="blue accent-2 rounded-lg">
         <v-container>
            <v-row dense>
                <v-col cols="12" md="12">
                    <v-card>
                        <v-card-title class="headline indigo white--text">查找人员
                            <v-spacer></v-spacer>
                            <v-text-field dark v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                        </v-card-title>
                        <v-data-table :headers="headers" :items="profiles" :items-per-page="10" 
                        :search="search" 
                        class="elevation-1">
                        <template v-slot:top>
                          <v-toolbar flat>
                            <v-toolbar-title>操作及查看</v-toolbar-title>
<<<<<<< HEAD
                            <v-divider class="mx-1" inset vertical></v-divider>
                            <v-spacer></v-spacer>
                            <!-- 编辑人员所有资料或增加单个人员 -->
                            <v-dialog v-model="dialog" fullscreen max-width="290" hide-overlay transition="dialog-bottom-transition">
=======
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
>>>>>>> 0052218504708c33ecd611734c095f0d71514235
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn color="primary" dark class="mb-1 font-weight-black" v-bind="attrs" v-on="on">手动 新增</v-btn>
                              </template>
                              <v-card>
<<<<<<< HEAD
                                  <v-toolbar dark :color="genderdetermine()">
=======
                                  <v-toolbar dark color="indigo">
>>>>>>> 0052218504708c33ecd611734c095f0d71514235
                                    <v-btn icon dark @click.stop="close">
                                      <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                    <v-toolbar-title>设置信息</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    <v-toolbar-items>
<<<<<<< HEAD
                                      <v-dialog v-model="dialogsave" persistent max-width="290" transition="dialog-top-transition">
                                        <template v-slot:activator="{ on, attrs }">
                                          <v-btn dark text class="white--text" v-bind="attrs" v-on="on">保存</v-btn>
                                        </template>
                                        <v-card :color="genderdetermine()">
                                        <v-app-bar :color="genderdetermine()">
                                          <v-toolbar-title class="white--text">确定要保存这个职员信息吗</v-toolbar-title>
                                        </v-app-bar>
                                        <v-card-text class="white--text d-block my-5" >修改过后将体现在员工卡上</v-card-text>
                                        <v-card-actions>
                                          <v-spacer></v-spacer>
                                          <v-btn color="white" :loading='btnloading' outlined @click.stop="dialogsave = false">取消</v-btn>
                                          <v-btn color="white" :loading='btnloading' outlined @click.stop="save">确认</v-btn>
                                          <v-spacer></v-spacer>
                                        </v-card-actions>
                                      </v-card>
                                      </v-dialog>
                                    </v-toolbar-items>
                                  </v-toolbar>
                                    <v-subheader>基础信息</v-subheader>
                                          <v-row dense>
                                            <v-col cols="11" md="11" class="mx-2">
                                              <v-card :color="genderdetermine()" dark>
                                                <div class="d-flex flex-no-wrap justify-left">
                                                  <v-card class="ma-3" height="160" width="160" tile color="#1F7087" :img="editedItem.avatar_url == ''?'https://cdn.vuetifyjs.com/images/cards/server-room.jpg' : editedItem.avatar_url" >
                                                      <v-layout column align-start>
                                                            <v-flex>
                                                                <input type="file" accept="image/png, image/jpeg, image/bmp" ref="UploadImg" style="display:none" @change="getFile()">
                                                                <v-btn color="blue-grey" small class="ma-2 mt-12 white--text" @click.stop="clickinput">
                                                                上传证照照片
                                                                <v-icon right dark>mdi-cloud-upload</v-icon>
                                                                </v-btn>
                                                            </v-flex>
                                                      </v-layout>
                                                  </v-card>
                                         
                                                    
                                                  <v-list-item>
                                                  <v-list-item-content>
                                                    <v-list-item-subtitle class="my-2 white--text">
                                                      <v-row dense>
                                                        <v-col cols="10">
                                                          <v-select :items="selectitem.department" label="部门" dense outlined full-width v-model="editedItem.department"></v-select>
                                                        </v-col>
                                                        <v-col cols="10">
                                                          <v-select :items="selectitem.station" label="职位" dense outlined full-width v-model="editedItem.station"></v-select>
                                                        </v-col>
                                                      </v-row>
                                                    </v-list-item-subtitle>
                                                  </v-list-item-content>
                                                  </v-list-item>
=======
                                      <v-btn dark text class="white--text" @click.stop="save">保存</v-btn>
                                    </v-toolbar-items>
                                  </v-toolbar>
                                  <v-list three-line subheader>
                                    <v-subheader>基础信息</v-subheader>
                                    <v-list-item>
                                      <v-list-item-content>
                                          <v-row dense>
                                            <v-col cols="12" md="6">
                                              <v-card color="indigo" dark>
                                                <div class="d-flex flex-no-wrap justify-left">
                                                  <v-avatar class="ma-2" size="125" tile>
                                                      <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
                                                    </v-avatar>
                                                  <div>
                                                    <v-list-item>
                                                        <v-list-item-content three-line>
                                                          <v-list-item-title class="text-h4 my-2">姓名</v-list-item-title>
                                                          <v-list-item-subtitle class="my-2">部门/职位</v-list-item-subtitle>
                                                          <v-list-item-subtitle class="my-2">任职期N年</v-list-item-subtitle>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                  </div>
>>>>>>> 0052218504708c33ecd611734c095f0d71514235
                                                </div>
                                              </v-card>
                                            </v-col>
                                          </v-row>
<<<<<<< HEAD
                                    <v-divider inset class="my-1"></v-divider>
                                    <v-row dense>
                                      <v-col cols="4" md="4">
                                        <v-text-field prepend-icon="mdi-account" label="名字" outlined dense class="ma-1" v-model="editedItem.username"></v-text-field>
                                      </v-col>
                                    <div class="mt-6">/</div>
                                      <v-col cols="4" md="4">
                                        <v-text-field prepend-icon="mdi-form-textbox-password" label="密码" outlined dense class="ma-1" v-model="editedItem.password"></v-text-field>
                                      </v-col>
                                    </v-row>
                                    <v-row dense>
                                      <v-col cols="4" md="4">
                                        <v-text-field label="邮箱" prepend-icon="mdi-email" outlined dense class="ma-1" v-model="editedItem.email"></v-text-field>
                                      </v-col>
                                      <div class="mt-6">/</div>
                                      <v-col cols="4" md="3">
                                        <v-text-field label="电话" prepend-icon="mdi-cellphone" outlined dense class="ma-1" v-model="editedItem.telephone" type="number"></v-text-field>
                                      </v-col>
                                      <div class="mt-6">/</div>
                                      <v-col cols="3" md="3">
                                        <v-select label="性别" :items="selectitem.gender" solo dense class="ma-1" v-model="editedItem.gender"></v-select>
                                      </v-col>
                                    </v-row>
                                    <v-row dense>
                                       <v-col cols="5" md="5">
                                        <v-text-field label="身份证" outlined prepend-icon="mdi-identifier" dense class="ma-1" v-if="editedItem.social_id" v-model="editedItem.social_id.id_Number"></v-text-field>
                                      </v-col>
                                      <div class="mt-6">/</div>
                                      <v-col cols="6" md="5">
                                        <v-file-input accept="image/png, image/jpeg, image/bmp" placeholder="上传身份证照" prepend-icon="mdi-camera" label="身份证照" v-model="img.id_img"></v-file-input>
                                      </v-col>
                                    </v-row>
                                    <v-divider inset class="my-1"></v-divider>
                                    <v-list shaped>
                                        <v-list-group :value="true">
                                          <template v-slot:activator>
                                            <v-list-item-title>个人信息</v-list-item-title>
                                          </template>
                                          <v-list-item>
                                            <v-row dense>
                                              <v-col cols="8" md="4">
                                                  <v-text-field outlined required label="出生日期" 
                                                  type='date' prepend-icon="mdi-calendar" dense
                                                  v-if="editedItem.personal_data" v-model="editedItem.personal_data.birthdate"></v-text-field>
                                              </v-col>
                                              <v-col cols="5" md="3">
                                              <v-autocomplete :items="states" outlined label="籍贯" dense
                                              v-if='editedItem.personal_data' v-model="editedItem.personal_data.native_place" 
                                              prepend-icon="mdi-city"></v-autocomplete>
                                              </v-col>
                                              <v-col cols="5" md="3">
                                              <v-autocomplete :items="folk" outlined label="民族" dense
                                              v-if='editedItem.personal_data' v-model="editedItem.personal_data.Folk" 
                                              prepend-icon="mdi-account-supervisor-circle"></v-autocomplete>
                                              </v-col>
                                            </v-row>
                                          </v-list-item>
                                          <v-list-item>
                                            <v-row dense>
                                              <v-col cols="5" md="3">
                                                <v-select v-if='editedItem.personal_data' label="婚姻状况" prepend-icon="fas fa-venus-mars"
                                                v-model="editedItem.personal_data.merrage"
                                                :items="selectitem.merrage" outlined dense class="ma-1"></v-select>
                                              </v-col>
                                              <v-col cols="6" md="3">
                                                <v-text-field v-if='editedItem.personal_data' label="住址" prepend-icon="mdi-home-account"
                                                v-model="editedItem.personal_data.living_address" 
                                                 outlined dense class="ma-1"></v-text-field>
                                              </v-col>
                                            </v-row>
                                          </v-list-item>
                                        </v-list-group>
                                    </v-list>
                                    <v-divider inset class="my-1"></v-divider>
                                    <v-list shaped>
                                        <v-list-group :value="true">
                                          <template v-slot:activator>
                                            <v-list-item-title>工作经历</v-list-item-title>
                                          </template>
                                          <v-list-group dense :value="true" no-action sub-group v-for="(i,index) in editedItem.employments" :key="index">
                                            <template v-slot:activator>
                                              <v-list-item-content >
                                                <v-list-item-title>工作经历{{index+1}}</v-list-item-title>
                                              </v-list-item-content>
                                            </template>
                                          <v-list-item>
                                            <v-row dense>
                                              <v-col cols="8" md="4">
                                                  <v-text-field outlined required label="就职时间长度"  suffix append-outer='年'
                                                  prepend-icon="mdi-calendar" dense  hint="xx(年)"
                                                  v-model="i.Start_stop_time"></v-text-field>
                                              </v-col>
                                              <v-col cols="5" md="4">
                                              <v-text-field outlined label="企业名" dense
                                              v-model="i.company"  prepend-icon="fa-building"></v-text-field>
                                              </v-col>
                                              <v-col cols="5" md="4">
                                              <v-text-field outlined label="职位" dense
                                               v-model="i.job" 
                                              prepend-icon="fa-account-sitemap"></v-text-field>
                                              </v-col>
                                            </v-row>
                                          </v-list-item>
                                          </v-list-group>
                                          <div class="d-flex justify-end" dense>
                                            <v-btn text @click="Addemployments" color="black"
                                            v-if="(editedItem.employments).length < 3" class="ma-1">
                                              <v-icon color="black">mdi-plus</v-icon>添加工作经历
                                            </v-btn>
                                          </div>
                                        </v-list-group>
                                    </v-list>
                                    <v-divider inset class="my-1"></v-divider>
                                    <v-list shaped>
                                        <v-list-group :value="true">
                                          <template v-slot:activator>
                                            <v-list-item-title>教育经历</v-list-item-title>
                                          </template>
                                          <v-list-group dense :value="true" no-action sub-group v-for="(i,index) in editedItem.educations" :key="index">
                                            <template v-slot:activator>
                                              <v-list-item-content >
                                                <v-list-item-title>教育经历{{index+1}}</v-list-item-title>
                                              </v-list-item-content>
                                            </template>
                                          <v-list-item>
                                            <v-row dense>
                                              <v-col cols="10" md="2">
                                                  <v-text-field outlined required label="入学时间" 
                                                  type='date' prepend-icon="mdi-calendar" dense
                                                  v-model="i.entrance_year"></v-text-field>
                                              </v-col>
                                              <v-col cols="10" md="2">
                                                  <v-text-field outlined required label="毕业时间" 
                                                  type='date' prepend-icon="mdi-calendar" dense
                                                  v-model="i.graduation_year"></v-text-field>
                                              </v-col>
                                              <v-col cols="4" md="2">
                                              <v-text-field outlined label="教育程度" dense
                                              v-model="i.education_level"  prepend-icon="fa-building"></v-text-field>
                                              </v-col>
                                              <v-col cols="4" md="2">
                                              <v-text-field outlined label="专业" dense
                                               v-model="i.major" 
                                              prepend-icon="fa-account-sitemap"></v-text-field>
                                              </v-col>
                                              <v-col cols="4" md="2">
                                              <v-text-field outlined label="学校" dense
                                               v-model="i.school" 
                                              prepend-icon="fa-account-sitemap"></v-text-field>
                                              </v-col>
                                            </v-row>
                                          </v-list-item>
                                          </v-list-group>
                                          <div class="d-flex justify-end" dense>
                                            <v-btn text @click="Addemployments" color="black"
                                            v-if="(editedItem.employments).length < 3" class="ma-1">
                                              <v-icon color="black">mdi-plus</v-icon>添加工作经历
                                            </v-btn>
                                          </div>
                                        </v-list-group>
                                    </v-list>
                                    <v-divider inset class="my-1"></v-divider>
                                    <v-list shaped>
                                        <v-list-group :value="true">
                                          <template v-slot:activator>
                                            <v-list-item-title>紧急联系人</v-list-item-title>
                                          </template>
                                          <v-list-item v-for="(i,index) in editedItem.relable_person" :key="index">
                                          <v-row dense >
                                              <v-col cols="4" md="3">
                                                <v-text-field label="名字" prepend-icon="mdi-account"
                                                v-model="i.name" 
                                                 outlined dense class="ma-1"></v-text-field>
                                              </v-col>
                                              <v-col cols="4" md="3">
                                                <v-text-field label="关系" prepend-icon="fas fa-user-friends"
                                                v-model="i.relationship" 
                                                 outlined dense class="ma-1"></v-text-field>
                                              </v-col>
                                              <v-col cols="4" md="3">
                                                <v-text-field label="电话" prepend-icon="fas fa-mobile-alt"
                                                v-model="i.phone_number" 
                                                 outlined dense class="ma-1"></v-text-field>
                                              </v-col>
                                          </v-row>
                                          </v-list-item>
                                          <div class="d-flex justify-end" dense>
                                            <v-btn text @click="Addrelable_person" color="black"
                                            v-if="(editedItem.relable_person).length < 3" class="ma-1">
                                              <v-icon color="black">mdi-plus</v-icon>添加联系人
                                            </v-btn>
                                          </div>
                                        </v-list-group>
                                    </v-list>
                                  <v-divider></v-divider>
                                  <!-- 下半部分 -->
                                  <v-card :color="genderdetermine()">
                                    <v-subheader class="white--text">员工信息</v-subheader>
                                      <v-list shaped>
                                        <v-list-group :value="true">
                                          <template v-slot:activator>
                                            <v-list-item-title>劳动合同</v-list-item-title>
                                          </template>
                                          <v-list-group dense :value="true" no-action sub-group v-for="(item,index) in editedItem.labour_Contract" :key="index">
                                            <template v-slot:activator>
                                              <v-list-item-content >
                                                <v-list-item-title>第{{index+1}}次签订</v-list-item-title>
                                              </v-list-item-content>
                                            </template>
                                              <v-list-item>
                                                <v-row dense>
                                                    <v-col cols="7" md="3">
                                                      <v-text-field label="开始时间" type="date" v-model="item.start_time"
                                                      outlined dense class="ma-1"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="7" md="3">
                                                      <v-text-field label="结束时间" type="date" v-model="item.stop_time"
                                                      outlined dense class="ma-1"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" md="3">
                                                      <v-file-input small-chips multiple counter dense outlined
                                                      label="上传合同pdf文件" accept='.pdf'></v-file-input>
                                                    </v-col>
                                                </v-row>
                                            </v-list-item>
                                          </v-list-group>
                                          <div class="d-flex justify-end" dense>
                                            <v-btn class="mr-6" fab dark color="black" text @click="Addlabour_Contract">
                                              <v-icon dark>mdi-pencil</v-icon>续签合同
                                          </v-btn>
                                          </div>
                                        </v-list-group> 
                                      </v-list>
                                     
                                      <v-list shaped>
                                        <v-list-group :value="true">
                                          <template v-slot:activator>
                                            <v-list-item-title>劳资状况</v-list-item-title>
                                          </template>
                                          <v-list-group :value="true" no-action sub-group>
                                            <template v-slot:activator>
                                              <v-list-item-content >
                                                <v-list-item-title>社保</v-list-item-title>
                                              </v-list-item-content>
                                            </template>
                                            <v-list-item>
                                              <v-row dense>
                                                <v-col cols="6" md="3">
                                                  <v-text-field prepend-icon="fa-portrait" label="社保账号" v-model="editedItem.social_insurance_idnum"
                                                   outlined dense class="ma-1" ></v-text-field>
                                                </v-col>
                                                <v-col cols="6" md="3">
                                                  <v-text-field prepend-icon="fa-money-bill" label="社保金额" v-model="editedItem.social_insurance_amount"
                                                   outlined dense class="ma-1" type="number"></v-text-field>
                                                </v-col>
                                              </v-row>
                                            </v-list-item>
                                          </v-list-group>
                                          <v-list-group :value="true" no-action sub-group>
                                            <template v-slot:activator>
                                              <v-list-item-content >
                                                <v-list-item-title>公积金</v-list-item-title>
                                              </v-list-item-content>
                                            </template>
                                            <v-list-item> 
                                              <v-row dense>
                                              <v-col cols="6" md="3">
                                                <v-text-field prepend-icon="fa-portrait" label="公积金账号" v-model="editedItem.accumulation_fund_idnum"
                                                 outlined dense class="ma-1" ></v-text-field>
                                              </v-col>
                                              <v-col cols="6" md="3">
                                                <v-text-field prepend-icon="fa-money-bill" label="公积金金额" v-model="editedItem.accumulation_fund_amount"
                                                 outlined dense class="ma-1" type="number"></v-text-field>
                                              </v-col>
                                            </v-row>
                                            </v-list-item>
                                          </v-list-group>
                                          <v-list-group :value="true" no-action sub-group>
                                            <template v-slot:activator>
                                              <v-list-item-content>
                                                    <v-list-item-title>工资</v-list-item-title>
                                              </v-list-item-content>
                                            </template>
                                            <v-list-item>
                                            <v-row dense>
                                              <v-col cols="12" md="3">
                                                <v-text-field prepend-icon="fa-calendar" label="试用期日期" v-model="editedItem.probation_date"
                                                outlined dense class="ma-1" type="date"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" md="3">
                                                <v-text-field prepend-icon="fa-money-bill" label="试用期工资" v-model="editedItem.probation_salary"
                                                 outlined dense class="ma-1" type="number"></v-text-field>
                                              </v-col>
                                            </v-row>
                                            </v-list-item>
                                            <v-list-item>
                                            <v-row dense>
                                              <v-col cols="12" md="3">
                                                <v-text-field prepend-icon="fa-calendar" label="转正日期" v-model="editedItem.regular_date"
                                                outlined dense class="ma-1" type="date"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" md="3">
                                                <v-text-field prepend-icon="fa-money-bill" label="转正工资" v-model="editedItem.regular_salary"
                                                outlined dense class="ma-1" type="number"></v-text-field>
                                              </v-col>
                                            </v-row>
                                            </v-list-item>
                                          </v-list-group>
                                        </v-list-group>
                                      </v-list>
                                      
                                      <v-list flat subheader two-line>
                                        <v-list-item-group multiple active-class="">                                        
                                            <v-list-item>
                                            <v-radio-group row mandatory v-model="editedItem.currentstate">
                                              <p class="grey--text ma-3 ">当前员工状态:</p>
                                              <v-radio label="在职" value="在职" color="green"></v-radio>
                                              <v-radio label="离职" value="离职" color="red"></v-radio>
                                            </v-radio-group>
                                          </v-list-item>
                                          <v-list-item>
                                            <v-row dense class="justify-space-around">
                                              <v-col cols="8" md="3">
                                                <v-text-field prepend-icon="mdi-calendar" label="入职时间" v-model="editedItem.hiredate" type="date"></v-text-field>
                                              </v-col>
                                              <v-col cols="8" md="3">
                                                <v-text-field v-if="editedItem.currentstate =='离职'" prepend-icon="mdi-calendar" label="离职时间" v-model="editedItem.hiredate" type="date"></v-text-field>
                                              </v-col>
                                            </v-row>                   
                                          </v-list-item>
                                        </v-list-item-group>
                                      </v-list>
                                      
                                      <v-list :color="genderdetermine()" dark>
                                        <v-list-item>
                                          <v-list-item-action>
                                            <v-checkbox ></v-checkbox>
                                          </v-list-item-action>
                                          <v-list-item-content>
                                            <v-list-item-title>管理员授权</v-list-item-title>
                                            <v-list-item-subtitle>将此用户修改为可浏览并修改所有资料的超级管理员</v-list-item-subtitle>
                                          </v-list-item-content>
                                        </v-list-item>
                                      </v-list>
                                  </v-card>
                              </v-card>
                            </v-dialog>
                            <!-- 删除当前人员 -->
                            <v-dialog v-model="dialogDelete" max-width="500px" persistent>
=======
                                      </v-list-item-content>
                                    </v-list-item>
                                  </v-list>
                                  <v-divider></v-divider>

                                  <v-list three-line subheader>
                                    <v-subheader>General</v-subheader>
                                    <v-list-item>
                                      <v-list-item-action>
                                        <v-checkbox ></v-checkbox>
                                      </v-list-item-action>
                                      <v-list-item-content>
                                        <v-list-item-title>Notifications</v-list-item-title>
                                        <v-list-item-subtitle>Notify me about updates to apps or games that I downloaded</v-list-item-subtitle>
                                      </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item>
                                      <v-list-item-action>
                                        <v-checkbox ></v-checkbox>
                                      </v-list-item-action>
                                      <v-list-item-content>
                                        <v-list-item-title>Sound</v-list-item-title>
                                        <v-list-item-subtitle>Auto-update apps at any time. Data charges may apply</v-list-item-subtitle>
                                      </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item>
                                      <v-list-item-action>
                                        <v-checkbox ></v-checkbox>
                                      </v-list-item-action>
                                      <v-list-item-content>
                                        <v-list-item-title>Auto-add widgets</v-list-item-title>
                                        <v-list-item-subtitle>Automatically add home screen widgets</v-list-item-subtitle>
                                      </v-list-item-content>
                                    </v-list-item>
                                  </v-list>
                              </v-card>
                            </v-dialog>
                            <v-dialog v-model="dialogDelete" max-width="500px">
>>>>>>> 0052218504708c33ecd611734c095f0d71514235
                              <v-card color="deep-purple accent-3">
                                <v-app-bar color="deep-purple accent-4">
                                  <v-icon class="mr-5 yellow--text">mdi-alert-outline</v-icon>
                                  <v-toolbar-title class="white--text">确定要删除
                                    <p class="d-inline yellow--text">{{editedItem.username}}</p>
                                    这个职员吗</v-toolbar-title>
                                </v-app-bar>
                                <v-card-text class="white--text d-block my-5" >此员工可能做为项目的一员,或者某个组件的重要组成部分,
                                  强制删除可能导致该资料造成不可逆的损害。此处建议保留员工信息并且更改下列资料
                                  <br><p class="font-weight-black d-inline-block yellow--text">"所属部门"为"待定"</p>
                                  <br><p class="font-weight-black d-inline-block yellow--text">"部门岗位"为"待定"</p>
                                  <br><p class="font-weight-black d-inline-block yellow--text">"就职状态"为"离职"</p>
                                  <br>并修改目标用户密码防止陌生人使用</v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
<<<<<<< HEAD
                                  <v-btn color="white" :loading='btnloading' outlined @click.stop="closeDelete">取消</v-btn>
                                  <v-btn color="white" :loading='btnloading' outlined @click.stop="deleteItemConfirm">确认</v-btn>
                                  <v-spacer></v-spacer>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                            <!-- 查看当前人员 -->
                            <v-dialog v-model="dialogView" max-width="600px" scrollable transition="fab-transition">
                              <v-card :color="genderdetermine()" max-height="700px">
                                <div class="d-flex flex-no-wrap justify-left">
                                  <v-avatar class="ma-2" size="125" tile>
                                    <v-img :src="editedItem.avatar_url == ''?'https://cdn.vuetifyjs.com/images/cards/server-room.jpg' : editedItem.avatar_url"></v-img>
                                  </v-avatar>
                                  <div>
                                    <v-list-item>
                                      <v-list-item-content three-line>
                                        <v-list-item-title class="text-h4 my-2 white--text">{{editedItem.username}}</v-list-item-title>
                                        <v-list-item-subtitle class="my-2 white--text">{{editedItem.department}}/{{editedItem.station}}</v-list-item-subtitle>
                                        <v-list-item-subtitle class="my-2 white--text">任职期N年</v-list-item-subtitle>
                                      </v-list-item-content>
                                    </v-list-item>
                                  </div>
                                </div>
                                <!-- 分割线 -->
                                <v-divider inset></v-divider>
                                <v-card-text style="height: 600px;">
                                <v-row class="white--text text-no-wrap">
                                  <v-col cols="5" sm="6" md="4">
                                    <p><v-icon left class="white--text">mdi-phone</v-icon>{{editedItem.telephone}}</p>
                                  </v-col>
                                  <v-col cols="6" sm="6" md="4" >
                                    <p><v-icon left class="white--text">mdi-email</v-icon>{{editedItem.email}}</p>
                                  </v-col>
                                  <v-col cols="12" sm="6" md="4">
                                    <p v-if="editedItem.social_id" ><v-icon left class="white--text">mdi-identifier</v-icon>{{editedItem.social_id.id_Number}}</p>
                                  </v-col>
                                  <v-col cols="6" sm="6" md="4">
                                    <p>入职时间: {{editedItem.hiredate}}</p>
                                  </v-col>
                                  <v-col cols="6" sm="6" md="4">
                                    <p>离职时间: {{editedItem.firedate}}</p>
                                  </v-col>
                                </v-row>
                                <v-row class="white--text text-no-wrap">
                                  <v-col cols="6" sm="6" md="4">
                                    <p>正在参建项目数量: {{editedItem.processing}}</p>
                                  </v-col>
                                  <v-col cols="6" sm="6" md="4">
                                    <p>参建项目数量: {{editedItem.processed}}</p>
                                  </v-col>
                                </v-row>
                                <v-list color="transparent" shaped>
                                  <v-list-group :value="true" color="white" prepend-icon="fa-certificate">
                                    <template v-slot:activator>
                                      <v-list-item-title>履历</v-list-item-title>
                                    </template>
                                    <v-list-group :value="true" color="white" no-action sub-group>
                                      <template v-slot:activator>
                                        <v-list-item-content>
                                          <v-list-item-title>教育经历</v-list-item-title>
                                        </v-list-item-content>
                                      </template>
                                      <v-list-item>
                                        <v-expansion-panels accordion focusable>
                                          <v-expansion-panel v-for="(item,i) in editedItem.educations" :key="i">
                                            <v-expansion-panel-header>高校名:{{item.school}}</v-expansion-panel-header>
                                              <v-expansion-panel-content>专业:{{item.major}}</v-expansion-panel-content>
                                              <v-expansion-panel-content>教育程度:{{item.education_level}}</v-expansion-panel-content>
                                              <v-expansion-panel-content>入学于:{{item.entrance_year}}</v-expansion-panel-content>
                                              <v-expansion-panel-content>毕业于:{{item.graduation_year}}</v-expansion-panel-content>
                                          </v-expansion-panel>
                                        </v-expansion-panels>
                                      </v-list-item>
                                    </v-list-group>
                                    <v-list-group :value="true" color="white" no-action sub-group>
                                      <template v-slot:activator>
                                        <v-list-item-content>
                                          <v-list-item-title>工作经历</v-list-item-title>
                                        </v-list-item-content>
                                      </template>
                                      <v-list-item>
                                        <v-expansion-panels accordion focusable>
                                          <v-expansion-panel v-for="(item,i) in editedItem.employments" :key="i">
                                            <v-expansion-panel-header>就职单位:{{item.company}}</v-expansion-panel-header>
                                              <v-expansion-panel-content>就职时间:{{item.Start_stop_time}}</v-expansion-panel-content>
                                              <v-expansion-panel-content>担任职位:{{item.job}}</v-expansion-panel-content>
                                          </v-expansion-panel>
                                        </v-expansion-panels>
                                      </v-list-item>
                                    </v-list-group>
                                  </v-list-group>
                                </v-list>
                                <v-list color="transparent" shaped>
                                  <v-list-group :value="true" color="white" prepend-icon="fa-users">
                                    <template v-slot:activator>
                                      <v-list-item-title>紧急联系人</v-list-item-title>
                                    </template>
                                    <v-list-item v-for="(i,index) in editedItem.relable_person" :key="index">
                                      <p class="white--text mt-3">{{i.name}}</p>
                                      <v-spacer></v-spacer>
                                      <p class="white--text mt-3">{{i.relationship}}</p>
                                      <v-spacer></v-spacer>
                                      <p class="white--text mt-3">{{i.phone_number}}</p>
                                    </v-list-item>
                                  </v-list-group>
                                </v-list>
                                <v-list color="transparent" shaped>
                                  <v-list-group :value="true" color="white" prepend-icon="fa-archive">
                                    <template v-slot:activator>
                                      <v-list-item-title>员工状况</v-list-item-title>
                                    </template>
                                    <v-list-item>
                                      <p class="white--text mt-3">社保号码:{{editedItem.social_insurance_idnum}}</p>
                                      <v-spacer></v-spacer>
                                      <p class="white--text mt-3">金额:{{editedItem.social_insurance_amount}}</p>
                                    </v-list-item>
                                    <v-list-item>
                                      <p class="white--text mt-3">公积金号码:{{editedItem.accumulation_fund_idnum}}</p>
                                      <v-spacer></v-spacer>
                                      <p class="white--text mt-3">金额:{{editedItem.accumulation_fund_amount}}</p>                        
                                    </v-list-item>
                                    <v-list-item>
                                      <p class="white--text mt-3">试用期:{{editedItem.probation_date}}</p>
                                      <v-spacer></v-spacer>
                                      <p class="white--text mt-3">试用工资:{{editedItem.probation_salary}}</p>
                                    </v-list-item>
                                    <v-list-item>
                                      <p class="white--text mt-3">转正日期:{{editedItem.regular_date}}</p>
                                      <v-spacer></v-spacer>
                                      <p class="white--text mt-3">转正工资:{{editedItem.regular_salary}}</p>
                                    </v-list-item>
                                  </v-list-group>
                                </v-list>
                                <v-list color="transparent" shaped>
                                  <v-list-group :value="true" color="white" prepend-icon="fa-address-card">
                                    <template v-slot:activator>
                                      <v-list-item-title>个人信息</v-list-item-title>
                                    </template>
                                    <v-list-item>
                                      <v-list-item-icon><v-icon color="white">mdi-calendar</v-icon></v-list-item-icon>
                                      <v-list-item-content><v-list-item-title class="white--text">出生日期:</v-list-item-title></v-list-item-content>
                                      <v-spacer></v-spacer>
                                      <p class="white--text mt-4" v-if="editedItem.personal_data">{{editedItem.personal_data.birthdate}}</p>
                                    </v-list-item>
                                    <v-list-item>
                                      <v-list-item-icon><v-icon color="white">mdi-city</v-icon></v-list-item-icon>
                                      <v-list-item-content><v-list-item-title class="white--text">籍贯:</v-list-item-title></v-list-item-content>
                                      <v-spacer></v-spacer>
                                      <p class="white--text mt-4">广东</p>
                                    </v-list-item>
                                    <v-list-item>
                                      <v-list-item-icon><v-icon color="white">mdi-account-supervisor-circle</v-icon></v-list-item-icon>
                                      <v-list-item-content><v-list-item-title class="white--text">民族:</v-list-item-title></v-list-item-content>
                                      <v-spacer></v-spacer>
                                      <p class="white--text mt-4">汉族</p>
                                    </v-list-item>
                                    <v-list-item>
                                      <v-list-item-icon><v-icon color="white">fa-venus-mars</v-icon></v-list-item-icon>
                                      <v-list-item-content><v-list-item-title class="white--text">婚姻状况:</v-list-item-title></v-list-item-content>
                                      <v-spacer></v-spacer>
                                      <p class="white--text mt-4">未婚</p>
                                    </v-list-item>
                                    <v-list-item>
                                      <v-list-item-icon><v-icon color="white">mdi-home-account</v-icon></v-list-item-icon>
                                      <v-list-item-content><v-list-item-title class="white--text">居住地址:</v-list-item-title></v-list-item-content>
                                      <v-spacer></v-spacer>
                                      <p class="white--text mt-4">广东省福田区</p>
                                    </v-list-item>
                                  </v-list-group>
                                </v-list>
                                <v-list color="transparent" shaped>
                                  <v-list-group :value="true" color="white" prepend-icon="mdi-account-circle">
                                    <template v-slot:activator>
                                      <v-list-item-title>自我介绍</v-list-item-title>
                                    </template>
                                    <v-list-item>
                                      <v-list-item-content>
                                        <p class="white--text">通过风险管理与保险规划做到适当的财务安排，将意外事件带来的损失降到最低限度，使客户更好地规避风险，保障生活</p>
                                      </v-list-item-content>
                                    </v-list-item>
                                  </v-list-group>
                                </v-list>
                                </v-card-text>
                                <!-- 分割线 -->
                                <v-divider inset></v-divider>
                                <!-- 分割线 -->
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn color="white" class="font-weight-bold" @click.stop="closeView">关闭</v-btn>
=======
                                  <v-btn color="white" outlined @click="closeDelete">取消</v-btn>
                                  <v-btn color="white" outlined @click="deleteItemConfirm">确认</v-btn>
>>>>>>> 0052218504708c33ecd611734c095f0d71514235
                                  <v-spacer></v-spacer>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                          </v-toolbar>
                        </template>
<<<<<<< HEAD
                        <template v-slot:[`item.view`]="{ item }">
                          <v-icon @click.stop="view(item)">mdi-eye-circle</v-icon>
                        </template>
                        <template v-slot:[`item.option`]="{ item }">
                          <v-icon small class="mr-2" @click.stop="editItem(item)">mdi-pencil</v-icon>
=======
                        <template v-slot:[`item.option`]="{ item }">
                          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
>>>>>>> 0052218504708c33ecd611734c095f0d71514235
                          <v-icon small @click.stop="deleteItem(item)">mdi-delete</v-icon>
                        </template>
                        </v-data-table>
                    </v-card>
                </v-col>
<<<<<<< HEAD
                <Snap-bar :snacker='snacker'></Snap-bar>
=======
>>>>>>> 0052218504708c33ecd611734c095f0d71514235
            </v-row>
         </v-container>
    </v-app>
</template>

<script>
<<<<<<< HEAD
import SnapBar from '@/components/SnapBar.vue';
import { states, folk } from "@/assets/china/provience.js";
=======
>>>>>>> 0052218504708c33ecd611734c095f0d71514235
export default {
    props:{employees:Array},
    name: 'Humansource',
    data(){
      return{
        profiles:this.employees,
        search: '',
<<<<<<< HEAD
        img:{avatarimg:null,id_img:null},
        selectitem:{department:['市场部','行政部','投标部','财务部','质安部','工程部','总经办','待定'],merrage:['已婚','未婚'],
                    gender:["男","女"],station:['挂靠社保人员','登记员','员工','经理','副总','办公室主任','总裁','董事长','董事','待业']},
        states,folk,
        dialog: false,
        dialogsave:false,
        dialogDelete: false,
        dialogView:false,
        btnloading:false,
        editedIndex: -1,
        snacker:{sbar:false,stext:"",scolor:""},

        //修改后的数据或新增的数据,放入同于个对象中方便请求使用
        editedItem:{
          _id:'',username:'',department:'',station:'',hiredate:'',firedate:'',gender:'',telephone:0,email:'',labour_Contract:[{start_time:'',stop_time:'',contract_image_url:''}],
          social_insurance_amount:0,social_insurance_idnum:'',accumulation_fund_amount:0,accumulation_fund_idnum:'',avatar_url:'',
          probation_date:'',probation_salary:0,regular_date:'',regular_salary:0,currentstate:'',
          relable_person:[{phone_number:"",relationship:"",name:""}],educations:[{school:"",major:"",education_level:"",entrance_year:"",graduation_year:""}],
          employments:[{Start_stop_time:"",company:"",job:""}],social_id:{id_Number:'',id_image:''},personal_data:{birthdate:'',native_place:'',Folk:'',merrage:'',living_address:''}
        },

        //关闭窗口后恢复为默认的数值
        defaultItem:{
          _id:'',username:'',department:'',station:'',hiredate:'',firedate:'',gender:'',telephone:0,email:'',labour_Contract:[{start_time:'',stop_time:'',contract_image_url:''}],
          social_insurance_amount:0,social_insurance_idnum:'',accumulation_fund_amount:0,accumulation_fund_idnum:'',avatar_url:'',
          probation_date:'',probation_salary:0,regular_date:'',regular_salary:0,currentstate:'',
          relable_person:[{phone_number:"",relationship:"",name:""}],educations:[{school:"",major:"",education_level:"",entrance_year:"",graduation_year:""}],
          employments:[{Start_stop_time:"",company:"",job:""}],social_id:{id_Number:'',id_image:''},personal_data:{birthdate:'',native_place:'',Folk:'',merrage:'',living_address:''}
        },

        //表格的各种默认表头
        headers: [
          { text: '查看员工卡', value:'view', sortable: false, align:'center'},
          { text: '员工姓名', value: 'username'},
=======
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        editedItem:{username:'',department:'',station:'',hiredate:'',firedate:'',gender:'',telephone:'',email:'',},
        defaultItem:{username:'',department:'',station:'',hiredate:'',firedate:'',gender:'',telephone:'',email:'',},
        headers: [
          { text: '员工姓名', align: 'start', sortable: false, value: 'username'},
>>>>>>> 0052218504708c33ecd611734c095f0d71514235
          { text: '所属部门', value: 'department' },
          { text: '部门岗位', value: 'station' },
          { text: '入职时间', value: 'hiredate' },
          { text: '离职时间', value: 'firedate' },
          { text: '性别', value: 'gender' },
          { text: '电话', value: 'telephone' },
          { text: '邮箱', value: 'email' },
          { text: '操作', value: 'option', sortable: false },
        ]
      }
    },
<<<<<<< HEAD

    components:{
        SnapBar
    },
    
    methods:{
      genderdetermine(){
        if(this.editedItem.gender == "男") {return "indigo"}
        if(this.editedItem.gender == "女") {return "pink darken-1"}
        else{return "grey"}
      },

      view (item) {
        console.log(item)
        this.editedIndex = this.profiles.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogView = true
      },

      editItem (item) {
        this.editedIndex = this.profiles.indexOf(item)
        this.editedItem = Object.assign({}, item)
=======
    methods:{
      editItem (item) {
        this.editedIndex = this.profiles.indexOf(item)
        this.editedItem = Object.assign({}, item)
        console.log(this.editedItem)
>>>>>>> 0052218504708c33ecd611734c095f0d71514235
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.profiles.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

<<<<<<< HEAD
      async deleteItemConfirm () {
        this.btnloading = true
        await this.$http.delete(`http://localhost:3000/users/${this.editedItem._id}`)
                .then(res=> {this.profiles.splice(this.editedIndex, 1)
                            console.log(res)
                            this.switch_snap(true,"删除成功","green")})
                .catch(err => {
                    if(err.status == 401){this.switch_snap(true,"非行政登记人员或主任不可操作","red")}
                    else{this.switch_snap(true,"删除失败,请重试","red")}})
        // this.profiles.splice(this.editedIndex, 1)
=======
      deleteItemConfirm () {
        this.profiles.splice(this.editedIndex, 1)
>>>>>>> 0052218504708c33ecd611734c095f0d71514235
        this.closeDelete()
      },

      close () {
        this.dialog = false
<<<<<<< HEAD
        this.dialogsave = false
        this.btnloading = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
          this.img.avatarimg = null
          this.img.id_img = []
        })
      },

      closeView () {
        this.dialogView = false
=======
>>>>>>> 0052218504708c33ecd611734c095f0d71514235
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
<<<<<<< HEAD
        this.btnloading = false
=======
>>>>>>> 0052218504708c33ecd611734c095f0d71514235
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

<<<<<<< HEAD
      async save () {
        this.btnloading = true
        this.upload()
        //上传时候需要去掉时间戳,和数据id防止patch出错
        let id = this.editedItem._id
          delete this.editedItem._id
          delete this.editedItem.updatedAt
          delete this.editedItem.createdAt
        //index为-1则创建,不为-1则修改
        //editedItem为上传request body
        if (this.editedIndex > -1) {
        await this.$http.patch(`http://localhost:3000/users/${id}`,this.editedItem)
          .then(res => { Object.assign(this.profiles[this.editedIndex], this.editedItem)
                        console.log(res) 
                        this.switch_snap(true,"更新成功","green")})
          .catch(err => {
                      if(err.status == 401){this.switch_snap(true,"非行政登记人员或主任不可操作","red")}
                      else{this.switch_snap(true,"更新失败,请重试","red")}})
          Object.assign(this.profiles[this.editedIndex], this.editedItem)
        } else {
          await this.$http.post(`http://localhost:3000/users/register`,this.editedItem)
          .then(res =>{this.editedItem = res.data
                      this.profiles.push(this.editedItem)
                      this.switch_snap(true,"添加成功","green")})
          .catch(err => {this.switch_snap(true,"添加失败,请重试","red"),console.log(err)})
          // this.profiles.push(this.editedItem)
=======
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.profiles[this.editedIndex], this.editedItem)
        } else {
          this.profiles.push(this.editedItem)
>>>>>>> 0052218504708c33ecd611734c095f0d71514235
        }
        this.close()
      },

<<<<<<< HEAD
      //修改表单中的增加表单输入,修改edititem的数组长度用于增加表单
      Addrelable_person(){
        let newperson = {phone_number:'',relationship:'',name:''}
        this.editedItem.relable_person.push(newperson)
      },

      Addlabour_Contract(){
        let newlabour_C = {start_time:'',stop_time:'',contract_image_url:''}
        this.editedItem.labour_Contract.push(newlabour_C)
      },

      Addemployments(){
        let newemployment = {Start_stop_time:"",company:"",job:""}
        this.editedItem.employments.push(newemployment)
      },

      //触发上传,获取图片并显示
      clickinput(){
            this.$refs.UploadImg.click()
      },

      //获取本地图片文件并显示
      getFile(){
            if(this.$refs.UploadImg.files[0]){
            this.img.avatarimg = this.$refs.UploadImg.files[0]
            let url = null;
                if (window.createObjectURL != undefined){
                    url = window.createObjectURL(this.img.avatarimg)
                }else if (window.webkitURL != undefined){
                    url = window.webkitURL.createObjectURL(this.img.avatarimg);
                }else if(window.URL != undefined){
                    url = window.URL.createObjectURL(this.img.avatarimg);
                }
                this.editedItem.avatar_url=url
            }else{this.editedItem.avatar_url='',this.img.avatarimg = {}}
        },
        
        //获取本地文件并且上传返回地址
        //赋值给editedItem.avatarurl
        async upload(){
          if(!this.isEmptyObject(this.img.avatarimg)){
                let formData = new FormData()
                formData.append('file', this.img.avatarimg)
                await this.$http.post(`http://localhost:3000/upload/singlefileTopath?department=行政部&category=人员管理&subcategory=${this.editedItem.username}`,
                    formData,
                {headers: { 'Content-Type': 'multipart/form-data' },
                }).then(res => this.editedItem.avatar_url = res.data.url)
                  .catch(err => {this.switch_snap(true,"添加失败,请重试","red"),console.log(err)})
            }
        },

        //上传器,用于上传并返回文件服务端所在地址
        //接受三个参数,上传对象,上传地址,接受返回地址
        async uploadfile(Uploadobj){
          console.log(Uploadobj)
          if(!this.isEmptyObject(Uploadobj)){
                let formData = new FormData()
                formData.append('file', Uploadobj)
                await this.$http.post(`http://localhost:3000/upload/singlefileTopath?department=行政部&category=人员管理&subcategory=${this.editedItem.username}`,
                    formData,
                {headers: { 'Content-Type': 'multipart/form-data'},
                }).then(res => {this.editedItem.social_id.id_image = res.data.url
                  console.log('返回的是',res.data.url,'现有数据editedItem是',this.editedItem.social_id['id_image'])})
                  .catch(err => {this.switch_snap(true,"添加失败,请重试","red"),console.log(err)})
            }
        },
        //提示框显示
        switch_snap(show,text,color){
            this.snacker.sbar=show
            this.snacker.stext=text
            this.snacker.scolor=color
        },
        isEmptyObject(obj){
            for(let key in obj){
                return false
            }
            return true
        },
    },

=======
    },
>>>>>>> 0052218504708c33ecd611734c095f0d71514235
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
<<<<<<< HEAD
      propfiles (val) {
        val || this.$forceUpdate()
      },
    },
}
</script>
=======
    },
}
</script>
>>>>>>> 0052218504708c33ecd611734c095f0d71514235
