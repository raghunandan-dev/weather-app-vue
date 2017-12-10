<template>
    <div id="current-cities" class="container">
    <select  v-model="selected" v-on:change="changeItem">
  <option v-for="option in options" v-bind:value="option.value">
    {{ option.body }}
  </option>
</select>
        <h3 v-if="cities.length > 0">City({{ cityName }})</h3>
        <ul class="list-group">
            <li class="list-group-item" v-for="city in cities">
                {{city.body}}
            <div class="btn-group">
                <button type="button" @click="edit(city)" class="btn btn-default btn-sm">
                <span class="glyphicon glyphicon-edit"></span> Edit
                </button>
                <button type="button" @click="complete(city)" class="btn btn-default btn-sm">
                <span class="glyphicon glyphicon-ok-circle"></span> Complete
                </button>
                <button type="button" @click="remove(city)" class="btn btn-default btn-sm">
                <span class="glyphicon glyphicon-remove-circle"></span> Remove
                </button>
            </div>
            </li>
        </ul>

        <ul class="list-group">
            <li class="list-group-item" v-for="temperature in temperatures">
                {{temperature.main.temp}} {{temperature.weather[0].description}} {{temperature.dt_txt}}

            </li>
        </ul>
    </div>
</template>
<script>
const axios = require('axios');

export default {
  methods: {
    edit(city) {
      this.$store.dispatch('editCity', city);
    },
    complete(city) {
      this.$store.dispatch('completeCity', city);
    },
    remove(city) {
      this.$store.dispatch('removeCity', city);
    },
    changeItem(event){
    console.log('from change Item');

    }
  },
  computed: {
    cities() {
      return this.$store.getters.cities;
    },
    temperatures(){
    return this.$store.getters.weatherData.list;
    },
    cityName(){
    return this.$store.getters.weatherData.city.name;
    },
    selected: {
        get () {
          return this.$store.getters.selectedCity;
        },
        set (optionValue) {
        let self = this;
        axios.get('http://samples.openweathermap.org/data/2.5/forecast?q='+event.target.value+'&appid=6a75323d7806ef2bebcfd4be0451bce0')
        .then(function (response) {
            console.log(response);
              self.$store.dispatch('addTemp', response.data);
        })
        .catch(function (error) {
            console.log(error.message);
        });
        },
      },
   options() {
   return this.$store.getters.cities;
   }
  },
  created() {
    console.log('from created');
  },
  mounted() {
    console.log('from mounted');
    let self = this;
    axios.get('http://samples.openweathermap.org/data/2.5/forecast?q='+this.$route.params.cityName+'&appid=6a75323d7806ef2bebcfd4be0451bce0')
    .then(function (response) {
        console.log(response);
          self.$store.dispatch('addTemp', response.data,self.$route.params.cityName);
    })
    .catch(function (error) {
        console.log(error.message);
    });
  },
};
</script>
<style>
.btn-group {
  float: right;
}
</style>
