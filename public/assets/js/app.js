var test = new Vue({
  el: "#app",
  data: {
    currency: [
      {
        id: "1",
        iso: "EUR",
        symbol: "E"
      },
      {
        id: "1",
        iso: "EUR",
        symbol: "E"
      }
    ]
  },
  methods: {
    // Add new currency to the list
    addCurrency: function() {
      var tempObject = { id: "3", iso: "DIN", symbol: "D" };
      this.currency.push(tempObject);
    },

    // Delete selected currency from the list
    deleteCurrency: function(valueToDelete) {
      this.currency.pop(valueToDelete);
    }
  }
});
