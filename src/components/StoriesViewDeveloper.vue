<template>
  <div>
    <v-card>
      <v-card-title class="headline grey lighten-2">Stories View As Developer</v-card-title>
      <v-container>
        <v-layout>
          <v-flex sm6>
            <v-card>
              <v-card-title class="grey lighten-2">Story List</v-card-title>
              <v-data-table :headers="headers" :items="stories">
                <template slot="items" slot-scope="props">
                  <td>{{props.item.title}}</td>
                  <td>{{props.item.point}}</td>
                  <td>{{props.item.status}}</td>
                </template>
              </v-data-table>
            </v-card>
          </v-flex>
          <v-flex sm4 ml-3>
            <v-card>
              <v-card-title class="grey lighten-2">Active Story- ({{activeStory.title}})</v-card-title>
              <v-container>
                <button
                  @click="saveStoryPoint(point)"
                  v-for="(point,index) in storyPoints"
                  :key="index"
                  class="story-point"
                  :class="{'active-point':person.point==point}"
                >{{point==0?'?':point}}</button>
                <h3
                  class="text--center mt-3"
                >{{person.point>0?person.point+' Voted!':' Not Voted!'}}</h3>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout mt-3>
          <v-flex sm12>
            <router-link
              tag="button"
              class="btn-default"
              color="primary"
              :to="{name:'StoriesViewMaster',params:{id:$route.params.id}}"
              exact
            >Back to Scrum Master</router-link>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import storyMixin from "./mixins/storyMixin";
export default {
  mixins: [storyMixin],
  data() {
    return {
      person: {},
      storyTimer: null,
      headers: [
        { text: "Story", value: "title", sortable: false },
        { text: "Story Point", value: "point", sortable: false },
        { text: "Status", value: "status", sortable: true }
      ]
    };
  },
  computed: {
    ...mapGetters("story", ["activeStory", "stories"])
  },
  methods: {
    ...mapActions("person", ["update", "getById"]),
    ...mapActions("story", ["getStoriesByPlanId"]),
    async getStories() {
      return await this.getStoriesByPlanId({
        plan_id: this.$route.params.id
      });
    },
    saveStoryPoint(point) {
      this.update({ id: this.$route.params.personId, point }).then(res => {
        this.person = res;
      });
    }
  },
  mounted() {
    this.getStories();
    this.getById(this.$route.params.personId).then(res => {
      this.person = res;
    });
  },
  created() {
    this.storyTimer = setInterval(this.getStories, 2000);
  },
  beforeDestroy() {
    clearInterval(this.storyTimer);
  }
};
</script>

<style>
</style>
