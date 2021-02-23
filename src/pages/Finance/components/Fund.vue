<template>
    <v-app class="blue accent-2 rounded-lg pa-3">
  
            <v-row dense>
                <v-col cols="12" md="12"> 
                    <v-card dense color="white" min-height="700">
                        <v-card-title class="headline indigo white--text">项目明细卡查找
                            <v-spacer></v-spacer>
                            <v-text-field dark v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                        </v-card-title>
                        <v-data-table dense :headers="headers" :items="profiles" :search="search" sort-by="calories" class="elevation-1" :loading='dataloading' loading-text="加载数据中请等待">
                            <template v-slot:top>
                                <v-toolbar flat>
                                    <v-toolbar-title>列表操作</v-toolbar-title>
                                    <v-divider class="mx-4" inset vertical></v-divider>
                                    <v-spacer></v-spacer>
                                    <v-dialog v-model="dialog" max-width="600px" persistent scrollable>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" :loading='dataloading'>选择工程添加明细卡</v-btn>
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
                                              <v-card-subtitle>拟定扣费额度:</v-card-subtitle>
                                              <v-row dense>
                                                <v-col cols="12" md="4">
                                                    <v-text-field dense label="销项税额" type="number" disabled outlined prepend-icon="mdi-account" v-model="editedItem.tax_rate"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <v-text-field dense label="管理费" type="number" disabled outlined prepend-icon="mdi-account" v-model="editedItem.Management_fee"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <v-text-field dense label="印花税" type="number" disabled outlined prepend-icon="mdi-account" v-model="editedItem.stamp_tax"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <v-text-field dense label="所得税" type="number" disabled outlined prepend-icon="mdi-account" v-model="editedItem.income_tax"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <v-text-field dense label="保险费率(如果有)" type="number" disabled outlined prepend-icon="mdi-account" v-model="editedItem.insurance"></v-text-field>
                                                </v-col>
                                                </v-row>
                                            <v-divider></v-divider>
                                                <div v-if="editedIndex > -1">
                                                    <v-card-subtitle>上传文件:
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
                            <template v-slot:[`item.invoicelog`]="{ item }">                                                                
                                <v-btn class="white--text" small @click="invoicelog(item)" color="amber">开票<v-icon right dark>mdi-receipt</v-icon></v-btn>
                            </template>
                             <template v-slot:[`item.paymentlog`]="{ item }">                                                                
                                <v-btn class="white--text" small @click="paymentlog(item)" color="blue-grey">付款<v-icon right dark>mdi-cash-minus</v-icon></v-btn>
                            </template>
                            <template v-slot:[`item.receivelog`]="{ item }">                                                                
                                <v-btn class="white--text" small @click="receivelog(item)" color="green">收款<v-icon right dark>mdi-cash-plus</v-icon></v-btn>
                            </template>
                        </v-data-table>
                    </v-card>
                    <Snap-bar :snacker='snacker'></Snap-bar>
                </v-col>
            </v-row>
        
    </v-app>
</template>
<script>
import SnapBar from '@/components/SnapBar.vue';
import {files} from '@/assets/icon/filesicon.js'
export default {
    name: 'Fund',
    data(){
        return{
            //默认表单数据
            files,
            axioscount:0,
            dataloading:true,
            dialog : false, 
            dialogDelete: false,                                        
            btnloading: false,
            enginerContract:[],
            uploadfiles:[],

            search:'',
            snacker:{sbar:false,stext:"",scolor:""},
            search_temp:{enginerContract:'',suppliers:''},
            select:{enginerContract:{},suppliers:{}},
            //显示的文件和编辑文件
            profiles: [],
            editedIndex: -1,
            editedItem: {},
            defaultItem: {},

            headers: [{text: '工程名称',align: 'start',sortable: false,value: 'contract_name',},
                    { text: '项目经理', value: 'copartner_name',sortable: false},
                    { text: '合同编号', value: 'contract_code',sortable: false},
                    { text: '工程造价', value: 'construction_cost'},
                    { text: '累计开票额度', value: 'totalinvoice_amount'},
                    { text: '累计到款额度', value: 'totalarrival_amount'},
                    { text: '累计收取增值税押金(不含附加)', value: 'totaltax_deposit'},
                    { text: '累计付款金额', value: 'totalpayment'},
                    { text: '', value: 'invoicelog', sortable: false,align: 'center'},
                    { text: '', value: 'receivelog', sortable: false},
                    { text: '', value: 'paymentlog', sortable: false}
                    ],
        }
    },

    components:{
        SnapBar
    },

    methods:{
        invoicelog(item){this.$router.push({name:'fund_invoice',params: { id:`${item._id}`} })},
        paymentlog(item){this.$router.push({name:'fund_payment',params: { id:`${item._id}`} })},
        receivelog(item){this.$router.push({name:'fund_receive',params: { id:`${item._id}`} })},

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
                await this.$http.patch(`http://localhost:3000/fund/${id}`,this.editedItem)
                .then(res=> {Object.assign(this.profiles[this.editedIndex], this.editedItem),this.switch_snap(true,'创建成功',"green"),console.log(res)})
                .catch(err => {this.switch_snap(true,'创建失败',"red"),console.log(err)})
            } else {
                await this.$http.post(`http://localhost:3000/fund`,this.editedItem)
                .then(res=> {this.editedItem._id=res.data._id;this.profiles.push(this.editedItem),this.switch_snap(true,'创建成功',"green"),console.log(res)})
                .catch(err => {this.switch_snap(true,'创建失败',"red"),console.log(err)})
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
            await this.$http.get(`http://localhost:3000/fund?per_page=30&page=1&keyword=&typekeyword=`)
                .then(res=> {this.profiles = res.data.fundlist
                            for (var i=0; i < this.profiles.length ; ++i){
                                delete this.profiles[i].createdAt
                                delete this.profiles[i].updatedAt
                            }
                            this.dataloading = false
                })
                .catch(err => {this.switch_snap(true,err.status,"red")})
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
            await this.$http.post(`http://localhost:3000/upload/multiplefilesTopath?keyword=${this.editedItem.contract_name}/劳务合同/${this.editedItem.supplier_name}`,formData,
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
        return this.editedIndex === -1 ? '新增项目明细卡' : '修改项目明细卡'
      },
    },
    activated(){
        this.initialize()
    },
    created(){
      this.initialize()
    },  
    watch:{
        'search_temp.enginerContract'(val) {
            this.getContract(val)
        },
        'select.enginerContract'(val){
            const {name,_id,construction_cost,registrar,registrarID,
            contract_code,tax_rate,Management_fee,stamp_tax,income_tax,insurance} = val

            this.editedItem = {contract_name:name,contract:_id,construction_cost,copartner_name:registrar,belongsTocopartner:registrarID,
            contract_code,tax_rate,Management_fee,stamp_tax,income_tax,insurance,totalinvoice_amount:0,
            totalarrival_amount:0,totaloutput_tax:0,totalpayment:0}
            this.editedItem = {contract_name:name,contract:_id,construction_cost,copartner_name:registrar,belongsTocopartner:registrarID,
            contract_code,tax_rate,Management_fee,stamp_tax,income_tax,insurance,totalinvoice_amount:0,
            totalarrival_amount:0,totaloutput_tax:0,totalpayment:0}
            console.log(this.editedItem)
        }
    }
}
</script>