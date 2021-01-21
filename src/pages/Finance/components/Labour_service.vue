<template>
    <v-app class="blue accent-2 rounded-lg">
        <v-container>
            <v-row dense>
                <v-col cols="12" md="12"> 
                    <v-card dense color="white" min-height="700">
                        <v-card-title class="headline indigo white--text">供应商查找
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
                                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">新增供应商</v-btn>
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
                                              <v-col cols="12" md="12">
                                                  <v-text-field dense label="供应商" outlined prepend-icon="mdi-account" v-model="editedItem.supplier_name"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" md="6">
                                                   <v-text-field dense label="开户银行" outlined prepend-icon="mdi-bank" v-model="editedItem.account_name"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" md="6">
                                                 <v-text-field dense label="往来账户" outlined prepend-icon="mdi-home-account" v-model="editedItem.account_id"></v-text-field>
                                              </v-col>
                                               <v-col cols="12" md="4">
                                                 <v-text-field dense label="法定代表人" outlined prepend-icon="mdi-home-account" v-model="editedItem.legalRepresentatives"></v-text-field>
                                              </v-col>
                                               <v-col cols="12" md="4">
                                                 <v-text-field dense label="联系电话" outlined prepend-icon="mdi-home-account" v-model="editedItem.phone"></v-text-field>
                                              </v-col>
                                               <v-col cols="12" md="4">
                                                 <v-text-field dense label="注册时间" outlined prepend-icon="mdi-home-account" v-model="editedItem.regtime"></v-text-field>
                                              </v-col>
                                               <v-col cols="12" md="12">
                                                 <v-text-field dense label="注册地点" outlined prepend-icon="mdi-home-account" v-model="editedItem.regaddress"></v-text-field>
                                              </v-col>
                                               <v-col cols="12" md="6">
                                                 <v-text-field dense label="营业执照号" outlined prepend-icon="mdi-home-account" v-model="editedItem.BusinessLicence_No"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" md="6">
                                                 <v-text-field dense label="资质证书号" outlined prepend-icon="mdi-home-account" v-model="editedItem.Certificates_No"></v-text-field>
                                              </v-col>
                                            </v-row>
                                            <v-card-subtitle>联系人信息:</v-card-subtitle>
                                            <v-row dense>
                                              <v-col cols="12" md="4">
                                                  <v-text-field v-if="editedItem.Contact" dense label="电话" outlined prepend-icon="mdi-phone" v-model="editedItem.Contact.phone"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" md="4">
                                                   <v-text-field v-if="editedItem.Contact" dense label="QQ号" outlined prepend-icon="mdi-qqchat" v-model="editedItem.Contact.qq"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" md="4">
                                                 <v-text-field v-if="editedItem.Contact" dense label="邮箱" outlined prepend-icon="mdi-email" v-model="editedItem.Contact.email"></v-text-field>
                                              </v-col>
                                            </v-row>
                                            <v-card-subtitle>出纳信息:</v-card-subtitle>
                                            <v-row dense>
                                              <v-col cols="12" md="4">
                                                  <v-text-field v-if="editedItem.Cashier" dense label="电话" outlined prepend-icon="mdi-phone" v-model="editedItem.Cashier.phone"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" md="4">
                                                   <v-text-field v-if="editedItem.Cashier" dense label="QQ号" outlined prepend-icon="mdi-qqchat" v-model="editedItem.Cashier.qq"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" md="4">
                                                 <v-text-field v-if="editedItem.Cashier" dense label="邮箱" outlined prepend-icon="mdi-email" v-model="editedItem.Cashier.email"></v-text-field>
                                              </v-col>
                                            </v-row>
                                            <v-divider></v-divider>
                                                <div v-if="editedIndex > -1">
                                                    <v-card-subtitle>上传文件:
                                                        <input type="file" ref="inputFile" style="display:none" @change="UploadFiles($event)" multiple="multiple">
                                                            <v-btn color="indigo white--text" class="ml-6"  @click="fileinput">Upload
                                                                <v-icon right dark>mdi-cloud-upload</v-icon>
                                                            </v-btn>
                                                    </v-card-subtitle>
                                                    <v-simple-table fixed-header dense max-height="300px">
                                                        <template v-slot:default>
                                                        <thead>
                                                            <tr>
                                                                <th class="text-left">文件名</th>
                                                                <th class="text-left">下载</th>
                                                                <th class="text-left">删除</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for="(item,index) in editedItem.document" :key='index'>
                                                            <td><v-icon :color="files[getFileICON(item)].color">{{files[getFileICON(item)].icon}}</v-icon>{{getFileName(item)}}</td>
                                                            <td>
                                                                <a :href="item" :download="item" target="_blank"> 
                                                                <v-icon color="blue">mdi-arrow-down-bold-box</v-icon>
                                                                </a>
                                                            </td>
                                                            <td>
                                                                <v-btn icon @click="Deletefile(index)">
                                                                    <v-icon color="red">mdi-close-box</v-icon>
                                                                </v-btn>
                                                            </td>
                                                            </tr>
                                                        </tbody>
                                                        </template>
                                                    </v-simple-table>
                                                </div>
                                          </div>
                                          <v-card-actions>
                                              <v-spacer></v-spacer>
                                              <v-btn color="indigo darken-1 white--text" :loading='btnloading' @click.stop="close">取消</v-btn>
                                              <v-btn color="indigo darken-1 white--text" :loading='btnloading' @click.stop="save" >保存</v-btn>
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
                            </template>
                        </v-data-table>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>
<script>
import {files} from '@/assets/icon/filesicon.js'
export default {
    name: 'LabourService',
    data(){
        return{
            //默认表单数据
            files,
            dataloading:true,
            dialog : false, 
            dialogDelete: false,                                        
            btnloading: false,
            selectedloading:false,
            copartner:[],
            uploadfiles:[],

            search_temp:'',
            search:'',

            //显示的文件和编辑文件
            profiles: [],
            editedIndex: -1,
            editedItem: {supplier_type:"劳务",contratc_amount:0,output:0,reciept:0,contract_num:0,Contact:{phone:'',qq:'',email:''},Cashier:{phone:'',qq:'',email:''}},
            defaultItem: {supplier_type:"劳务",contratc_amount:0,output:0,reciept:0,contract_num:0,Contact:{phone:'',qq:'',email:''},Cashier:{phone:'',qq:'',email:''}},

            headers: [{text: '供应商名称',align: 'start',sortable: false,value: 'supplier_name',},
                    { text: '银行账号', value: 'account_id', sortable: false,},
                    { text: '合同数量', value: 'contract_num'},
                    { text: '总合同额(含税)', value: 'contratc_amount',sortable: false},
                    { text: '总付款额(含税)', value: 'output'},
                    { text: '返回进项总额', value: 'reciept'},
                    { text: '修改', value: 'actions', sortable: false},
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

        deleteItemConfirm () {
        this.profiles.splice(this.editedIndex, 1)
        this.closeDelete()
        },

        close(){
        this.dialog = false
        this.btnloading = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
        },

        //index为-1则上传,不为则修改
        async save () {
            this.btnloading = true
            if (this.editedIndex > -1) {
            let id = this.editedItem._id
                delete this.editedItem._id
                await this.$http.patch(`http://localhost:3000/supplies/${id}`,this.editedItem)
                .then(res=> {Object.assign(this.profiles[this.editedIndex], this.editedItem),console.log(res.data)})
                .catch(err => {console.log(err)})
            } else {
                await this.$http.post(`http://localhost:3000/supplies`,this.editedItem)
                .then(res=> {this.editedItem._id=res.data._id;this.profiles.push(this.editedItem)})
                .catch(err => {console.log(err)})
            }
            this.close()
        },

        closeDelete () {
        this.dialogDelete = false
        this.btnloading = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
        },

        async initialize () {
            await this.$http.get(`http://localhost:3000/supplies?per_page=1000&page=1&keyword=&typekeyword=劳务`)
                .then(res=> {this.profiles = res.data.supplieslist
                            for (var i=0; i < this.profiles.length ; ++i){
                                delete this.profiles[i].createdAt
                                delete this.profiles[i].updatedAt
                            }
                            this.dataloading = false
                })
                .catch(err => {console.log(err)})
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

        getFileName(str){
            let array = str.split('/')
            let name = array.pop()
            return name
        },
        getFileICON(str){
            let array = str.split('/')
            let name = array.pop()
            let icon = name.split('.')
            return icon.pop()
        },
        fileinput(){
            console.log(this.$refs)
            this.$refs.inputFile.click()
        },

        async UploadFiles(){
            let  document = []
            let formData = new FormData();
            for( var i = 0; i < this.$refs.inputFile.files.length; i++ ){
                let file = this.$refs.inputFile.files[i];
                formData.append('file', file);
            }
            await this.$http.post(`http://localhost:3000/upload/multiplefilesTopath?department=财务部&category=供应商&subcategory=${this.editedItem.supplier_name}`,formData,
                {headers: {'Content-Type': 'multipart/form-data'},})
                .then(res => {document = res.data.filelist,console.log(document)})
                .catch(err => {console.log(err)})
            await this.$http.post(`http://localhost:3000/supplies/${this.editedItem._id}/document`,{"document":document})
            .then(res =>{console.log(res);this.profiles[this.editedIndex].document.push(...document)})
            .catch(err =>{console.log(err)})
        },

        async Deletefile(index){
            this.profiles[this.editedIndex].document.splice(index,1)
            await this.$http.delete(`http://localhost:3000/supplies/${this.editedItem._id}/document`,{"index":index})
            .then(res =>{console.log(res);})
            .catch(err =>{console.log(err)})
        }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '新增供应商' : '修改供应商'
      },
    },
    created(){
      this.initialize()
      this.getCopatner()
    },  
}
</script>