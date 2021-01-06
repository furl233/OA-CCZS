<template>
    <v-app class="blue accent-2 rounded-lg">
         <v-container>
            <v-row dense>
                <v-col cols="12">
                     <v-card color="#385F73" dark>
                        <v-card-title class="headline">Unlimited music now</v-card-title>
                        <v-card-subtitle>Listen to your favorite artists and albums whenever and wherever, online and offline.</v-card-subtitle>
                        <v-card-actions>
                            <v-btn text>Listen Now</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
         </v-container>
    </v-app>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
    name: 'Home',
    data(){
        return{

        }
    },
    methods:{
        togglenav(){
            this.Nav_TOGGLE()
        },
        ...mapMutations(['Nav_TOGGLE','LOGIN_OUT'])
    }
}
</script>