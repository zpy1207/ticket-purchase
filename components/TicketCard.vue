<template>
  <div class="ticketCardContainer">
    <div class="ticketCardLayout">
      <div class="ticketCard" @click="onCollapse">
        <div class="company itrTxtPair">
          <div class="bt_focusText">
            公司名-飞机编号
          </div>
        </div>
        <div class="time itrTxtPair">
          <div class="bt_focusText">startTime - endTime</div>
          <div class="duration">duration</div>
        </div>
        <div class="price itrTxtPair">
          <div class="bt_focusText">
            price
          </div>
        </div>
        <div class="itrTxtPair">
          <button class="btn is-solid-secondary btn-choose" @click.stop="onChoose">
            <font style="vertical-align: inherit;">choose</font>
          </button>
          <div class="btn icon">
            <i :class="classIcon"></i>
          </div>
        </div>

      </div>

      <div
        v-if="showDetail"
        class="detailCard"
      >
        <div class="flex flex-column">
          <div class="ticketCard">
            <div class="detail-company-num itrTxtPair">
              <div class="bt_focusText pd-5">
                公司名-飞机编号
              </div>
              <div class="bt_focusText pd-5">
                航班编号
              </div>
            </div>
            <div class="rest-seat ">
              <div class="class-level bt_focusText flex flex-column floatLeft">
                <div>first-class</div>
                <div>second-class</div>
                <div>economy-class</div>
              </div>
              <div class="rest-seats flex flex-column floatLeft">
                <div>rest 123 seats</div>
                <div>rest 123 seats</div>
                <div>rest 123 seats</div>
              </div>

            </div>
          </div>
          <div class="itrDetails clearfix">
            <div class="deptDetails floatLeft">
              <div class="bt_focusText airportCode">
                <!-- start-airport-code -->
              </div>
              <div>
                <div class="bt_focusText">
                  start-time
                </div>
                <div class="itrDate">
                  start-date
                </div>
              </div>
              <div>start-airport-address</div>
            </div>
            <div class="fltDurationPair floatLeft">
              <div class="fltDuration">飞行时长</div>
            </div>
            <div class="deptDetails floatRight">
              <div class="bt_focusText airportCode">
                <!-- end-airport-code -->
              </div>
              <div>
                <div class="bt_focusText">
                  end-time
                </div>
                <div class="itrDate">
                  end-date
                </div>
              </div>
              <div>end-airport-address</div>
            </div>
          </div>
        </div>


      </div>
    </div>

    <div
      v-if="showModal"
      class="choose-modal a-modal-container"
    >
      <span class="a-modal-backdrop"></span>
      <div class="a-card a-modal is-full auth-modal" style="width: 600px; z-index: 800;">
        <div class="a-card__body">
          <button class="btn is-md is-raw auth-modal-close p-3 m-3" @click="closeModal">
            <svg t="1678710572127" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2798" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><path d="M570 510.8l254.9-255.1c16.4-16.5 16.4-43 0-59.5s-43-16.5-59.5 0L510.5 451.3 255.8 196.2c-16.4-16.5-43-16.5-59.5 0-16.4 16.5-16.4 43 0 59.5l254.9 255.1-254.9 255c-16.4 16.5-16.4 43 0 59.5 8.1 8.2 18.9 12.4 29.7 12.4s21.5-4.1 29.7-12.4l254.7-255 254.8 255c8.1 8.2 19 12.4 29.7 12.4 10.8 0 21.5-4.1 29.6-12.4 16.4-16.5 16.4-43 0-59.5L570 510.8z m0 0" p-id="2799"></path></svg>
          </button>
            <h3 class="h3">
              <font style="vertical-align: inherit;">请选择舱位和票数</font>
            </h3>
            <div class="flex">
              <span class="modal-label">舱位：</span>
              <div class="a-input mb-5 text-right has-append is-lg" style="flex: 1">
                <span class="a-input__input">
                  <select
                    v-model="selectedClass"
                  >
                    <option value=''>请选择舱位</option>
                    <option value ="firstClass">头等舱</option>
                    <option value ="secondClass">商务舱</option>
                    <option value="economyClass">经济舱</option>
                  </select>
                </span>
                <!-- <fieldset>
                  <legend style="width: 68px;"></legend>
                </fieldset> -->
                <label class="a-input__label">
                  <font style="vertical-align: inherit;"></font>
                </label>
                <span class="help-text is-invalid">
                  <font style="vertical-align: inherit;"></font>
                </span>
              </div>
            </div>

            <div class="flex">
              <span class="modal-label">票数：</span>
              <div class="a-input mb-5 text-right has-append is-lg" style="flex: 1">
                <span class="a-input__input">
                  <input
                    v-model="numPeople"
                    type="number"
                  >
                </span>
                <!-- <fieldset>
                  <legend style="width: 68px;"></legend>
                </fieldset> -->
                <label class="a-input__label">
                  <font style="vertical-align: inherit;"></font>
                </label>
                <span class="help-text is-invalid">
                  <font style="vertical-align: inherit;"></font>
                </span>
              </div>
              <span class="modal-label" style="padding-left: 10px;">张</span>
            </div>

            <div class="text-center auth-actions">
              <button class="btn is-lg is-solid-secondary is-block is-disabled py-3 mb-4" @click="onSubmit">
                <font style="vertical-align: inherit;">确认选择</font>
              </button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TicketCard',
  data() {
    return {
      numPeople: 1,
      selectedClass: '',
      showDetail: false,
      showModal : false,
    }
  },
  computed: {
    classIcon() {
      return this.showDetail ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
    }
  },
  methods: {
    closeModal() {
      console.log('close')
      this.showModal = false
    },
    onChoose() {
      this.showModal = true
      console.log('choose')
    },
    onCollapse() {
      console.log(this.showDetail)
      this.showDetail = !this.showDetail
    },
    onSubmit() {
      console.log(this.selectedClass)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/components/ticketCard.scss"
</style>
