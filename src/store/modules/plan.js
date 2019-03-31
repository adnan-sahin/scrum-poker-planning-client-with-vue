import * as mutationTypes from '../mutationTypes';
import http from '@/http/axios';
import PlanModel from '../models/planModel';

const planModel = data => new PlanModel(data._id, data.name, data.votersCount);

const state = {
  plans: []
};
const mutations = {
  [mutationTypes.SET_PLANS](state, plans) {
    state.plans = plans;
  }
};
const actions = {
  async getPlans({ commit }) {
    return await http.get('api/plans').then(res => {
      commit(mutationTypes.SET_PLANS, res.data.map(p => planModel(p)));
    });
  },
  async create({ dispatch }, payload) {
    const { name, votersCount, stories, voters } = payload;

    return await http.post('api/plans', { name, votersCount }).then(res => {
      const plan = planModel(res.data);
      const plan_id = plan.id;

      stories.forEach((story, index) => {
        let status = index == 0 ? 'ACTIVE' : 'NOTVOTED';
        dispatch('story/create', { plan_id, point: null, title: story, voters, status }, { root: true });
      });

      return plan;
    });
  }
};
const getters = {
  plans: state => state.plans
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
