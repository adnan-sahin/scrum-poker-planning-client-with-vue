<template>
  <div>
    <v-card>
      <v-card-title class="headline grey lighten-2">Stories</v-card-title>
      <v-container>
        <v-layout>
          <stories></stories>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import Stories from "./Stories.vue";
export default {
  components: {
    Stories
  }
};
</script>

<style>
</style>
