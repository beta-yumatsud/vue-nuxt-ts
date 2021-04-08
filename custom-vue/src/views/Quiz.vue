<template>
  <div class="container">
    <div class="columns is-mobile is-centered">
      <div class="column is-half">
        <h1 class="title is-1 has-text-centered">Vue.js Quiz</h1>
        <quiz-question
          v-if="currentQuestion"
          :question="currentQuestion.text"
          @click-yes-btn="doAnswer($event)"
          @click-no-btn="doAnswer($event)"
        >
        </quiz-question>
        <quiz-result
          v-if="!currentQuestion"
          :total-score="totalScore"
          :questions="state.questions"
          :answers="state.answers"
          @click="doRestart"
        >
        </quiz-result>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from "vue";
import QuizQuestion from "@/views/QuizQuestion.vue";
import QuizResult from "@/views/QuizResult.vue";

const ANSWER = { YES: 1, NO: 0 };
const MAX_SCORE = 100;

export interface Question {
  text: string;
  answer: number;
}

export default defineComponent({
  components: {
    QuizQuestion,
    QuizResult,
  },
  setup() {
    const state = reactive<{
      questions: Question[];
      currentIndex: number;
      answers: number[];
    }>({
      questions: [
        {
          text: "v-on:click の省略記法は #click である",
          answer: ANSWER.NO,
        },
        {
          text:
            "単一要素にトランジション効果を付与するのは aniamtion コンポーネントである",
          answer: ANSWER.NO,
        },
        {
          text: "v-for の区切り文字として in の他に of を使用できる",
          answer: ANSWER.YES,
        },
        {
          text:
            "app.component で定義したコンポーネントを使う場合は、定義した後に Vue.createApp() の components オプション内で再度定義する必要がある",
          answer: ANSWER.NO,
        },
        {
          text: "Vue.js をもっと書きたい",
          answer: ANSWER.YES,
        },
      ],
      currentIndex: 0,
      answers: [],
    });
    const currentQuestion = computed(() => {
      return state.questions[state.currentIndex];
    });
    const correctAnswers = computed(() => {
      return state.questions.filter((q, i) => {
        return q.answer === state.answers[i];
      });
    });
    const totalScore = computed(() => {
      const score = MAX_SCORE / state.questions.length;
      return Math.floor(score * correctAnswers.value.length);
    });
    const initAnswers = () => {
      state.answers = [];
    };
    const nextQuestion = () => {
      if (state.currentIndex < state.questions.length) {
        state.currentIndex += 1;
      }
    };
    const doAnswer = (answer: number) => {
      state.answers[state.currentIndex] = answer;
      nextQuestion();
    };
    const doRestart = () => {
      state.currentIndex = 0;
      initAnswers();
    };
    return {
      state,
      currentQuestion,
      correctAnswers,
      totalScore,
      initAnswers,
      nextQuestion,
      doAnswer,
      doRestart,
    };
  },
});
</script>
