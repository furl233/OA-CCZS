<template>
    <nav elevation="20">
        <v-navigation-drawer app v-model="$store.state.navigator"  class="blue accent-3 rounded-lg">
            <v-layout column align-center>
                <v-flex class="mt-10 mb-8">
                    <v-avatar>
                        <v-icon large color="white">fas fa-pallet</v-icon>
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
                    class="rounded-lg"
                    cycle 
                    dark 
                    height="208"
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
            {icon:'fas fa-home',text:'主页',route:'/purchase/home'},
            {icon:'fa fa-money-check-alt',text:'采购管理',route:'/purchase/material'},
            {icon:'fas fa-hard-hat',text:'分包管理',route:'/purchase/outsource'},
            {icon:'fas fa-table',text:'采购清单',route:'/purchase/order'},
            {icon:'fas fa-hard-hat',text:'发票管理',route:'/purchase/receipt'},
            {icon:'fas fa-handshake',text:'供应商录入',route:'/purchase/supplies'},
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