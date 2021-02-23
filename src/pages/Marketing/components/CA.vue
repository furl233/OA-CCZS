<template>
    <v-app class="blue accent-2 rounded-lg pa-3">
            <v-row dense>
                <v-col cols="12" md="12">
                    <v-card dense color="white" min-height="700">
                        <v-card-title class="headline indigo white--text">CA锁查找
                            <v-spacer></v-spacer>
                            <v-text-field dark v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                        </v-card-title>
                        <v-data-table :headers="headers" :items="profiles" :search="search" sort-by="calories" class="elevation-1">
                            <template v-slot:top>
                                <v-toolbar flat>
                                    <v-toolbar-title>列表操作</v-toolbar-title>
                                    <v-divider class="mx-4" inset vertical></v-divider>
                                    <v-spacer></v-spacer>
                                    <v-dialog v-model="dialog" max-width="500px" persistent>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">新增CA锁</v-btn>
                                    </template>
                                    <v-card>
                                        <v-app-bar color="indigo">
                                            <v-toolbar-title class="white--text">{{formTitle}}</v-toolbar-title>
                                        </v-app-bar>
                                          <div class="ma-3"> 
                                          <v-row dense >
                                              <v-col cols="12" md="5">
                                                  <v-text-field dense label="CA锁名" outlined prepend-icon="mdi-account" v-model="editedItem.name"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" md="7">
                                                  <v-text-field dense label="所属官网" outlined prepend-icon="mdi-web" v-model="editedItem.officalWeb"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" md="6">
                                                  <v-text-field dense label="备案省份" outlined prepend-icon="mdi-location-enter" v-model="editedItem.belongedarea"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" md="6">
                                                  <v-text-field dense label="账号" outlined prepend-icon="mdi-card" v-model="editedItem.account"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" md="6">
                                                  <v-text-field dense label="密码" outlined prepend-icon="mdi-onepassword" v-model="editedItem.password"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" md="6">
                                                  <v-text-field dense label="注册时间" outlined prepend-icon="mdi-clock-time-five" type="date" v-model="editedItem.registerDate"></v-text-field>
                                              </v-col>
                                               <v-col cols="12" md="6">
                                                  <v-text-field dense label="过期时间" outlined prepend-icon="mdi-clock-time-five" type="date" v-model="editedItem.expirationDate"></v-text-field>
                                              </v-col>
                                              <v-col cols=12 md="12">
                                                <v-autocomplete dense :items="participants" label="经办人"  v-model="editedItem.proccesser"
                                                    solo></v-autocomplete>
                                              </v-col>
                                          </v-row>
                                          </div>
                                          <v-card-actions>
                                              <v-spacer></v-spacer>
                                              <v-btn color="indigo darken-1 white--text"  @click.stop="close">取消</v-btn>
                                              <v-btn color="indigo darken-1 white--text"  @click.stop="save" >保存</v-btn>
                                          </v-card-actions>
                                    </v-card>
                                    </v-dialog>
                                    <v-dialog v-model="dialogDelete" max-width="500px" persistent>
                                        <v-card color="deep-purple accent-3">
                                            <v-app-bar color="deep-purple accent-4">
                                            <v-icon class="mr-5 yellow--text">mdi-alert-outline</v-icon>
                                            <v-toolbar-title class="white--text">确定要删除
                                                <p class="d-inline yellow--text">{{editedItem.name}}</p>
                                                这个CA锁吗</v-toolbar-title>
                                            </v-app-bar>
                                            <v-card-text class="white--text d-block my-5" >此CA的信息可作为
                                            后期项目重要溯源,并与多方资料有所关联，建议不删除并且修改属性
                                            <br><p class="font-weight-black d-inline-block yellow--text">"客户信用度"为 0</p>
                                            <br>以标识该客户并中止相继的合作</v-card-text>
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
                            <template v-slot:[`item.record`]="{ item }">
                                <v-chip color="green" dark>{{ item.record }}</v-chip>
                            </template>
                            <template v-slot:[`item.edit`]="{ item }">
                                <v-btn class="white--text" small @click="editItem(item)" :loading='dataloading' color="primary">修改<v-icon right dark>mdi-pencil</v-icon></v-btn>     
                            </template>
                            <template v-slot:[`item.delete`]="{ item }">
                                <v-btn class="white--text" small @click="deleteItem(item)" :loading='dataloading' color="red">删除<v-icon right dark>mdi-delete</v-icon></v-btn>
                            </template>
                            <template v-slot:[`item.officalWeb`]="{ item }">
                              <a :href="item.officalWeb" target="_blank" dark>{{ item.officalWeb }}</a>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-col>
            </v-row>
    </v-app>
</template>
<script>
export default {
     name: 'Co_partner',
     data(){
        return{
            dialog : false,
            dialogDelete: false,
            btnloading: false,
            participants:[],
            search:'',
            profiles: [{},{}],
            editedIndex: -1,
            editedItem: {},
            defaultItem: {},

            headers: [{text: 'CA名',align: 'center',sortable: false,value: 'name',},
                    { text: '所属官网', align: 'center', value: 'officalWeb' },
                    { text: '备案所属地方', align: 'center', value: 'belongedarea' },
                    { text: '账号', value: 'account' },
                    { text: '密码', value: 'password' },
                    { text: '经办人', value: 'proccesser',sortable: false, },
                    { text: '过期时间', value: 'expirationDate'},
                    { text: '使用状况', value: 'record'},
                    { text: '', value: 'edit', sortable: false},
                    { text: '', value: 'delete', sortable: false},
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

        closeDelete () {
        this.dialogDelete = false
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

        initialize () {
        this.profiles = [
          {
            name: '深圳市建筑工务署',
            officalWeb: "http://szwb.sz.gov.cn/",
            belongedarea:'广东省深圳市',
            account: "CCZZS",
            password:"AB123",
            registerDate:"2021-01-21",
            expirationDate:"2021-01-07",
            proccesser: "叶展华",
            record: 1,
          },
        ]},

        getemployee(){
          this.$http.get(`http://192.168.50.132:3000/users/getallusers?per_page=1000&page=1&keyword=`)
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
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '新增CA锁' : '修改CA锁'
      },
    },
    created(){
      this.initialize()
      this.getemployee()
    }
    
      
}
</script>