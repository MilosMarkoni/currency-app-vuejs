<template>
  <div>
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
                <th colspan="2">Edit Currency</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Currency Code</td>
                <td>
                  <input maxlength="3" v-model="currElem.iso">
                  <div v-if="isoError" class="ui-state-error">{{isoError}}</div>
                </td>
              </tr>
              <tr>
                <td>Currency Symbol</td>
                <td>
                  <input maxlength="10" v-model="currElem.symbol">
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
  </div>
</template>

<script>
import Currency from "./Currency";
export default {
  components: {
    currency: Currency
  },
  data() {
    return {
      currElem: {},
      isoError: "",
      symbolError: "",
      customList: JSON.parse(localStorage.getItem("currency"))
    };
  },
  methods: {
    updateCurrElem: function() {
      // Getting desired element from the currency list
      this.currElem = this.customList.find(
        elem => elem.id === Number(this.$route.params.id)
      );
      // Setting flag for currently edited row
      localStorage.setItem("currentlyEdited", this.currElem.id);
    },
    submitForm: function() {
      // Getting index of array
      let index = this.customList.findIndex(x => x.id === this.currElem.id);

      // Updating values
      this.customList[index].iso = this.currElem.iso;
      this.customList[index].symbol = this.currElem.symbol;

      // Publishing
      const parsed = JSON.stringify(this.customList);
      localStorage.setItem("currentId", this.currentId);
      localStorage.setItem("currency", parsed);
      localStorage.setItem("currentlyEdited", "");

      // Redirecting to home page
      this.$router.push("/");
    },
    checkForm: function(e) {
      e.preventDefault();

      if (this.currElem.iso && this.currElem.symbol) {
        this.isoError = this.isoError = "";

        if (this.checkIfExists(this.currElem.iso)) {
          this.isoError = "Alredy exists!";
          return false;
        }

        if (this.checkLength(this.currElem.iso)) {
          this.isoError = "Required length is 3!";
          return false;
        }

        this.submitForm();
        return true;
      }

      if (!this.currElem.iso) {
        this.isoError = "Required!";
      }
      if (!this.currElem.symbol) {
        this.symbolError = "Required!";
      }
    },
    checkIfExists: function(value) {
      // Check if iso already exists
      var tempList = JSON.parse(localStorage.getItem("currency"));

      return tempList.find(
        elem => elem.iso === value.iso && elem.id !== value.id
      );
    },
    checkLength: function(value) {
      // Check iso required length
      return value.length != 3;
    }
  },
  created() {
    // Update Edit table on component creation
    this.updateCurrElem();
  },
  watch: {
    // Change Edit table if other Currency is selected
    "$route.params.id": function(id) {
      this.updateCurrElem();
    }
  }
};
</script>

<style>
</style>
