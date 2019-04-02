/* eslint-disable no-empty-pattern */
import http from '@/http/axios';
import StoryModel from '../models/storyModel';
import * as mutationTypes from '../mutationTypes';

const storyModel = data => new StoryModel(data._id, data.title, data.point, data.status);

const state = { stories: [] };

const mutations = {
  [mutationTypes.SET_STORIES](state, stories) {
    state.stories = stories;
  },
  [mutationTypes.SET_ACTIVE_STORY](state, story) {
    state.activeStory = story;
  },
  [mutationTypes.UPDATE_STORY](state, story) {
    let index = state.stories.findIndex(s => s.id == story.id);
    if (index != -1) {
      state.stories.splice(index, 1, story);
    }
  }
};
const actions = {
  async getStoriesByPlanId({ commit }, payload) {
    const { plan_id } = payload;
    return await http.get('api/stories?plan_id=' + plan_id).then(res => {
      const stories = res.data.map(s => storyModel(s));
      commit(mutationTypes.SET_STORIES, stories);
    });
  },

  async create({ dispatch }, payload) {
    const { plan_id, point, title, voters, status } = payload;
    return await http.post('api/stories', { title, point, plan_id, status }).then(res => {
      const story_id = res.data._id;
      voters.forEach(voter => {
        dispatch('person/create', { name: voter.name, type: voter.type, plan_id: plan_id, story_id: story_id, point: null }, { root: true });
      });
    });
  },
  async update({ commit }, payload) {
    const { id, point, status } = payload;
    return await http.patch('api/stories/' + id, { point, status }).then(res => {
      commit(mutationTypes.UPDATE_STORY, storyModel(res.data));
    });
  },
  async setActiveStory({ dispatch, state }, payload) {
    dispatch('story/getStoriesByPlanId', payload, { root: true }).then(() => {
      const notVotedStories = state.stories.filter(s => s.status == 'NOTVOTED');
      if (notVotedStories && notVotedStories.length > 0) {
        const story = notVotedStories[0];
        dispatch('story/update', { id: story.id, point: story.point, status: 'ACTIVE' }, { root: true });
      }
    });
  }
};
const getters = {
  stories: state => state.stories,
  activeStory: state => state.stories.filter(s => s.status == 'ACTIVE')[0] || {}
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
