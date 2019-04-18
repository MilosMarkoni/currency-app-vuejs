<template>
  <div>
    <div class="ui-top-panel">
      <div class="ui-search-panel">
        <router-link to="/">
          <div class="ui-logo"></div>
        </router-link>
      </div>
      <div class="ui-label-wrapper">
        <i class="ui-euro-icon"></i>
        <span class="ui-button-text ui-color__white">Currencies</span>
      </div>
    </div>
    <div class="ui-left-panel">
      <currency></currency>
    </div>
    <div class="ui-center-panel"></div>
  </div>
</template>

<script>
import Currency from "./Currency.vue";
export default {
  data() {
    return {};
  },
  components: {
    currency: Currency
  }
};
</script>

<style>
</style>
