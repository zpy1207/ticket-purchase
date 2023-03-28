<template>
  <div class="a-modal-container">
    <span class="a-modal-backdrop"></span>
      <div class="a-card a-modal is-full auth-modal" style="width: 600px; z-index: 800;">
        <div class="a-card__body">
          <button class="btn is-md is-raw auth-modal-close p-3 m-3" @click="closeModal">
            <svg t="1678710572127" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2798" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><path d="M570 510.8l254.9-255.1c16.4-16.5 16.4-43 0-59.5s-43-16.5-59.5 0L510.5 451.3 255.8 196.2c-16.4-16.5-43-16.5-59.5 0-16.4 16.5-16.4 43 0 59.5l254.9 255.1-254.9 255c-16.4 16.5-16.4 43 0 59.5 8.1 8.2 18.9 12.4 29.7 12.4s21.5-4.1 29.7-12.4l254.7-255 254.8 255c8.1 8.2 19 12.4 29.7 12.4 10.8 0 21.5-4.1 29.6-12.4 16.4-16.5 16.4-43 0-59.5L570 510.8z m0 0" p-id="2799"></path></svg>
          </button>
            <h3 class="h3">
              <font style="vertical-align: inherit;">请填写乘机人信息</font>
            </h3>

            <div class="flex">
              <span class="modal-label">名：(英文)</span>
              <div class="a-input mb-5 text-right has-append is-lg" style="flex: 1">
                <span class="a-input__input">
                  <input
                    v-model="firstName"
                    type="text"
                  >
                </span>
              </div>
            </div>

            <div class="flex">
              <span class="modal-label">姓：(英文)</span>
              <div class="a-input mb-5 text-right has-append is-lg" style="flex: 1">
                <span class="a-input__input">
                  <input
                    v-model="lastName"
                    type="text"
                  >
                </span>
              </div>
            </div>

            <div class="flex">
              <span class="modal-label">身份证：</span>
              <div class="a-input mb-5 text-right has-append is-lg" style="flex: 1">
                <span class="a-input__input">
                  <input
                    v-model="idCard"
                    type="text"
                  >
                </span>
              </div>
            </div>


            <div class="text-center auth-actions">
              <button class="btn is-lg is-solid-secondary is-block is-disabled py-3 mb-4" @click="onSubmit">
                <font style="vertical-align: inherit;">确认添加</font>
              </button>
            </div>
        </div>

      </div>
  </div>
</template>

<script>
export default {
  name: 'ModalChooseTicket',
  props: {
    ticket: { type: Object, default: null }
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      idCard: ''
    }
  },
  computed: {
  },
  methods: {
    async addPassenger() {
      try {
        // debugger
        const passenger = JSON.stringify({
          firstName: this.firstName,
          identifyCard: this.idCard,
          lastName: this.lastName
        })
        const token = JSON.parse(window.localStorage.getItem('user')).token || 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwidXNlcklkIjoiMiIsIm5hbWUiOiIxNjc5NzI2MDkyNTU5MTM3Mjk1MTAwODMiLCJyb2xlIjowLCJleHAiOjE3NjYyMTYwNjV9.O9sbmALG5SuiiLuzhhv8Dq67p_3CKZF_FFVGod4-MQX3pk0f1L5y_8Nv154DvwH2DSdFLCA-wfUl4I2rUsbM_Q'
        // debugger
        const { data: { data } } = await this.$axios({
          headers: {
              'Content-Type': 'application/json',
              'Authorization': token
          },
          method: 'post',
          url: '/api/user/api/passenger',
          data: passenger
        })
        return data
      } catch(err) {

      }
    },
    closeModal() {
      this.$emit('closeModal')
    },
    messageSuccess(message) {
      this.$notify({
        message,
        type: 'success'
      });
    },
    messageWrong(message) {
      this.$notify.error({
        message
      });
    },
    async onSubmit() {
      const state = await this.addPassenger()
      if(!state) {
        this.messageWrong('添加乘机人失败')
      } else {
        this.messageSuccess('添加乘机人成功')
        this.closeModal()
        this.updatePanegerList()
      }
    },
    updatePanegerList() {
      this.$emit('updatePanegerList')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/components/modalChooseTicket.scss"
</style>

