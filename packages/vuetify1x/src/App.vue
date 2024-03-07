<template>
  <v-app light>
    <v-navigation-drawer app></v-navigation-drawer>
    <v-toolbar app fixed clipped-left>toolbar</v-toolbar>
    <v-content>
      <v-container fluid>
        <v-btn to="/app2" color="primary"> To Vuetify 3</v-btn>        
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app> footer </v-footer>
  </v-app>
</template>

<script>
import theme from "./theme.json";

export default {
  name: "App",
  data: () => ({
    
  }),
  mounted() {
    Object.keys(theme).forEach((k) => {
      this.$vuetify.theme[k] = theme[k];
    });
  },
};
</script>
