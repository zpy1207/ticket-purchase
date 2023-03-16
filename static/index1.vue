<template>
  <div>
    <div class="index-page__header">
      <img class="index-page__header-logo">
      <div class="index-page__login" @click="onLogin">
        <i class="el-icon-user index-page__header-icon" style="cursor: pointer;"></i>
        <span class="login-or-register">登录或注册</span>
      </div>

      <!-- <i class="el-icon-notebook-2 index-page__header-icon"></i>
      <span>跟踪订单</span> -->
    </div>
    <!-- <nuxt-link to="/"></nuxt-link> -->
  </div>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>

<style lang="scss">
@import "~assets/styles/index.scss"
</style>
