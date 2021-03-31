let app = new Vue({
    el: '#app',
    data: {
        message: 'Hello, Vue.js',
        url: 'https://jp.vuejs.org/',
        flag: false,
        email: 'abc-vue@sample.com',
        current: new Date().toLocaleString(),
        fullName: '匿名',
        upperName: '',
        path: 'https://www.shonenjump.com/j/rensai/img/main_onepiece.jpg',
        pet: '',
        os: [],
        fileName: '',
        temperature: 0,
        mails: [],
        attrs: {
            size: 20,
            maxlength: 14,
            required: true
        },
        colors: {
            backgroundColor: 'Red',
            color: 'Aqua'
        },
        size: {
            fontSize: '1.5em'
        },
        color: true,
        isChange: true
    },
    methods: {
        emailDomain() {
            return this.email.split('@')[1]
        },
        onclick(message, e) {
            console.log(e)
            this.current = message
        },
        randomm() {
            return Math.random()
        },
        getUpper() {
            this.upperName = this.fullName.toUpperCase()
        },
        onmouseenter() {
            this.path = "https://news-img.dwango.jp/uploads/medium/file/000/246/198/246198/lg_s68q48rrqpgnbvgrsjj.jpg"
        },
        onmouseleave() {
            this.path = "https://www.shonenjump.com/j/rensai/img/main_onepiece.jpg"
        },
        onchange() {
            let file = this.$refs.upfile.files[0]
            console.log(file)
            this.fileName = file.name
        },
        ontempchange() {
            console.log(this.temperature.toFixed(1))
        },
        clear() {
            this.temperature = 0
        },
        help() {
            console.log("Help!!!")
        }
    },
    computed: {
        localEmail() {
            return this.email.split('@')[0].toLowerCase()
        },
        randomc() {
            return Math.random()
        }
        // 配列の絞り込みやソートも算出プロパティを使うべし
    },
    created() {
        let that = this
        this.timer = setInterval(function() {
            that.current = new Date()
        }, 3000)
        this.delayFunc = _.debounce(this.getUpper, 2000)
    },
    watch: {
        fullName(newValue, oldValue) {
            this.delayFunc()
        }
    },
    beforeDestroy() {
        clearInterval(this.timer)
    }
})
