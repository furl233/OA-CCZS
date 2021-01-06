<template>
  <v-app :style='{background: $vuetify.theme.themes.light.background}' class="rounded-lg">
      <v-main class="mx-4 my-6">
        <v-layout column class="d-flex flex-column justify-center" fill-height>
          <v-fade-transition leave-absolute hide-on-leave>
            <router-view></router-view>
          </v-fade-transition>
        </v-layout>
      </v-main>
  </v-app>
</template>

<script>
  export default {
  }
</script>
