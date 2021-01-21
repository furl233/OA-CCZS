<template>
  <v-app>
      <MNavbar></MNavbar>
      <TopBar></TopBar>
        <v-content >
          <v-layout column class="d-flex flex-column">
            <v-scroll-y-transition mode="out-in">
              <router-view></router-view>
            </v-scroll-y-transition>
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