<template>
  <v-app>
      <PRNavBar></PRNavBar>
      <TopBar></TopBar>
        <v-content >
          <v-layout column class="d-flex flex-column blue accent-2">
            <v-scroll-y-transition mode="out-in">
              <router-view></router-view>
            </v-scroll-y-transition>
          </v-layout>
        </v-content>
  </v-app>
</template>

<script>

import PRNavBar from '@/components/PRNavBar.vue'
import TopBar from '@/components/TopBar.vue'
export default {
  name: 'PRUser',
  components:{
  PRNavBar,
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