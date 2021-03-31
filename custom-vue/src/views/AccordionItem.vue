<template>
  <dl class="accordion">
    <dt
      class="accordion_ttl"
      :class="{ is_open: state.isShown }"
      role="button"
      @click="state.isShown = !state.isShown"
    >
      {{ title }}
    </dt>
    <transition
      name="accordionBody"
      @enter="enter"
      @after-enter="afterTransaction"
      @leave="leave"
      @after-leave="afterTransaction"
    >
      <dd v-show="state.isShown" class="accordion_body">
        <div class="accordion_txt">
          <slot></slot>
        </div>
      </dd>
    </transition>
  </dl>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

interface FrameRequestCallback {
  (time: number): void;
}

export default defineComponent({
  name: "custom-accordion-item",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const state = reactive<{
      isShown: boolean;
    }>({
      isShown: false,
    });
    const nextFrame = (cb: FrameRequestCallback) => {
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(cb);
      });
    };
    const enter = (el: HTMLElement, done: boolean) => {
      el.style.overflow = "hidden";
      const height = el.scrollHeight;
      el.style.height = "0";
      nextFrame(function () {
        el.style.height = height + "px";
      });
      console.log(done);
    };
    const leave = (el: HTMLElement) => {
      el.style.overflow = "hidden";
      el.style.height = el.scrollHeight + "px";
      nextFrame(function () {
        el.style.height = "0";
      });
    };
    const afterTransaction = (el: HTMLElement) => {
      el.style.overflow = "";
      el.style.height = "";
    };
    return {
      state,
      enter,
      leave,
      afterTransaction,
    };
  },
});
</script>

<style scoped>
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

/* アコーディオンのスタイリング
  ================================*/
.accordion {
  text-align: left;
}

.accordion_ttl {
  padding: 8px 16px;
  font-weight: 700;
  border: 1px solid #000;
  margin-top: 10px;
  cursor: pointer;
  background-color: #fff;
  transition: background-color 0.3s ease;
}

.accordion_ttl.is_open {
  background-color: #ccc;
}

.accordion_body {
  margin: 0;
  border: 1px solid #000;
  border-top: 0px;
}

.accordion_txt {
  padding: 8px 16px;
  margin: 0;
}

.accordionBody-enter-active,
.accordionBody-leave-active {
  transition: all 0.3s ease;
}
</style>
