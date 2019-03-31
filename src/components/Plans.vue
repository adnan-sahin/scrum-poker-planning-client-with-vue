<template>
  <div>
    <v-card>
      <v-card-title class="headline grey lighten-2">Plans</v-card-title>
      <v-container>
        <v-layout>
          <v-flex lg6 offset-lg6>
            <v-text-field append-icon="search" v-model="search"></v-text-field>
          </v-flex>
          <v-flex lg2 mt-2 class="text--right">
            <router-link tag="button" class="btn-primary" :to="{name:'AddPlan'}" exact>Add Plan</router-link>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container>
        <v-data-table :headers="headers" :items="plans" :search="search" :loading="loading">
          <template slot="items" slot-scope="props">
            <td>{{props.item.name}}</td>
            <td>{{props.item.votersCount}}</td>
            <td>
              <router-link
                tag="button"
                class="btn-primary"
                :to="{name:'StoriesViewMaster',params: {id:props.item.id}}"
              >Stories View Master</router-link>
            </td>
          </template>
        </v-data-table>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      search: "",
      loading: false,
      headers: [
        {
          text: "Name",
          value: "name"
        },
        { text: "Number of Voters", value: "votersCount" },
        { text: "Stories", value: "" }
      ]
    };
  },
  methods: {
    ...mapActions("plan", ["getPlans"])
  },
  computed: {
    ...mapGetters("plan", ["plans"])
  },
  mounted() {
    this.getPlans().then(() => {
      console.log("loading", "ssss");
      this.loading = false;
    });
  }
};
</script>

<style>
</style>
