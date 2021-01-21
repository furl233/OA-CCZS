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
     name: 'Order',
     components:{
        UnexpectedPage
    },
     data(){
        return{
            dialog : false,
            btnloading: false,
            profiles: [],
            editedIndex: -1,
            editedItem: {},
            defaultItem: {},
        }
    },
    methods:{
        editItem (item) {
        this.editedIndex = this.profiles.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        },

        deleteItem (item) {
        this.editedIndex = this.profiles.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
        },

        deleteItemConfirm () {
        this.profiles.splice(this.editedIndex, 1)
        this.closeDelete()
        },

        close(){
        this.dialog = false
        this.btnloading = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
        },

        closeDelete () {
        this.dialogDelete = false
        this.btnloading = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
        },

        save () {
            console.log(this.editedItem)
            if (this.editedIndex > -1) {
            Object.assign(this.profiles[this.editedIndex], this.editedItem)
            } else {
            this.profiles.push(this.editedItem)
            }
            this.close()
        },
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '新增合作人' : '修改合作人信息'
      },
    },
}
</script>