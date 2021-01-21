<template>
   <v-app class="blue accent-2 rounded-lg">
         <v-container>
            <v-row dense >
                <v-col cols="12">
                     <v-card color="#385F73" dark>
                        <v-card-title class="headline">公司证照</v-card-title>
                        <v-card-subtitle>企业资质证书实际上就是指企业有能力完成一项工程的证明书。建筑业企业应当按照其拥有的注册资本、净资产、专业技术人员、技术装备和已完成的建筑工程业绩等资质条件申请资质，经审查合格，取得相应等级的资质证书后，方可在其资质等级许可的范围内从事建筑活动</v-card-subtitle>
                        <v-card-actions>
                            <v-text-field dark append-icon="mdi-magnify" label="模糊查找" hide-details></v-text-field>
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialog" persistent max-width="600px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn class="ma-2" :loading="loading" :disabled="loading" color="secondary" @click.stop="change" v-bind="attrs" v-on="on">新增执照</v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="headline">新增执照 信息</span>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-container>
                                            <v-row wrap>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field label="执照名字*" required v-model="newlicence.name"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field label="认证时间" hint="证件所标明的生效时间" v-model="newlicence.certificate_time" type="date"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field label="证件ID*" hint="证件上标明的证件号码" persistent-hint required v-model="newlicence.certificate_id"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field label="有效年限" required v-model="newlicence.valid_period" type="number"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field label="发证机关*" required v-model="newlicence.licensing_agency"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field label="资质类别*" required v-model="newlicence.category"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="12">
                                                    <v-card class="mx-auto"  outlined min-height="100%" color="#1F7087" :img='newlicence.image_url'>
                                                        <v-layout column align-center>
                                                            <v-flex class="mt-8 mb-8">
                                                                <input type="file" accept="image/png, image/jpeg, image/bmp" ref="UploadImg" style="display:none" @change="getFile()">
                                                                <v-btn color="blue-grey" class="ma-2 white--text" @click.stop="clickinput">
                                                                上传证照照片
                                                                <v-icon right dark>mdi-cloud-upload</v-icon>
                                                                </v-btn>
                                                            </v-flex>
                                                        </v-layout>
                                                    </v-card>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                        <small >注意*:上传传图片大小不能超过10m*</small>
                                    </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="blue darken-1" text @click.stop="closedialog">关闭</v-btn>
                                            <v-btn color="blue darken-1" text @click.stop='add_cards'>保存上传</v-btn>
                                        </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-row dense class="d-flex">
                    <v-col cols=9 md="3" v-for="(item,index) in cards"  :key="index">
                            <v-card elevation="22">
                                <v-app-bar color="indigo">
                                    <v-toolbar-title class="white--text">{{item.name}}</v-toolbar-title>
                                </v-app-bar>
                                <v-avatar class="ma-3" size="230" tile>
                                <v-img class="black--text align-end"
                                :src="pic(item.image_url)" :aspect-ratio="16/9" height="280">
                                </v-img>
                                </v-avatar>
                                <v-card-subtitle class="pb-0 black--text">发证日期:{{item.certificate_time}}</v-card-subtitle>
                                <v-card-text class="pb-0 black--text">
                                    <div>ID号:{{item.certificate_id}}</div>
                                    <div>发证单位:{{item.licensing_agency}}</div>
                                </v-card-text>  
                            <v-dialog v-model="updatedialog" persistent max-width="600px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="blue" :loading="loading" text @click.stop="find_cards(item._id)" v-bind="attrs" v-on="on">更改</v-btn>
                                </template>
                                    <v-card>
                                        <v-card-title>
                                            <span class="headline">更新 证照信息</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-container>
                                            <v-row>
                                                <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="执照名字*" required v-model="updatelicence.name"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="认证时间" hint="证件所标明的生效时间" v-model="updatelicence.certificate_time" type="date"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                        <v-text-field label="证件ID*" hint="证件上标明的证件号码" persistent-hint required v-model="updatelicence.certificate_id"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                        <v-text-field label="有效年限" type='number' v-model="updatelicence.valid_period"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                            <v-text-field label="发证机关*" required v-model="updatelicence.licensing_agency"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                            <v-text-field label="资质类别*" required v-model="updatelicence.category"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="12">
                                            <v-card class="mx-auto"  outlined min-height="100%" color="#1F7087" :img='updatelicence.image_url'>
                                                <v-layout column align-center>
                                                    <v-flex class="mt-8 mb-8">
                                                        <input type="file" accept="image/png, image/jpeg, image/bmp" ref="UploadImg2" style="display:none" @change="getUploadFile()">
                                                            <v-btn color="blue-grey" class="ma-2 white--text" @click.stop="clickinput2">
                                                            上传证照照片
                                                            <v-icon right dark>mdi-cloud-upload</v-icon>
                                                            </v-btn>
                                                    </v-flex>
                                                </v-layout>
                                            </v-card>
                                                </v-col>
                                            </v-row>
                                            </v-container>
                                            <small>*indicates required field</small>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="blue darken-1" text @click.stop="closedupdatedialog">关闭</v-btn>
                                            <v-btn color="blue darken-1" text @click.stop='update_cards'>保存上传</v-btn>
                                        </v-card-actions>
                                    </v-card>
                            </v-dialog>
                            <v-dialog v-model="dialogdelete" persistent max-width="290">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="blue" outlined :loading="loading" v-bind="attrs" v-on="on" @click.stop="dialogdelete = !dialogdelete">删除</v-btn>
                                </template>
                                    <v-card>
                                    <v-card-title class="headline">确定删除吗?</v-card-title>
                                    <v-card-text>删除后不能恢复,确定要删除吗?</v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="blue darken-1 white--text" @click.stop="dialogdelete = false">算了</v-btn>
                                            <v-btn color="blue darken-1 white--text" @click.stop="delete_cards(item._id)">确定</v-btn>
                                        </v-card-actions>
                                    </v-card>
                            </v-dialog>
                        </v-card> 
                    </v-col>
                </v-row>
                
                

            <v-dialog v-model="dialogload" hide-overlay persistent  width="300">
                <v-card color="primary" dark>
                    <v-card-text>请稍等
                        <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                    </v-card-text>
                </v-card>
            </v-dialog>
                <Snap-bar :snacker='snacker'></Snap-bar>
            </v-row>
         </v-container>
    </v-app>
</template>

<script>
import SnapBar from '@/components/SnapBar.vue';
export default {
    props:{licences:Array},
    name: 'License',
    data(){
        return{
            cards:this.licences,
            snacker:{sbar:false,stext:"",scolor:""},
            //新增图框和更新图框
            dialog:false,
            updatedialog:false,
            //加载条和按键加载
            dialogload:false,   
            dialogdelete:false,
            loading:false,
            newlicence:{name:"",certificate_time:"", certificate_id:"",image_url:"",
                        valid_period:0,licensing_agency:"",category:""},
            updatelicence:{name:"",certificate_time:"", certificate_id:"",image_url:"",
                        valid_period:0,licensing_agency:"",category:"",_id:""},
            img:{},
            //默认图片
        }
    },
    components:{
        SnapBar
    },
    methods:{
        switch_snap(show,text,color){
            this.snacker.sbar=show
            this.snacker.stext=text
            this.snacker.scolor=color
        },
        async find_cards(id){
            this.loading = true
            this.dialogload = true
            await this.$http.get(`http://localhost:3000/license/${id}?fields=category&populatefields`)
            .then(res=> {
                this.switch_snap(true,"读取成功","blue")
                const{name,certificate_time,certificate_id,image_url,valid_period,licensing_agency,category,_id} =  res.data
                this.updatelicence = {name,certificate_time,certificate_id,image_url,valid_period,licensing_agency,category,_id}})
            .catch(err => {this.switch_snap(true,err.message,"red")})
            this.dialogload = false
            this.loading = false
        },

        async add_cards(){
            console.log(this.isEmptyObject(this.img))
            this.dialogload = true
            if(!this.isEmptyObject(this.img)){
                let formData = new FormData()
                formData.append('file', this.img)
                await this.$http.post(`http://localhost:3000/upload/singlefileTopath?department=行政部&category=执照管理`,
                    formData,
                {headers: { 'Content-Type': 'multipart/form-data' },
                }).then(res => this.newlicence.image_url = res.data.url)
                  .catch(err => {this.switch_snap(true,"添加失败,请重试","red"),console.log(err)})
            }
            this.newlicence.valid_period = this.newlicence.valid_period - 0
            await this.$http.post(`http://localhost:3000/license`,this.newlicence)
                .then(res=> {this.cards.push(res.data)
                            this.switch_snap(true,"添加成功","green")})
                .catch(err => {this.switch_snap(true,err.massge,"red"),console.log(err)})
            this.closedialog()  
            this.dialogload = false    
        },

        async update_cards(){
            this.dialogload = true
            this.updatelicence.valid_period = this.updatelicence.valid_period - 0
            await this.$http.patch(`http://localhost:3000/license/${this.updatelicence._id}`,this.updatelicence)
            .then(res => {this.updateBy(this.updatelicence._id)
                        console.log(res)
                        this.switch_snap(true,"更新成功","green")})
            .catch(err => {
                        if(err.status == 401){this.switch_snap(true,"非行政登记人员或主任不可操作","red")}
                        else{this.switch_snap(true,"更新失败,请重试","red")}})
            this.updatedialog = false
            this.dialogload = false
        },

        async delete_cards(id){
            this.loading = true
            this.dialogload = true
            await this.$http.delete(`http://localhost:3000/license/${id}`)
                .then(res=> {this.deleteBy(id)
                            console.log(res)
                            this.switch_snap(true,"删除成功","green")})
                .catch(err => {
                    if(err.status == 401){this.switch_snap(true,"非行政登记人员或主任不可操作","red")}
                    else{this.switch_snap(true,"删除失败,请重试","red")}})
            this.dialogload = false
            this.loading = false
            this.dialogdelete = false
        },

        deleteBy(id){     
            let Index = (this.cards|| []).findIndex((card) => card._id === id);
            this.cards.splice(Index,1)
        },

        updateBy(id){
            let Index = (this.cards|| []).findIndex((card) => card._id === id);
            this.cards.splice(Index,1,this.updatelicence)
        },

        pic(address){
            if(address !== ''){
                return address
            }else{return ""}
        },
        //读取照片
        getFile(){
            if(this.$refs.UploadImg.files[0]){
            this.img = this.$refs.UploadImg.files[0]
            let url = null;
                if (window.createObjectURL != undefined){
                    url = window.createObjectURL(this.img)
                }else if (window.webkitURL != undefined){
                    url = window.webkitURL.createObjectURL(this.img);
                }else if(window.URL != undefined){
                    url = window.URL.createObjectURL(this.img);
                }
                this.newlicence.image_url=url
            }else{this.newlicence.image_url='',this.img = {}}
        },
        getUploadFile(){
            if(this.$refs.UploadImg2[0].files[0]){
            this.img = this.$refs.UploadImg2[0].files[0]
            let url = null;
                if (window.createObjectURL != undefined){
                    url = window.createObjectURL(this.img)
                }else if (window.webkitURL != undefined){
                    url = window.webkitURL.createObjectURL(this.img);
                }else if(window.URL != undefined){
                    url = window.URL.createObjectURL(this.img);
                }
                this.updatelicence.image_url=url
            }else{this.updatelicence.image_url='',this.img = {}}
            console.log(this.img)
        },
        //点击触发选图
        clickinput(){
            this.$refs.UploadImg.click()
        },
        clickinput2(){
            this.$refs.UploadImg2[0].click()
           console.log(this.$refs.UploadImg2[0])
        },
        //关闭弹窗
        closedialog(){
            this.newlicence={name:"",certificate_time:"", certificate_id:"",image_url:"",
                        valid_period:0,licensing_agency:"",category:""}
            this.img={}
            this.loading = !this.loading
            this.dialog = false
        },
        closedupdatedialog(){
            this.updatelicence={name:"",certificate_time:"", certificate_id:"",image_url:"",
                        valid_period:0,licensing_agency:"",category:""}
            this.img={}
            this.updatedialog = false
        },
        change(){
            this.img= {}
            this.loading = !this.loading
        },  
        isEmptyObject(obj){
            for(let key in obj){
                return false
            }
            return true
        }
    }
}
</script>