<template>
  <div>
    <div>記事コード: {{ aid }}</div>
    <!--<span>記事コード：{{ $route.params.aid }}</span>-->
    <span><route-link v-bind:to="'/article/'+aid+'/pages/1'">Page: 1</route-link></span>
    <span><route-link v-bind:to="'/article/'+aid+'/pages/2'">Page: 2</route-link></span>
    <hr />
    <route-view />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

@Options({
  props: {
    aid: String,
  },
})
export default class Article extends Vue {
  aid!: string
}
</script>
