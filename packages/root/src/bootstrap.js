import { start, registerApplication } from 'single-spa';
import { importRemote } from '@module-federation/utilities';

const appVuetify1Prefix = ['#/app1'];
const appVuetify3Prefix = ['#/app2'];
const knownPrefix = [...appVuetify1Prefix, ...appVuetify3Prefix];

const isProduction = process.env.NODE_ENV === 'production';

const getRemoteUrl = (url, scope) => {
  return isProduction ? scope : url;
};

const stylesheetStore = {};

const registerAppModule = (moduleName, remoteUrl, locationFn, store, loadedCb) => {
  registerApplication(
    moduleName,
    async () => {
      console.log(`${moduleName}: load ${[].slice.call(document.styleSheets).filter(s => !s.disabled).length}/${document.styleSheets.length}`);

      store[moduleName] = store[moduleName] || {
        initialStylesheets: [],
        disabledStylesheets: [],
      };
      const { initialStylesheets, disabledStylesheets } = store[moduleName];

      // snapshot initial stylesheets
      for (let i = 0; i < document.styleSheets.length; i++) {
        initialStylesheets.push(document.styleSheets[i]);
      }

      const { bootstrap, mount, unmount } = await importRemote({
        url: getRemoteUrl(remoteUrl, moduleName),
        scope: moduleName,
        module: './ApplicationPage',
      });

      if (loadedCb) {
        await loadedCb();
      }

      return {
        bootstrap: async props => {
          // console.log(`${moduleName}: bootstrap ${[].slice.call(document.styleSheets).filter(s => !s.disabled).length}/${document.styleSheets.length}`);
          await bootstrap(props);
        },
        mount: async props => {
          // console.log(`${moduleName}: mount ${[].slice.call(document.styleSheets).filter(s => !s.disabled).length}/${document.styleSheets.length}`);
          // // enable captures stylesheets
          // for (let i = 0; i < disabledStylesheets.length; i++) {
          //   disabledStylesheets[i].disabled = false;
          // }

          // console.log(`${moduleName}: enabled stylesheets ${[].slice.call(document.styleSheets).filter(s => !s.disabled).length}/${document.styleSheets.length}`);
          await mount(props);
        },
        unmount: async props => {
          //console.log(`${moduleName}: unmount  ${[].slice.call(document.styleSheets).filter(s => !s.disabled).length}/${document.styleSheets.length}`);

          await unmount(props);

          // // capture created stylesheets
          // if (!disabledStylesheets.length > 0) {
          //   for (let i = 0; i < document.styleSheets.length; i++) {
          //     if (!initialStylesheets.includes(document.styleSheets[i])) {
          //       document.styleSheets[i].disabled = true;
          //       disabledStylesheets.push(document.styleSheets[i]);
          //     }
          //   }
          // }

          // // disable created stylesheets
          // for (let i = 0; i < disabledStylesheets.length; i++) {
          //   disabledStylesheets[i].disabled = true;
          // }

          // console.log(`${moduleName}: disabled stylesheets ${[].slice.call(document.styleSheets).filter(s => !s.disabled).length}/${document.styleSheets.length}`);
        },
      };
    },
    location => locationFn(location)
  );
};

/**
 * Register applications here
 */
registerAppModule(
  'vuetify1x',
  'http://localhost:11001',
  location => {
    const match = appVuetify1Prefix.some(prefix => location.hash.startsWith(prefix));
    return match;
  },
  stylesheetStore
);

registerAppModule(
  'vuetify3x',
  'http://localhost:11002',
  location => {
    const match = appVuetify3Prefix.some(prefix => location.hash.startsWith(prefix));
    return match;
  },
  stylesheetStore
);

start({
  urlRerouteOnly: true,
});
