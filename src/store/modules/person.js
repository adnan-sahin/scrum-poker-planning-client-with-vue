/* eslint-disable no-empty-pattern */
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
  },
  [mutationTypes.UPDATE_PERSON](state, person) {
    let index = state.persons.findIndex(p => p.id == person.id);
    if (index != -1) {
      state.persons.splice(index, 1, person);
    }
  }
};
const actions = {
  async getById({}, id) {
    return await http.get('api/persons/' + id).then(res => {
      return personModel(res.data);
    });
  },

  async getPersonsByPlanIdAndStoryId({ commit }, payload) {
    const { plan_id, story_id } = payload;
    return await http.get('api/persons?plan_id=' + plan_id + '&story_id=' + story_id).then(res => {
      commit(mutationTypes.SET_PERSONS, res.data.map(p => personModel(p)));
    });
  },
  async create({}, payload) {
    const { name, type, story_id, plan_id, point } = payload;
    return await http.post('api/persons', { name, type, story_id, plan_id, point });
  },
  async update({ commit }, payload) {
    const { id, point } = payload;
    return await http.patch('api/persons/' + id, { point }).then(res => {
      const person = personModel(res.data);
      commit(mutationTypes.UPDATE_PERSON, person);
      return person;
    });
  }
};

const getters = {
  persons: state => state.persons,
  masterPerson: state => state.persons.filter(s => s.type == 'MASTER')[0] || {}
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
