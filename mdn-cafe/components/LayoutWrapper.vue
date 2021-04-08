<template>
  <div class="wrapper">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'LayoutWrapper',
})
</script>

<style scoped>
.wrapper {
  padding-top: 80px;
  @media (min-width: 768px) {
    padding-top: 0;
  }
}
</style>
