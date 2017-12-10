<template>
    <div id="current-cities" class="container">
        <h3 v-if="cities.length > 0">Cities({{cities.length}})</h3>

        <ul class="list-group">
            <li class="list-group-item" v-for="city in cities">
                {{city.body}}
                <router-link :to="{
     name: 'cities',
     params: {
       cityName: city.body,
     }
   }">
       {{city.body}}
   </router-link>

            <div class="btn-group">
                <button type="button" @click="edit(city)" class="btn btn-default btn-sm">
                <span class="glyphicon glyphicon-edit"></span> Edit
                </button>
                <button type="button" @click="complete(city.body)" class="btn btn-default btn-sm">
                <span class="glyphicon glyphicon-ok-circle"></span> Complete
                </button>
                <button type="button" @click="remove(city)" class="btn btn-default btn-sm">
                <span class="glyphicon glyphicon-remove-circle"></span> Remove
                </button>
            </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  methods: {
    edit(city) {
      this.$store.dispatch('editCity', city);
    },
    complete(city) {
      this.$router.push({ name: 'cities', params: { cityName:city }});
    },
    remove(city) {
      this.$store.dispatch('removeCity', city);
    },
  },
  computed: {
    cities() {
      return this.$store.getters.cities;
    },
  },
};
</script>
<style>
.btn-group {
  float: right;
}
</style>
