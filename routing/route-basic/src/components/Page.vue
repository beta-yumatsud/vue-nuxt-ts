<template>
  <div>{{ page_num }} page</div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

@Options({
  props: {
    page_num: String,
  },
})
export default class Page extends Vue {
  page_num!: string
}
</script>
