<template>
    <div class="index-page__header">
      <img class="index-page__header-logo">
      <div class="index-page__login" @click="onLogin">
        <i class="el-icon-user index-page__header-icon" style="cursor: pointer;"></i>
        <span class="login-or-register">登录或注册</span>
      </div>
    </div>
</template>

<script>
export default {
  methods: {
    onLogin() {
      this.$emit('onLogin')
    }
  }
}
</script>

<style lang="scss">
@import "~assets/styles/components/headerTab.scss"
</style>
