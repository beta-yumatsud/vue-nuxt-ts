<template>
  <li class="todo-item">
    <div class="todo-item-done">
      <input :checked="done" @change="onChangeTodo" type="checkbox" />
    </div>
    <div class="todo-item-content">
      <div class="todo-item-date">{{ new Date(todo.dateTime).toString() }}</div>
      <h3 class="todo-item-title">{{ todo.title }}</h3>
      <div v-if="todo.description" class="todo-item-description">
        {{ todo.description }}
      </div>
      <ul class="todo-item-categories" v-if="hasCategories">
        <li
          v-for="category in todo.categories"
          :key="category"
          class="todo-item-category"
        >
          {{ category }}
        </li>
      </ul>
    </div>
  </li>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ToDoTask } from "./ToDo.vue";

@Options({
  props: {
    todo: {
      type: Object,
      required: true,
    },
    done: {
      type: Boolean,
      required: true,
    },
  },
})
export default class ToDoItem extends Vue {
  todo!: ToDoTask;
  done!: boolean;
  get hasCategories(): boolean {
    return this.todo.categories.length > 0;
  }

  onChangeTodo(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.$emit("updateDone", this.todo);
    }
  }
}
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  padding: 20px;
}

.todo-item + .todo-item {
  border-top: 1px solid #ccc;
}

.todo-item-content {
  flex-grow: 1;
  margin-left: 15px;
}

.todo-item-date {
  font-size: 0.9em;
}

.todo-item-title {
  margin: 0.3em 0;
}

.todo-item-description {
  background-color: #f0f0f0;
  padding: 1em;
}

.todo-item-categories {
  margin-top: 10px;
}
</style>