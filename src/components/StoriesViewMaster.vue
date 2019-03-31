<template>
  <div>
    <v-card>
      <v-card-title class="headline grey lighten-2">Stories</v-card-title>
      <v-container>
        <v-layout>
          <stories></stories>
          <v-flex lg6 md6 sm8 mt-4>
            <v-card>
              <v-card-title>Scrum Master Panel</v-card-title>
              <v-container>
                <table>
                  <tr>
                    <td colspan="2">Story # is active</td>
                  </tr>
                  <tr v-for="(person,index) in persons" :key="index">
                    <td>{{person.name}} :</td>
                    <td>{{person.point}}</td>
                  </tr>
                </table>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import Stories from "./Stories.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    Stories
  },
  computed: {
    ...mapGetters("person", ["persons"])
  },
  methods: {
    ...mapActions("person", ["getPersons"]),
    ...mapActions("story", ["getStoriesByPlanIdAndActive"])
  },
  mounted() {
    this.getStoriesByPlanIdAndActive({
      plan_id: this.$route.params.id
    }).then(res => {
      this.getPersons({
        plan_id: this.$route.params.id,
        story_id: res.id
      });
    });
  }
};
</script>

<style>
</style>
