<template>
  <div class="index-page">
  <header-tab
    @onLogin="onLogin"
  ></header-tab>
  <main>
    <div class="index-page__bg">
      <!-- <img class="index-page__bg-pic" src="https://cdn.alibaba.ir/h2/desktop/assets/images/hero/hero-e1fa22fb.webp" alt="airplane"> -->
      <img class="index-page__bg-pic" src="../static/picheader.webp" alt="airplane">
    </div>
    <div class="index-page__search-container a-container">
      <div class="search-bar a-card products-box">
        <SearchTab
          @onSearch = "onSearch"
        ></SearchTab>
      </div>
    </div>
  </main>
  <div v-if="showLogin">
    <SelfModal
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
      showLogin: false
    }
  },
  methods: {
    closeModal() {
      this.showLogin = false
    },
    onSearch() {
      // console.log('onSearch')
    },
    onLogin () {
      this.showLogin = true
      // console.log('login')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/index.scss"
</style>

