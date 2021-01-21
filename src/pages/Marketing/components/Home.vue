<template>
    <v-app class="blue accent-2 rounded-lg">
        <v-container>
            <v-row dense>
                <v-col cols="12" md="12">
                    <UnexpectedPage></UnexpectedPage>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>
<script>
import UnexpectedPage from '@/components/erropage/UnexpectedPage.vue'
export default {
    name: 'Home',
    components:{
        UnexpectedPage
    },
}
</script>