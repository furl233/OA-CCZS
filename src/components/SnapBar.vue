<template>
    <v-snackbar v-model="snacker.sbar" :color="snacker.scolor">{{ snacker.stext }}
        <template v-slot:action="{ attrs }">
            <v-btn color="white--text" text v-bind="attrs" @click="snacker.sbar = false">Close</v-btn>
        </template>
    </v-snackbar>
</template> 

<script>
export default {
    props:{
        snacker:Object
    },
    data(){
        return{

        }
    },
    watch:{
            snacker:{  
                handler(val){ 
                    this.sbar = val.sbar
                    this.scolor = val.scolor
                    this.stext = val.stext
                    }
                },  
                immediate:true,
                deep:true
    }
}

</script>

<style scoped>

</style>>

                