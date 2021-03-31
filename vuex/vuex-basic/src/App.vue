<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <input type="button" value="-" v-on:click="minus" />
    {{count}}
    <input type="button" value="+" v-on:click="plus" />
    <form v-on:submit.prevent="onclick">
      <label for="isbn">ISBN:</label>
      <input type="text" id="isbn" v-model="isbn" /><br />
      <label for="title">書名:</label>
      <input type="text" id="title" v-model="title" /><br />
      <label for="price">価格:</label>
      <input type="number" id="price" v-model="price" /><br />
      <input type="submit" value="登録" />
    </form>
    <p>書籍は全部で{{ booksCount }}冊あります。</p>
    <ul v-for="b of getBooksByPrice(2500)" v-bind:key="b.isbn">
      <li>{{b.title}}（{{b.price}}円）<br />ISBN: {{b.isbn}}</li>
    </ul>
    <div>サブ１: {{sub1Updated}}</div>
    <div>サブ２: {{sub2Updated}}</div>
    <input type="button" value="更新" v-on:click="setUpdated" />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },

  data() {
    return {
      isbn: '',
      title: '',
      price: 0,
    };
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['booksCount', 'getBooksByPrice']),
    sub1Updated() {
      return this.$store.state.sub1.updated;
    },
    sub2Updated() {
      return this.$store.state.sub2.updated;
    },
  },
  /*
  computed: {
    booksCount() {
      return this.$store.getters.booksCount;
    }
  },
  methods: {
    getBooksByPrice(price) {
      return this.$store.getters.getBooksByPrice(price)
    }
  }
  */
  methods: {
    minus() {
      this.$store.commit('minus');
    },
    plus() {
      this.$store.commit('plus');
    },
    onclick() {
      /*
      this.$store.commit('addBook', {
        book: {
          isbn: this.isbn, title: this.title, price: this.price,
        },
      });
      */
      this.$store.dispatch('addAsync', {
        book: {
          isbn: this.isbn, title: this.title, price: this.price,
        },
      });
    },
    setUpdated() {
      this.$store.commit('setUpdated');
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
