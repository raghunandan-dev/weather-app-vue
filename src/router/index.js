import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import CityWeather from '@/components/CityWeather'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/cities/:cityName',
      name: 'cities',
      component: CityWeather,
    }
  ],
});
