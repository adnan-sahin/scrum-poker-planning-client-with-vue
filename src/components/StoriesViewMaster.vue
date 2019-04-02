<template>
  <div>
    <v-card>
      <v-card-title class="headline grey lighten-2">Stories View As Scrum Master</v-card-title>
      <v-container>
        <v-layout>
          <v-flex sm4>
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
              <v-card-title class="grey lighten-2">Active Story - ({{activeStory.title}})</v-card-title>
              <v-container>
                <button
                  @click="saveStoryPoint(point)"
                  v-for="(point,index) in storyPoints"
                  :key="index"
                  class="story-point"
                  :class="{'active-point':masterPerson && masterPerson.point==point}"
                >{{point==0?'?':point}}</button>
                <h3
                  class="text--center mt-3"
                  v-if="masterPerson"
                >{{masterPerson.point>0?masterPerson.point+ ' Voted!':' Not Voted!'}}</h3>
              </v-container>
            </v-card>
          </v-flex>
          <v-flex sm4 ml-3>
            <v-card>
              <v-card-title class="grey lighten-2">Scrum Master Panel</v-card-title>
              <v-container>
                <div class="mb-3">
                  <h4>({{activeStory.title}}) is active</h4>
                </div>

                <table>
                  <tr v-for="(person,index) in persons" :key="index">
                    <td>{{person.name}} :</td>
                    <td>{{person.point}}</td>
                  </tr>
                </table>
                <div class="mt-3">
                  <v-text-field v-if="isAnyNotVotedPerson" label="Final Score" v-model="finalScore"></v-text-field>
                  <button
                    class="btn-primary"
                    @click="saveFinalScore"
                  >End Voting For {{activeStory.title}}</button>
                </div>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container>
        <v-layout>
          <v-flex sm12>
            <v-card>
              <v-card-title class="grey lighten-2">Scrum Developer Vote Links</v-card-title>
              <v-container>
                <table>
                  <tr v-for="(person,index) in persons.filter(s=>s.type=='DEVELOPER')" :key="index">
                    <td>
                      <router-link
                        :to="{name:'StoriesViewDeveloper',params:{id:$route.params.id,personId:person.id}}"
                      >{{person.name}}</router-link>
                    </td>
                  </tr>
                </table>
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
              :to="{name:'Home'}"
              exact
            >Back to Plans</router-link>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import storyMixin from "./mixins/storyMixin";
import { mapGetters, mapActions } from "vuex";

export default {
  mixins: [storyMixin],
  data() {
    return {
      finalScore: "",
      personTimer: null,
      headers: [
        { text: "Story", value: "title", sortable: false },
        { text: "Story Point", value: "point", sortable: false },
        { text: "Status", value: "status", sortable: true }
      ]
    };
  },
  computed: {
    ...mapGetters("person", ["persons", "masterPerson"]),
    ...mapGetters("story", ["activeStory", "stories"]),
    isAnyNotVotedPerson() {
      return (
        this.activeStory.id != null &&
        this.persons.filter(p => p.point == null).length == 0
      );
    }
  },
  methods: {
    ...mapActions("person", {
      getPersonsByPlanIdAndStoryId: "getPersonsByPlanIdAndStoryId",
      updatePerson: "update"
    }),
    ...mapActions("story", {
      getStoriesByPlanId: "getStoriesByPlanId",
      updateStory: "update",
      setActiveStory: "setActiveStory"
    }),
    getPersons() {
      if (this.activeStory.id != null) {
        this.getPersonsByPlanIdAndStoryId({
          plan_id: this.$route.params.id,
          story_id: this.activeStory.id
        });
      }
    },
    async getStories() {
      return await this.getStoriesByPlanId({
        plan_id: this.$route.params.id
      });
    },
    saveStoryPoint(point) {
      this.updatePerson({ id: this.masterPerson.id, point });
    },
    saveFinalScore() {
      if (this.isAnyNotVotedPerson) {
        this.updateStory({
          id: this.activeStory.id,
          point: this.finalScore,
          status: "VOTED"
        }).then(() => {
          this.finalScore = "";
          this.setActiveStory({ plan_id: this.$route.params.id });
        });
      }
    }
  },
  mounted() {
    this.getStories().then(() => {
      this.getPersons();
    });
  },
  created() {
    this.personTimer = setInterval(this.getPersons, 2000);
  },
  beforeDestroy() {
    clearInterval(this.personTimer);
  }
};
</script>

<style>
</style>
