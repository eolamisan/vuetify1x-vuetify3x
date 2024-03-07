import { createVuetify } from 'vuetify'
import { aliases, fa } from 'vuetify/iconsets/fa-svg'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import colors from '@/theme.json';

const light = {
    dark: false,
    colors: colors,
}

export const vuetify = createVuetify({
    components,
  directives,
    icons: {
      defaultSet: 'fa',
      aliases,
      sets: {
        fa,
      },
    },
    theme: {
        defaultTheme: 'light',
        themes: {
            light,
        },
    },
  })
