<template>
    <v-app class="rounded-lg"  :style='{background: $vuetify.theme.themes.light.background}'>
        <v-container >
            <v-layout  row class='ma-1'>
                <v-app style='background-color: grey lighten-1' class="rounded-xl">
                    <v-row>
                        <v-col cols="12" md="12" class="ligne">
                            <v-container>
                                <v-row wrap>
                                    <v-col cols="12" md="12" justify="space-arounded" >
                                      <v-toolbar dense class="rounded-lg" color="primary" dark flat>  
                                        <v-app-bar-nav-icon @click='togglenav' ></v-app-bar-nav-icon>
                                            <v-text-field hide-details label="搜索" single-line prepend-inner-icon="mdi-magnify"></v-text-field>
                                            <v-btn icon>
                                                <v-icon>mdi-bell</v-icon>
                                            </v-btn>
                                            <v-btn icon>
                                                <v-icon>mdi-dots-vertical</v-icon>
                                            </v-btn>    
                                        </v-toolbar>
                                    </v-col>
                                    <v-col cols="12" md="12">
                                        <h1 class="headline mb-2 grey--text">付款明细卡</h1>
                                        <template>
                                        <div id="app" class="text-center">
                                           
                                        </div>
                                        </template>
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
export default {
    name: 'Balance',
    data(){
        return{

        }
    },
    togglenav(){
      let nav = this.$store.state.navigator
      this.$store.state.navigator = !nav
    },
}
</script>