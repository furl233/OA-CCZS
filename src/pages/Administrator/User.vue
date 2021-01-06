<template>
  <v-app>
      <ADNavBar></ADNavBar>
      <TopBar></TopBar>
        <v-main>
          <v-layout column class="d-flex flex-column">
            <v-fade-transition leave-absolute hide-on-leave>
              <router-view :cars="cars" :employees="employees" :licences="licences"></router-view>
            </v-fade-transition>
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
<<<<<<< HEAD
      this.$http.get(`http://192.168.50.132:3000/car/getallcar?per_page=100&page=1&keyword=`)
=======
      this.$http.get(`http://localhost:3000/car/getallcar?per_page=100&page=1&keyword=`)
>>>>>>> 0052218504708c33ecd611734c095f0d71514235
      .then(res=> {
        this.cars =  res.data.Carlist
      })
      .catch(err => {
        console.log(err)     
      })
    },
    getemployee(){
<<<<<<< HEAD
      this.$http.get(`http://192.168.50.132:3000/users/getallusers?per_page=1000&page=1&keyword=`)
=======
      this.$http.get(`http://localhost:3000/users/getallusers?per_page=1000&page=1&keyword=`)
>>>>>>> 0052218504708c33ecd611734c095f0d71514235
      .then(res=> {
        this.employees =  res.data.userlist
      })
      .catch(err => {
        console.log(err)     
      })
    },
    getlicence(){
<<<<<<< HEAD
      this.$http.get(`http://192.168.50.132:3000/license/getalllicenses?per_page=100&page=1&keyword=`)
=======
      this.$http.get(`http://localhost:3000/license/getalllicenses?per_page=100&page=1&keyword=`)
>>>>>>> 0052218504708c33ecd611734c095f0d71514235
      .then(res=> {
        this.licences =  res.data.licenselist
        console.log(this.licences)
      })
      .catch(err => {
        console.log(err)     
      })
    },
  },
<<<<<<< HEAD
  beforeMount(){
=======
  mounted(){
>>>>>>> 0052218504708c33ecd611734c095f0d71514235
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