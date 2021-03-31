<template>
  <div class="container">
    <h1>Modal Sample</h1>
    <ul class="imageList">
      <li
        v-for="thumb in state.thumbnails"
        :key="thumb.id"
        class="imageList-item"
      >
        <button
          type="button"
          @click="openModal(thumb)"
          class="imageList-button"
        >
          <img :src="thumb.src" alt="" class="imageList-thumb" />
        </button>
      </li>
    </ul>

    <transition tag="div" name="modal">
      <div class="modal-container" v-show="state.isVisible">
        <div class="modal-overlay" @click="closeModal">
          <div class="modal-body" v-if="currentThumbnail !== undefined">
            <div
              class="modal-image-container"
              :class="{ isLoaded: state.isThumbnailLoaded }"
            >
              <transition tag="div" mode="out-in" name="thumbnail">
                <div :style="containerStyle" :key="currentThumbnail.id">
                  <img
                    :src="currentThumbnail.src"
                    alt=""
                    class="modal-image"
                    @load.prevent.stop="onLoad"
                  />
                </div>
              </transition>
            </div>
            <p>
              <button class="button button--close" @click="closeModal">
                Close
              </button>
            </p>
            <button
              class="button modalButton modalButton--prev"
              @click="onClickPrev"
            >
              PREV
            </button>
            <button
              class="button modalButton modalButton--next"
              @click="onClickNext"
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, watch } from "vue";

export interface Thumb {
  id: number;
  src: string;
}

export default defineComponent({
  name: "custom-modal",
  setup() {
    const state = reactive<{
      thumbnails: Thumb[];
      isVisible: boolean;
      thumbnailHeight: number;
      isThumbnailLoaded: boolean;
      imageTransitionName: string;
    }>({
      thumbnails: [
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
      isVisible: false,
      thumbnailHeight: 0,
      isThumbnailLoaded: false,
      imageTransitionName: "prev",
    });
    const selectedThumbnailId = ref<number | undefined>(undefined);
    const openModal = (thumb: Thumb) => {
      state.isVisible = true;
      selectedThumbnailId.value = thumb.id;
    };
    const onLoad = () => {
      //state.thumbnailHeight = event.target.naturalHeight > 300 ? 300 : event.target.naturalHeight;
      state.thumbnailHeight = 300;
      state.isThumbnailLoaded = true;
    };
    const closeModal = () => {
      state.isVisible = false;
      selectedThumbnailId.value = undefined;
    };
    const onClickPrev = () => {
      selectedThumbnailId.value = prevThumbnail.value.id;
    };
    const onClickNext = () => {
      selectedThumbnailId.value = nextThumbnail.value.id;
      console.log("onClickNext");
      console.log(selectedThumbnailId.value);
    };
    const currentThumbnail = computed(() => {
      return state.thumbnails.find((t) => t.id === selectedThumbnailId.value);
    });
    const currentThumbnailIndex = computed(() => {
      return state.thumbnails.findIndex(
        (t) => t.id === selectedThumbnailId.value
      );
    });
    const containerStyle = computed(() => {
      return { height: state.thumbnailHeight + "px" };
    });
    const nextThumbnail = computed(() => {
      const nextIndex = currentThumbnailIndex.value + 1;
      return state.thumbnails[
        nextIndex > state.thumbnails.length - 1 ? 0 : nextIndex
      ];
    });
    const prevThumbnail = computed(() => {
      const prevIndex = currentThumbnailIndex.value - 1;
      return state.thumbnails[
        prevIndex < 0 ? state.thumbnails.length - 1 : prevIndex
      ];
    });
    watch(selectedThumbnailId, () => {
      state.isThumbnailLoaded = false;
    });
    return {
      state,
      openModal,
      closeModal,
      onLoad,
      onClickPrev,
      onClickNext,
      currentThumbnail,
      currentThumbnailIndex,
      containerStyle,
      nextThumbnail,
      prevThumbnail,
    };
  },
});
</script>

<style scoped>
/* モーダルの Transition
  ================================*/
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.thumbnail-enter-from,
.thumbnail-leave-to {
  opacity: 0;
}

.thumbnail-enter-to,
.thumbnail-leave-from {
  opacity: 1;
}

.thumbnail-enter-active {
  transition: opacity 0.3s ease;
}
.thumbnail-leave-active {
  transition: opacity 0.3s ease-in;
}

/* PREV、NEXTボタン
  ================================*/
.modalButton {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
}
.modalButton--prev {
  left: 0;
  transform: translateX(-50%);
}
.modalButton--next {
  right: 0;
  transform: translateX(50%);
}

/* モーダルに関連する要素のスタイリング
  ================================*/
.modal-container {
  position: relative;
  z-index: 9998;
  width: 100%;
  height: 100%;
}

.modal-body {
  position: relative;
  z-index: 9999;
  box-sizing: border-box;
  width: 100%;
  max-width: 640px;
  padding: 16px;
  margin: auto;
  background-color: #fff;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  overflow: auto;
  width: 100%;
  height: 100%;
  padding: 20px 60px;
  background-color: rgba(0, 0, 0, 0.7);
}

.modal-image-container {
  position: relative;
  background-color: #f0f0f0;
}

.modal-image-container > div {
  min-height: 200px;
  transition: height 0.3s ease;
}

.modal-image-container img {
  width: auto;
  max-height: 100%;
  transition: opacity 0.4s linear;
  opacity: 0;
}

.modal-image-container::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: block;
  width: 30px;
  height: 30px;
  margin: auto;
  border: 4px solid #000;
  border-top-color: #a0a0a0;
  border-radius: 999em;
  animation: loop 0.7s linear 0s infinite normal forwards;
}

.modal-image-container.isLoaded img {
  opacity: 1;
}

.modal-image-container.isLoaded::before {
  content: none;
}

@keyframes loop {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* アプリ全体のスタイリング
  ================================*/
.container {
  width: 100%;
  max-width: 1080px;
  padding: 0 16px;
  margin: 0 auto;
  text-align: center;
}

/* ボタンのスタイリング
  ================================*/
.button {
  padding: 8px 16px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  border: none;
  background-color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
}

.button--close {
  background-color: #666;
  border-color: #333;
  color: #fff;
}

/* サムネイルリストのスタイリング
  ================================*/
.imageList {
  display: flex;
  padding: 0;
  list-style: none;
  justify-content: center;
}

.imageList .imageList-item {
  width: 100px;
  margin-right: 20px;
}

.imageList .imageList-item:last-child {
  margin-right: 0;
}

.imageList .imageList-button {
  padding: 0;
  border: none;
}

.imageList .imageList-thumb {
  width: 100%;
  cursor: pointer;
}
</style>
