<template>
  <div class="container">
    <h1>Carousel Sample</h1>
    <AccordionItem title="Title 1"> まずひとーつ！ </AccordionItem>
    <AccordionItem title="Title 2"> 二度あることは三度ある！ </AccordionItem>
    <AccordionItem title="Title 3"> 三度目の正直！ </AccordionItem>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AccordionItem from "./AccordionItem.vue";

export default defineComponent({
  name: "custom-accordion",
  components: {
    AccordionItem,
  },
});
</script>
