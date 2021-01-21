<template>
    <v-app class="blue accent-2 rounded-lg">
        <v-container>
            <v-row dense>
                <v-col cols="12" md="12">
                  <v-card>
                    <v-card-title class="indigo white--text headline">
                      客户列表
                      <v-spacer></v-spacer>
                      <v-dialog v-model="dialog" max-width="500px" persistent>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">新增客户</v-btn>
                        </template>
                        <v-card color="white">
                          <v-app-bar color="indigo">
                              <v-toolbar-title class="white--text">{{formTitle}}</v-toolbar-title>
                          </v-app-bar>
                          <div class="ma-3"> 
                          <v-row dense >
                              <v-col cols="6" md="5">
                                  <v-text-field dense label="客户姓名" outlined prepend-icon="mdi-account"></v-text-field>
                              </v-col>
                              <v-col cols="6" md="6">
                                  <v-text-field dense label="客户身份证" outlined prepend-icon="mdi-identifier"></v-text-field>
                              </v-col>
                              <v-col cols="6" md="5">
                                  <v-text-field dense label="电话号码" outlined prepend-icon="mdi-card-account-phone"></v-text-field>
                              </v-col>
                              <v-col cols="6" md="6">
                                  <v-text-field dense label="邮箱地址" outlined prepend-icon="mdi-email"></v-text-field>
                              </v-col>
                              <v-col cols="12" md="12">
                                  <v-text-field dense label="住址" outlined prepend-icon="mdi-home-variant"></v-text-field>
                              </v-col>
                              <v-col cols="12" md="12">
                                  <v-text-field dense label="QQ号码" outlined prepend-icon="mdi-qqchat"></v-text-field>
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
                    </v-card-title>
                    <v-sheet class="pa-4 indigo lighten-1">
                      <v-text-field v-model="search" label="搜索客户名字"
                        dark flat solo-inverted hide-details clearable
                        clear-icon="mdi-close-circle-outline"></v-text-field>
                      <v-checkbox v-model="caseSensitive" dark
                        hide-details label="关闭敏感查询"></v-checkbox>
                    </v-sheet>
                    <v-row class="pa-4" justify="space-between">
                      <v-col cols="12" md="4">
                        <v-treeview :active.sync="active" :items="items"
                        :open.sync="open" item-key='_id' :load-children="fetchUsers"
                        :search="search" :filter="filter" open-all shaped
                        activatable color="warning" open-on-click transition>
                          <template v-slot:prepend="{ item }">
                            <v-icon v-if="!item.children">mdi-account</v-icon>  
                          </template>
                        </v-treeview>
                      </v-col>
                      <v-divider vertical></v-divider>
                      <v-col class="d-flex text-center">
                        <v-scroll-y-transition mode="out-in">
                          <div v-if="!selected" class="title grey--text text--lighten-1 font-weight-light" style="align-self: center;">Select a User</div>
                          <v-card v-else :key="selected.name" class="pt-6 mx-auto" flat max-width="400">
                            <v-card-text dense>
                              <v-avatar v-if="avatar" size="88">
                                <v-img :src="`https://avataaars.io/${avatar}`" class="mb-6"></v-img>
                              </v-avatar>
                              <h3 class="headline mb-2">{{ selected.name }}</h3>
                              <div class="blue--text mb-2">{{ selected.email }}</div>
                              <div class="blue--text mb-2">QQ号码: {{ selected.qq_Number }}</div>
                              <div class="blue--text mb-2">电话号码: {{ selected.phone_Number }}</div>
                            </v-card-text>
                            <v-divider></v-divider>
                              <v-row class="text-left" tag="v-card-text" dense>
                                <v-col class="text-right mr-2 mb-2" tag="strong" cols="4">身份证号:</v-col>
                                <v-col>{{ selected.social_id }}</v-col>
                                <v-col class="text-right mr-4 mb-2" tag="strong" cols="5"> 住址:</v-col>
                                <v-col>{{ selected.living_address }}</v-col>
                              </v-row>
                            <v-divider></v-divider>
                          </v-card>
                        </v-scroll-y-transition>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>
<script>
const avatars = [
    '?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban',
    '?accessoriesType=Sunglasses&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtScoopNeck&eyeType=EyeRoll&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Red&hatColor=White&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairBun',
    '?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Black&clotheType=ShirtVNeck&eyeType=Surprised&eyebrowType=Angry&facialHairColor=Blonde&facialHairType=Blank&hairColor=Blonde&hatColor=PastelOrange&mouthType=Smile&skinColor=Black&topType=LongHairNotTooLong',
    '?accessoriesType=Round&avatarStyle=Circle&clotheColor=PastelOrange&clotheType=Overall&eyeType=Close&eyebrowType=AngryNatural&facialHairColor=Blonde&facialHairType=Blank&graphicType=Pizza&hairColor=Black&hatColor=PastelBlue&mouthType=Serious&skinColor=Light&topType=LongHairBigHair',
    '?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Gray01&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=Default&facialHairColor=Red&facialHairType=Blank&graphicType=Selena&hairColor=Red&hatColor=Blue02&mouthType=Twinkle&skinColor=Pale&topType=LongHairCurly',
  ]
export default {
     name: 'Co_partner',
     data: () => ({
      active: [],
      avatar: null,
      search: null,
      dialog : false,
      dialogDelete: false,
      btnloading: false,
      caseSensitive: false,

      open: [],
      users: [],
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
    }),
       
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '新增合作人' : '修改合作人信息'
      },
      items () {
        return [
          {name: '客户',
          children: this.users,
          },
        ]
      },
      selected () {
        if (!this.active.length) return undefined
        let _id = this.active[0]
        return this.users.find(user => user._id === _id)
      },
      filter () {
        return this.caseSensitive ? (item, search, textKey) => item[textKey].indexOf(search) > -1 : undefined
      },
    },

    methods: {
      async fetchUsers () {
        await this.$http.get(`http://localhost:3000/copartner?per_page=10&page=1&keyword=`)
      .then(res=> {this.users =  res.data.copartnerlist})
      .catch(err => {console.log(err) })
      },

      //随机选中一个头像
      randomAvatar () {
        this.avatar = avatars[Math.floor(Math.random() * avatars.length)]
      },

      editItem (item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      },

      deleteItem (item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
      },

      deleteItemConfirm () {
      this.users.splice(this.editedIndex, 1)
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
          Object.assign(this.users[this.editedIndex], this.editedItem)
          } else {
          this.users.push(this.editedItem)
          }
          this.close()
      },
    },

    //当被选中的项变化时候执行radomAvatar
    //radomAvatar就是随机选中一个头像
    watch: {
      selected: 'randomAvatar',
    },
  }

</script>