<template>
  <div class="ticketCardContainer">
    <div class="ticketCardLayout">
      <div class="ticketCard" @click="onCollapse">
        <div class="company itrTxtPair">
          <div class="bt_focusText">
            航空公司
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
                航空公司
              </div>
              <div class="bt_focusText pd-5">
                航班编号
              </div>
            </div>
          </div>
          <div class="itrDetails clearfix">
            <div class="deptDetails floatLeft">
              <div class="bt_focusText airportCode">
                start-airport-code
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
                end-airport-code
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

  </div>
</template>

<script>
export default {
  name: 'TicketCard',
  data() {
    return {
      showDetail: false
    }
  },
  computed: {
    classIcon() {
      return this.showDetail ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
    }
  },
  methods: {
    onChoose() {
      console.log('choose')
    },
    onCollapse() {
      console.log(this.showDetail)
      this.showDetail = !this.showDetail
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/components/ticketCard.scss"
</style>
