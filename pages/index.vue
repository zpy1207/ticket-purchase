<template>
  <div class="index-page">
    <header-tab
      title="home"
      :user="currentUser"
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
    logOut() {
      this.currentUser = null
      window.localStorage.clear()
    },
    init() {
      // get user
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
      this.$router.push({
        path: '/searchDetail',
        query: {
          ...searchInfo
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/index.scss"
</style>

