<template>
    <v-app class="blue accent-2 rounded-lg">
        <v-container>
            <v-row dense>
                <v-col cols="12" md="12">
                    <v-card dense color="white" min-height="700">
                        <v-card-title class="headline indigo white--text">客户查找
                            <v-spacer></v-spacer>
                            <v-text-field dark v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                        </v-card-title>
                        <v-data-table :headers="headers" :items="profiles" :search="search" sort-by="calories" class="elevation-1">
                            <template v-slot:top>
                                <v-toolbar flat>
                                    <v-toolbar-title>名单操作</v-toolbar-title>
                                    <v-divider class="mx-4" inset vertical></v-divider>
                                    <v-spacer></v-spacer>
                                    <v-dialog v-model="dialog" max-width="500px" persistent>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">新增客户</v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title>
                                        <span class="headline">{{ formTitle }}</span>
                                        </v-card-title>
                                            <v-card-text>
                                                <v-container>
                                                    <v-row>
                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12"  sm="6"  md="4">
                                                        <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12"  sm="6"  md="4">
                                                        <v-text-field v-model="editedItem.fat" label="Fat"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6"  md="4">
                                                        <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                                                    </v-col>
                                                    </v-row>
                                                </v-container>
                                            </v-card-text>
                                        <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1"  text @click="close">Cancel</v-btn>
                                        <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                    </v-dialog>
                                    <v-dialog v-model="dialogDelete" max-width="500px" persistent>
                                        <v-card color="deep-purple accent-3">
                                            <v-app-bar color="deep-purple accent-4">
                                            <v-icon class="mr-5 yellow--text">mdi-alert-outline</v-icon>
                                            <v-toolbar-title class="white--text">确定要删除
                                                <p class="d-inline yellow--text">{{editedItem.name}}</p>
                                                这个客户吗</v-toolbar-title>
                                            </v-app-bar>
                                            <v-card-text class="white--text d-block my-5" >此客户的信息可作为
                                            后期项目重要溯源,并与多方资料有所关联，建议不删除并且修改属性
                                            <br><p class="font-weight-black d-inline-block yellow--text">"客户信用度"为 0</p>
                                            <br>以标识该客户并中止相继的合作</v-card-text>
                                            <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="white" :loading='btnloading' outlined @click.stop="closeDelete">取消</v-btn>
                                            <v-btn color="white" :loading='btnloading' outlined @click.stop="deleteItemConfirm">确认</v-btn>
                                            <v-spacer></v-spacer>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-toolbar>
                            </template>
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-icon small class="mr-2"  @click="editItem(item)">mdi-pencil</v-icon>
                                <v-icon  small  @click="deleteItem(item)">mdi-delete</v-icon>
                            </template>
                            <template v-slot:no-data>
                                <v-btn color="primary" @click="initialize">Reset</v-btn>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>
<script>
export default {
     name: 'Co_partner',
     data(){
        return{
            dialog : false,
            dialogDelete: false,
            btnloading: false,

            search:'',
            profiles: [{},{}],
            editedIndex: -1,
            editedItem: {},
            defaultItem: {},

            headers: [{text: '姓名',align: 'start',sortable: false,value: 'name',},
                    { text: '合同额(元)', value: 'contractSum' },
                    { text: '合同个数(个)', value: 'contractNum' },
                    { text: '诚信度(0~10)', value: 'credit' },
                    { text: '电话', value: 'phone_Number',sortable: false, },
                    { text: '邮箱', value: 'protein',sortable: false, },
                    { text: '修改/删除', value: 'actions', sortable: false },
                    ],
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

        initialize () {
        this.profiles = [
          {
            name: '杜梅静',
            contractSum: 43000000.00,
            contractNum: 6.0,
            credit:10,
            phone_Number: 24,
            protein: 4.0,
          },
          {
            name: '郑直',
            contractSum: 84000000,
            contractNum: 2,
            credit:10,
            phone_Number: 37,
            protein: 4.3,
          },
          {
            name: '罗捷',
            contractSum: 34000000,
            contractNum: 1,
            credit:10,
            phone_Number: 23,
            protein: 6.0,
          },
          {
            name: '刘佐球',
            contractSum: 78500000,
            contractNum: 4,
            credit:9,
            phone_Number: 67,
            protein: 4.3,
          },
          {
            name: 'Gingerbread',
            contractSum: 356,
            contractNum: 16.0,
            credit:10,
            phone_Number: 49,
            protein: 3.9,
          },
          {
            name: 'Jelly bean',
            contractSum: 375,
            contractNum: 0.0,
            credit:7,
            phone_Number: 94,
            protein: 0.0,
          },
          {
            name: 'Lollipop',
            contractSum: 392,
            contractNum: 0.2,
            credit:5,
            phone_Number: 98,
            protein: 0,
          },
          {
            name: 'Honeycomb',
            contractSum: 408,
            contractNum: 3.2,
            credit:8,
            phone_Number: 87,
            protein: 6.5,
          },
          {
            name: 'Donut',
            contractSum: 452,
            contractNum: 25.0,
            credit:9,
            phone_Number: 51,
            protein: 4.9,
          },
          {
            name: 'KitKat',
            contractSum: 518,
            contractNum: 26.0,
            credit:6,
            phone_Number: 65,
            protein: 7,
          },
        ]}
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '新增合作人' : '修改合作人信息'
      },
    },
     created () {
      this.initialize()
    },
      
}
</script>