Vue.component('my-hello', {
  props: {
    yourName: {
      type: String,
      required: true,
      validator(value) {
        return value.length <= 10
      }
    },
    init: {
      type: String,
      required: true
    }
  },
  template: `
    <div>
      <p>Hello, {{yourName}}, from <slot>adminer</slot></p>
      <p>現在値: {{current}}</p>
      <input type="button" v-on:click="onclick" value="incre" />
    </div>
  `,
  data() {
    return {
      current: this.init,
    }
  },
  methods: {
    onclick() {
      this.current++
    }
  }
})

Vue.component('my-counter', {
  props: ['step'],
  template: `<button type="button" v-on:click="onclick">{{ step }}</button>`,
  methods: {
    onclick() {
      this.$emit('plus', Number(this.step))
    }
  }
})

Vue.component('my-slot', {
  template: `<div>
    <header>
      <slot name="header">Default Header</slot>
    </header>
    <div>
      <slot>Default Main</slot>
    </div>
    <footer>
      <slot name="footer">Defalut Footer</slot>
    </footer>
  </div>`
})

new Vue({
  el: '#app',
  data: {
    currentCount: 0,
  },
  methods: {
    onplus(e) {
      this.currentCount += e
    }
  }
})
