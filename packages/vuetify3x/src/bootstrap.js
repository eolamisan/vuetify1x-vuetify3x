import { h, createApp } from 'vue';
import singleSpaVue from 'single-spa-vue';
// fontawesome
import '@/imports/fontawesome.lib.js';

import App from './App.vue';

import { vuetify } from './plugins/vuetifyPlugin.js';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const vueLifecycles = singleSpaVue({
    createApp,
    appOptions: {
        render() {
            return h(App, {
                // single-spa props are available on the "this" object. Forward them to your component as needed.
                // https://single-spa.js.org/docs/building-applications#lifecycle-props
                // name: this.name,
                // mountParcel: this.mountParcel,
                // singleSpa: this.singleSpa,
            });
        },
        el: '#app2',
    },
    handleInstance: app => {
        app.component('FontAwesomeIcon', FontAwesomeIcon);
        app.use(vuetify);        
        console.log('vuetify3x: mounted');
    },
    replaceMode: true,
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = async props => {
    vueLifecycles.mount(props).then( props => {
        // do what you want with the Vue instance    
        console.log('vuetify1x: mounted', props);
      });
};
export const unmount = async props => {    
    await vueLifecycles.unmount(props);
}
