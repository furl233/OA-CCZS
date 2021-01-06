<template>
  <v-app>
      <v-fade-transition leave-absolute hide-on-leave>
        <router-view></router-view>
      </v-fade-transition>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components:{

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
