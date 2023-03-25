<template>
  <div>
    <div class="ticketCardContainer">
      <div class="ticketCardLayout">
        <div class="ticketCard">
          <div class="company itrTxtPair">
            <div class="bt_focusText">
              {{ companyAndNumber }}
            </div>
          </div>
          <div class="time itrTxtPair">
            <div class="bt_focusText">{{ startTime }} - {{ endTime }}</div>
            <div class="duration">{{ duration }}</div>
          </div>
          <div class="price itrTxtPair">
            <div class="bt_focusText">
              {{ price }}
            </div>
          </div>

        </div>

        <div
          class="detailCard"
        >
          <div class="flex flex-column">
            <div class="ticketCard">
              <div class="detail-company-num itrTxtPair">
                <div class="bt_focusText pd-5">
                  {{ companyAndNumber }}
                </div>
                <div class="bt_focusText pd-5">
                  {{ airlineNum }}
                </div>
              </div>
            </div>
            <div class="itrDetails clearfix">
            </div>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import TicketCard from "~/components/TicketCard.vue"

export default {
  // components: { TicketCard }
    computed: {
    airlineNum() {
      return this.ticketInfo && this.ticketInfo.airlineNum ? this.ticketInfo.airlineNum : 'airlineNum'
    },
    companyAndNumber() {
      return this.ticketInfo && this.ticketInfo.companyAndNumber ? this.ticketInfo.companyAndNumber : '公司名-飞机编号'
    },
    duration() {
      return this.ticketInfo && this.ticketInfo.duration ? this.ticketInfo.duration : 'duration'
    },
    endAddress() {
      return this.ticketInfo && this.ticketInfo.endAddress ? this.ticketInfo.endAddress : 'endAddress'
    },
    endDate() {
      return this.ticketInfo && this.ticketInfo.endDate ? this.ticketInfo.endDate : 'endDate'
    },
    endTime() {
      return this.ticketInfo && this.ticketInfo.endTime ? this.ticketInfo.endTime : 'endTime'
    },
    price() {
      return this.ticketInfo && this.ticketInfo.price ? this.ticketInfo.price : 'price'
    },
    startAddress() {
      return this.ticketInfo && this.ticketInfo.startAddress ? this.ticketInfo.startAddress : 'startAddress'
    },
    startDate() {
      return this.ticketInfo && this.ticketInfo.startDate ? this.ticketInfo.startDate : 'startDate'
    },
    startTime() {
      return this.ticketInfo && this.ticketInfo.startTime ? this.ticketInfo.startTime : 'startTime'
    },
  },
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/payment.scss"
</style>

