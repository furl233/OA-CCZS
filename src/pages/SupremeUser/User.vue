<template>
  <v-app>
      <MNavbar></MNavbar>
      <TopBar></TopBar>
        <v-content >
          <v-layout column class="d-flex flex-column">
            <v-fade-transition leave-absolute hide-on-leave>
              <router-view></router-view>
            </v-fade-transition>
          </v-layout>
        </v-content>
  </v-app>
</template>

<script>

import MNavbar from '@/components/MNavBar.vue'
import TopBar from '@/components/TopBar.vue'
export default {
  name: 'SupremeUser',
  components:{
  MNavbar,
  TopBar
  },
  data: () => ({
    //
  }),
};
</script>

<style>
  ::-webkit-scrollbar{
  display:none;
  }
</style>