import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css'
import colors from 'vuetify/lib/util/colors'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
      themes: {
        light: {
          background: colors.blue.accent2, 
          secondary: colors.blue.accent4,   
          accent: colors.indigo.base, 
        },
        dark: {
          background: colors.blue, 
          secondary: colors.blue.darken2, 
          accent: colors.indigo.base, 
        },
      },
    },
    icons: {
        iconfont: 'mdiSvg' ||'mdi' || 'fa'
      },
});
