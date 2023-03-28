<template>
  <div>
    <span class="a-modal-backdrop"></span>
      <div class="a-card a-modal is-full auth-modal" style="width: 600px; z-index: 800;">
        <div class="a-card__body">
          <button class="btn is-md is-raw auth-modal-close p-3 m-3" @click="closeModal">
            <svg t="1678710572127" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2798" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><path d="M570 510.8l254.9-255.1c16.4-16.5 16.4-43 0-59.5s-43-16.5-59.5 0L510.5 451.3 255.8 196.2c-16.4-16.5-43-16.5-59.5 0-16.4 16.5-16.4 43 0 59.5l254.9 255.1-254.9 255c-16.4 16.5-16.4 43 0 59.5 8.1 8.2 18.9 12.4 29.7 12.4s21.5-4.1 29.7-12.4l254.7-255 254.8 255c8.1 8.2 19 12.4 29.7 12.4 10.8 0 21.5-4.1 29.6-12.4 16.4-16.5 16.4-43 0-59.5L570 510.8z m0 0" p-id="2799"></path></svg>
          </button>
            <h3 class="h3">
              <font style="vertical-align: inherit;">请选择舱位</font>
            </h3>
            <!-- <div class="flex">
              <span class="modal-label">舱位：</span>
              <div class="a-input mb-5 text-right has-append is-lg" style="flex: 1">
                <span class="a-input__input">
                  <select
                    v-model="selectedClass"
                  >
                    <option value=''>请选择舱位</option>
                    <option value ="firstClassNum">头等舱</option>
                    <option value ="secondClassNum">商务舱</option>
                    <option value="economyClassNum">经济舱</option>
                  </select>
                </span>
                <label class="a-input__label">
                  <font style="vertical-align: inherit;"></font>
                </label>
                <span class="help-text is-invalid">
                  <font style="vertical-align: inherit;"></font>
                </span>
              </div>
            </div> -->

            <!-- 头等舱input -->
            <!-- <div class="flex">
              <span class="modal-label">头等舱</span>
              <div class="a-input mb-5 text-right has-append is-lg" style="flex: 1">
                <span class="a-input__input">
                  <input
                    v-model="modelFirstClass"
                    type="number"
                  >
                </span>
                <label class="a-input__label">
                  <font style="vertical-align: inherit;"></font>
                </label>
                <span class="help-text is-invalid">
                  <font style="vertical-align: inherit;"></font>
                </span>
              </div>
              <span class="modal-label" style="padding-left: 10px;">张</span>
            </div> -->

            <!-- 商务舱input -->
            <!-- <div class="flex">
              <span class="modal-label">商务舱</span>
              <div class="a-input mb-5 text-right has-append is-lg" style="flex: 1">
                <span class="a-input__input">
                  <input
                    v-model="modelSecondClass"
                    type="number"
                  >
                </span>
                <label class="a-input__label">
                  <font style="vertical-align: inherit;"></font>
                </label>
                <span class="help-text is-invalid">
                  <font style="vertical-align: inherit;"></font>
                </span>
              </div>
              <span class="modal-label" style="padding-left: 10px;">张</span>
            </div> -->

            <!-- 经济舱input -->
            <!-- <div class="flex">
              <span class="modal-label">经济舱</span>
              <div class="a-input mb-5 text-right has-append is-lg" style="flex: 1">
                <span class="a-input__input">
                  <input
                    v-model="modelEconomyClass"
                    type="number"
                  >
                </span>
                <label class="a-input__label">
                  <font style="vertical-align: inherit;"></font>
                </label>
                <span class="help-text is-invalid">
                  <font style="vertical-align: inherit;"></font>
                </span>
              </div>
              <span class="modal-label" style="padding-left: 10px;">张</span>
            </div> -->

            <!-- 舱位选择checkbox -->
            <el-checkbox-group
              v-model="checkList"
              max='1'
              class="flex flex-column checkbox-group"
              size="medium"
            >
              <el-checkbox label="头等舱"></el-checkbox>
              <el-checkbox label="商务舱"></el-checkbox>
              <el-checkbox label="经济舱"></el-checkbox>
            </el-checkbox-group>

            <div class="text-center auth-actions">
              <button class="btn is-lg is-solid-secondary is-block is-disabled py-3 mb-4" @click="onSubmit">
                <font style="vertical-align: inherit;">确认选择</font>
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
      // modelEconomyClass: 0,
      // modelFirstClass: 0,
      // modelSecondClass: 0,
      checkList:[]
    }
  },
  computed: {
    economyClassNum() {
      return this.ticket && this.ticket.economyClassNum ? this.ticket.economyClassNum : this.modelEconomyClass
    },
    firstClassNum() {
      return this.ticket && this.ticket.firstClassNum ? this.ticket.firstClassNum : this.firstClassNum
    },
    secondClassNum() {
      return this.ticket && this.ticket.secondClassNum ? this.ticket.secondClassNum : this.secondClassNum
    },
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    onSubmit() {
      if (this.checkList && Array.isArray(this.checkList) && this.checkList.length === 0) {
        this.$notify.error({
          message: '请选择舱位'
        })
      } else {
        this.$emit('chooseTicket', {
          selectedClass: this.checkList[0]
        })
      }

    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/components/modalChooseTicket.scss"
</style>

