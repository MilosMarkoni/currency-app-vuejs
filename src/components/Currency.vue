<template>
  <div>
    <input
      type="text"
      v-model="search"
      placeholder="Search currencies"
      class="ui-search-input-position"
    >
    <table>
      <thead>
        <tr>
          <th colspan="2">Currency List</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-bind:class="{'ui-currently-active': curr.id == currentlyEdited}"
          v-bind:key="curr.id"
          v-for="curr in filteredCurrencies"
        >
          <td
            class="ui-cursor__pointer"
            v-on:click="editCurr(curr)"
          >{{ curr.iso }} {{ curr.symbol }} {{ curr.id }}</td>
          <td>
            <button v-on:click="removeCurr(curr)">Delete</button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>
            <router-link to="/Add">
              <button class="ui-plain-button">
                <i class="ui-plus-icon"></i>
                <span class="ui-button-text">Add currency</span>
              </button>
            </router-link>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currency: JSON.parse(localStorage.getItem("currency")),
      search: "",
      currentlyEdited: localStorage.currentlyEdited
    };
  },
  methods: {
    removeCurr: function(toDelete) {
      // delete element from temp list
      this.currency.splice(this.currency.indexOf(toDelete), 1);

      // Publishing
      const parsed = JSON.stringify(this.currency);
      localStorage.setItem("currency", parsed);
    },
    editCurr: function(toEdit) {
      // Redirect to edit page in order to change desired currency
      this.$router.push({
        name: "edit",
        params: { id: toEdit.id }
      });
    }
  },
  computed: {
    filteredCurrencies: function() {
      // Run search if list not empty
      if (this.currency) {
        return this.currency.filter(curr => {
          return (
            curr.id.toString().indexOf(this.search) > -1 ||
            curr.iso.toLowerCase().match(this.search.toLowerCase()) ||
            curr.symbol.toLowerCase().match(this.search.toLowerCase())
          );
        });
      }
    }
  }
};
</script>

<style>
.ui-search-input-position {
  position: absolute;
  width: 390px;
  top: 9px;
  left: 54px;
  z-index: 2;
  border-radius: 6px;
  border: 0;
}
</style>
