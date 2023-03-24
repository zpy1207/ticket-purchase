<template>
  <div class="index-page">
  <header-tab
    title="home"
    :user="currentUser"
    @logOut="logOut"
    @showLoginPane="showLoginPane"
  ></header-tab>
  <main>
    <div class="index-page__bg">
      <!-- <img class="index-page__bg-pic" src="https://cdn.alibaba.ir/h2/desktop/assets/images/hero/hero-e1fa22fb.webp" alt="airplane"> -->
      <img class="index-page__bg-pic" src="../static/picheader.webp" alt="airplane">
    </div>

    <div>
      <div class="index-page__search-container a-container">
        <div class="search-bar a-card products-box">
          <SearchTab
            @onSearch = "onSearch"
          ></SearchTab>
        </div>
      </div>
    </div>

  </main>

  <!-- login-modal -->
  <div v-if="showLogin">
    <SelfModal
      @onLogin="onLogin"
      @onRegister="onRegister"
      @closeModal="closeModal"
    ></SelfModal>
  </div>

  </div>
</template>

<script>
import SearchTab from '../components/SearchTab.vue'
import SelfModal from '../components/SelfModal.vue'
import HeaderTab from '~/components/HeaderTab.vue'

export default {
  name: 'HomePage',
  components: {
    SearchTab,
    SelfModal,
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
    closeModal() {
      this.showLogin = false
    },
    logOut() {
      this.currentUser = null
      window.localStorage.clear()
    },
    init() {
      // get user

    },
    onLogin(number, psd) {
      console.log('onLogin')
      // send login request
      this.userLogin(number, psd)
      if (this.currentUser) {
        window.localStorage.setItem('user', JSON.stringify(this.currentUser))
      }
      console.log(window.localStorage.getItem('userName'))
    },
    onRegister() {
      // send register request
      console.log('onRegister')
    },
    onSearch(searchInfo) {
      // const tmp = 1
      this.$router.push({
        path: '/searchDetail',
        query: {
          ...searchInfo
        }
      })
      // console.log('onSearch')
    },
    showLoginPane () {
      this.showLogin = true
      // console.log('login')
    },
    userLogin(number, psd) {
      this.currentUser = {
        userName: 'cxn',
        phone: '110'
      }
      this.showLogin = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/index.scss"
</style>

