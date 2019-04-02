<template>
  <div id="app">
    <v-app>
      <v-content>
        <v-container>
          <Header/>
          <router-view></router-view>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
export default {
  components: {
    Header
  },
  name: "app"
};
</script>

<style>
</style>
