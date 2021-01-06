<template>
   <v-app class="blue accent-2 rounded-lg">
<<<<<<< HEAD
         <v-container>
            <v-row dense>
                <v-col cols="12" md="12">
                    <v-card color="white" min-height="600">
                        <v-card-title class="headline indigo white--text">   
                                会议查找
                                <v-spacer></v-spacer>
                                <v-text-field dark append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                        </v-card-title>
                        <v-card-title class='headline indigo white--text'>
                                <v-menu v-model="filtermenu" :close-on-content-click="false" :nudge-right="80" transition="scale-transition" offset-y min-width="290px">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-row dense>
                                        <v-col cols="7" md="3">
                                        <v-text-field dense dark v-model="datefilter" label="日期筛选器" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                        </v-col>
                                        </v-row>
                                    </template>
                                    <v-date-picker v-model="datefilter" @input="filtermenu = false"></v-date-picker>
                                </v-menu>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" :loading='btnloading' class="mr-4">会议纪要公示</v-btn>
                            <v-dialog v-model="dialog" max-width="600px" persistent transition="dialog-bottom-transition">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="primary" v-bind="attrs" v-on="on" :loading='btnloading'>新增会议</v-btn>
                                </template>
                                <v-card>
                                    <v-app-bar color="indigo">
                                            <v-toolbar-title class="white--text">会议详细</v-toolbar-title>
                                    </v-app-bar>
                                    <v-card-text>
                                            <v-row>
                                                <v-col cols="12" md="12">
                                                    <v-text-field dense label="会议主题*" required v-model="editedItem.theme"></v-text-field>
                                                </v-col>
                                                <v-col cols="6" md="4">
                                                    <v-autocomplete dense :items="participants" label="主持人" v-model="editedItem.host"
                                                    solo></v-autocomplete>
                                                </v-col>
                                                <v-col cols="6" md="4">
                                                    <v-autocomplete dense :items="participants" label="记录员" v-model="editedItem.recorder"
                                                    solo></v-autocomplete>
                                                </v-col>
                                                <v-col cols="6" md="6">
                                                    <v-menu ref="datemenu" v-model="datemenu" :close-on-content-click="false" transition="scale-transition"
                                                    offset-y min-width="290px">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field dense label="会议日期*" v-bind="attrs" v-on="on" v-model="editedItem.date"
                                                            required readonly prepend-icon="mdi-calendar"></v-text-field>
                                                        </template>
                                                        <v-date-picker ref="datepicker" v-model="editedItem.date" 
                                                        min="1996" @change="savedate" locale="zh-cn" :first-day-of-week="0"></v-date-picker>
                                                    </v-menu>
                                                </v-col>
                                                <v-col cols="6" md="6">
                                                    <v-text-field dense label="会议地点*" v-model="editedItem.meetingplace" 
                                                    required></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="12">
                                                    <v-autocomplete dense
                                                    :items="participants" v-model="editedItem.participants"
                                                    label="与会人员" clearable
                                                    multiple chips deletable-chips
                                                    ></v-autocomplete>
                                                </v-col>
                                            </v-row>
                                            <v-row dense>
                                                <v-col cols="12">
                                                    <v-list dense>
                                                        <v-list-group :value="true" prepend-icon="fa-users">
                                                            <template v-slot:activator>
                                                            <v-list-item-title>缺席人员</v-list-item-title>
                                                            </template>
                                                            <v-list-item v-for="(i,index) in editedItem.absent" :key="index">
                                                                <v-row dense>
                                                                    <v-col cols="3" md="3">
                                                                        <v-autocomplete dense :items="participants" label="缺席人姓名" class="white--text mt-3" v-model="i.username"></v-autocomplete>
                                                                    </v-col>
                                                                    <v-spacer></v-spacer>
                                                                    <v-col cols="8" md="8">
                                                                        <v-text-field dense label="缺席人原因" class="white--text mt-3" v-model="i.reason"></v-text-field>
                                                                    </v-col> 
                                                                </v-row>                                                          
                                                            </v-list-item>
                                                        <v-row dense><v-col cols="1" md="1" class="pt-3">
                                                                        <v-btn icon @click.stop="addabsent"><v-icon>mdi-plus</v-icon></v-btn>
                                                                    </v-col></v-row> 
                                                        </v-list-group>
                                                    </v-list>
                                                </v-col>

                                                <v-col cols="12">
                                                    <v-list dense>
                                                        <v-list-group :value="true" prepend-icon="fa-users">
                                                            <template v-slot:activator>
                                                            <v-list-item-title>会议报告</v-list-item-title>
                                                            </template>
                                                            <v-list-item dense v-for="(i,index) in editedItem.content" :key="index">
                                                                <v-card width="600px">
                                                                    <v-app-bar color="indigo">
                                                                        <v-autocomplete dark dense :items="editedItem.participants" label="发言人姓名" class="white--text mt-3" v-model="i.username"></v-autocomplete>
                                                                    </v-app-bar>
                                                                    <v-textarea auto-grow  rows="1" filled dense label="发言内容" class="white--text mt-3"  v-model="i.report"></v-textarea>
                                                                </v-card>
                                                            </v-list-item>
                                                        <v-row dense><v-col cols="1" md="1" class="pt-3">
                                                                        <v-btn icon @click.stop="addcontent"><v-icon>mdi-plus</v-icon></v-btn>
                                                                    </v-col></v-row> 
                                                        </v-list-group>
                                                    </v-list>
                                                </v-col>
                                            </v-row>
                                        <small>*indicates required field</small>
                                    </v-card-text>
                                    <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="indigo darken-1 white--text"  @click.stop="close">取消</v-btn>
                                    <v-btn color="indigo darken-1 white--text"  @click.stop="save" >保存</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-card-title>
                            <v-row class="d-flex mx-1" >
                                <v-col cols="12" md="3" v-for="(value,index) of profiles" :key="index">
                                    <v-card  elevation="4" outlined @click="editItem (value)">
                                        <v-app-bar color="indigo">
                                            <v-toolbar-title class="white--text">【{{getyear(value.date)}}】第{{getmonth(value.date)}}期</v-toolbar-title>
                                        </v-app-bar>
                                        <v-card-subtitle class="pb-0 black--text">会议主题:{{value.theme}}</v-card-subtitle>
                                        <v-card-subtitle class="pb-0 black--text">
                                            参会人员人数为:{{value.participants.length}}
                                            <v-spacer></v-spacer>
                                            缺席人员人数为:{{value.absent.length}}
                                        </v-card-subtitle>
                                        <v-card-text class="pb-1 black--text">
                                            <div>会议发生日期:{{value.date}}</div> 
                                        </v-card-text>  
                                        <v-row dense> 
                                            <v-col cols=8>
                                                <v-card-text class="pb-1 black--text">
                                                主持人:{{value.host}}
                                                <v-spacer></v-spacer>
                                                记录员:{{value.recorder}}
                                            </v-card-text> 
                                            </v-col>
                                            <v-col cols=4 class="d-flex justify-end">
                                                <v-card-actions>
                                                    <v-btn icon class="indigo--text" @click.stop="deleteItem(value)">
                                                        <v-icon>mdi-delete</v-icon>
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                </v-col>
                            </v-row>
                            <v-dialog v-model="dialogDelete" max-width="290px" persistent>
                                <v-card color="deep-purple accent-3">
                                    <v-app-bar color="deep-purple accent-4">
                                        <v-icon class="mr-5 yellow--text">mdi-alert-outline</v-icon>
                                        <v-toolbar-title class="white--text">确定要删除
                                            <p class="d-inline yellow--text">【2020】第{{editedItem.date}}期</p>
                                            这个会议纪要吗
                                        </v-toolbar-title>
                                    </v-app-bar>
                                    <v-card-text class="white--text d-block my-5" >此纪要可能做为重要决议的记录
                                    强制删除可能导致该资料造成不可逆的损害。此处不建议删除纪要
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="white" outlined @click.stop="closeDelete">取消</v-btn>
                                        <v-btn color="white" outlined @click.stop="deleteItemConfirm">确认</v-btn>
                                        <v-spacer></v-spacer>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                    </v-card>
                </v-col>
            </v-row>
         </v-container>
=======
         
>>>>>>> 0052218504708c33ecd611734c095f0d71514235
    </v-app>
</template>

<script>
export default {
<<<<<<< HEAD
    props:{employees:Array},
    name: 'Weeklyreport',
    data(){
        return{
            participants:[],
            profiles:[
                {
                    date:'2020-01-20',participants:['王晓军','叶镜年','鲁庆芳','叶展华'],meetingplace:'大会议室',
                    absent:[{username:'叶展华',reason:'外出办事'},{username:'罗炯',reason:'外出办事'}],
                    host:'叶伟忠',recorder:'叶丽艳', Backtracking:['上周劳务时间解决','声优通过'],theme:'管理层会议',
                    content:[{username:'叶展华',report:'1.伯尔曼酒店维修事情2.嘉慧地产项目验收阶段'},{username:'叶小蝶',report:'国优奖准备事项'}],
                    decision:['战机时间维修','准备年终报表']
                },
                {
                    date:'2020-01-27',participants:['王晓军','叶镜年','鲁庆芳','叶小蝶','叶展华','叶伟忠'],meetingplace:'大会议室',
                    absent:[{username:'叶展华',reason:'外出办事'}],
                    host:'叶伟忠',recorder:'叶丽艳', Backtracking:['上周劳务时间解决','声优通过'],theme:'管理层会议',
                    content:[{username:'叶展华',report:'1.伯尔曼酒店维修事情2.嘉慧地产项目验收阶段'},{username:'叶小蝶',report:'国优奖准备事项'}],
                    decision:['战机时间维修','准备年终报表']
                },
                {
                    date:'2020-07-14',participants:['王晓军','叶镜年','鲁庆芳','叶小蝶'],meetingplace:'大会议室',
                    absent:[{username:'叶展华',reason:'外出办事'},{username:'罗炯',reason:'外出办事'}],
                    host:'叶伟忠',recorder:'叶丽艳', Backtracking:['上周劳务时间解决','声优通过'],theme:'管理层会议',
                    content:[{username:'叶晓晨',report:'伯尔曼酒店维修事情2.嘉慧地产项目验收阶段'},{username:'叶小蝶',report:'国优奖准备事项'}],
                    decision:['战机时间维修','准备年终报表']
                }
            ],
            dialog:false,
            dialogDelete:false,
            btnloading:false,
            datemenu:false,
            filtermenu:false,
            datefilter:'',
            editedItem:{date:'',participants:[],absent:[{username:'',reason:''}],host:'',recorder:'',theme:'',Backtracking:[],content:[{username:'',report:""}],decision:[]},
            defaultItem:{date:'',participants:[],absent:[{username:'',reason:''}],host:'',recorder:'',theme:'',Backtracking:[],content:[],decision:[]},
        }
    },
    methods:{
        getyear(date){
            let array = date.split("-")
            return array[0]
        },
        getmonth(date){
            let array = date.split("-")
            let day = parseInt(array[1])*30 + parseInt(array[2])
            return Math.floor(day / 7) 
        },

        editItem (item) {
        this.editedIndex = this.profiles.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        console.log(this.editedItem)
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

        close () {
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
            if (this.editedIndex > -1) {
            Object.assign(this.profiles[this.editedIndex], this.editedItem)
            } else {
            this.profiles.push(this.editedItem)
            }
            this.close()
        },

        savedate (date) {
            this.$refs.datemenu.save(date)
        },

        addabsent(){
            this.editedItem.absent.push({usernamme:'',reason:''})
        },

        addcontent(){
            this.editedItem.content.push({usernamme:'',report:''})
        }
        
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    beforeMount(){
        for (var i=0; i < this.employees.length ; ++i){
            this.participants.push(this.employees[i]["username"]);
        }
        this.participants.push('全体员工')
    }
    
=======
    name: 'Weeklyreport',
    data(){
        return{
            cards:[{avatat:'',name:'',department:'',position:''}]
        }
    },
    methods:{
        add_cards(){
            this.cards.push({avatat:'',name:'',department:'',position:''})
        }
    }
>>>>>>> 0052218504708c33ecd611734c095f0d71514235
}
</script>