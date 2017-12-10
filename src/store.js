/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    cities: [],
    newCity: '',
    weatherData:{},
    selectedCity:''
  },
  mutations: {
    GET_CITY(state, city) {
      state.newCity = city;
    },
    ADD_CITY(state) {
      state.cities.push({
        body: state.newCity,
        completed: false,
      });
    },
    EDIT_CITY(state, city) {
      const cities = state.cities;
      cities.splice(cities.indexOf(city), 1);
      state.cities = cities;
      state.newCity = city.body;
    },
    REMOVE_CITY(state, city) {
      const cities = state.cities;
      cities.splice(cities.indexOf(city), 1);
    },
    COMPLETE_CITY(state, city) {
      city.completed = !city.completed;
    },
    CLEAR_CITIES(state) {
      state.newCity = '';
    },
    SAVE_WEATHER(state, data, selectedCity){
      state.weatherData = data;
      state.selectedCity = selectedCity;
    },
    GET_WEATHER(state ,data){
      state.weatherData = data;
    },
  },
  actions: {
    getCity({ commit }, city) {
      commit('GET_CITY', city);
    },
    addCity({ commit }) {
      commit('ADD_CITY');
    },
    editCity({ commit }, city) {
      commit('EDIT_CITY', city);
    },
    removeCity({ commit }, city) {
      commit('REMOVE_CITY', city);
    },
    completeCity({ commit }, city) {
      commit('COMPLETE_CITY', city);
    },
    city({ commit }) {
      commit('CLEAR_CITIES');
    },
    getTemp({ commit }, data) {
      commit('GET_WEATHER', data);
    },
    addTemp({ commit },data, selectedCity) {
      commit('SAVE_WEATHER', data, selectedCity);
    },
  },
    getters: {
        newCity: state => state.newCity,
        cities: state => state.cities.filter((city) => {return !city.completed}),
        completedcities: state => state.cities.filter((city) => {return city.completed}),
        weatherData: state => state.weatherData,
        selectedCity: state => state.selectedCity,
    },
    plugins: [vuexLocal.plugin]
});
