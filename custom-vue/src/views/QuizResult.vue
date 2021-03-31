<template>
  <div class="box">
    <div class="content has-text-centered">
      <h2 class="title">結果発表</h2>
      <table class="table is-bordered">
        <tr>
          <th v-for="(q, index) in questions">
            Q{{ index + 1 }}
          </th>
        </tr>
        <tr>
          <td
            v-for="correct in corrects" :class="getCorrectClassName(correct.cd)">
            {{ correct.value }}
          </td>
        </tr>
      </table>
      <p>あなたの得点は</p>
      <p>
        <strong class="is-size-2 has-text-danger">{{ totalScore }}</strong>/{{ maxPoint }}点でした!!
      </p>
      <button
        class="button is-fullwidth is-info has-text-weight-bold"
        @click="onClick"
      >
        最初からやり直す
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, SetupContext } from "vue";

export const ANSWER = { YES: 1, NO: 0 };

type ResultProps = {
  totalScore: number;
  questions: string[];
  answers: string[];
};

const CORRECT = { CD: 1, VALUE: "◯" };
const INCORRECT = { CD: 0, VALUE: "×" };
const MAX_POINT = 100;

export default defineComponent({
  name: "quiz_result",
  props: {
    totalScore: {
      type: Number,
      required: true,
    },
    questions: Array,
    answers: Array,
  },
  setup(props: ResultProps, context: SetupContext) {
    const corrects = computed(() => {
      return props.questions.map((q, i) => {
        if (q.answer === props.answers[i]) {
          return { cd: CORRECT.CD, value: CORRECT.VALUE };
        } else {
          return { cd: INCORRECT.CD, value: INCORRECT.VALUE };
        }
      });
    });
    const maxPoint = computed(() => {
      return MAX_POINT;
    });
    const isPerfect = computed(() => {
      return props.totalScore === maxPoint.value;
    });
    const onClick = () => {
      context.emit("click");
    };
    const getCorrectClassName = (correctCd) => {
      return correctCd === CORRECT.CD
        ? "has-text-weight-bold has-text-white has-background-success"
        : "";
    };
    return {
      corrects,
      maxPoint,
      isPerfect,
      onClick,
      getCorrectClassName,
    };
  },
});
</script>
