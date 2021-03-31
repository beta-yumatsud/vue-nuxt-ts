<template>
  <div>
    <h1>ToDo Application</h1>
    <div class="new-todo">
      <div class="new-todo-item">
        <label for="new-todo-title">Title</label>
        <input
          v-model.trim="todoTitle"
          type="text"
          id="new-todo-title"
          form="form-todo"
        />
      </div>
      <div class="new-todo-item">
        <label for="new-todo-description">Description</label>
        <textarea
          v-model.trim="todoDescription"
          id="new-todo-description"
          form="form-todo"
        ></textarea>
      </div>
      <div class="new-todo-category">
        カテゴリ
        <ul>
          <li v-for="category in categories" :key="category">
            <label :for="'category-' + category">
              <input
                v-model="todoCategories"
                type="checkbox"
                :id="'category-' + category"
                :value="category"
                form="form-todo"
              />{{ category }}
            </label>
          </li>
        </ul>
        <form @submit.prevent="createCategory">
          <label>
            <input v-model.trim="categoryName" type="text" />
          </label>
          <button type="submit" :disabled="!canCreateCategory">作成</button>
        </form>
      </div>
      <div class="new-todo-action">
        <form id="form-todo" @submit.prevent="createTodo">
          <button type="submit" :disabled="!canCreateTodo">作成</button>
        </form>
      </div>
    </div>
    <div>
      <div class="todo-search">
        <div class="todo-search-item">
          <label for="todo-search-category">filter by category</label>
          <select v-model="selectedCategory" id="todo-search-category">
            <option value="">指定なし</option>
            <option
              v-for="category in categories"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
        </div>
        <div class="todo-search-item">
          <label for="todo-search-done">
            Hide of DONE<input
              v-model="hideDoneTodo"
              type="checkbox"
              id="todo-search-done"
            />
          </label>
        </div>
        <div class="todo-search-item">
          <label>
            <select v-model="order">
              <option value="desc">降順</option>
              <option value="asc">昇順</option>
            </select>
          </label>
        </div>
        <div class="todo-search-item">
          <label for="todo-search-keyword">Search by keyword</label>
          <input
            v-model.trim="searchWord"
            type="text"
            id="todo-search-keyword"
          />
        </div>
      </div>
      <transition-group
        name="todo-list"
        tag="ul"
        v-if="hasTodos"
        class="todo-list">
        <ToDoItem
          v-for="todo in resultTodos"
          :key="todo.id"
          :todo="todo"
          v-model:done="todo.done"></ToDoItem>
      </transition-group>
      <p v-else>Not registered TODO task</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ToDoItem from "./ToDoItem.vue";

export interface ToDoTask {
  id: string;
  title: string;
  description: string;
  categories: string[];
  dateTime: number;
  done: boolean;
}

@Options({
  watch: {
    todos: {
      handler: "todosChanged",
      deep: true,
    },
    categories: {
      handler: "categoriesChanged",
      deep: true,
    },
  },
  components: {
    ToDoItem,
  },
  emits: "onUpdateDone",
})
export default class ToDo extends Vue {
  todoTitle = "";
  todoDescription = "";
  todoCategories = [];
  selectedCategory = "";
  todos: ToDoTask[] = [];
  categories = [""];
  hideDoneTodo = false;
  searchWord = "";
  order: string = "desc" || "asc";
  categoryName = "";

  /**
   * 作成時
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  created() {
    const todos = window.localStorage.getItem("todos");
    const categories = window.localStorage.getItem("categories");
    if (todos) {
      this.todos = JSON.parse(todos);
    }
    if (categories) {
      this.categories = JSON.parse(categories);
    }
  }

  get canCreateTodo(): boolean {
    return this.todoTitle !== "";
  }
  get canCreateCategory(): boolean {
    return this.categoryName !== "" && !this.existsCategory;
  }
  get existsCategory(): boolean {
    const categoryName = this.categoryName;
    return this.categories.indexOf(categoryName) !== -1;
  }
  get hasTodos(): boolean {
    return this.todos.length > 0;
  }
  get resultTodos(): ToDoTask[] {
    const selectedCategory = this.selectedCategory;
    const hideDoneTodo = this.hideDoneTodo;
    const order = this.order;
    const searchWord = this.searchWord;
    return this.todos
      .filter((todo) => {
        return (
          selectedCategory === "" ||
          todo.categories.indexOf(selectedCategory) !== -1
        );
      })
      .filter((todo) => {
        if (hideDoneTodo) {
          return !todo.done;
        }
        return true;
      })
      .filter((todo) => {
        return (
          todo.title.indexOf(searchWord) !== -1 ||
          todo.description.indexOf(searchWord) !== -1
        );
      })
      .sort((a, b) => {
        if (order === "asc") {
          return a.dateTime - b.dateTime;
        }
        return b.dateTime - a.dateTime;
      });
  }

  todosChanged(next: ToDoTask[]): void {
    window.localStorage.setItem("todos", JSON.stringify(next));
  }
  categoriesChanged(next: string[]): void {
    window.localStorage.setItem("categories", JSON.stringify(next));
  }
  createTodo(): void {
    if (!this.canCreateTodo) {
      return;
    }
    this.todos.push({
      id: "todo-" + Date.now(),
      title: this.todoTitle,
      description: this.todoDescription,
      categories: this.todoCategories,
      dateTime: Date.now(),
      done: false,
    });
    this.todoTitle = "";
    this.todoDescription = "";
    this.todoCategories = [];
  }
  createCategory(): void {
    if (!this.canCreateCategory) {
      return;
    }
    this.categories.push(this.categoryName);
    this.categoryName = "";
  }
  onUpdateDone(todo: ToDoTask): void {
    console.log(todo);
  }
}
</script>

<style scoped>
.todo-list-enter {
  opacity: 0;
  transform: translateX(-20px);
}

.todo-list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.todo-list-enter-to,
.todo-list-leave {
  opacity: 1;
  transform: translateX(0);
}

.todo-item {
  transition: opacity 300ms ease, transform 300ms ease;
}

/* 以下は見栄えを整えるためのスタイル */
.new-todo {
  border: 1px solid #ccc;
  padding: 30px;
}

.new-todo-item + .new-todo-item {
  margin-top: 15px;
}

.new-todo-item {
  display: flex;
}

.new-todo-item > label {
  flex-basis: 5em;
}

.new-todo-item > input[type="text"],
.new-todo-item > textarea {
  flex-grow: 1;
  font-size: inherit;
  border: 1px solid #ccc;
  padding: 0.5em;
}

.new-todo-category {
  margin-top: 20px;
  background-color: #f0f0f0;
  padding: 20px;
}

.new-todo-action {
  margin-top: 20px;
}

.new-todo-action > form {
  text-align: center;
}

.todo-search {
  display: flex;
  margin-top: 20px;
}

.todo-search-item + .todo-search-item {
  border-left: 1px solid #ccc;
  margin-left: 20px;
  padding-left: 20px;
}

.todo-list {
  border: 1px solid #ccc;
  padding: 0;
}

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
