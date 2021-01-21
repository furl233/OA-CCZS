<template>
    <v-app-bar app class="rounded-lg">
        <v-app-bar-nav-icon @click.stop="togglenav" color='blue accent-2'></v-app-bar-nav-icon>
        <v-toolbar-title></v-toolbar-title>
        <v-spacer></v-spacer>    
        <v-btn icon @click.stop='showstate'>
            <v-avatar color="blue accent-2">
                <img :src="this.user.avatar_url" alt="头像" v-if="this.user.avatar_url!==''">
                <v-icon color="white" v-if="this.user.avatar_url==''">mdi-account-circle</v-icon>
            </v-avatar>
        </v-btn> 
        <v-btn icon color='blue accent-2'>
            <v-icon>mdi-email</v-icon>
        </v-btn> 
        <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon color='blue accent-2' v-bind="attrs" v-on="on">
                    <v-icon >mdi-account-switch-outline</v-icon>
                </v-btn>
            </template>
            <v-card color="blue accent-3">
                <v-app-bar dense color="blue accent-4">
                    <v-toolbar-title class="white--text">切换到</v-toolbar-title>
                </v-app-bar>
                <v-list>
                    <v-list-item v-for="(item, i) in items" :key="i" active-class="border">
                        <v-list-item-content >
                            <v-list-item-title>
                                <v-btn @click.stop="SwitchTo(item)"  text class="blue--text" >
                                    <v-icon left>{{item.icon}}</v-icon>
                                {{item.title}}
                                </v-btn> 
                            </v-list-item-title>
                        </v-list-item-content>
                        
                    </v-list-item>
                </v-list>
            </v-card>   
        </v-menu>   
        <v-btn icon color='blue accent-2'>
            <v-badge bordered dot overlap :value="true" color="green accent-3">
                <v-icon>mdi-bell</v-icon>
            </v-badge>
        </v-btn>
        <v-btn icon color='blue accent-2'>
            <v-icon>mdi-chat</v-icon>
        </v-btn>
        <v-dialog v-model="logOut_dialog" persistent max-width="290">
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon color='blue accent-2' v-bind="attrs" v-on="on">
                    <v-icon>mdi-logout-variant</v-icon>
                </v-btn>
            </template>
            <v-card color="blue accent-3">
                <v-app-bar color="indigo accent-4">
                    <v-icon class="mr-5 yellow--text">mdi-logout-variant</v-icon>
                    <v-toolbar-title class="white--text">确认是否登出?</v-toolbar-title>
                </v-app-bar>
                <v-card-text class="white--text d-block my-5">退出当前用户</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="white indigo--text" outlined @click.stop="logOut_dialog = false">返回</v-btn>
                    <v-btn color="white indigo--text" outlined @click.stop="logout">登出
                    </v-btn>
                </v-card-actions>
            </v-card>    
        </v-dialog>    
        <v-dialog max-width="600px" persistent transition="dialog-bottom-transition" v-model="dialogSwitch">
            <v-card color="blue">
                <v-app-bar color="blue accent-4">
                    <v-icon class="mr-5 yellow--text">mdi-alert-outline</v-icon>
                    <v-toolbar-title class="white--text">正在切换</v-toolbar-title>
                </v-app-bar>
                <v-card-text class="white--text d-block my-5">确定要切换到{{Switchitem.title}}这个部门页面吗</v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="white" outlined @click.stop="dialogSwitch = !dialogSwitch">取消</v-btn>
                        <v-btn color="white" outlined :to='Switchitem.route'>确认</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
            </v-card>
        </v-dialog>   
    </v-app-bar>
</template>

<script>
import {mapMutations,mapState} from 'vuex'
export default {
    data(){
        return{
            dialogSwitch:false,
            logOut_dialog:false,
            Switchitem:{title:'',route:''},
            items: [
                { icon:'fas fa-users', title: '行政部',route:'/administrator/home'},
                { icon:'fas fa-pallet', title: '材料部',route:'/purchase/home'},
                { icon:'fas fa-money-check-alt', title: '财务部',route:'/finance/home'},
                { icon:'fas fa-hard-hat', title: '工程部',route:'/engineering/home'},
                { icon:'fas fa-briefcase', title: '市场部',route:'/marketing/home'},
            ],
        }
    },
    methods:{
        SwitchTo(item){
            this.logOut_dialog = false
            this.dialogSwitch = true
            this.Switchitem = item
        },
        logout(){
            this.LOGIN_OUT()
            this.$router.push('/')
        },
        togglenav(){
            this.Nav_TOGGLE()
        },
        showstate(){
            console.log(this.$store.state)
        },
        ...mapMutations(['Nav_TOGGLE','LOGIN_OUT'])
    },
    computed:{
        ...mapState(['user'])
    },
}
</script>
