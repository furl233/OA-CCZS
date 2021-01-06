<template>
    <nav>
        <v-navigation-drawer app v-model="$store.state.navigator"  class="blue accent-2 rounded-lg">
            <v-layout column align-center>
                <v-flex class="mt-10 mb-8">
                    <v-avatar>
                        <v-icon large color="white">fas fa-store</v-icon>
                    </v-avatar>
                </v-flex>
            </v-layout>
            <v-list>
                <v-list-item v-for="link in links" :key="link.text" router :to="link.route" active-class="border">
                    <v-list-item-action>
                        <v-icon color="white">{{link.icon}}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content >
                        <v-list-item-title><span class="white--text">{{link.text}}</span></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-flex class="ma-2">
                <template>
                    <v-carousel
                    class="rounded"
                    cycle 
                    dark 
                    height="260"
                    hide-delimiter-background
                    show-arrows-on-hover
                    >
                    <v-carousel-item v-for="(slide,i) in slides" :key="i">
                        <v-sheet color="white" height="80%" align=center tile>
                            <v-row class="fill-height" align="center" justify="center">
                                <div class="grey--text">
                                    <h5>通知</h5>
                                    <p class="ma-2">{{slide}}</p>
                                    <v-btn outlined color="black">Read more</v-btn>
                                </div>
                            </v-row>
                        </v-sheet>
                    </v-carousel-item>
                </v-carousel>
                </template>
            </v-flex>
        </v-navigation-drawer>
    </nav>
</template>
<script>
export default {
    data(){
        return{
        links:[
            {icon:'fas fa-home',text:'主页',route:'/SupremeUser/Home'},
            {icon:'fas fa-money-check-alt',text:'财务部',route:'/SupremeUser/balance'},
            {icon:'fas fa-users',text:'行政部',route:'/SupremeUser/administration'},
            {icon:'fas fa-briefcase',text:'市场部',route:'/SupremeUser/business'},
            {icon:'fas fa-hard-hat',text:'工程部',route:'/SupremeUser/construct'},
            {icon:'fas fa-pallet',text:'材料部',route:'/SupremeUser/material'},
            {icon:'fas fa-comments',text:'部门会议',route:'/SupremeUser/chart'}
        ],
        slides:[
            '申报2020年优秀项目经理',
            '贵阳铂尔曼酒店与甲方拟定结算，放弃保修款'
        ]
        }
    },
}
</script>

<style>
    ::-webkit-scrollbar{
  display:none;
}
.border {
    border-left: 0.25rem solid #2c3e50;
}
</style>