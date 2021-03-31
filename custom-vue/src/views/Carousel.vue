<template>
  <div class="container">
    <h1>Carousel Sample</h1>
    <div class="carousel-wrapper">
      <transition tag="div" :name="state.imageTransitionName">
        <div
          class="carousel-item"
          :key="target.id"
          :style="{ height: state.currentHeight + 'px' }"
        >
          <img :src="target.src" alt="" />
        </div>
      </transition>

      <ol class="carousel-pager">
        <li v-for="(item, index) in state.items" :key="item.id">
          <button
            tabindex="0"
            :class="{ isCurrent: index === state.selectedIndex }"
            @click="onClickPager(index)"
          ></button>
        </li>
      </ol>

      <ul class="carousel-navigation">
        <li>
          <button
            class="button carouselButton carouselButton--prev"
            @click="onClickPrev"
          >
            PREV
          </button>
        </li>
        <li>
          <button
            class="button carouselButton carouselButton--next"
            @click="onClickNext"
          >
            NEXT
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, onMounted } from "vue";

export interface Thumb {
  id: number;
  src: string;
}

export default defineComponent({
  name: "custom-carousel",
  setup() {
    const state = reactive<{
      items: Thumb[];
      currentHeight: number;
      imageTransitionName: string;
      selectedIndex: number;
    }>({
      items: [
        {
          id: 1,
          src: "https://placehold.jp/300x300.png",
        },
        {
          id: 2,
          src: "https://placehold.jp/3d4070/ffffff/300x300.png",
        },
        {
          id: 3,
          src: "https://placehold.jp/b32020/ffffff/300x300.png",
        },
      ],
      currentHeight: 300,
      imageTransitionName: "prev",
      selectedIndex: 0,
    });
    const onClickPager = (index: number) => {
      state.imageTransitionName = state.selectedIndex < index ? "next" : "prev";
      state.selectedIndex = index;
      setTargetHeight(index);
    };
    const setTargetHeight = (index: number) => {
      const img = new Image();
      img.src = state.items[index].src;
    };
    const onClickPrev = () => {
      state.imageTransitionName = "prev";
      state.selectedIndex =
        state.selectedIndex <= 0 ? lastIndex.value : state.selectedIndex - 1;
      setTargetHeight(state.selectedIndex);
    };
    const onClickNext = () => {
      state.imageTransitionName = "next";
      state.selectedIndex =
        state.selectedIndex >= lastIndex.value ? 0 : state.selectedIndex + 1;
      setTargetHeight(state.selectedIndex);
    };
    const lastIndex = computed(() => {
      return state.items.length - 1;
    });
    const target = computed(() => {
      return state.items[state.selectedIndex];
    });
    onMounted(() => {
      setTargetHeight(state.selectedIndex);
    });
    return {
      state,
      onClickPager,
      onClickPrev,
      onClickNext,
      lastIndex,
      target,
    };
  },
});
</script>

<style scoped>
/* カルーセルの Transition
  ================================*/
.next-leave-active,
.prev-leave-active,
.next-enter-active,
.prev-enter-active {
  transition: all 0.3s ease;
}
.next-leave-active,
.prev-leave-active {
  position: absolute;
}
.next-enter-from,
.prev-leave-to {
  transform: translateX(100%);
}

.prev-enter-from,
.next-leave-to {
  transform: translateX(-100%);
}

/* カルーセルに関連する要素のスタイリング
  ================================*/
.carousel-wrapper {
  width: 100%;
  max-width: 300px;
  overflow: hidden;
  margin: auto;
  position: relative;
}

.carousel-item {
  width: 100%;
}
.carousel-item > img {
  width: 100%;
  vertical-align: top;
}

.carousel-navigation {
  padding: 0;
  margin: 20px 0;
  list-style: none;
}
.carousel-navigation > li {
  display: inline-block;
}

.carousel-pager {
  padding: 0;
  margin: 20px 0;
  list-style: none;
}
.carousel-pager > li {
  display: inline-block;
  margin: 0 5px;
}
.carousel-pager > li > button {
  appearance: none;
  border: none;
  background-color: #999;
  width: 16px;
  height: 16px;
  border-radius: 8px;
}

.carousel-pager > li > button.isCurrent {
  background-color: #f00;
}

/* アプリ全体のスタイリング
  ================================*/

body * {
  box-sizing: border-box;
}

.container {
  max-width: 1080px;
  width: 100%;
  padding: 0 16px;
  margin: 0 auto;
  text-align: center;
}

/* ボタンのスタイリング
  ================================*/
.button {
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  padding: 8px 16px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
}

button[disabled] {
  cursor: auto;
}
</style>
