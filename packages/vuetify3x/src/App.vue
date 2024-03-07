<template>
  
  <v-layout class="rounded rounded-md">
    <v-app-bar title="Application bar"></v-app-bar>

    <v-navigation-drawer>
      <v-list>
        <v-list-item title="Navigation drawer"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <img alt="Vue logo" src="./assets/logo.png">
      <v-btn href="#/app1" color="primary" >To Vuetify 1x</v-btn>
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    </v-main>
  </v-layout>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>
