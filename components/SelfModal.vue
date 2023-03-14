<template>
  <div class="a-modal-container">
    <span class="a-modal-backdrop"></span>
    <div class="a-card a-modal is-full auth-modal" style="width: 600px; z-index: 800;">
      <div class="a-card__body">
        <button class="btn is-md is-raw auth-modal-close p-3 m-3" @click="closeModal">
          <svg t="1678710572127" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2798" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><path d="M570 510.8l254.9-255.1c16.4-16.5 16.4-43 0-59.5s-43-16.5-59.5 0L510.5 451.3 255.8 196.2c-16.4-16.5-43-16.5-59.5 0-16.4 16.5-16.4 43 0 59.5l254.9 255.1-254.9 255c-16.4 16.5-16.4 43 0 59.5 8.1 8.2 18.9 12.4 29.7 12.4s21.5-4.1 29.7-12.4l254.7-255 254.8 255c8.1 8.2 19 12.4 29.7 12.4 10.8 0 21.5-4.1 29.6-12.4 16.4-16.5 16.4-43 0-59.5L570 510.8z m0 0" p-id="2799"></path></svg>
        </button>
        <!-- <form action="#" class="auth-form"> -->
          <h3 class="h3">
            <font style="vertical-align: inherit;">登录或注册</font>
          </h3>
          <h4>
            <font style="vertical-align: inherit;">请输入账号</font>
          </h4>
          <div class="a-input mb-5 text-right has-append is-lg">
            <span class="a-input__input">
              <input
                v-model="mobileNumber"
                type="tel"
                @focus="onFocusMobile"
                @blur="onBlurMobile"
              >
            </span>
            <!-- <fieldset>
              <legend style="width: 68px;"></legend>
            </fieldset> -->
            <label class="a-input__label">
              <font style="vertical-align: inherit;">{{ labelMobile }}</font>
            </label>
            <span class="help-text is-invalid">
              <font style="vertical-align: inherit;">{{ errMessage }}</font>
            </span>
          </div>
          <!-- <p class="flex text-right text-2 text-grays-500 mb-4"></p> -->
          <div class="text-center auth-actions">
            <button class="btn is-lg is-solid-secondary is-block is-disabled py-3 mb-4" @click="onSubmit">
              <font style="vertical-align: inherit;">确认并接收验证码</font>
            </button>
          </div>
        <!-- </form> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelfModal",
  data() {
    return {
      errMessage: '',
      mobileNumber: "",
      labelMobile: '电话号码'
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    onFocusMobile() {
      this.labelMobile = ''
    },
    onSubmit() {
      console.log('submit mobile number', this.mobileNumber)
    },
    onBlurMobile() {
      if (!this.mobileNumber) {
        this.labelMobile = "电话号码"
      }
      if (this.mobileNumber && !isMobile(this.mobileNumber)) {
        this.errMessage = "请输入正确的电话号码"
      } else {
        this.errMessage = ''
      }
    }
  }
}

function isMobile (mobile) {
  return /^1[3-9]\d{9}$/.test(mobile)
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/components/selfModal.scss";
</style>
