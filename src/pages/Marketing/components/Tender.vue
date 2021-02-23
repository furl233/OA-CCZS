<template>
    <v-app class="blue accent-2 rounded-lg pa-3">
            <v-row dense>
                <v-col cols="12" md="12">
                    <v-card dense color="white" min-height="700">
                        <v-card-title class="h3 indigo white--text" dense>   
                            投标结果查询
                            <v-spacer></v-spacer>
                            <v-text-field dark dense append-icon="mdi-magnify" label="Search" value='输入名字' single-line hide-details @blur="search(value)"></v-text-field>
                        </v-card-title>
                        <v-card-actions class='headline indigo white--text'>
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialog" max-width="400px" persistent transition="dialog-bottom-transition">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn dense color="primary" class="mr-4" v-bind="attrs" v-on="on">新增合作人</v-btn>
                                </template>
                            <v-card color="white">
                                <v-app-bar color="indigo">
                                    <v-toolbar-title class="white--text">{{formTitle}}</v-toolbar-title>
                                </v-app-bar>
                                <div class="ma-3"> 
                                <v-row dense >
                                    <v-col cols="6" md="6">
                                       <v-text-field dense label="证书编号" outlined></v-text-field>
                                    </v-col>
                                    <v-col cols="4" md="4">
                                        <v-text-field dense label="证书编号" outlined></v-text-field>
                                    </v-col>
                                    <v-col cols="4" md="4">
                                        <v-text-field dense label="证书编号" outlined></v-text-field>
                                    </v-col>
                                    <v-col cols="4" md="4">
                                        <v-text-field dense label="证书编号" outlined></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="12">
                                        <v-text-field dense label="证书编号" outlined></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="12">
                                        <v-text-field dense label="证书编号" outlined></v-text-field>
                                    </v-col>
                                    <v-col cols="6" md="6">
                                        <v-text-field dense label="证书编号" outlined></v-text-field>
                                    </v-col>
                                    <v-col cols="6" md="6">
                                        <v-text-field dense label="证书编号" outlined></v-text-field>
                                    </v-col>
                                </v-row>
                                </div>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="indigo darken-1 white--text"  @click.stop="close">取消</v-btn>
                                    <v-btn color="indigo darken-1 white--text"  @click.stop="save" >保存</v-btn>
                                </v-card-actions>
                            </v-card>
                            </v-dialog>   
                        </v-card-actions>                 
                    </v-card>
                </v-col>
            </v-row>
    </v-app>
</template>
<script>
export default {
     name: 'Tender',
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