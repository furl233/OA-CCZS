<template>
  <v-app>
      <ADNavBar></ADNavBar>
      <TopBar></TopBar>
        <v-main>
          <v-layout column class="d-flex flex-column blue accent-2">
            <v-scroll-y-transition mode="out-in">
              <router-view :cars="cars" :employees="employees" :licences="licences"></router-view>
            </v-scroll-y-transition>
          </v-layout>
        </v-main>
  </v-app>
</template>

<script>
import ADNavBar from '../../components/ADNavBar.vue';
import TopBar from '../../components/TopBar.vue';
export default {
  name: 'ADUser',
  components:{
  ADNavBar,
  TopBar
  },
  data(){
    return{
      cars:[],
      employees:[],
      licences:[],
    }
  },
  methods:{
    getcarlist(){
      this.$http.get(`http://192.168.50.132:3000/car/getallcar?per_page=100&page=1&keyword=`)
      .then(res=> {
        this.cars =  res.data.Carlist
      })
      .catch(err => {
        console.log(err)     
      })
    },
    getemployee(){
      this.$http.get(`http://192.168.50.132:3000/users/getallusers?per_page=1000&page=1&keyword=`)
      .then(res=> {
        this.employees =  res.data.userlist
      })
      .catch(err => {
        console.log(err)     
      })
    },
    getlicence(){
      this.$http.get(`http://192.168.50.132:3000/license/getalllicenses?per_page=100&page=1&keyword=`)
      .then(res=> {
        this.licences =  res.data.licenselist
        console.log(this.licences)
      })
      .catch(err => {
        console.log(err)     
      })
    },
  },
  beforeMount(){
    this.getcarlist()
    this.getemployee()
    this.getlicence()
  }
};
</script>

<style>
  ::-webkit-scrollbar{
  display:none;
  }
</style>