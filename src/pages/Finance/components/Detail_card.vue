<template>
    <v-app class="blue accent-2 rounded-lg">
        <v-container>
            <v-row dense>
                <v-col cols="12" md="12"> 
                    <v-card dense color="white" min-height="700">
                        <v-card-title class="headline indigo white--text">明细卡查找
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
                                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">新增明细卡</v-btn>
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
                                          
                                        
                                          <v-card-actions>
                                              <v-spacer></v-spacer>
                                              <v-btn color="indigo darken-1 white--text"  @click.stop="close">取消</v-btn>
                                              <v-btn color="indigo darken-1 white--text"  @click.stop="save" >保存</v-btn>
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
                                <v-icon small class="mr-2"  @click="editItem(item)">mdi-cash-plus</v-icon>
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
            dataloading:false,
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

            headers: [{text: '项目名',align: 'start',sortable: false,value: 'contract_name',},
                    { text: '项目经理', value: 'copartner_name',sortable: false},
                    { text: '合同编号', value: 'contract_code'},
                    { text: '已开票数额', value: 'totalinvoice_amount'},
                    { text: '已到账资金', value: 'totalarrival_amount'},
                    { text: '总付款(包括现金)', value: 'totalpayment'},
                    { text: '明细卡改动', value: 'actions', sortable: false },
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

        save () {
            console.log(this.editedItem)
            if (this.editedIndex > -1) {
            Object.assign(this.profiles[this.editedIndex], this.editedItem)
            } else {
            this.profiles.push(this.editedItem)
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

        initialize () {
            this.profiles = [{
                contract_name:'深圳市疾控中心',
                copartner_name:'陈观生',
                contract_code:'CC-2021A-123',
                totalinvoice_amount:2300000,
                totalarrival_amount:1000000,
                totalpayment:0,
            }]
        },
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '新增明细卡' : '修改明细卡'
      },
    },
    created(){
      this.initialize()
    }  
}
</script>