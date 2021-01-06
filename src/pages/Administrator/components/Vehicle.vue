<template>
    <v-app class="blue accent-2 rounded-lg">
        <v-container>
            <v-row dense wrap d-flex>
                <v-col cols="12">
                     <v-card color="#385F73" dark transition="scroll-y-reverse-transition">
                        <v-card-title class="headline">车辆管理</v-card-title>
                        <v-card-subtitle>系统化管理公司车辆,包括定期提醒保养,使用出行记录等等</v-card-subtitle>
                        <v-card-actions>
<<<<<<< HEAD
                            <v-btn text @click="showcards">模糊搜索</v-btn>
=======
                            <v-btn text @click="showcards">Listen Now</v-btn>
>>>>>>> 0052218504708c33ecd611734c095f0d71514235
                        </v-card-actions>
                    </v-card>
                </v-col>
                    <v-dialog v-model="currentdialog.dialog" persistent max-width="600px">
                        <template v-slot:activator="{ on, attrs }">
<<<<<<< HEAD
                            <v-col cols="12" md="3" v-for="(item,index) in cards" :key="index">
                            <v-hover v-slot="{ hover }">
                            <v-card color="blue darken-3" dark :elevation="hover ? 24 : 0">
                                <div class="d-flex flex-no-wrap justify-space-between text-no-wrap text-truncate" transition="fab-transition">
=======
                        <v-col cols="12" md="3" v-for="(item,index) in cards" :key="index">
                            <v-hover v-slot="{ hover }">
                            <v-card color="#1F7087" dark :elevation="hover ? 24 : 0">
                            <div class="d-flex flex-no-wrap justify-space-between text-no-wrap text-truncate" transition="fab-transition">
>>>>>>> 0052218504708c33ecd611734c095f0d71514235
                                <div>
                                    <v-card-title class="headline text-truncate" style="max-width: 150px" v-text="item.brand"></v-card-title>
                                    <v-card-subtitle class="text-uppercase" v-text="item.plates_num"></v-card-subtitle>
                                    <v-card-text style="max-width: 160px" class="text-truncate">所有人:{{item.owner}}</v-card-text>
                                    <v-card-actions>
                                        <v-btn class="ml-2 d-inline-block" outlined small v-bind="attrs" v-on="on" @click="currentcar(item._id)">查看 更改</v-btn>
                                        <v-btn text @click="deletethis(item._id)" :loading="delload">
                                            <v-icon>mdi-delete</v-icon>
                                        </v-btn>
                                        <v-dialog v-model="currentdialog.loading" hide-overlay persistent width="300">
                                            <v-card color="primary" dark>
                                                <v-card-text>正在获取资料中
                                                    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                                                </v-card-text>
                                            </v-card>
                                        </v-dialog>       
                                    </v-card-actions> 
                                </div>
<<<<<<< HEAD
                                <v-avatar class="ma-1" tile size="130">
                                    <v-img :src="item.src"></v-img>
                                </v-avatar>
                                </div>
                            </v-card>
                            </v-hover>
                            </v-col>
                        </template>
                    <v-card>
=======
                                <v-avatar class="ma-1" tile size="90">
                                    <v-img :src="item.src"></v-img>
                                </v-avatar>
                            </div>
                            </v-card>
                            </v-hover>
                        </v-col>
                        </template>
                        <v-card>
>>>>>>> 0052218504708c33ecd611734c095f0d71514235
                        <v-card-title>
                            <span class="headline" @click="showimg">当前 车辆</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="车牌*" required v-model="currentdetail.plates_num"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="车辆所有人*" hint="此车牌所挂人或企业" required v-model="currentdetail.owner"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="车辆品牌*" v-model="currentdetail.brand" persistent-hint required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="8">
                                        <v-text-field label="登记机关*" v-model="currentdetail.Register_department" hint="此车牌登记的公安机关" persistent-hint required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="登记日期*" v-model="currentdetail.Register_date" type="date" required></v-text-field>
                                    </v-col>
                                     <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="车架号*" required v-model="currentdetail.Vehicle_id"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="车险时间*" required v-model='currentdetail.Motor_insurance' type="date"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="年审时间*" required v-model='currentdetail.review_date' type="date"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="油缸*" required v-model="currentdetail.hydraulic" type="number"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field label="禁区纸有效期" v-model="currentdetail.Closed_Area_Permit" type="date"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field
                                        label="批文有效期" v-model="currentdetail.Approval" type="date"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                            <v-card class="mx-auto"  outlined min-height="100%" color="1F7087" :img='currentdetail.src'>
                                                <v-layout column align-center>
                                                    <v-flex class="mt-8 mb-8">
                                                        <input type="file" accept="image/png, image/jpeg, image/bmp"  ref="inputFile2" style="display:none" @change="getFile2($event)">
                                                        <v-btn color="blue-grey" class="ma-2 white--text" @click="clickinput2">
                                                        更新车辆照片
                                                        <v-icon right dark>mdi-cloud-upload</v-icon>
                                                        </v-btn>
                                                    </v-flex>
                                                </v-layout>
                                            </v-card>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <small>*禁区纸及批文按跨区域车辆需要填写</small>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" class='white--text mr-4' @click="CloseDialog2">关闭</v-btn>
                            <v-dialog v-model="currentdialog.dialog2" persistent max-width="600px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="blue darken-1" class='white--text' v-bind="attrs" v-on="on" @click="showcurrent">保存</v-btn>
                                </template>
                                <v-card>
                                    <v-card-title class="headline">确认更改吗？</v-card-title>
                                    <v-card-text>可以随时更改信息</v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" text @click="currentdialog.dialog2 = false">返回</v-btn>
                                        <v-btn color="blue darken-1" text @click="Uploadcurrent">确认</v-btn>
                                        <v-dialog v-model="currentdialog.loading2" hide-overlay persistent width="300">
                                            <v-card color="primary" dark>
                                                <v-card-text>正在上传资料中
                                                    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                                                </v-card-text>
                                            </v-card>
                                        </v-dialog>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-card-actions>
<<<<<<< HEAD
                    </v-card>
=======
                        </v-card>
>>>>>>> 0052218504708c33ecd611734c095f0d71514235
                    </v-dialog>
                <v-dialog v-model="dialog" persistent max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-col cols="12" md="3">
                            <v-hover v-slot="{ hover }">
<<<<<<< HEAD
                                <v-card class="mx-auto" max-width="344" outlined min-height="100%" color="blue darken-3" :elevation="hover ? 24 : 0" v-bind="attrs" v-on="on">
                                    <v-layout column align-center>
                                        <v-flex class="mt-15 mb-8">
                                            <v-avatar>
                                                <v-icon color="white" :size="hover ? 60 : 24">mdi-tag-plus</v-icon>
=======
                                <v-card class="mx-auto" max-width="344" outlined min-height="100%" color="#1F7087" :elevation="hover ? 24 : 0" v-bind="attrs" v-on="on">
                                    <v-layout column align-center>
                                        <v-flex class="mt-15 mb-8">
                                            <v-avatar>
                                                <v-icon color="white" :size="hover ? 40 : 24">mdi-tag-plus</v-icon>
>>>>>>> 0052218504708c33ecd611734c095f0d71514235
                                            </v-avatar>
                                        </v-flex>
                                    </v-layout>
                                </v-card>
                            </v-hover>
                        </v-col>
                    </template>
                     <v-card>
                        <v-card-title>
                            <span class="headline">新增 车辆</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="车牌*" required v-model="newcar.plates_num"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="车辆所有人*" hint="此车牌所挂人或企业" required v-model="newcar.owner"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="车辆品牌*" v-model="newcar.brand" persistent-hint required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="8">
                                        <v-text-field label="登记机关*" v-model="newcar.Register_department" hint="此车牌登记的公安机关" persistent-hint required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="登记日期*" v-model="newcar.Register_date" type="date" required></v-text-field>
                                    </v-col>
                                     <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="车架号*" required v-model="newcar.Vehicle_id"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="车险时间*" required v-model='newcar.Motor_insurance' type="date"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="年审时间*" required v-model='newcar.review_date' type="date"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="油缸*" required v-model="newcar.hydraulic" type="number"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field label="禁区纸有效期" v-model="newcar.Closed_Area_Permit" type="date"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field
                                        label="批文有效期" v-model="newcar.Approval" type="date"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                            <v-card class="mx-auto"  outlined min-height="100%" color="#1F7087" :img='newcar.src'>
                                                <v-layout column align-center>
                                                    <v-flex class="mt-8 mb-8">
                                                        <input type="file" accept="image/png, image/jpeg, image/bmp"  ref="inputFile" style="display:none" @change="getFile($event)">
                                                        <v-btn color="blue-grey" class="ma-2 white--text" @click="clickinput">
                                                        上传车辆照片
                                                        <v-icon right dark>mdi-cloud-upload</v-icon>
                                                        </v-btn>
                                                    </v-flex>
                                                </v-layout>
                                            </v-card>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <small>*禁区纸及批文按跨区域车辆需要填写</small>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" class='white--text mr-4' @click="CloseDialog">关闭</v-btn>
                            <v-dialog v-model="dialog2" persistent max-width="600px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="blue darken-1" class='white--text' v-bind="attrs" v-on="on">保存</v-btn>
                                </template>
                                <v-card>
                                    <v-card-title class="headline">确认提交吗？</v-card-title>
                                    <v-card-text>提交后也可以更改车辆信息</v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" text @click="dialog2 = false">返回</v-btn>
                                        <v-btn color="blue darken-1" text @click="Upload">确认</v-btn>
                                        <v-dialog v-model="loading" hide-overlay persistent width="300">
                                            <v-card color="primary" dark>
                                                <v-card-text>正在上传资料中
                                                    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                                                </v-card-text>
                                            </v-card>
                                        </v-dialog>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-snackbar v-model="sbar">{{ stext }}
                    <template v-slot:action="{ attrs }">
                        <v-btn :color="scolor" text v-bind="attrs" @click="sbar = false">Close</v-btn>
                    </template>
                </v-snackbar>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
export default {
    props:{cars:Array},
    name: 'Vehicle',
    data(){
        return{
            cards:this.cars,
            dialog: false,
            dialog2:false,
            loading:false,
            sbar:false,
            Show:true,
            delload:false,
            stext:"",
            scolor:'',
            currentdetail:{brand:'',owner:'',Register_department:'',Register_date:'',plates_num:'',Vehicle_id:'',Motor_insurance:'',review_date:'',hydraulic:0,Closed_Area_Permit:'',Approval:'',src:''},
            currentdialog:{dialog:false,dialog2:false,loading:false,loading2:false},
            currentcarimg:null,
            newcar:{brand:'',owner:'',Register_department:'',Register_date:'',plates_num:'',Vehicle_id:'',Motor_insurance:'',review_date:'',hydraulic:0,Closed_Area_Permit:'',Approval:'',src:''},
            newcarimg:{},
        }
    },
    methods:{
        getFile(){
            if(this.$refs.inputFile.files[0]){
            this.newcarimg = this.$refs.inputFile.files[0]
            console.log(this.newcarimg)
            let url = null;
                if (window.createObjectURL != undefined){
                    url = window.createObjectURL(this.newcarimg)
                }else if (window.webkitURL != undefined){
                    url = window.webkitURL.createObjectURL(this.newcarimg);
                }else if(window.URL != undefined){
                    url = window.URL.createObjectURL(this.newcarimg);
                }
                console.log(url)
                this.newcar.src=url
            }else{this.newcar.src=''}
        },
        clickinput(){
            this.$refs.inputFile.click()
        },
        CloseDialog(){
            this.dialog=false
            this.newcar={brand:'',owner:'',Register_department:'',Register_date:'',plates_num:'',Vehicle_id:'',Motor_insurance:'',review_date:'',hydraulic:0,Closed_Area_Permit:'',Approval:'',src:''},
            this.newcarimg={}
        },
        async Upload(){
            if(this.newcar.src == ''){
                this.dialog2 = false
                this.changesnack(true,'请先拍照上传','red')
                this.$refs.inputFile.click()
                return
            }
            this.loading = true
            this.dialog = false
            this.dialog2 = false
            let formData = new FormData();
            formData.append('file',this.newcarimg);
            await this.$http.post(`http://localhost:3000/upload/singlefileTopath?department=行政部&category=车辆管理&subcategory=${this.newcar.brand}`,
                formData,
            {headers: { 'Content-Type': 'multipart/form-data' },
            }).then(res=> {
                this.newcar.src = res.data.url
            }).catch(err => {
                if(err.status === 401){
                        this.loading = false
                        this.changesnack(true,'登陆失效请重新登录','red')
                        this.$router.push('/')
                }
            })
            
            await this.$http.post(`http://localhost:3000/car`,
                        this.newcar
                    ).then(res=> {
                        this.loading = false
                        // this.addcards(this.newcar)
                        this.CloseDialog()
                        this.changesnack(true,'添加成功','green')
                        console.log(res)
                    })
                    .catch(err => {
                        if(err.status === 401){
                            this.loading = false
                            this.CloseDialog()
                            this.changesnack(true,'登陆失效请重新登录','red')
                            this.$router.push('/')
                            console.log(err)
                        }
                        if(err.status === 422){
                            this.loading = false
                            this.CloseDialog()
                            this.changesnack(true,'至少完善车型，车牌，以及所有人','red')
                            console.log(err)
                        }
                })
        },
        showcurrent(){
            console.log("currentcarimg:",this.currentcarimg)
        },
        changesnack(bar,text,color){
            this.sbar= bar
            this.stext = text
            this.scolor = color
        },
        currentcar(id){
            this.currentdialog.loading=true
            this.$http.get(`http://localhost:3000/car/${id}?fields=Register_department;Register_date;plates_num;Vehicle_id;Motor_insurance;review_date;hydraulic;Closed_Area_Permit;Approval;`)
            .then(res=> {
                console.log(res.data)
                this.currentdialog.loading=false
                this.currentdetail = res.data
            })
            .catch(err => {
                this.currentdialog.loading=false
                this.CloseDialog2()
                if(err.status == 408){
                    this.changesnack(true,'请求超时','red') 
                }  
                this.changesnack(true,err.message,'red')    
            })
        },
        async Uploadcurrent(){
            this.currentdialog.loading2=true
            if(this.currentcarimg !== null){
                let formData = new FormData();
                formData.append('file',this.currentcarimg);
                await this.$http.post(`http://localhost:3000/upload/singlefileTopath?department=行政部&category=车辆管理&subcategory=${this.currentdetail.brand}`,
                    formData,
                {headers: { 'Content-Type': 'multipart/form-data' },
                }).then(res=> {
                    this.currentdetail.src = res.data.url
                }).catch(err => {
                    this.changesnack(true,err.message,'red')
                })
            }
            
            await this.$http.patch(`http://localhost:3000/car/${this.currentdetail._id}`,
                {Approval: this.currentdetail.Approval,
                Closed_Area_Permit: this.currentdetail.Closed_Area_Permit,
                Motor_insurance: this.currentdetail.Motor_insurance,
                Register_date: this.currentdetail.Register_date,
                Register_department: this.currentdetail.Register_department,
                Vehicle_id: this.currentdetail.Vehicle_id,
                brand: this.currentdetail.brand,
                hydraulic: this.currentdetail.hydraulic,
                owner: this.currentdetail.owner,
                plates_num: this.currentdetail.plates_num,
                review_date: this.currentdetail.review_date,
                src: this.currentdetail.src,}
                ).then(res=> {
                    this.currentdialog.loading2=false
                    console.log(res)
                    this.refresh(this.currentdetail)
                    this.CloseDialog2()
                    this.changesnack(true,'更新成功','green')
                })
                .catch(err => {
                    this.currentdialog.loading2=false
                    this.CloseDialog2()
                    this.changesnack(true,err.message,'red')
                })  
        },

        getFile2(){
            if(this.$refs.inputFile2.files[0]){
            this.currentcarimg = this.$refs.inputFile2.files[0]
            console.log(this.currentcarimg)
            let url = null;
                if (window.createObjectURL != undefined){
                    url = window.createObjectURL(this.currentcarimg)
                }else if (window.webkitURL != undefined){
                    url = window.webkitURL.createObjectURL(this.currentcarimg);
                }else if(window.URL != undefined){
                    url = window.URL.createObjectURL(this.currentcarimg);
                }
                console.log(url)
                this.currentdetail.src=url
            }else{this.currentdetail.src='',this.currentcarimg = null}
        },
        clickinput2(){
            this.$refs.inputFile2.click()
        },
        CloseDialog2(){
            this.currentdialog.dialog=false
            this.currentdialog.dialog2=false
            this.currentdetail = {}
            this.currentcarimg = {}
        },
        // async addcards(data){
        //     let newdata = {'brand': data.brand,'createdAt': data.createdAt,
        //                 'owner': data.owner,'plates_num': data.plates_num,'src': data.src,
        //                 'updatedAt': data.updatedAt,'_id': data._id }
        //     this.cards.push(newdata)
        //     console.log(this.cards)
        // },
        refresh(data){     
            let Index = (this.cards|| []).findIndex((card) => card._id === data._id);
            console.log("change",data,"index",Index,this.cards[Index])
            this.cards.splice(Index,1,data)
        },
        delete(id){     
            let Index = (this.cards|| []).findIndex((card) => card._id === id);
            console.log("index",Index,this.cards[Index])
            this.cards.splice(Index,1)
            this.delload=false
        },
        deletethis(id){
            this.delload=true
             this.$http.delete(`http://localhost:3000/car/${id}`,).then((res=> {
                console.log(res)
                this.CloseDialog2()
                this.changesnack(true,'删除成功','green')
                this.delete(id)
            }))
        },
        showcards(){
            this.cards.push({brand:8})
            console.log("thiscards是array吗:",(this.cards).constructor === Array,
                        "thiscards的数据:",this.cards,
                        "thiscards的长度是",this.cards.length)
        },
        showimg(){
           console.log(this.currentcarimg) 
        }
    },
}
</script>