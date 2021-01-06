<template>
   <v-app class="blue accent-2 rounded-lg">
         <v-container>
            <v-row dense>
                <v-col cols="12">
<<<<<<< HEAD
                    <v-card dense color="white" min-height="700">
                        <v-card-title class="h3 indigo white--text" dense>   
                                证照查找
                                <v-spacer></v-spacer>
                                <v-text-field dark dense append-icon="mdi-magnify" label="Search" value='输入名字' single-line hide-details @blur="search(value)"></v-text-field>
                        </v-card-title>
                        <v-card-actions class='indigo white--text d-block' dense>
                            <v-card-text dense class="h3 indigo white--text">按工种选择:</v-card-text>
                            <v-row dense>
                                <div class="mx-2" v-for="(i,index) in work_name" :key="index">
                                    <v-checkbox dark :label="i" color="white" class="ma-1" :value="i" hide-details v-model="name_selected"></v-checkbox>
                                </div>      
                            </v-row>
                        </v-card-actions>
                        <v-card-actions class='indigo white--text d-block' dense>
                            <v-card-text dense class="h3 indigo white--text">按证书类别选择:</v-card-text>
                            <v-row dense>
                                <div class="mx-2" v-for="(i,index) in alltypes.category" :key="index">
                                    <v-checkbox dark :label="i" color="white" class="ma-1" :value="i" hide-details v-model="category_selected"></v-checkbox>
                                </div>      
                            </v-row>
                        </v-card-actions>
                        <v-card-actions class='headline indigo white--text'>
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialog" max-width="350px" persistent transition="dialog-bottom-transition">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn dense color="primary" class="mr-4" v-bind="attrs" v-on="on">新增证照</v-btn>
                                </template>
                            <v-card color="white">
                                <v-app-bar color="indigo">
                                    <v-toolbar-title class="white--text">{{formTitle}}</v-toolbar-title>
                                </v-app-bar>
                                <div class="ma-3"> 
                                <v-row dense >
                                    <v-col cols="6" md="6">
                                        <v-autocomplete dense :items="Department" :disabled="loadingData.setParticipants" :loading="loadingData.setParticipants" label="部门选择" v-model="SelectedDepartment" @change="setParticipants(SelectedDepartment)"
                                        solo></v-autocomplete>
                                    </v-col>
                                    <v-col cols="6" md="6">
                                        <v-autocomplete dense :items="Participants" label="证照持有人(从社保人员内选择)" v-model="editedItem.username" 
                                        solo></v-autocomplete>
                                    </v-col>
                                    <v-col cols="4" md="4">
                                        <v-autocomplete dense :items="alltypes.category" label="证书类型" v-model="editedItem.category" @change="setTypeName(editedItem.category)"
                                        solo></v-autocomplete>
                                    </v-col>
                                    <v-col cols="4" md="4">
                                        <v-autocomplete dense :items="alltypes.name" label="证书名称" v-model="editedItem.name"
                                        solo></v-autocomplete>
                                    </v-col>
                                    <v-col cols="4" md="4">
                                        <v-text-field dense label="证书专业" v-model="editedItem.major"
                                        solo></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="12">
                                        <v-text-field dense label="证书编号" v-model="editedItem.certificate_id" outlined></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="12">
                                        <v-text-field dense label="注册时间" v-model="editedItem.certificate_time" outlined type="date"></v-text-field>
                                    </v-col>
                                    <v-col cols="6" md="6">
                                        <v-text-field dense label="有效时间(年)" v-model="editedItem.valid_period" solo type="number"></v-text-field>
                                    </v-col>
                                    <v-col cols="6" md="6">
                                        <v-autocomplete dense :items="alltypes.status" label="当前状态" v-model="editedItem.status"
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
                        </v-card-actions>
                            <v-card class="ma-3" v-for="(i,index) in profiles" :key="index" elevation="4">
                                <v-card-title class="indigo" height="1" ></v-card-title>
                                <v-row wrap>
                                    <v-col cols="4" md='4' class="ma-2">
                                       <div class="caption grey--text">职称工种</div>
                                       <div>{{i.name}}</div>
                                    </v-col>
                                     <v-col cols="3" md='1' class="my-1">
                                       <div class="caption grey--text">姓名</div>
                                       <div>{{i.username}}</div>
                                    </v-col>
                                    <v-col cols="4" md='1' class="my-1">
                                       <div class="caption grey--text">专业</div>
                                       <div>{{i.major}}</div>
                                    </v-col>
                                    <v-col cols="4" md='2' class="ma-1">
                                       <div class="caption grey--text">证照ID</div>
                                       <div>{{i.certificate_id}}</div>
                                    </v-col>
                                    <v-col cols="4" md='2' class="ma-1 ">
                                       <div class="caption grey--text">注册时间</div>
                                       <div>{{i.certificate_time}}</div>
                                    </v-col>
                                    <v-col cols="3" md='1' class="my-1">
                                       <div class="caption grey--text">状态</div>
                                       <v-chip small class="white--text" :color="setChipColor(i.status)">{{i.status}}</v-chip>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <div class="text-center">
                                <v-container>
                                <v-row justify="center">
                                    <v-col cols="8">
                                    <v-container class="max-width">
                                        <v-pagination
                                        v-model="list.page"
                                        class="my-1"
                                        :length="list.pagelength"
                                        :total-visible="7"
                                        ></v-pagination>
                                    </v-container>
                                    </v-col>
                                </v-row>
                                </v-container>
                            </div>    
=======
                     <v-card color="#385F73" dark>
                        <v-card-title class="headline">人员执照</v-card-title>
                        <v-card-subtitle>Listen to your favorite artists and albums whenever and wherever, online and offline.</v-card-subtitle>
                        <v-card-actions>
                            <v-btn text>Listen Now</v-btn>
                        </v-card-actions>
>>>>>>> 0052218504708c33ecd611734c095f0d71514235
                    </v-card>
                </v-col>
            </v-row>
         </v-container>
    </v-app>
</template>

<script>
<<<<<<< HEAD
import {work_name,ArrayOne,ArrayTwo,ArrayThree,ArrayFour,ArrayFive,ArraySix,Department} from '@/assets/employee/work_name.js'
export default {
    name: 'Humansource',
    props:{employees:Array},
    data(){
        return{
            //固定渲染数据
            work_name,ArrayOne,ArrayTwo,ArrayThree,ArrayFour,ArrayFive,ArraySix,Department,
            SelectedDepartment:'',
            Participants:[],
            list:{page:1,pagelength:10},
            name_selected:[],
            category_selected:['注册类','八大员','三类人员','职称证','执业资格','技术工人'],
            alltypes:{name:[],category:['注册类','八大员','三类人员','职称证','执业资格','技术工人'],status:['待定','被借出','被锁证']},
            

            //活动渲染数据
            dialog:false,
            dialogDelete:false,
            loadingData:{setParticipants:false},
            editedIndex: -1,
            editedItem:{},
            defaultItem:{},
            profiles:[
                {  name: "一级建造师",username:"叶展华",ID:'',
                    certificate_time: "2025年7月",certificate_id: "粤建安54896578",
                    valid_period: 5,major: "装饰装修",category: "注册类",status:"被借出",
                    licensing_agency: "广东省建设厅",licensing_imageurl: "asd"
                },
                {  name: "一级建造师",username:"叶小蝶",ID:'',
                    certificate_time: "2025年7月",certificate_id: "粤建安54896578",
                    valid_period: 5,major: "机电智能化",category: "注册类",status:"待定",
                    licensing_agency: "广东省建设厅",licensing_imageurl: "asd"
                },
                {  name: "一级建造师",username:"叶小蝶",ID:'',
                    certificate_time: "2025年7月",certificate_id: "粤建安54896578",
                    valid_period: 5,major: "机电智能化",category: "注册类",status:"待定",
                    licensing_agency: "广东省建设厅",licensing_imageurl: "asd"
                },
            ],
        }
    },
    methods:{
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
            console.log(this.editedItem)
            if (this.editedIndex > -1) {
            Object.assign(this.profiles[this.editedIndex], this.editedItem)
            } else {
            this.profiles.push(this.editedItem)
            }
            this.close()
        },

        toggleselect(){
            if(this.name_selected == []){
                this.name_selected.push(this.work_name)
            }else{this.name_selected = []}
        },

        //封装chexkbox的联动效果
        //输入参数为,选中的父级checkbox如何影响子checkbox的状态
        //arrayFather为父级checkbox当前数组,name为父级变化参数,array是子集的相应变化参数
        changeselect(arrayFather,name,array){
            if(arrayFather.indexOf(name)==-1){
                for(let k of array) {
                    this.name_selected=this.name_selected.filter(item=>item!==k);
                }
            }else{for(let k of array) {
                    this.name_selected=this.name_selected.filter(item=>item!==k);
                }
                this.name_selected.splice(0,0,...array)}
        },

        setTypeName(category){
            if(category == '注册类'){
                this.alltypes.name = this.ArrayOne
            }
            if(category == '八大员'){
                this.alltypes.name = this.ArrayTwo
            }
            if(category == '三类人员'){
                this.alltypes.name = this.ArrayThree
            }
            if(category == '职称证'){
                this.alltypes.name = this.ArrayFour
            }
            if(category == '执业资格'){
                this.alltypes.name = this.ArrayFive
            }
            if(category == '技术工人'){
                this.alltypes.name = this.ArraySix
            }
        },

        setParticipants(departement){
            this.loadingData.setParticipants = true
            this.$http.get(`http://192.168.50.132:3000/users/getallusers?per_page=10&page=1&keyword=${departement}`)
            .then(res => {let user =  []
                        for (let i=0; i < res.data.userlist.length ; i++){
                        user.push(res.data.userlist[i]["username"]);}
                        this.Participants = user
                        this.loadingData.setParticipants = false
                        })
            .catch(err => {console.log(err),
                            this.Participants = []
                            this.loadingData.setParticipants = false
                        })
        },

        setChipColor(value){
            if(value ==='待定'){return 'green'}
            if(value ==='被借出'){return 'yellow'}
            if(value ==='被锁证'){return 'red'}
        },

        search(value){
            this.$http.get(`http://192.168.50.132:3000/users/exactcertificates?per_page=10&page=1&name=${value}`)
            .then(res => {let user =  []
                        for (let i=0; i < res.data.userlist.length ; i++){
                        user.push(res.data.userlist[i]["professionaltitle"]);}
                        this.profiles = user
                        })
            .catch(err => {console.log(err)
                        })
        }
    },
    watch: {
        dialog (val) {
            val || this.close()
        },
        dialogDelete (val) {
            val || this.closeDelete()
        },

        category_selected(newval) {
            this.changeselect(newval,'注册类',this.ArrayOne)
            this.changeselect(newval,'八大员',this.ArrayTwo)
            this.changeselect(newval,'三类人员',this.ArrayThree)
            this.changeselect(newval,'职称证',this.ArrayFour)
            this.changeselect(newval,'执业资格',this.ArrayFive)
            this.changeselect(newval,'技术工人',this.ArraySix)
        },

        name_selected(newval){
            console.log(newval)
        },
    },
    
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '新增证照' : '修改证照'
      },
    },
    //获取所有员工
    mounted(){
        this.name_selected.push(...this.work_name)
        for (var i=0; i < this.employees.length ; ++i){
            this.Participants.push(this.employees[i]["username"]);
        }
    }
    
}
</script>

=======
export default {
    name: 'Humansource',
}
</script>
>>>>>>> 0052218504708c33ecd611734c095f0d71514235
