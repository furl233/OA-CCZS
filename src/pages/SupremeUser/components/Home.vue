<template>
  <v-app :style="{background: $vuetify.theme.themes.light.background}">
    <v-container>
      <v-layout row class="ma-1">
        <v-app style='background-color:grey lighten-1' class="rounded" >
          <v-row>
            <v-col cols="12" md="9" class="ligne">
              <v-container>
                <v-row wrap>
                  <v-col cols="12" md="6">
                    <h1 class="headline mb-2 grey--text">月度图形报表</h1>
                    <template>
                      <div id="app" class="text-center">
                        <v-btn rounded color="primary" @click="changeType" class="mx-2" x-small>切换图表类型</v-btn>
                        <v-btn rounded color="primary" x-small>切换报表时间范畴</v-btn>
                        <ve-chart :data="chartData" :settings="chartSettings"></ve-chart>
                      </div>
                    </template>
                  </v-col>
                  <v-col cols="12" md="6">
                    <h1 class="headline mb-2 grey--text">迄今为止项目组成</h1>
                    <template>
                      <div id="app" class="text-center">
                        <ve-pie :data="pieData"></ve-pie>
                      </div>
                    </template>
                  </v-col>
                  <v-col cols="12" md="12">
                    <h1 class="headline mb-2 grey--text">全国投标情况汇总</h1>
                      <template>
                      <div id="app" class="text-center">
                        <ve-map :data="MapData"></ve-map>
                      </div>
                      </template>
                  </v-col>
                  <v-col cols="12" md12><h1 class="headline mb-2 grey--text">项目额外收入及支出</h1></v-col>
                  <v-col cols="12" md="12">  
                    <v-card>
                      <v-list>
                        <v-list-item>
                          <v-list-item-avatar color="blue">
                            <v-icon dark>fas fa-car</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>差旅费 & 食宿费</v-list-item-title>
                            <v-list-item-subtitle>$700 left</v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-content align="right">
                            <v-list-item-title class="indigo--text">$1200</v-list-item-title>
                            <v-list-item-subtitle>$500 of 1200</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider insert></v-divider>
                        <v-list-item>
                          <v-list-item-avatar color="green">
                            <v-icon dark>fas fa-medkit</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>安全&意外保险</v-list-item-title>
                            <v-list-item-subtitle>$700 left</v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-content align="right">
                            <v-list-item-title class="indigo--text">$1200</v-list-item-title>
                            <v-list-item-subtitle>$500 of 1200</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider insert></v-divider>
                        <v-list-item>
                          <v-list-item-avatar color="red">
                            <v-icon dark>fas fa-brush</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>劳务打卡机押金</v-list-item-title>
                            <v-list-item-subtitle>$700 left</v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-content align="right">
                            <v-list-item-title class="indigo--text">$1200</v-list-item-title>
                            <v-list-item-subtitle>$500 of 1200</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-avatar color="yellow">
                            <v-icon dark>fas fa-stamp</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>项目章押金</v-list-item-title>
                            <v-list-item-subtitle>$700 left</v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-content align="right">
                            <v-list-item-title class="indigo--text">$1200</v-list-item-title>
                            <v-list-item-subtitle>$500 of 1200</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider insert></v-divider>
                      </v-list>
                    </v-card>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-card class="mx-auto" max-height="400">
                      <v-img class="white--text align-end" height="150px" src="card.jpg">
                        <v-card-title class=pb-0>Cash loan</v-card-title>
                        <v-card-text class="text-primary">
                          <div>up to 2 miliion dollars</div>
                          <div>Money the next date. Rate</div>
                        </v-card-text>
                      </v-img>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>

            <v-col cols="12" md="3">
              <v-container>
                <v-row>
                  <v-col cols="12" md11>

                    <v-list-item class="mb-2">
                        <v-avatar color="indigo" class="mx-2">
                          <v-icon dark hidden @click='showstate'>mdi-account-circle</v-icon>
                        </v-avatar>
                      <v-list-item-content>
                        <v-list-item-title>叶晓晨</v-list-item-title>
                        <v-list-item-subtitle>总经办/董事长</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-icon to="/signin" @click='logout'>fas fa-sign-out-alt</v-icon>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider></v-divider>

                  </v-col>
                  <v-col cols="12" md12>
                    <v-list-item>
                      <v-list-item-avatar color="grey">
                        <v-icon color="white">fas fa-dollar-sign</v-icon> 
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-subtitle>
                          Heseiberg
                        </v-list-item-subtitle>
                        <v-list-item-title>$ 15,432</v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-icon color="indigo" large>fab fa-cc-visa</v-icon>
                      </v-list-item-action>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-app>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
// @ is an alias to /src
import {mapMutations} from 'vuex'
export default {
  name: 'Home',
  data(){
    return{
      chartsType:['line', 'histogram', 'radar'],
      index:2,
      chartSettings: { type: "radar"},
      chartData: {
          columns: ['季度', '产值', '到款金额', '回款率'],
          rows: [
            { '季度': '一季度', '产值': 1393, '到款金额': 1093, '回款率': 0.32 },
            { '季度': '二季度', '产值': 3530, '到款金额': 3230, '回款率': 0.26 },
            { '季度': '三季度', '产值': 2923, '到款金额': 2623, '回款率': 0.76 },
            { '季度': '四季度', '产值': 1723, '到款金额': 1423, '回款率': 0.49 },
          ]
      },
      MapData: {
          columns: ['位置', '项目个数', '项目总金额', '中标率'],
          rows: [
            { '位置': '深圳', '项目个数': 2, '项目总金额': 1234, '中标率': 0.5 },
            { '位置': '北京', '项目个数': 10, '项目总金额': 2123, '中标率': 0.2 },
            { '位置': '上海', '项目个数': 3, '项目总金额': 1243, '中标率': 0.3 },
            { '位置': '河北', '项目个数': 6, '项目总金额': 5123, '中标率': 0.5 }
          ]
      },
      pieData: {
          columns: ['种类', '金额'],
          rows: [
            { '种类': '建筑装饰', '金额': 1393 },
            { '种类': '展览展示', '金额': 3530 },
            { '种类': '机电智能化', '金额': 2923 },
            { '种类': '洁净医院', '金额': 1723 },
            { '种类': '幕墙外墙', '金额': 3792 },
            { '种类': '装修设计', '金额': 4593 }
          ]
        }
    }
  },
  computed:{
    theme(){
      return (this.$vuetify.theme.light) ? 'dark' : 'light'
    }
  },
  methods:{
    changeType(){
      this.index ++;
      if (this.index >= this.chartsType.length) { this.index = 0 }
      this.chartSettings = {type: this.chartsType[this.index]}
      if(this.chartSettings.type == "histogram"){
        this.chartSettings.axisSite= { right: ['回款率'] },
        this.chartSettings.yAxisType ['KMB', 'percent'],
        this.chartSettings.yAxisName= ['数值', '比率']
      }else{this.chartSettings = {type: this.chartsType[this.index]}}
    },
    togglenav(){
      this.Nav_TOGGLE()
    },
    logout(){
      this.LOGIN_OUT()
      this.$router.push('/')
      console.log(this.$store.state)
    },
    showstate(){
      console.log(this.$store.state)
    },
    ...mapMutations(['Nav_TOGGLE','LOGIN_OUT'])
  }
}
</script>
<style scoped>
.ligne{
  border-right: solid 1px #95a5a6
}
</style>
