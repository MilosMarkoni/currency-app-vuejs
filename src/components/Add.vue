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
    <div class="ui-center-panel">
      <form @submit="checkForm" method="post">
        <table class="ui-fixed-width__80">
          <thead>
            <tr>
              <th colspan="2">Add Currency</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Currency Code</td>
              <td>
                <input maxlength="3" v-model="iso">
                <div v-if="isoError" class="ui-state-error">{{isoError}}</div>
              </td>
            </tr>
            <tr>
              <td>Currency Symbol</td>
              <td>
                <input maxlength="10" v-model="symbol">
                <div v-if="symbolError" class="ui-state-error">{{symbolError}}</div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2">
                <button value="submit" class="ui-float__right ui-fixed-width__150px">Submit</button>
              </td>
            </tr>
          </tfoot>
        </table>
      </form>
    </div>
  </div>
</template>

<script>
import Currency from "./Currency.vue";

export default {
  components: {
    currency: Currency
  },
  data() {
    return {
      iso: "",
      symbol: "",
      isoError: "",
      symbolError: "",
      currentId: localStorage.getItem("currentId"),
      customList: JSON.parse(localStorage.getItem("currency"))
    };
  },

  methods: {
    submitForm: function() {
      // Set customList if currency list from localStorage is not defined
      if (this.customList == null) this.customList = [];

      // Set currentId to 1 if not defined
      if (this.currentId == null) {
        this.currentId = 1;
        localStorage.setItem("currentId", this.currentId);
      }

      // Add new currency to the list
      this.customList.push({
        id: this.currentId++,
        iso: this.iso,
        symbol: this.symbol
      });

      // Publishing
      const parsed = JSON.stringify(this.customList);
      localStorage.setItem("currentId", this.currentId);
      localStorage.setItem("currency", parsed);

      // Redirecting to home page
      this.$router.push("/");
    },
    checkForm: function(e) {
      e.preventDefault();
      if (this.iso && this.symbol) {
        this.isoError = this.isoError = "";

        if (this.customList != null && this.checkIfExists(this.iso)) {
          this.isoError = "Alredy exists!";
          return false;
        }

        if (this.checkLength(this.iso)) {
          this.isoError = "Required length is 3!";
          return false;
        }

        this.submitForm();
        return true;
      }

      if (!this.iso) {
        this.isoError = "Required!";
      }
      if (!this.symbol) {
        this.symbolError = "Required!";
      }
    },
    checkIfExists: function(value) {
      // Check if Iso currency exists
      return this.customList.find(elem => elem.iso === value);
    },
    checkLength: function(value) {
      // Check iso required length
      return value.length != 3;
    }
  }
};
</script>
