import * as mutationTypes from '../mutationTypes';
import http from '@/http/axios';
import PersonModel from '../models/personModel';

const personModel = data => new PersonModel(data._id, data.name, data.type, data.story_id, data.plan_id, data.point);

const state = {
  persons: []
};

const mutations = {
  [mutationTypes.SET_PERSONS](state, persons) {
    state.persons = persons;
  }
};
const actions = {
  async getPersons({ commit }, payload) {
    const { plan_id, story_id } = payload;
    return await http.get('api/persons?plan_id=' + plan_id + '&story_id=' + story_id).then(res => {
      commit(mutationTypes.SET_PERSONS, res.data.map(p => personModel(p)));
    });
  },
  /* eslint-disable no-empty-pattern */
  async create({}, payload) {
    const { name, type, story_id, plan_id, point } = payload;
    return await http.post('api/persons', { name, type, story_id, plan_id, point });
  }
};

const getters = {
  persons: state => state.persons
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
