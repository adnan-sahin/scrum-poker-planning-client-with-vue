<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex lg6 md6 sm6>
          <v-card>
            <v-card-title>Story List</v-card-title>
            <v-data-table :headers="headers" :items="stories">
              <template slot="items" slot-scope="props">
                <td>{{props.item.title}}</td>
                <td>{{props.item.point}}</td>
                <td>{{props.item.status}}</td>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex lg6 md6 sm6 ml-3>
          <v-card>
            <v-card-title>Active Story- (Story #)</v-card-title>
            <v-container>
              <button
                v-for="(point,index) in storyPoints"
                :key="index"
                class="btn-default story-point"
              >{{point==0?'?':point}}</button>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      headers: [
        { text: "Story", value: "title" },
        { text: "Story Point", value: "point" },
        { text: "Status", value: "status" }
        // { text: "Id", value: "id" }
      ],
      storyPoints: [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 134, 0]
    };
  },
  computed: {
    ...mapGetters("story", ["stories"])
  },
  methods: {
    ...mapActions("story", ["getStoriesByPlanId"])
  },
  mounted() {
    this.getStoriesByPlanId({
      plan_id: this.$route.params.id
    });
  }
};
</script>

<style>
</style>
