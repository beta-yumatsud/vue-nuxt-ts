<template>
  <div class="box">
    <div class="content">
      <p class="is-size-4">Q: {{ question }}</p>
      <div class="columns">
        <div class="column">
          <button class="button is-fullwidth is-success" @click="onClickYesBtn">
            YES
          </button>
        </div>
        <div class="column">
          <button class="button is-fullwidth is-success" @click="onClickNoBtn">
            NO
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from "vue";

export const ANSWER = { YES: 1, NO: 0 };

type QuestionProps = {
  question: string;
};

export default defineComponent({
  name: "quiz_question",
  props: {
    question: {
      type: String,
      required: true,
    },
  },
  setup(props: QuestionProps, context: SetupContext) {
    const onClickYesBtn = () => {
      context.emit("click-yes-btn", ANSWER.YES);
    };
    const onClickNoBtn = () => {
      context.emit("click-no-btn", ANSWER.NO);
    };
    return {
      onClickYesBtn,
      onClickNoBtn,
    };
  },
});
</script>
