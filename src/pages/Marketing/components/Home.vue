<template>
    <v-app class="accent-2 rounded-lg pa-3">
            <v-row dense class="justify-space-around">
                <v-col cols="12" md="12">
                    <v-card class="white ma-1" elevation="11">
                        <AreaChart  class="h-full"
                        style="min-height: 380px"
                        :value="1837.32"
                        :percentage="3.2"
                        :loading="isLoading1"
                        :percentage-label="鸟"
                        :action-label="你好"></AreaChart>
                    </v-card>
                </v-col>
            </v-row>
            <v-row dense class="justify-space-around">
                <v-col cols="12" md="4" v-for="(n,index) in FirtsLine" :key="index">
                    <v-card class="white ma-1" elevation="11">
                        <v-card-title class="blue darken-3 white--text">
                            {{n.title}}
                            <v-spacer></v-spacer>
                            <v-menu left bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn text v-bind="attrs" v-on="on" class="white--text">
                                        {{n.search[0]}}
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item v-for="(n,index) in n.search" :key="index" @click="alert(index)" z-index="20">
                                        <v-list-item-title>{{ n }}</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </v-card-title>
                        <v-card-subtitle class="blue darken-3 white--text">
                            {{n.subtitle}}
                        </v-card-subtitle>
                        <v-divider></v-divider>
                        <apexchart :options="n.options" :series="n.series"></apexchart>
                    </v-card>
                </v-col>
            </v-row>
    </v-app>
</template>

<script>
import AreaChart from '@/components/charts/AreaCard.vue'
export default {
    name: 'Home',
    components:{
        AreaChart
    },
    data(){
        return{
            isLoading1:false,
            FirtsLine:[ {
                            title:'当前业绩比例总览',subtitle:'包含所有项目种类',
                            search:['本月','本季度','本年度'],
                            options:{chart: {type:'donut'},
                                    labels: ['装饰装修', '外墙幕墙', '机电智能化', '展览展示','洁净医疗']},
                            series: [44, 55, 41, 17, 15]
                        },
                        {
                            title:'各类型业绩额度',subtitle:'',
                            search:['本月','本季度','本年度'],
                            options:{
                                    chart: {type:'bar',stacked: true,toolbar:{show: true},zoom: {enabled: true}},
                                    xaxis: {type: 'datetime',
                                            categories: ['2021/01', '2021/02', '2021/03', '2021/04',
                                                '2021/05', '2021/05']},
                                    legend: {position: 'right',offsetY: 40},
                                    fill: {opacity: 1}
                                    },
                            series: [{name: '装饰装修',data: [44, 55, 41, 67, 22, 43]}, 
                                    {name: '外墙幕墙',data: [13, 23, 20, 8, 13, 27]}, 
                                    {name: '机电智能化',data: [11, 17, 15, 15, 21, 14]}, 
                                    {name: '展览展示',data: [21, 7, 25, 13, 22, 8]},
                                    {name: '洁净医疗',data: [21, 7, 25, 13, 22, 8]}],
                            
                        },
                         {
                            title:'各类型业绩额度',subtitle:'',
                            search:['本月','本季度','本年度'],
                            options:{
                                    chart: {type:'bar',stacked: true,toolbar:{show: true},zoom: {enabled: true}},
                                    xaxis: {type: 'datetime',
                                            categories: ['2021/01', '2021/02', '2021/03', '2021/04',
                                                '2021/05', '2021/05']},
                                    legend: {position: 'right',offsetY: 40},
                                    fill: {opacity: 1}
                                    },
                            series: [{name: '装饰装修',data: [44, 55, 41, 67, 22, 43]}, 
                                    {name: '外墙幕墙',data: [13, 23, 20, 8, 13, 27]}, 
                                    {name: '机电智能化',data: [11, 17, 15, 15, 21, 14]}, 
                                    {name: '展览展示',data: [21, 7, 25, 13, 22, 8]},
                                    {name: '洁净医疗',data: [21, 7, 25, 13, 22, 8]}],
                            
                        },
            ]
        }
    }
}
</script>