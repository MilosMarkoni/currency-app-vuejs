<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import Index from "./components/Index.vue";
import Add from "./components/Add.vue";
import Edit from "./components/Edit.vue";

export default {
  components: {
    Index: Index,
    Add: Add,
    Edit: Edit
  },
  data: function() {
    return {};
  }
};
</script>

