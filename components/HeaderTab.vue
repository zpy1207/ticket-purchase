<template>
    <div class="index-page__header">
      <img class="index-page__header-logo">

      <div class="title">{{ title }}</div>

      <!-- order -->
      <div
        v-if="hasLogin"
        class="index-page__order index-page__cell pointer"
        @click="goToOrder"
      >
        <i class="el-icon-goods index-page__header-icon" ></i>
        <span class="label-order header__label">我的订单</span>
      </div>

      <!-- login and register -->
      <div
        class="index-page__login index-page__cell"
        :class="classUser"
        @click="onUser"
      >
        <i class="el-icon-user index-page__header-icon" ></i>
        <span class="login-or-register header__label">{{ labelUser }}</span>
      </div>


    </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' },
    user: { type: Object, default: null }
    // userName: { type: String, default: }
  },
  data() {
    return {
      // currentUser: null
    }
  },
  computed: {
    classUser() {
      return this.hasLogin ? '' : 'pointer'
    },
    currentUser() {
      // const userName = process.browser && window.localStorage.getItem('userName') ? window.localStorage.getItem('userName') : ''
      // console.log('currentUser', userName)
      return this.user
    },
    hasLogin() {
      return !!this.currentUser
    },
    labelUser() {
      return this.hasLogin ? `hello, ${this.userName}` : '登录或注册'
    },
    isAdminister() {
      return this.currentUser && this.currentUser.role
    },
    userName() {
      return this.currentUser && this.currentUser.userName ? this.currentUser.userName : ''
    }
  },
  mounted() {
  },
  created() {
    this.init()
  },
  methods: {
    goToOrder() {
      this.$router.push({
        path: '/myOrder',
        query: {
          // user: this.currentUser
        }
      })
    },
    init() {
      // if (process.browser) {
      //   if (window.localStorage.getItem('userName')) {
      //     this.currentUser = { ...this.user, userName: window.localStorage.getItem('user') }
      //   }
      // }
      // console.log('currentUser', this.currentUser)
    },
    onUser() {
      if (!this.hasLogin) {
        this.$emit('showLoginPane')
      } else {
        this.$emit('logOut')
      }
    }
  }
}
</script>

<style lang="scss">
@import "~assets/styles/components/headerTab.scss"
</style>
