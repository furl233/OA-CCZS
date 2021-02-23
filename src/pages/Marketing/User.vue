<template>
  <v-app>
      <MKNavbar></MKNavbar>
      <TopBar></TopBar>
        <v-content>
          <v-layout column class="d-flex flex-column blue accent-2">
            <v-scroll-y-transition mode="out-in">
              <keep-alive>
              <router-view ></router-view>
              </keep-alive>
            </v-scroll-y-transition>
          </v-layout>
        </v-content>
  </v-app>
</template>

<script>

import MKNavbar from '@/components/MKNavBar.vue'
import TopBar from '@/components/TopBar.vue'
export default {
  name: 'MKUser',
  components:{
  MKNavbar,
  TopBar
  },
  data: () => ({
    //
  }),
  methods:{
  },
};
</script>

<style>
  ::-webkit-scrollbar{
  display:none;
  }
</style>