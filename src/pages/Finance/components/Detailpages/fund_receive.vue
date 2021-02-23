<template>
  <div class="w-full">
    <div class="d-flex py-3 ml-4 mt-4">
        <div>
            <div class="display-1">收款管理</div>
            <v-breadcrumbs :items="breadcrumbs" large class="pa-0 py-2"></v-breadcrumbs>
        </div>
    </div>
    <div min-height="700">
      <v-card dense color="white" min-height="700">
          <v-card-title class="h4">搜索
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
          </v-card-title>
          <v-data-table dense calculate-widths :headers="headers" :items="profiles" :search="search" sort-by="calories" class="elevation-1" :loading='dataloading' loading-text="加载数据中请等待">
              <template v-slot:top>
                  <v-toolbar flat>
                      <v-toolbar-title>列表操作</v-toolbar-title>
                      <v-divider class="mx-4" inset vertical></v-divider>
                      <v-spacer></v-spacer>
                      <v-dialog v-model="dialog" max-width="700px" persistent scrollable>
                      <template v-slot:activator="{ on, attrs }">
                          <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" :loading='dataloading'>新增收款</v-btn>
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
                                    <v-text-field disabled dense label="项目名称" outlined prepend-icon="mdi-rename-box" v-model="fund.contract_name"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field disabled dense label="工程负责人" outlined prepend-icon="mdi-account" v-model="fund.copartner_name"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field disabled dense label="合同编号" outlined prepend-icon="mdi-barcode" v-model="fund.contract_code"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field v-if="fund.contract" disabled dense label="建设单位" outlined prepend-icon="mdi-office-building" v-model="fund.contract.construction_unit"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field v-if="fund.contract" disabled dense label="工程地点" outlined prepend-icon="mdi-map-marker" v-model="fund.contract.locations"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field v-if="fund.contract" disabled dense label="合同金额" outlined prepend-icon="mdi-cash" v-model="fund.contract.construction_cost"></v-text-field>
                                </v-col>
                                </v-row>
                                <v-divider></v-divider>
                              <v-card-subtitle>到款信息:</v-card-subtitle>
                              <v-row dense>
                                <v-col cols="12" md="6">
                                    <v-text-field dense label="审批表编号" outlined prepend-icon="mdi-barcode" v-model="editedItem.Approval_code"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field dense label="到款日期" type="date" outlined prepend-icon="mdi-calendar-blank" v-model="editedItem.arrival_date"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field dense label="到款总金额" prefix="$" type="number" :rules="[rules.required]" outlined prepend-icon="mdi-cash" v-model="editedItem.arrival_amount"></v-text-field>
                                </v-col>
                              </v-row>
                                <v-divider></v-divider>
                                <v-card-subtitle>预计扣费:</v-card-subtitle>
                              <v-row dense>
                                <v-col cols="12" md="6">
                                    <v-text-field dense label="管理费率" type="number" :rules="[rules.required]" outlined prepend-icon="mdi-brightness-percent" v-model="editedItem.management_fee_rate"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field dense label="管理费" disabled prefix="$" :rules="[rules.required]" type="number" outlined prepend-icon="mdi-cash" v-model="editedItem.management_feeamount"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field dense label="所得税率" type="number" :rules="[rules.required]" outlined prepend-icon="mdi-brightness-percent" v-model="editedItem.income_tax_rate"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field dense label="所得税" prefix="$" :rules="[rules.required]" disabled type="number" outlined prepend-icon="mdi-cash" v-model="editedItem.income_tax_amount"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="12" dense>
                                    <v-subheader d-block dense>根据发票暂扣增值税:
                                        <v-spacer></v-spacer>
                                        <v-switch color="green" label='全额收取' v-if="editedIndex <= -1" v-model="switcher.fundInvoiceAmount"></v-switch>
                                    </v-subheader>
                                </v-col>
                                
                                <v-col cols="12" md="6" v-if="editedIndex <= -1">
                                    <v-autocomplete dense :items="fund_invoice" return-object item-text="invoice_code" item-value="invoice_code" label="工程发票编号" hint="工程发票编号" prepend-icon="mdi-barcode" v-model="select.fund_invoice"
                                    solo :search-input.sync="search_temp.fund_invoice"></v-autocomplete>
                                </v-col>
                                <v-col cols="12" md="6" v-if="editedIndex !== -1">
                                    <v-text-field dense solo disabled hint="对应发票编码" label="对应发票编码" outlined prepend-icon="mdi-cash" v-model="editedItem.fundInvoiceCode"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field dense solo :disabled="switcher.fundInvoiceAmount" hint="发票含税价" label="发票金额(含税金额)" type="number" outlined prepend-icon="mdi-cash" v-model="editedItem.fundInvoiceAmount"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field dense label="增值税率" :disabled="editedIndex !== -1" :rules="[rules.required]" type="number" outlined prepend-icon="mdi-brightness-percent" v-model="editedItem.vadded_tax_rate"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field dense label="增值税" :rules="[rules.required]" prefix="$" disabled type="number" outlined prepend-icon="mdi-cash" v-model="editedItem.vadded_tax_amount"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field dense label="附加税率" :disabled="editedIndex !== -1" :rules="[rules.required]" type="number" outlined prepend-icon="mdi-brightness-percent" v-model="editedItem.additional_tax_rate"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field dense label="附加税" :rules="[rules.required]" prefix="$" disabled type="number" outlined prepend-icon="mdi-cash" v-model="editedItem.additional_tax_amount"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="12" dense>
                                    <v-subheader d-block dense>根据合同总额扣取:</v-subheader>
                                    <v-subheader v-if="fund.contract">当前合同总额为(包含增项){{fund.contract.construction_cost}}, 
                                        未收税的额度为 <v-subheader class='indigo--text'>{{undealAmount}}</v-subheader>
                                        <v-spacer></v-spacer>
                                        <v-switch color="green" label='全额收取' v-model="switcher.construction_cost"></v-switch>
                                    </v-subheader>
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-text-field dense solo :disabled="switcher.construction_cost" hint="实际收取额度(工程造价)" label="实际收取额度(工程造价)" type="number" outlined prepend-icon="mdi-cash" v-model="editedItem.charged_amount"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field dense label="印花税率" :rules="[rules.required]" type="number" outlined prepend-icon="mdi-brightness-percent" v-model="editedItem.stamp_tax_rate"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field dense label="印花税" prefix="$" :rules="[rules.required]" disabled type="number" outlined prepend-icon="mdi-cash" v-model="editedItem.stamp_tax_amount"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field dense label="保险费率" type="number" :rules="[rules.required]" outlined prepend-icon="mdi-brightness-percent" v-model="editedItem.insurance_rate"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field dense label="保险费" prefix="$" disabled :rules="[rules.required]" type="number" outlined prepend-icon="mdi-cash" v-model="editedItem.insurance_amount"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="12" dense>
                                    <v-subheader d-block dense>其余费用:</v-subheader>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field dense label="转账手续费" prefix="$" type="number" :rules="[rules.required]" outlined prepend-icon="mdi-cash" v-model="editedItem.transfer_fee"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field dense label="项目章押金" prefix="$" type="number" :rules="[rules.required]" outlined prepend-icon="mdi-cash" v-model="editedItem.seal_deposit"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field dense label="保函保证金" prefix="$" type="number" :rules="[rules.required]" outlined prepend-icon="mdi-cash" v-model="editedItem.enginering_deposit"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field dense label="保函保证金手续费" prefix="$" type="number" :rules="[rules.required]" outlined prepend-icon="mdi-cash" v-model="editedItem.enginering_deposit_handlingfee"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field dense label="其他费用" prefix="$" type="number" :rules="[rules.required]" outlined prepend-icon="mdi-cash" v-model="editedItem.other"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field dense label="预缴税金" prefix="$" type="number" :rules="[rules.required]" outlined prepend-icon="mdi-cash" v-model="editedItem.prepaid_tax"></v-text-field>
                                </v-col>
                                <v-divider></v-divider>
                                <v-col cols="12" md="6">
                                    <v-text-field dense label="总扣款额" prefix="$" disabled type="number" :rules="[rules.required]" outlined prepend-icon="mdi-cash" v-model="editedItem.totalreduce_amount"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field dense label="应付资金" prefix="$" disabled type="number" :rules="[rules.required]" outlined prepend-icon="mdi-cash" v-model="editedItem.account_due"></v-text-field>
                                </v-col>
                              </v-row>
                              <small>*为防止数据错误表单为空时请填0</small>
                              <v-divider></v-divider>
                                  <div v-if="editedIndex > -1">
                                      <v-card-subtitle>上传文件:
                                          <input type="file" ref="inputFile" style="display:none" @change="UploadFiles($event)" multiple="multiple">
                                              <v-btn color="indigo white--text" class="ml-6"  @click="fileinput" :loading="dataloading">Upload
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
                              <v-btn color="white" :loading='dataloading' outlined @click.stop="closeDelete">取消</v-btn>
                              <v-btn color="white" :loading='dataloading' outlined @click.stop="deleteItemConfirm">确认</v-btn>
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
            files,axioscount:0,
            dataloading:true,
            dialog : false, 
            dialogDelete: false,                                        
            btnloading: false,
            selectedloading:false,
            rules:{required: value => value >= 0 || '必须输入数字'},
            fund:{},
            fund_invoice:[],
            uploadfiles:[],
            undealAmount:0,

            search:'',
            paramsid:'',

            //显示的文件和编辑文件
            profiles: [],
            editedIndex: -1,
            editedItem:{},
            defaultItem:{},
            switcher:{fundInvoiceAmount:true,construction_cost:false},
            snacker:{sbar:false,stext:"",scolor:""},
            search_temp:{fund_invoice:''},
            select:{fund_invoice:{total_amount:0}},
            breadcrumbs: [{text: '明细表列表',disabled: false,to: '/finance/fund'},
                          {text: `XXXXXXX`,disabled: true,href: '#'},
                          {text: '付款详情页',disabled: true,href: '#'}],
            headers: [
                    
                    {text: '审批表编号', value: 'Approval_code',sortable: false},
                    { text: '到款日期', value: 'arrival_date',sortable: false},
                    { text: '到款金额', value: 'arrival_amount', sortable: false,},
                    { text: '管理费', value: 'management_feeamount'},
                    { text: '所得税', value: 'income_tax_amount'},
                    { text: '增值税', value: 'vadded_tax_amount'},
                    { text: '附加税', value: 'additional_tax_amount'},
                    { text: '印花税', value: 'stamp_tax_amount'},
                    { text: '保险费', value: 'insurance_amount'},
                    { text: '转账手续费', value: 'transfer_fee'},
                    { text: '项目章押金', value: 'seal_deposit'},
                    { text: '保函保证金', value: 'enginering_deposit'},
                    { text: '保函手续费', value: 'enginering_deposit_handlingfee'},
                    { text: '其他', value: 'other'},
                    { text: '预缴税金', value: 'prepaid_tax'},
                    { text: '扣费合计', value: 'totalreduce_amount'},
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
        this.editedIndex = this.profiles.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        },

        deleteItem (item) {
        this.editedIndex = this.profiles.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
        this.dialogDelete = true
        },

        async deleteItemConfirm () {
            this.dataloading = true
            await this.$http.delete(`http://localhost:3000/fund_received/${this.editedItem._id}`,this.editedItem)
                .then(res=> {
                    Object.assign(this.profiles[this.editedIndex], this.editedItem)
                    this.switch_snap(true,`删除成功`,"green"),console.log(res)
                    this.profiles.splice(this.editedIndex, 1)
                    this.getFund()
                    })
                .catch(err => {
                    this.switch_snap(true,`删除失败`,"red"),
                    this.getFund()
                    console.log(err)})
        this.closeDelete()
        },

        close(){
        this.dialog = false
        this.btnloading = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
          this.select = {fund_invoice:{total_amount:0}}
          this.switcher = {fundInvoiceAmount:true}
        })
        },

        //index为-1则上传,不为则修改
        async save () {
            this.dataloading = true
            if (this.editedIndex > -1) {
                await this.$http.patch(`http://localhost:3000/fund_received/${this.editedItem._id}`,this.editedItem)
                .then(res=> {
                    Object.assign(this.profiles[this.editedIndex], this.editedItem)
                    this.switch_snap(true,`修改成功`,"green"),
                    this.getFund()
                    console.log(res)})
                .catch(err => {this.switch_snap(true,`修改失败`,"red"),console.log(err)})
            } else {
                await this.$http.post(`http://localhost:3000/fund_received`,this.editedItem)
                .then(res=> {
                    this.editedItem._id=res.data._id;
                    this.profiles.push(this.editedItem),
                    this.getFund()
                    this.switch_snap(true,`创建成功`,"green"),console.log(res)})
                .catch(err => {this.switch_snap(true,`创建失败`,"red"),console.log(err)})
            }
            this.close()
        },

        closeDelete () {
        this.dialogDelete = false
        this.btnloading = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
          this.dataloading = false
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
            await this.$http.get(`http://localhost:3000/fund_received/searchByfund/${id}?per_page=100&page=1&keyword=`)
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
                            this.undealAmount = parseFloat(this.fund.contract.construction_cost - this.fund.charged_amount).toFixed(2)
                             console.log("this.undealAmount:"+this.undealAmount)
                            })
                .catch(err => {console.log(err)})
        },

        getInvoice(val){
        let seqNumber = ++this.axioscount;
        let id = this.$route.params.id
        this.$http.get(`http://localhost:3000/fund_invoice/searchByfund/${id}?per_page=1000&page=1&keyword=${val}`)
            .then(res=> {
                if (seqNumber === this.axioscount) {
                    this.fund_invoice = res.data.fund_invoicelist
                        for (var i=0; i < this.fund_invoice.length ; ++i){
                            delete this.fund_invoice[i].createdAt
                            delete this.fund_invoice[i].updatedAt
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
            this.$refs.inputFile.click()
        },

        setNum(){
            this.editedItem.totalreduce_amount = parseFloat((parseFloat(this.editedItem.vadded_tax_amount)+ parseFloat(this.editedItem.management_feeamount)+ parseFloat(this.editedItem.stamp_tax_amount)+
            parseFloat(this.editedItem.income_tax_amount)+ parseFloat(this.editedItem.insurance_amount)+ parseFloat(this.editedItem.additional_tax_amount)+ parseFloat(this.editedItem.seal_deposit)+ 
            parseFloat(this.editedItem.transfer_fee)+ parseFloat(this.editedItem.enginering_deposit_handlingfee)+ parseFloat(this.editedItem.other)+ parseFloat(this.editedItem.enginering_deposit)).toFixed(2))

            this.editedItem.account_due = parseFloat(
            (parseFloat(this.editedItem.arrival_amount) - 
            parseFloat(this.editedItem.totalreduce_amount) + 
            parseFloat(this.editedItem.prepaid_tax))
            .toFixed(2)
            )
            console.log(this.editedItem)
        },

        async UploadFiles(){
            let  document = []
            let formData = new FormData();
            for( var i = 0; i < this.$refs.inputFile.files.length; i++ ){
                let file = this.$refs.inputFile.files[i];
                formData.append('file', file);
            }
            await this.$http.post(`http://localhost:3000/upload/multiplefilesTopath?keyword=${this.editedItem.contract_name}/收款详情/${this.editedItem.Approval_code}`,formData,
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
        return this.editedIndex === -1 ? '新增收款记录' : '修改收款记录'
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
            this.paramsid = this.$route.params.id
        }
        this.initialize()
        this.getFund()
    },
    watch:{
        fund(val){
            const {contract_name,contract_code,tax_rate,Management_fee,stamp_tax,income_tax,insurance} = val
            this.editedItem = {
                fund:this.paramsid,contract_name,contract_code,
                vadded_tax_rate:tax_rate,management_fee_rate:Management_fee,stamp_tax_rate:stamp_tax,income_tax_rate:income_tax,insurance_rate:insurance,additional_tax_rate:0.12,
                vadded_tax_amount:0,management_feeamount:0,income_tax_amount:0,additional_tax_amount:0,arrival_amount:0,seal_deposit:0,transfer_fee:0,fundInvoiceAmount:0,
                enginering_deposit_handlingfee:0,other:0,prepaid_tax:0,totalreduce_amount:0,account_due:0,enginering_deposit:0,charged_amount:0}

            this.defaultItem = {
                fund:this.paramsid,contract_name,contract_code,
                vadded_tax_rate:tax_rate,management_fee_rate:Management_fee,stamp_tax_rate:stamp_tax,income_tax_rate:income_tax,insurance_rate:insurance,additional_tax_rate:0.12,
                vadded_tax_amount:0,management_feeamount:0,income_tax_amount:0,additional_tax_amount:0,arrival_amount:0,seal_deposit:0,transfer_fee:0,fundInvoiceAmount:0,
                enginering_deposit_handlingfee:0,other:0,prepaid_tax:0,totalreduce_amount:0,account_due:0,enginering_deposit:0,charged_amount:0}
                this.editedItem.insurance_amount = parseFloat((insurance*this.editedItem.charged_amount).toFixed(2))
                this.editedItem.stamp_tax_amount = parseFloat((stamp_tax* this.editedItem.charged_amount).toFixed(2))
                this.defaultItem.insurance_amount = parseFloat((insurance*this.editedItem.charged_amount).toFixed(2))
                this.defaultItem.stamp_tax_amount = parseFloat((stamp_tax* this.editedItem.charged_amount).toFixed(2))
                this.setNum()
        },

        'editedItem.arrival_amount'(val){
            const {management_fee_rate,income_tax_rate} = this.editedItem
            this.editedItem.arrival_amount = parseFloat(val)
            this.editedItem.management_feeamount = parseFloat((val*management_fee_rate).toFixed(2))
            this.editedItem.income_tax_amount = parseFloat((val*income_tax_rate).toFixed(2))
            this.setNum()
        },

        'editedItem.vadded_tax_rate'(val){
            this.editedItem.vadded_tax_amount = parseFloat((this.select.fund_invoice.total_amount/parseFloat(1+val))*val).toFixed(2)
            this.setNum()},
        'editedItem.management_fee_rate'(val){
            this.editedItem.management_feeamount = parseFloat((val*this.editedItem.arrival_amount).toFixed(2))
            this.setNum()},
        'editedItem.stamp_tax_rate'(val){
            if(val==''){this.editedItem.stamp_tax_rate=0}
            this.editedItem.stamp_tax_amount = parseFloat((val * this.editedItem.charged_amount).toFixed(2))
            this.setNum()},
        'editedItem.income_tax_rate'(val){
            if(val==''){this.editedItem.income_tax_rate=0}
            this.editedItem.income_tax_amount = parseFloat((val*this.editedItem.arrival_amount).toFixed(2))
            this.setNum()},
        'editedItem.additional_tax_rate'(val){
            if(val==''){this.editedItem.additional_tax_rate=0}
            this.editedItem.additional_tax_amount = parseFloat((val*this.editedItem.vadded_tax_amount).toFixed(2))
            this.setNum()},
        'editedItem.insurance_rate'(val){
            if(val==''){this.editedItem.insurance_rate=0}
            this.editedItem.insurance_amount = parseFloat((val*this.editedItem.charged_amount).toFixed(2))
            this.setNum()},
        'editedItem.transfer_fee'(val){
            if(val==''){this.editedItem.transfer_fee=0}
            this.setNum()},
        'editedItem.seal_deposit'(val){
            if(val==''){this.editedItem.seal_deposit=0}
            this.setNum()},
        'editedItem.enginering_deposit'(val){
            if(val==''){this.editedItem.enginering_deposit=0}
            this.setNum()},
        'editedItem.other'(val){
            if(val==''){this.editedItem.other=0}
            this.setNum()},
        'editedItem.prepaid_tax'(val){
            if(val==''){this.editedItem.prepaid_tax=0}
            this.setNum()},
        'editedItem.enginering_deposit_handlingfee'(val){
            if(val==''){this.editedItem.enginering_deposit_handlingfee=0}
            this.setNum()},
        'search_temp.fund_invoice'(val) {
            this.getInvoice(val)
        },
        'select.fund_invoice'(val) {
            console.log(val)
            this.editedItem.fundInvoiceCode = val.invoice_code
            this.editedItem.fundInvoiceAmount = parseFloat(val.total_amount)
            this.editedItem.vadded_tax_amount = parseFloat(((this.editedItem.fundInvoiceAmount/parseFloat(1+this.editedItem.vadded_tax_rate))*this.editedItem.vadded_tax_rate).toFixed(2))
            this.editedItem.additional_tax_amount = parseFloat((this.editedItem.additional_tax_rate*this.editedItem.vadded_tax_amount).toFixed(2))
            this.setNum()
        },
        'switcher.fundInvoiceAmount'(val){
            if(val == true) {
               this.editedItem.fundInvoiceAmount = parseFloat(this.select.fund_invoice.total_amount)
            }
        },
        'editedItem.fundInvoiceAmount'(val){
            if(val==''){val =0}
            this.editedItem.vadded_tax_amount = parseFloat((val/parseFloat(1+this.editedItem.vadded_tax_rate))*this.editedItem.vadded_tax_rate).toFixed(2) 
            this.editedItem.additional_tax_amount = parseFloat((this.editedItem.additional_tax_rate*this.editedItem.vadded_tax_amount).toFixed(2))
            this.setNum()
        },
        'switcher.construction_cost'(val){
            if(val == true) {
               this.editedItem.charged_amount = parseFloat(this.fund.contract.construction_cost-this.fund.charged_amount).toFixed(2)
            }
        },
        'editedItem.charged_amount'(val){
            if(val==''){val =0}
            this.editedItem.insurance_amount = parseFloat((this.editedItem.insurance_rate*val).toFixed(2))
            this.editedItem.stamp_tax_amount = parseFloat((this.editedItem.stamp_tax_rate*val).toFixed(2))
            this.setNum()
        },
    }
}
</script>