<template>
    <v-app class="blue accent-2 rounded-lg pa-3">
            <v-row dense>
                <v-col cols="12" md="12"> 
                    <v-card dense color="white" min-height="700">
                        <v-card-title class="headline indigo white--text">劳务合同查找
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
                                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" :loading='dataloading'>新增劳务合同</v-btn>
                                    </template>
                                    <v-card>
                                        <v-app-bar color="indigo">
                                            <v-toolbar-title class="white--text">{{formTitle}}</v-toolbar-title>
                                            <v-spacer></v-spacer>
                                            <v-btn icon @click.stop="close" dark :disabled='dataloading'>
                                                <v-icon>mdi-close-box</v-icon>
                                            </v-btn>
                                        </v-app-bar>
                                        <v-card-text>
                                          <div class="ma-3"> 
                                            <v-card-subtitle>相关工程信息:</v-card-subtitle>
                                            <v-row dense>
                                                 <v-col cols="12" md="12" v-if="editedIndex <= -1">
                                                  <v-autocomplete dense :items="enginerContract" return-object item-text="name" item-value="name" label="选择工程合同" hint="选择工程合同" prepend-icon="mdi-account" v-model="select.enginerContract"
                                                    solo :search-input.sync="search_temp.enginerContract"></v-autocomplete>
                                              </v-col>
                                              <v-col cols="12" md="12" v-if="editedIndex > -1">
                                                  <v-text-field  dense label="工程合同" disabled outlined prepend-icon="mdi-account" v-model="editedItem.contract_name"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" md="4">
                                                  <v-text-field dense label="工程合同总价" type="number" disabled outlined prepend-icon="mdi-account" v-model="editedItem.construction_cost"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" md="4">
                                                  <v-text-field dense label="项目经理" disabled outlined prepend-icon="mdi-account" v-model="editedItem.copartner_name"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" md="4">
                                                  <v-text-field dense label="项目合同号" disabled outlined prepend-icon="mdi-account" v-model="editedItem.contract_code"></v-text-field>
                                              </v-col>
                                              
                                            </v-row>
                                            <v-divider></v-divider>
                                            <v-card-subtitle>基本信息:</v-card-subtitle>
                                            <v-row dense>
                                              <v-col cols="12" md="12" v-if="editedIndex <= -1">
                                                  <v-autocomplete dense :items="suppliers" return-object item-text="supplier_name" item-value="supplier_name" label="劳务供应商" hint="劳务供应商" prepend-icon="mdi-account" v-model="select.suppliers"
                                                    solo :search-input.sync="search_temp.suppliers"></v-autocomplete>
                                              </v-col>
                                              <v-col cols="12" md="12" v-if="editedIndex > -1">
                                                  <v-text-field  dense label="劳务供应商" disabled outlined prepend-icon="mdi-account" v-model="editedItem.supplier_name"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" md="8">
                                                   <v-text-field dense label="劳务金额" type="number" hint="劳务金额" outlined prepend-icon="mdi-bank" v-model="editedItem.total_amount"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" md="4">
                                                   <v-text-field dense disabled label="占合同比率" type="number" hint="占合同比率" outlined prepend-icon="mdi-percent" v-model="editedItem.rate"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" md="6">
                                                  <v-text-field dense label="采购日期" type="date" outlined prepend-icon="mdi-account" v-model="editedItem.purchase_order_date"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" md="6">
                                                  <v-text-field dense label="采购合同号" outlined prepend-icon="mdi-account" v-model="editedItem.purchase_order_code"></v-text-field>
                                              </v-col>
                                            </v-row>
                                            <v-divider></v-divider>
                                                <div v-if="editedIndex > -1">
                                                    <v-card-subtitle>上传附件:
                                                        <input type="file" ref="inputFile" style="display:none" @change="UploadFiles($event)" multiple="multiple">
                                                            <v-btn color="indigo white--text" class="ml-6"  @click="fileinput" :loading='dataloading'>Upload
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
                                <v-btn class="white--text" small @click="editItem(item)" color="primary">修改<v-icon right dark>mdi-pencil</v-icon></v-btn>
                            </template>
                             <template v-slot:[`item.datalog`]="{ item }">                                                                
                                <v-btn class="white--text" small @click="LogData(item)" color="blue-grey">发票<v-icon right dark>mdi-clipboard-list</v-icon></v-btn>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-col>
            </v-row>
        
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
            axioscount:0,
            dataloading:true,
            dialog : false, 
            dialogDelete: false,                                        
            btnloading: false,
            selectedloading:false,
            enginerContract:[],
            suppliers:[],
            uploadfiles:[],

            search:'',
            search_temp:{enginerContract:'',suppliers:''},
            select:{enginerContract:{},suppliers:{}},
            //显示的文件和编辑文件
            profiles: [],
            editedIndex: -1,
            editedItem: {purchase_purpose:"劳务"},
            defaultItem: {purchase_purpose:"劳务"},

            headers: [{text: '工程名称',align: 'start',sortable: false,value: 'contract_name',},
                    { text: '供应商名称', value: 'supplier_name', sortable: false,},
                    { text: '项目经理', value: 'copartner_name'},
                    { text: '合同编号', value: 'contract_code',sortable: false},
                    { text: '劳务合同总额(含税)', value: 'total_amount'},
                    {text: '付款总额', value: 'fund_settlement'},
                    { text: '返回发票总额', value: 'receipt_amount'},
                    { text: '占工程总额比率', value: 'rate'},
                    { text: '发票收取', value: 'datalog', sortable: false,align: 'center'},
                    { text: '', value: 'actions', sortable: false}
                    ],
        }


    },
    methods:{
        LogData(item){
            this.$router.push({name:'contractdetail',params: { id:`${item._id}`} })
        },

        editItem (item) {
            console.log(this.editedItem)
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
          this.select = {enginerContract:{},suppliers:{}}
        })
        },

        //index为-1则上传,不为则修改
        async save () {
            console.log("this.editedItem"+this.editedItem)
            this.btnloading = true
            if (this.editedIndex > -1) {
            let id = this.editedItem._id
                delete this.editedItem._id
                await this.$http.patch(`http://localhost:3000/purchase/${id}`,this.editedItem)
                .then(res=> {Object.assign(this.profiles[this.editedIndex], this.editedItem),console.log(res.data)})
                .catch(err => {console.log(err)})
            } else {
                this.editedItem.receipt_amount = 0
                await this.$http.post(`http://localhost:3000/purchase`,this.editedItem)
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
            await this.$http.get(`http://localhost:3000/purchase?per_page=1000&page=1&keyword=&typekeyword=劳务`)
                .then(res=> {this.profiles = res.data.purchaselist
                            for (var i=0; i < this.profiles.length ; ++i){
                                delete this.profiles[i].createdAt
                                delete this.profiles[i].updatedAt
                            }
                            this.dataloading = false
                })
                .catch(err => {console.log(err)})
        },

        getContract(val){
            let seqNumber = ++this.axioscount;
            this.$http.get(`http://localhost:3000/marketingcontract?per_page=10&page=1&keyword=${val}`)
                .then(res=> {
                    if (seqNumber === this.axioscount) {
                        this.enginerContract = res.data.contractlist
                            for (var i=0; i < this.enginerContract.length ; ++i){
                                delete this.enginerContract[i].createdAt
                                delete this.enginerContract[i].updatedAt
                            }
                            this.dataloading = false
                    } 
                })
                .catch(err => {console.log(err)})
        },

        getsuppliers(val){
            let seqNumber = ++this.axioscount;
            this.$http.get(`http://localhost:3000/supplies?per_page=10&page=1&keyword=${val}&typekeyword=劳务`)
                .then(res=> {
                    if (seqNumber === this.axioscount) {
                    this.suppliers = res.data.supplieslist
                            for (var i=0; i < this.suppliers.length ; ++i){
                                delete this.suppliers[i].createdAt
                                delete this.suppliers[i].updatedAt
                            }
                            this.dataloading = false
                    }
                })
                .catch(err => {console.log(err)})
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
            await this.$http.post(`http://localhost:3000/upload/multiplefilesTopath?keyword=财务部/供应商/${this.editedItem.supplier_name}/供应商合同`,formData,
                {headers: {'Content-Type': 'multipart/form-data'},})
                .then(res => {document = res.data.filelist,console.log(document)})
                .catch(err => {console.log(err)})
            await this.$http.post(`http://localhost:3000/purchase/${this.editedItem._id}/document`,{"document":document})
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
        return this.editedIndex === -1 ? '新增劳务合同' : '修改劳务合同'
      },
    },
    created(){
      this.initialize()
    },  
    watch:{
        'search_temp.enginerContract'(val) {
            this.getContract(val)
        },
        'search_temp.suppliers'(val) {
            this.getsuppliers(val)
        },
        'select.enginerContract'(val){
            console.log(val)
            // this.editedItem.belongsTocopartner = val.registrarID
            this.editedItem.contract_name = val.name
            this.editedItem.contract = val._id
            this.editedItem.construction_cost = val.construction_cost
            this.editedItem.copartner_name = val.registrar
            this.editedItem.belongsTocopartner = val.registrarID
            this.editedItem.contract_code = val.contract_code

        },
        'select.suppliers'(val){
            this.editedItem.supplier_name = val.supplier_name
            this.editedItem.supplier = val._id
        },
        'editedItem.total_amount'(val){
            this.editedItem.rate = (val/this.editedItem.construction_cost).toFixed(2)
            this.editedItem.rate = parseFloat(this.editedItem.rate)
            this.editedItem.total_amount = parseFloat(this.editedItem.total_amount)
            console.log(this.editedItem)
        }
    }
}
</script>