<template>
  <div class="index-page">
    <div class="index-page__header">
      <img class="index-page__header-logo">
      <div class="index-page__login" @click="onLogin">
        <i class="el-icon-user index-page__header-icon" style="cursor: pointer;"></i>
        <span class="login-or-register">登录或注册</span>
      </div>

      <!-- <i class="el-icon-notebook-2 index-page__header-icon"></i>
      <span>跟踪订单</span> -->
    </div>

  <main>
    <div class="index-page__bg">
      <img class="index-page__bg-pic" src="https://cdn.alibaba.ir/h2/desktop/assets/images/hero/hero-e1fa22fb.webp" alt="airplane">
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


export default {
  name: 'IndexPage',
  components: {
    SearchTab,
    SelfModal
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
      console.log('onSearch')
    },
    onLogin () {
      this.showLogin = true
      console.log('login')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/index.scss"
</style>

