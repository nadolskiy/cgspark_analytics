<template>
  <div class="container">
    <h1>View Port</h1>
    <hr />
    <p class="error" v-if="error">{{ error }}</p>
    <div class="viewport-container">
      <div
        class="viewport"
        v-for="(viewport, index) in sortedArray"
        v-bind:item="viewport"
        v-bind:index="index"
        v-bind:key="viewport._id"
      >
        <div class="text">{{ viewport.screenSize }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import DeviceRatioService from "../DeviceRatioService.js";

export default {
  name: "DeviceRatioComponents",
  data() {
    return {
      screenSizes: [],
      error: "",
      text: "",
    };
  },
  async created() {
    try {
      this.screenSizes = await DeviceRatioService.getRatio();
    } catch (err) {
      this.error = err.message;
    }
  },
  computed: {
    sortedArray: function () {

      function compare(a, b) {

        let first  = a.explode('x');
        first = parseInt(first[0]);
        let second   = b.explode('x');
        second = parseInt(first[0]);

        if (first.screenSize < second.screenSize) return -1;
        if (first.screenSize > second.screenSize) return 1;
        return 0;
      }

      return [...this.screenSizes].sort(compare);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
