<template>
  <div>
    <v-card>
      <v-card-title class="headline grey lighten-2">Add Plan</v-card-title>
      <v-container>
        <v-layout>
          <v-flex lg5>
            <v-text-field
              label="Plan Name"
              v-model="name"
              v-validate="'required|max:200'"
              :counter="200"
              name="name"
              :error-messages="errors.collect('name')"
            ></v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex lg5>
            <v-text-field
              label="Numbers of Count"
              v-model="votersCount"
              v-validate="'required|numeric|min_value:1'"
              name="votersCount"
              :error-messages="errors.collect('votersCount')"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout mt-5>
          <v-flex lg12>
            <v-textarea outline label="Stories" :rows="15" v-model="stories"></v-textarea>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <router-link
              tag="button"
              class="btn-default"
              color="primary"
              :to="{name:'Home'}"
              exact
            >Back to Plans</router-link>
          </v-flex>
          <v-flex class="text--right">
            <button class="btn-primary" @click.prevent="save">Start Session</button>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      name: "",
      votersCount: "",
      stories: ""
    };
  },
  methods: {
    ...mapActions("plan", ["create"]),
    save() {
      this.$validator.validate().then(result => {
        if (result) {
          const storyArray = this.stories.split(/\n/);
          const voterArray = [];
          for (let i = 1; i <= this.votersCount; i++) {
            if (i != this.votersCount) {
              voterArray.push({ name: "Voter " + i, type: "DEVELOPER" });
            } else {
              voterArray.push({ name: "Scrum Master", type: "MASTER" });
            }
          }
          this.create({
            name: this.name,
            votersCount: this.votersCount,
            voters: voterArray,
            stories: storyArray
          }).then(res => {
            setTimeout(() => {
              this.$router.push({
                name: "StoriesViewMaster",
                params: { id: res.id }
              });
            }, 1000);
          });
        }
      });
    }
  }
};
</script>

<style>
</style>
