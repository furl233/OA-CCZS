<template>
    <v-app class="blue accent-2 rounded-lg">
        <v-container>
            <v-row dense>
                <v-col cols="12" md="12">
                    <template>
                        <v-card class="text-center w-full error-page pa-3">
                            <v-img src="/images/illustrations/500-illustration.svg" max-height="400" contain />
                            <div class="display-2 mt-10">OOPS! Something went wrong here</div>
                            <div class="mt-3 mb-10">Our experts are working to fix the issue.</div>
                            <v-text-field solo placeholder="Search website"></v-text-field>
                            <v-btn to="/" block large color="primary">Send me back</v-btn>
                        </v-card>
                    </template>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>
<script>
export default {
     name: 'Detail_card',
     data(){
        return{
            dialog : false,
            btnloading: false,
            profiles: [{},{}],
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