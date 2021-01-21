<template>
    <v-app class="blue accent-2 rounded-lg">
        <v-container>
            <v-row dense>
                <v-col cols="12" md="12">
                    <v-card dense color="white" min-height="700">
                        <v-card-title class="headline indigo white--text">工程查找
                            <v-spacer></v-spacer>
                            <v-text-field dark v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                        </v-card-title>
                        <v-data-table :headers="headers" :items="profiles" :search="search" sort-by="calories" class="elevation-1" :loading='dataloading' loading-text="加载数据中请等待">
                            <template v-slot:top>
                                <v-toolbar flat>
                                    <v-toolbar-title>列表操作</v-toolbar-title>
                                    <v-divider class="mx-4" inset vertical></v-divider>
                                    <v-spacer></v-spacer>
                                    <v-dialog v-model="dialog" max-width="600px" persistent scrollable>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">新增工程</v-btn>
                                    </template>
                                    <v-card>
                                        <v-app-bar color="indigo">
                                            <v-toolbar-title class="white--text">{{formTitle}}</v-toolbar-title>
                                            <v-spacer></v-spacer>
                                            <v-btn icon @click.stop="close" dark>
                                                <v-icon>mdi-close-box</v-icon>
                                            </v-btn>
                                        </v-app-bar>
                                        <v-card-text>
                                          <div class="ma-3"> 
                                              <v-card-subtitle>基本信息:</v-card-subtitle>
                                          <v-row dense>
                                              <v-col cols="12" md="7">
                                                  <v-text-field dense label="工程项目名称" outlined prepend-icon="mdi-account" v-model="editedItem.name"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" md="5">
                                                  <v-text-field dense label="工程项目编号" outlined prepend-icon="mdi-identifier"  v-model="editedItem.contract_code"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" md="12">
                                                  <v-text-field dense label="工程地址" outlined prepend-icon="mdi-location-enter"  v-model="editedItem.locations"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" md="6">
                                                  <v-text-field dense label="隶属" outlined prepend-icon="mdi-card" v-model="editedItem.affiliation"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" md="6">
                                                  <v-text-field dense label="建设单位" outlined prepend-icon="mdi-office-building" v-model="editedItem.construction_unit"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" md="12">
                                                  <v-text-field dense label="合同签订日期" outlined prepend-icon="mdi-clock-time-five" type="date" v-model="editedItem.date_of_agreement"></v-text-field>
                                              </v-col>
                                              </v-row>
                                              <v-divider></v-divider>
                                              <v-card-subtitle>扣款协议:</v-card-subtitle>
                                                <v-row>
                                              <v-col cols="12" md="4">
                                                  <v-text-field dense label="合同金额" outlined prepend-icon="mdi-wallet" type="number" v-model="editedItem.construction_cost"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" md="4">
                                                  <v-text-field dense label="发票额度" outlined prepend-icon="mdi-percent" type="number" v-model="editedItem.tax_rate"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" md="4">
                                                  <v-text-field dense label="管理费" outlined prepend-icon="mdi-percent" type="number" v-model="editedItem.Management_fee"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" md="4">
                                                  <v-text-field dense label="印花税" outlined prepend-icon="mdi-percent" type="number" v-model="editedItem.stamp_tax"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" md="4">
                                                  <v-text-field dense label="所得税" outlined prepend-icon="mdi-percent" type="number" v-model="editedItem.income_tax"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" md="4">
                                                  <v-text-field dense label="保险费率" outlined prepend-icon="mdi-percent" type="number" v-model="editedItem.insurance"></v-text-field>
                                              </v-col>
                                            </v-row>
                                              <v-divider></v-divider>
                                              <v-card-subtitle>工程信息:</v-card-subtitle>
                                            <v-row dense>
                                              <v-col cols="6" md="6">
                                                  <v-autocomplete dense :items="['装饰装修','幕墙','幕墙','智能化','机电','金属门窗','钢结构','园林','其他','展览展示']" label="工程种类"  v-model="editedItem.classification"
                                                    solo></v-autocomplete>
                                              </v-col>
                                              <v-col cols="6" md="6">
                                                  <v-autocomplete dense :items="['自营','联营']" label="经营方式"  v-model="editedItem.contract_performance"
                                                    solo></v-autocomplete>
                                              </v-col>
                                              <v-col cols="6" md="6">
                                                  <v-autocomplete dense :items="['新建','改造','施工','设计','展览']" label="合同分类"  v-model="editedItem.construction_type"
                                                    solo></v-autocomplete>
                                              </v-col>
                                              <v-col cols="6" md="6">
                                                  <v-autocomplete dense :items="['完工','未完工','未开工']" label="项目状态"  v-model="editedItem.civil_engineering"
                                                    solo></v-autocomplete>
                                              </v-col>
                                              <v-col cols="6" md="6">
                                                  <v-autocomplete v-if="editedItem.contract_performance == '联营'" dense :items="copartner" hint="合作人选择" label="合作人选择"  v-model="editedItem.registrar"
                                                    solo></v-autocomplete>
                                              </v-col>
                                              <v-col cols="6" md="6">
                                                  <v-autocomplete v-if="editedItem.contract_performance == '联营'" dense :items="participants" hint="企业联系人" label="企业联系人"  v-model="editedItem.contact_person"
                                                    solo></v-autocomplete>
                                              </v-col>
                                              <v-col cols="12" md="5">
                                                  <v-text-field dense label="占地面积" outlined prepend-icon="mdi-floor-plan" type="number" v-model="editedItem.floor_area"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" md="5">
                                                  <v-text-field dense label="建筑高度" outlined prepend-icon="fa-building" type="number" v-model="editedItem.height"></v-text-field>
                                              </v-col>
                                              <v-col cols="6" md="5">
                                                  <v-text-field dense label="功能类别" outlined prepend-icon="fa-certificate" v-model="editedItem.functional_category"></v-text-field>
                                              </v-col>
                                              <v-col cols="6" md="5">
                                                    <v-text-field dense label="专业类别" outlined prepend-icon="fa-certificate" v-model="editedItem.academic_directions"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" md="12">
                                                  <v-autocomplete dense :items="['公开','邀请','议标','委托']" label="投标形式" hint="投标形式" v-model="editedItem.tender_form"
                                                    solo></v-autocomplete>
                                              </v-col>
                                              
                                              </v-row>
                                              <v-divider></v-divider>
                                              <v-card-subtitle>人员信息:
                                                  <v-btn class="ml-2" @click="addhumansources">增加</v-btn>
                                                  <v-btn class="ml-2" @click="delhumansources">删除</v-btn>
                                              </v-card-subtitle>
                                            <v-row v-for="(item,index) in editedItem.humansources" :key="index"> 
                                                <v-col cols=7 md="8">
                                                <v-autocomplete dense :items="work_name" label="参建工种" prepend-icon="mdi-account" v-model="item.position"
                                                    solo></v-autocomplete>
                                              </v-col>
                                              <v-col cols=5 md="4">
                                                <v-autocomplete dense :items="certificate" label="参建人员"  v-model="item.person"
                                                    solo></v-autocomplete>
                                              </v-col>
                                            </v-row>
                                            <v-row>
                                              <v-col cols=12 md="12">
                                                <v-autocomplete dense :items="participants" label="登记人"  v-model="editedItem.proccesser"
                                                    solo></v-autocomplete>
                                              </v-col>
                                            </v-row>
                                          </div>
                                          <v-card-actions>
                                              <v-spacer></v-spacer>
                                              <v-btn color="indigo darken-1 white--text" :loading='btnloading' @click.stop="close">取消</v-btn>
                                              <v-btn color="indigo darken-1 white--text" :loading='btnloading'  @click.stop="save" >保存</v-btn>
                                          </v-card-actions>
                                        </v-card-text>
                                    </v-card>
                                    </v-dialog>
                                    <v-dialog v-model="dialogDelete" max-width="500px" persistent>
                                        <v-card color="deep-purple accent-3">
                                            <v-app-bar color="deep-purple accent-4">
                                            <v-icon class="mr-5 yellow--text">mdi-alert-outline</v-icon>
                                            <v-toolbar-title class="white--text">确定要删除
                                                <p class="d-inline yellow--text">{{editedItem.name}}</p>
                                                这个项目吗</v-toolbar-title>
                                            </v-app-bar>
                                            <v-card-text class="white--text d-block my-5" >此项目的信息可作为
                                            后期数据的重要溯源,并与多方资料有所关联，强烈建议不删除
                                            </v-card-text>
                                            <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="white" :loading='btnloading' outlined @click.stop="closeDelete">取消</v-btn>
                                            <v-btn color="white" :loading='btnloading' outlined @click.stop="deleteItemConfirm">确认</v-btn>
                                            <v-spacer></v-spacer>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-toolbar>
                            </template>
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-icon small class="mr-2"  @click="editItem(item)">mdi-pencil</v-icon>
                                <v-icon  small  @click="deleteItem(item)">mdi-delete</v-icon>
                            </template>
                            <template v-slot:[`item.officalWeb`]="{ item }">
                              <a :href="item.officalWeb" target="_blank" dark>{{ item.officalWeb }}</a>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>
<script>
import {work_name} from '@/assets/employee/work_name.js'
export default {
     name: 'Co_partner',
     data(){
        return{
            work_name,
            dataloading:true,
            dialog : false, 
            dialogDelete: false,
            btnloading: false,
            selectedloading:false,
            participants:[],
            certificate:[],
            copartner:[],
            
            search_temp:'',
            search:'',
            profiles: [],
            editedIndex: -1,
            editedItem: {humansources:[{person:'',position:''}],},
            defaultItem: {humansources:[{person:'',position:''}],},

            headers: [{text: '项目名',align: 'start',sortable: false,value: 'name',},
                    { text: '项目经理', value: 'registrar' },
                    { text: '合同造价', value: 'construction_cost' },
                    { text: '工程所在地', value: 'locations' },
                    { text: '工程类型', value: 'classification',sortable: false, },
                    { text: '合同编号', value: 'contract_code',sortable: false, },
                    { text: '修改/删除', value: 'actions', sortable: false },
                    ],
        }
    },
    methods:{
        editItem (item) {
        this.editedIndex = this.profiles.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        },

        deleteItem (item) {
        this.editedIndex = this.profiles.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
        console.log(this.editedItem)
        },

        async deleteItemConfirm () {
            this.btnloading = true
            await this.$http.delete(`http://localhost:3000/marketingcontract/${this.editedItem._id}`)
                .then(res=> {
                console.log(res.data)
                this.profiles.splice(this.editedIndex, 1)
                this.closeDelete()
                })
                .catch(err => {console.log(err)
                this.closeDelete()
                })
        },

        close(){
        this.dialog = false
        this.btnloading = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
        },

        closeDelete () {
        this.dialogDelete = false
        this.btnloading = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
        },

        async save(){
            this.btnloading = true
            if (this.editedIndex > -1) {
                let id = this.editedItem._id
                delete this.editedItem._id
                await this.$http.patch(`http://localhost:3000/marketingcontract/${id}`,this.editedItem)
                .then(res=> {Object.assign(this.profiles[this.editedIndex], this.editedItem),console.log(res.data)})
                .catch(err => {console.log(err)})
                // Object.assign(this.profiles[this.editedIndex], this.editedItem)
            } else {
                await this.$http.post(`http://localhost:3000/marketingcontract`,this.editedItem)
                .then(res=> {this.profiles.push(this.editedItem),console.log(res.data) })
                .catch(err => {console.log(err)})
            }
            this.close()
        },

        initialize () {
             this.$http.get(`http://localhost:3000/marketingcontract?per_page=1000&page=1&keyword=`)
                .then(res=> {this.profiles = res.data.contractlist
                            for (var i=0; i < this.profiles.length ; ++i){
                                delete this.profiles[i].createdAt
                                delete this.profiles[i].updatedAt
                            }
                            this.dataloading = false
                })
                .catch(err => {console.log(err)})
        },

        getemployee(){
          this.$http.get(`http://localhost:3000/users/getallusers?per_page=1000&page=1&keyword=`)
          .then(res=> {
            let employees =  res.data.userlist
            for (var i=0; i < employees.length ; ++i){
              this.participants.push(employees[i]["username"]);
            }
            console.log(this.participants)
          })
          .catch(err => {
            console.log(err)     
          })
        },
        getCopatner(){
            this.$http.get(`http://localhost:3000/copartner?per_page=10&page=1&keyword=`)
                .then(res=> {let list = res.data.copartnerlist 
                    for (var i=0; i < list.length ; ++i){
                    this.copartner.push(list[i]["name"]);
                    }
            })
            .catch(err => {console.log(err) })
        },
        getcertificate(){
            this.$http.get(`http://localhost:3000/certificate?per_page=1000&page=1&keyword=`)
                .then(res=> {let list = res.data.certificatelist 
                    for (var i=0; i < list.length ; ++i){
                    this.certificate.push(list[i]["username"]);
                    }
            })
            .catch(err => {console.log(err) })
        },
        addhumansources(){
            this.editedItem.humansources.push({person:'',position:''})
        },
        delhumansources(){
            this.editedItem.humansources.pop()
        }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '新增项目' : '修改项目'
      },
    },
    created(){
      this.initialize()
      this.getCopatner()
      this.getemployee()
      this.getcertificate()
    },
    watch: {
        search_temp(val) {
        this.text = val;
        },
    },
      
}
</script>