<template>
  <div class="w-full">
    <div class="d-flex py-3 ml-4 mt-4">
        <div>
            <div class="display-1">发票管理</div>
            <v-breadcrumbs :items="breadcrumbs" large class="pa-0 py-2"></v-breadcrumbs>
        </div>
    </div>
    <div min-height="700">
      <v-card dense color="white" min-height="700">
          <v-card-title class="h4">搜索
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
          </v-card-title>
          <v-data-table dense :headers="headers" :items="profiles" :search="search" sort-by="calories" class="elevation-1" :loading='dataloading' loading-text="加载数据中请等待">
              <template v-slot:top>
                  <v-toolbar flat>
                      <v-toolbar-title>列表操作</v-toolbar-title>
                      <v-divider class="mx-4" inset vertical></v-divider>
                      <v-spacer></v-spacer>
                      <v-dialog v-model="dialog" max-width="600px" persistent scrollable>
                      <template v-slot:activator="{ on, attrs }">
                          <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" :loading='dataloading'>新增发票</v-btn>
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
                              <v-card-subtitle>工程信息:</v-card-subtitle>
                                <v-row dense>
                                <v-col cols="12" md="12">
                                    <v-text-field disabled dense label="项目名称" outlined prepend-icon="mdi-account" v-model="fund.contract_name"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field disabled dense label="工程负责人" outlined prepend-icon="mdi-account" v-model="fund.copartner_name"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field disabled dense label="合同编号" outlined prepend-icon="mdi-account" v-model="fund.contract_code"></v-text-field>
                                </v-col>
                                </v-row>
                                <v-divider></v-divider>
                              <v-card-subtitle>发票信息:</v-card-subtitle>
                              <v-row dense>
                                <v-col cols="12" md="12">
                                    <v-text-field dense label="发票抬头" outlined prepend-icon="mdi-calendar-blank" v-model="editedItem.invoice_title"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field dense label="开票日期" type="date" outlined prepend-icon="mdi-calendar-blank" v-model="editedItem.written_date"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field dense label="发票类型" outlined prepend-icon="mdi-calendar-blank" v-model="editedItem.invoice_kind"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field dense label="发票种类" outlined prepend-icon="mdi-format-list-bulleted-type" v-model="editedItem.invoice_type"></v-text-field>
                                </v-col>
                                  <v-col cols="12" md="6">
                                    <v-text-field dense label="发票代码" outlined prepend-icon="mdi-barcode" v-model="editedItem.invoice_code"></v-text-field>
                                </v-col>
                                  <v-col cols="12" md="4">
                                    <v-text-field dense label="金额(元)" type="number" outlined prepend-icon="mdi-cash" v-model="editedItem.invoice_amount"></v-text-field>
                                </v-col>
                                  <v-col cols="12" md="4">
                                    <v-text-field dense label="税金(元)" type="number" outlined prepend-icon="mdi-cash" v-model="editedItem.invoice_tax"></v-text-field>
                                </v-col>
                                  <v-col cols="12" md="4">
                                    <v-text-field dense label="税率" type="number" disabled outlined prepend-icon="mdi-brightness-percent" v-model="editedItem.invoice_taxrate"></v-text-field>
                                </v-col>
                                  <v-col cols="12" md="6">
                                    <v-text-field dense label="价税总合(元)" type="number" disabled outlined prepend-icon="mdi-cash" v-model="editedItem.total_amount"></v-text-field>
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
                              <v-toolbar-title class="white--text">确定要删除发票编号为
                                  <p class="d-inline yellow--text">{{editedItem.invoice_code}}</p>
                                  的这张发票吗</v-toolbar-title>
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
                  <v-btn class="white--text" small @click="editItem(item)" :loading='dataloading' color="primary">修改<v-icon right dark>mdi-pencil</v-icon></v-btn>
              </template>
               <template v-slot:[`item.delete`]="{ item }">
                  <v-btn class="white--text" small @click="deleteItem(item)" :loading='dataloading' color="red">删除<v-icon right dark>mdi-delete</v-icon></v-btn>
              </template>
          </v-data-table>
      </v-card>
      <Snap-bar :snacker='snacker'></Snap-bar>
    </div>
  </div>
</template>

<script>
import SnapBar from '@/components/SnapBar.vue';
import {files} from '@/assets/icon/filesicon.js'
export default {
    name: 'LabourService',
    data(){
        return{
            //默认表单数据
            files,
            dataloading:false,
            dialog : false, 
            dialogDelete: false,                                        
            btnloading: false,
            selectedloading:false,
            fund:{},
            uploadfiles:[],

            search_temp:'',
            search:'',
            paramsid:'',

            //显示的文件和编辑文件
            profiles: [],
            editedIndex: -1,
            editedItem:{},
            defaultItem:{},
            snacker:{sbar:false,stext:"",scolor:""},
            breadcrumbs: [{text: '明细表列表',disabled: false,to: '/finance/fund'},
                          {text: `XXXXXXX`,disabled: true,href: '#'},
                          {text: '付款详情页',disabled: true,href: '#'}],
            headers: [
                    { text: '工程名称', value: 'contract_name',align: 'start',sortable: false},
                    { text: '合同编号', value: 'contract_code',sortable: false},
                    {text: '审批表编号', value: 'Approval_code',sortable: false},
                    { text: '到款日期', value: 'arrival_date',sortable: false},
                    { text: '到款金额', value: 'arrival_amount', sortable: false,},
                    { text: '管理费', value: 'management_feeamount'},
                    { text: '管理费率', value: 'management_fee_rate'},
                    { text: '所得税', value: 'income_tax_amount'},
                    { text: '所得税率', value: 'income_tax_rate'},
                    { text: '增值税', value: 'vadded_tax_amount'},
                    { text: '增值税率', value: 'vadded_tax_rate'},
                    { text: '附加税', value: 'additional_tax_amount'},
                    { text: '附加税率', value: 'additional_tax_rate'},
                    { text: '印花税', value: 'stamp_tax_amount'},
                    { text: '印花税率', value: 'stamp_tax_rate'},
                    { text: '保险费', value: 'insurance_amount'},
                    { text: '保险费率', value: 'insurance_rate'},
                    { text: '转账手续费', value: 'transfer_fee'},
                    { text: '项目章押金', value: 'seal_deposit'},
                    { text: '保函保证金', value: 'enginering_deposit'},
                    { text: '保函手续费', value: 'enginering_deposit_handlingfee'},
                    { text: '其他', value: 'other'},
                    { text: '扣费合计', value: 'totalreduce_amount'},
                    { text: '预缴税金', value: 'prepaid_tax'},
                    { text: '应付金额', value: 'account_due'},
                    { text: '', value: 'actions', sortable: false},
                    { text: '', value: 'delete', sortable: false},
                    ],
        }
    },

    components:{
        SnapBar
    },

    methods:{
        editItem (item) {
        console.log(this.purchase)
        this.editedIndex = this.profiles.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        },

        deleteItem (item) {
        this.editedIndex = this.profiles.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
        console.log(this.editedItem)
        this.dialogDelete = true
        },

        async deleteItemConfirm () {
            let id = this.editedItem._id
            await this.$http.delete(`http://localhost:3000/fund_invoice/${id}`,this.editedItem)
                .then(res=> {Object.assign(this.profiles[this.editedIndex], this.editedItem)
                                this.switch_snap(true,"删除成功","green"),console.log(res)
                                this.profiles.splice(this.editedIndex, 1)})
                .catch(err => {this.switch_snap(true,"删除失败","red"),console.log(err)})
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
                await this.$http.patch(`http://localhost:3000/fund_invoice/${id}`,this.editedItem)
                .then(res=> {Object.assign(this.profiles[this.editedIndex], this.editedItem)
                                this.switch_snap(true,"修改成功","green"),console.log(res)})
                .catch(err => {this.switch_snap(true,"修改失败","red"),console.log(err)})
            } else {
                await this.$http.post(`http://localhost:3000/fund_invoice`,this.editedItem)
                .then(res=> {this.editedItem._id=res.data._id;
                            this.profiles.push(this.editedItem)
                            this.switch_snap(true,"创建成功","green"),console.log(res)})
                .catch(err => {this.switch_snap(true,"创建失败","red"),console.log(err)})
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

        switch_snap(show,text,color){
            this.snacker.sbar=show
            this.snacker.stext=text
            this.snacker.scolor=color
        },

        async initialize () {
            this.dataloading = true
            let id = this.$route.params.id
            await this.$http.get(`http://localhost:3000/fund_received/searchByfund/${id}?per_page=1000&page=1&keyword=`)
                .then(res=> {this.profiles = res.data.fund_receivedlist
                            for (var i=0; i < this.profiles.length ; ++i){
                                delete this.profiles[i].createdAt
                                delete this.profiles[i].updatedAt
                            }
                            this.dataloading = false
                })
                .catch(err => {console.log(err)})
        },

        getFund(){
            this.btnloading = true
            let id = this.$route.params.id
            this.$http.get(`http://localhost:3000/fund/${id}?fields=&populatefields=contract`)
                .then(res=> {this.fund = res.data
                            this.breadcrumbs[1].text = res.data.contract_name
                            delete this.fund.createdAt
                            delete this.fund.updatedAt
                            this.btnloading = false
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
            this.$refs.inputFile.click()
        },

        setNum(value){
            let newvalue = parseFloat(value)
            return newvalue
        },

        async UploadFiles(){
            let  document = []
            let formData = new FormData();
            for( var i = 0; i < this.$refs.inputFile.files.length; i++ ){
                let file = this.$refs.inputFile.files[i];
                formData.append('file', file);
            }
            await this.$http.post(`http://localhost:3000/upload/multiplefilesTopath?keyword=${this.editedItem.contract_name}/劳务合同/${this.editedItem.supplier_name}/发票详情`,formData,
                {headers: {'Content-Type': 'multipart/form-data'},})
                .then(res => {document = res.data.filelist,console.log(document)})
                .catch(err => {console.log(err)})
            await this.$http.post(`http://localhost:3000/receipt/${this.editedItem._id}/document`,{"document":document})
            .then(res =>{console.log(res);this.profiles[this.editedIndex].document.push(...document)})
            .catch(err =>{console.log(err)})
        },
        async Deletefile(index){
          this.profiles[this.editedIndex].document.splice(index,1)
            await this.$http.delete(`http://localhost:3000/receipt/${this.editedItem._id}/document`,{"index":index})
            .then(res =>{console.log(res);})
            .catch(err =>{console.log(err)})
        }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '新增发票' : '修改发票'
      }
    },
    mounted(){
      this.initialize()
      this.getFund()
      this.paramsid = this.$route.params.id
    }, 
    activated(){
        if(this.paramsid !== this.$route.params.id){
            this.getFund()
            this.initialize()
            this.paramsid = this.$route.params.id
        }
    },
    watch:{
      fund(val){
        const {contract_name,contract_code,tax_rate,Management_fee,stamp_tax,income_tax,insurance} = val
        this.editedItem = {fund:this.paramsid,contract_name,contract_code,
        tax_rate,Management_fee,stamp_tax,income_tax,insurance}
        this.defaultItem = {fund:this.paramsid,contract_name,contract_code,
        tax_rate,Management_fee,stamp_tax,income_tax,insurance}
        console.log(this.editedItem)
      },
    }
}
</script>