import Vue from 'vue';
import VueRouter from 'vue-router';

import Plans from '@/components/Plans.vue';
import AddPlan from '@/components/AddPlan.vue';
import StoriesViewMaster from '@/components/StoriesViewMaster.vue';
import StoriesViewDeveloper from '@/components/StoriesViewDeveloper.vue';

Vue.use(VueRouter);

const routes = [
  { name: 'Home', path: '/', component: Plans },
  { name: 'AddPlan', path: '/add-story-list', component: AddPlan },
  { name: 'StoriesViewMaster', path: '/poker-planning-view-as-scrum-master/:id', component: StoriesViewMaster },
  { name: 'StoriesViewDeveloper', path: '/poker-planning-view-as-scrum-developer/:id', component: StoriesViewDeveloper }
];

export default new VueRouter({ mode: 'history', routes });
