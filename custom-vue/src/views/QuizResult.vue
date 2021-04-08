<template>
  <div class="box">
    <div class="content has-text-centered">
      <h2 class="title">結果発表</h2>
      <table class="table is-bordered">
        <tr>
          <th v-for="(q, index) in questions" :key="q.id">Q{{ index + 1 }}</th>
        </tr>
        <tr>
          <td
            v-for="correct in corrects"
            :class="getCorrectClassName(correct.cd)"
            :key="correct.value"
          >
            {{ correct.value }}
          </td>
        </tr>
      </table>
      <p>あなたの得点は</p>
      <p>
        <strong class="is-size-2 has-text-danger">{{ totalScore }}</strong
        >/{{ maxPoint }}点でした!!
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
import { defineComponent, computed, SetupContext, PropType } from "vue";
import { Question } from "@/views/Quiz.vue";

type ResultProps = {
  totalScore: number;
  questions: Question[];
  answers: number[];
};

const CORRECT = { CD: 1, VALUE: "◯" };
const INCORRECT = { CD: 0, VALUE: "×" };
const MAX_POINT = 100;

export default defineComponent({
  name: "quiz_result",
  props: {
    totalScore: {
      type: Number,
      default: 0,
    },
    questions: {
      type: Array as PropType<Question[]>,
      default: [],
    },
    answers: {
      type: Array as PropType<number[]>,
      default: [],
    },
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
    const getCorrectClassName = (correctCd: number) => {
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
