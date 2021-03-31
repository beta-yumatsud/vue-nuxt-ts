<template>
  <div>
    <ToDo></ToDo>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "./components/HelloWorld.vue";
import ToDo from "./components/ToDo.vue";

@Options({
  components: {
    HelloWorld,
    ToDo,
  },
})
export default class App extends Vue {}
</script>
