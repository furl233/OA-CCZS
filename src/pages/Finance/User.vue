<template>
  <v-app>
      <FNNavBar></FNNavBar>
      <TopBar></TopBar>
        <v-content >
          <v-layout column class="d-flex flex-column">
            <v-scroll-y-transition mode="out-in">
              <keep-alive>
                <router-view></router-view>
              </keep-alive>
            </v-scroll-y-transition>
          </v-layout>
        </v-content>
  </v-app>
</template>

<script>

import FNNavBar from '@/components/FNNavBar.vue'
import TopBar from '@/components/TopBar.vue'
export default {
  name: 'FNUser',
  components:{
  FNNavBar,
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