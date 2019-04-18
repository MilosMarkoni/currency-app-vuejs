import Index from "./components/Index.vue";
import Add from "./components/Add.vue";
import Edit from "./components/Edit.vue";

export default [
  {
    name: "/",
    path: "/",
    component: Index
  },
  {
    name: "add",
    path: "/add",
    component: Add
  },
  {
    name: "edit",
    path: "/edit/:id",
    component: Edit
  }
];
