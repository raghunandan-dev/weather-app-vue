<template>
    <div id="get-cities" class="container">
        <input class="form-control"
               :value="newCity"
               @change="getCity"
               placeholder="I need to...">
        <button class="btn btn-primary" @click="addCity">Add city</button>
    </div>
</template>
<script>
export default {
  methods: {
    getCity(e) {
      this.$store.dispatch('getCity', e.target.value);
    },
    addCity() {
      this.$store.dispatch('addCity');
      this.$store.dispatch('city');
    },
  },
  computed: {
    newCity() {
      return this.$store.getters.newCity;
    },
  },
};
</script>
