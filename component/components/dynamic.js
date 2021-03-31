Vue.component('banner-member', {
  template: `<div class="banner">
    <h3>WINGSメンバー募集中！</h3>
    <p>あなたもWINGSプロジェクトに参加しませんか？<br />
      現在、WINGSプロジェクトでは、ご一緒にお仕事ができる仲間を募集中です。</p>
  </div>`
})

Vue.component('banner-new', {
  template: `<div class="banner">
    <h3>新刊「HTML5超入門 」発売</h3>
    <p>ステップバイステップで学ぶ入門書です。<br />
      HTML5アプリの基礎知識、画面のデザイン、コードの書き方などが理解できます。</p>
  </div>`
})

Vue.component('banner-env', {
  template: `<div class="banner">
    <h3>環境構築設定</h3>
    <p>開発環境の設定方法を図を交えて詳しく解説します。<br />
      紹介している各モジュールは、日々頻繁にバージョンアップが行われています。</p>
  </div>`
})

Vue.component('tab-member', {
  template: `<div class="tab">
    <p>あなたもWINGSプロジェクトに参加しませんか？<br />
      現在、WINGSプロジェクトでは、ご一緒にお仕事ができる仲間を募集中です。</p>
    <label>名前：<input type="text" v-model="name" /></label>
    <input type="submit" value="登録" />
  </div>`,
  data: function() {
    return {
      name: ''
    }
  }
})

Vue.component('tab-new', {
  template: `<div class="tab">
    <h3>「HTML5超入門 」発売！</h3>
    <p>ステップバイステップで学ぶ入門書です。<br />
      HTML5アプリの基礎知識、画面のデザイン、コードの書き方などが理解できます。</p>
  </div>`
})

Vue.component('tab-env', {
  template: `<div class="tab">
    <p>開発環境の設定方法を図を交えて詳しく解説します。<br />
      紹介している各モジュールは、日々頻繁にバージョンアップが行われています。</p>
  </div>`
})

Vue.component('my-input', {
  props: ['value'],
  template: `<label>
    名前:
    <input type="text" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" />
  </label>`
})
// 単一のプロパティを扱うのであれば-modelを利用。双方向かつ対象が複数のプロパティに及ぶ場合は.sync修飾子を利用する


let hook = function(el, binding) {
  console.log(binding.arg)

  if (binding.value === binding.oldValue) {
    return
  }

  if (binding.modifiers.border) {
    el.style.borderColor = binding.value
    el.style.borderStyle = 'solid'
  } else {
    el.style.backgroundColor = binding.value
  }

  el.addEventListener('mouseover', () => {
    el.style.backgroundColor = 'red'
  }, false)
  el.addEventListener('mouseleave', () => {
    el.style.backgroundColor = binding.value
  }, false)
}
Vue.directive('highlight', {
  /*
  bind(el, binding, vnode, oldVnode) {
    el.style.backgroundColor = binding.value
  },
  */
  bind: hook,
  update(el, binding, vnode, oldVnode) {
    if (!binding.modifiers.once) {
      hook(el, binding)
    }
//    el.style.backgroundColor = binding.value
  }
})

Vue.filter('trim', (value) => {
  if (typeof value !== 'string') {
    return value
  }
  return value.trim()
})

let dataLoggable = {
  mounted() {
    console.log(this.$data)
  }
}

Vue.component('my-comp', {
  data() {
    return {
      current: new Date()
    }
  },
  template: `<div>現在時刻: {{current}}</div>`,
  mixins: [dataLoggable]
})

new Vue({
  el: '#app',
  methods: {
    ontabclick(tab) {
      this.currentTabKey = tab
    },
    onswitchclick() {
      this.flag = !this.flag
      this.id = (this.id + 1) % this.panels.length
    },
    onadd() {
      this.items.unshift(this.todo)
      this.todo = ''
    },
    onremove() {
      let that = this
      this.items = this.items.filter((value) => {
        return value !== that.todo
      })
      this.todo = ''
    },
    onsort() {
      this.items.sort()
    }
  },
  created() {
    let that = this
    this.interval = setInterval(() => {
      that.current = (that.current + 1) % that.components.length
    }, 3000)
  },
  beforeDestory() {
    clearInterval(this,interval)
  },
  computed: {
    currentBanner() {
      return 'banner-' + this.components[this.current]
    },
    tabNames() {
      return Object.keys(this.tabs)
    },
    currentTab() {
      return 'tab-' + this.currentTabKey
    }
  },
  data: {
    current: 0,
    currentTabKey: 'member',
    components: ['member', 'new', 'env'],
    tabs: {
      'member': 'Hire Member',
      'new': 'Intro books',
      'env': 'Development env'
    },
    message: '',
    flag: true,
    id: 0,
    panels: [
      'WINGSプロジェクトは、ライター山田祥寛が代表を務める執筆コミュニティです。2005年5月、「有限会社 WINGSプロジェクト」として法人化を果たしたのを機に、ますます質の高い情報を読者の方々にお届けしてまいります。',
      '山田祥寛著作の書籍に関するFAQ情報、書籍訂正情報の総覧です（書籍個別ページからご提供しているページと同一の内容です）。Q＆A掲示板をご使用の前に、必ず本ページの内容をご確認ください。',
      '環境設定については、ページ上部「サーバサイド環境構築設定」にて最新の情報をご提供しております。ご質問の前に、こちらもあわせて参照いただきますよう、ご協力をお願いいたします。'
    ],
    todo: '',
    items: [
      'テストコードを書く',
      'domain層の再整理',
      '開発環境をdocker onlyあれば良いようにする'
    ],
    color: 'yellow',
    title: '  WINGSプロジェクト  '
  }
})
