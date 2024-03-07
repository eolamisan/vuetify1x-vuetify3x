import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';
import Vuetify from 'vuetify';
import Router from 'vue-router';
import App from '@/App.vue';
import 'vuetify/dist/vuetify.min.css';
import HelloWorld from './components/HelloWorld.vue';

// fontawesome
import '@/imports/fontawesome.lib.js';

Vue.use(Router);
Vue.use(Vuetify);


const router = new Router({
    routes: [ {
        path: '/app1',
        component: HelloWorld,
        }
    ],
    scrollBehavior() {
      // make the page scroll to top for all route navigations
      return { x: 0, y: 0 };
    },
  });

console.log( Vue.vuetify);

const vueLifecycles = singleSpaVue({
    Vue,
    appOptions: {
        router,
      render(h) {
        return h(App);
      },
      el: '#app1',
    },
  });

export const { bootstrap } = vueLifecycles;
export const mount = props =>
  vueLifecycles.mount(props).then( props => {    
    // do what you want with the Vue instance    
    console.log('vuetify1x: mounted', props);
  });
export const unmount = async props => {    
    await vueLifecycles.unmount(props);
};
