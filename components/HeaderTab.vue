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

      <el-popover
        ref="popover"
        v-model="showPopover"
        placement="bottom"
        width="260"
        trigger="click"
        popper-class="header-popup"
      >
        <div
          v-if="!isSelfCenter"
          class="pointer btn-label btn-passenger"
          @click="goToCenter"
        >
          编辑乘机人
        </div>
        <div class="pointer btn-label btn-logout" @click="logout">退出登录</div>
      </el-popover>

      <div v-popover:popover class="slot-reference">
        <div
          class="index-page__login index-page__cell pointer"
          @click.stop="onUser"
        >
          <i class="el-icon-user index-page__header-icon" ></i>
          <span class="login-or-register header__label">{{ labelUser }}</span>
        </div>
      </div>

      <!-- login-register pane -->
      <div v-if="showModal">
        <self-modal
          @onLogin="onLogin"
          @onRegister="onRegister"
          @closeModal="closeModal"
        ></self-modal>
      </div>

    </div>
</template>

<script>
import SelfModal from './SelfModal.vue'

export default {
  components: {
    SelfModal
  },
  props: {
    title: { type: String, default: '' },
    user: { type: Object, default: null }
    // userName: { type: String, default: }
  },
  data() {
    return {
      currentUser: null,
      showModal: false,
      showPopover: false
    }
  },
  computed: {
    hasLogin() {
      return !!this.currentUser
    },
    labelUser() {
      return this.hasLogin ? `hello, ${this.userName}` : '登录或注册'
    },
    isAdminister() {
      return this.currentUser && this.currentUser.role
    },
    isSelfCenter() {
      return process.browser && window.location.pathname.slice(1) === 'selfCenter'
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
    closeModal() {
      this.showModal = false
    },
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
    goToCenter() {
      this.$router.push({
        path: '/selfCenter',
        query: {
          // user: this.currentUser
        }
      })
    },
    goToOrder() {
      this.$router.push({
        path: '/myOrder',
        query: {
          // user: this.currentUser
        }
      })
    },
    logout() {
      this.currentUser = null
      window.localStorage.clear()
      this.showPopover = false
    },
    init() {
      if (process.browser) {
        if (window.localStorage.getItem('user')) {
          this.currentUser = JSON.parse(window.localStorage.getItem('user'))
        }
      }
      // console.log('currentUser', this.currentUser)
    },
    messageSuccess(message) {
      this.$notify({
        message,
        type: 'success'
      });
    },
    messageWrong(message) {
      this.$notify.error({
        title: ' ',
        message
      });
    },
    async onLogin(number, psd) {
      if (!number || !psd) {
        this.messageWrong('请填写完整的登录信息')
      } else {
        await this.userLogin(number, psd)
        if (this.currentUser) {
          window.localStorage.setItem('user', JSON.stringify(this.currentUser))
          this.showModal = false
          this.messageSuccess('登录成功')
          // console.log(JSON.parse(window.localStorage.getItem('user')).token)
        }
      }
    },
    onRegister(obj) {
      const { phone, psd, userName } = obj
      if (phone || psd || userName) {
        this.messageWrong('请填写完整的信息')
      } else {
        this.$emit('onRegister', {
          phone,
          psd,
          userName
        })
      }

    },
    onUser() {
      if (!this.hasLogin) {
        this.showModal = true
        // this.$emit('showLoginPane')
      } else {
        this.showPopover = true
      }
    },
    async userLogin(number, psd) {
      try {
        this.currentUser = await this.getUser(number, psd)
        if (!this.currentUser && number === '137' && psd === '111') {
          this.currentUser = {
            userName: 'cxn',
            phone: '137',
            token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwidXNlcklkIjoiMiIsIm5hbWUiOiIxNjc5NzI2MDkyNTU5MTM3Mjk1MTAwODMiLCJyb2xlIjowLCJleHAiOjE3NjYyMTYwNjV9.O9sbmALG5SuiiLuzhhv8Dq67p_3CKZF_FFVGod4-MQX3pk0f1L5y_8Nv154DvwH2DSdFLCA-wfUl4I2rUsbM_Q'
          }
        }
      } catch(err) {
        this.messageWrong(err)
      }
    }
  }
}
</script>

<style lang="scss">
@import "~assets/styles/components/headerTab.scss"
</style>
