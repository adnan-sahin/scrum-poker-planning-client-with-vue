/* eslint-disable no-empty-pattern */
import http from '@/http/axios';
import StoryModel from '../models/storyModel';
import * as mutationTypes from '../mutationTypes';

const storyModel = data => new StoryModel(data._id, data.title, data.point, data.status);

const state = { stories: [] };

const mutations = {
  [mutationTypes.SET_STORIES](state, stories) {
    state.stories = stories;
  }
};
const actions = {
  async getStoriesByPlanId({ commit }, payload) {
    const { plan_id } = payload;
    return http.get('api/stories?plan_id=' + plan_id).then(res => {
      const stories = res.data.map(s => storyModel(s));
      commit(mutationTypes.SET_STORIES, stories);
    });
  },
  async getStoriesByPlanIdAndActive({}, payload) {
    const { plan_id } = payload;
    return http.get('api/stories?plan_id=' + plan_id + '&status=' + 'ACTIVE').then(res => {
      console.log('resss', res);
      const stories = res.data.map(s => storyModel(s));
      return stories[0];
    });
  },

  async create({ dispatch }, payload) {
    const { plan_id, point, title, voters, status } = payload;
    return http.post('api/stories', { title, point, plan_id, status }).then(res => {
      const story_id = res.data._id;
      voters.forEach(voter => {
        dispatch('person/create', { name: voter.name, type: voter.type, plan_id: plan_id, story_id: story_id, point: null }, { root: true });
      });
    });
  }
};
const getters = {
  stories: state => state.stories
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
