<template>
  <div class="index-page">
    <header-tab
      title="home"
      :user="currentUser"
      @logOut="logOut"
      @onLogin="onLogin"
      @onRegister="onRegister"
    ></header-tab>
    <main>
      <div class="index-page__bg">
        <!-- <img class="index-page__bg-pic" src="https://cdn.alibaba.ir/h2/desktop/assets/images/hero/hero-e1fa22fb.webp" alt="airplane"> -->
        <img class="index-page__bg-pic" src="../static/picheader.webp" alt="airplane">
      </div>

      <div>
        <div class="index-page__search-container a-container">
          <div class="search-bar a-card products-box">
            <searchTab
              @onSearch = "onSearch"
            ></searchTab>
          </div>
        </div>
      </div>

    </main>

  </div>
</template>

<script>
// import qs from 'qs'

import SearchTab from '../components/SearchTab.vue'
// import SelfModal from '../components/SelfModal.vue'
import HeaderTab from '~/components/HeaderTab.vue'



export default {
  name: 'HomePage',
  components: {
    SearchTab,
    // SelfModal,
    HeaderTab
  },
  data() {
    return {
      currentUser: null,
      showLogin: false
    }
  },
  computed: {
  },
  created() {
    this.init()
  },
  methods: {
    async getUser(phone, psd) {
      try {
        // debugger
        const user = JSON.stringify({
          phone,
          password: psd
        })
        const { data: { data } } = await this.$axios({
          headers: {
              'Content-Type': 'application/json'
          },
          method: 'post',
          url: '/api/user/auth/login',
          data: user
        })
        return data
      } catch(err) {

      }
    },
    logOut() {
      this.currentUser = null
      window.localStorage.clear()
    },
    init() {
      // get user
    },
    onLogin(number, psd) {
      // send login request
      this.userLogin(number, psd)
      if (this.currentUser) {
        window.localStorage.setItem('user', JSON.stringify(this.currentUser))
      }
      console.log(window.localStorage.getItem('userName'))
    },
    async onRegister(obj) {
      // send register request
      try {
        const data = JSON.stringify({
          phone: obj.phone,
          password: obj.psd,
          userName: obj.userName
        })
        // const user = await this.$axios.$post('/api/user/auth/register',data)
        const user = await this.$axios({
          headers: {
              'Content-Type': 'application/json'
          },
          method: 'post',
          // url: '/api/user/auth/register',
          url: '/api/user/auth/register',
          data
        })
        return user
      } catch(err) {

      }
      // console.log('onRegister')
    },
    onSearch(searchInfo) {
      // const tmp = 1
      this.$router.push({
        path: '/searchDetail',
        query: {
          ...searchInfo
        }
      })
    },
    async userLogin(number, psd) {
      try {
        this.currentUser = await this.getUser(number, psd)
        console.log(this.currentUser)
        // this.currentUser = {
        //   userName: 'cxn',
        //   phone: '110'
        // }
      } catch(err) {

      }

    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/index.scss"
</style>

