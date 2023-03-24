<template>
  <div class="choosen-ticket-card ticketCardLayout">
    <button class="button-close" @click="deleteOption">
      <svg t="1678710572127" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2798" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><path d="M570 510.8l254.9-255.1c16.4-16.5 16.4-43 0-59.5s-43-16.5-59.5 0L510.5 451.3 255.8 196.2c-16.4-16.5-43-16.5-59.5 0-16.4 16.5-16.4 43 0 59.5l254.9 255.1-254.9 255c-16.4 16.5-16.4 43 0 59.5 8.1 8.2 18.9 12.4 29.7 12.4s21.5-4.1 29.7-12.4l254.7-255 254.8 255c8.1 8.2 19 12.4 29.7 12.4 10.8 0 21.5-4.1 29.6-12.4 16.4-16.5 16.4-43 0-59.5L570 510.8z m0 0" p-id="2799"></path></svg>
    </button>
    <div class="content">
      <div class="company itrTxtPair">
        <span class="bt_focusText">
          {{ companyAndNumber }}
        </span>
        <span class="bt_focusText"> {{ airlineNum }} </span>
      </div>
      <div class="time itrTxtPair">
        <div class="bt_focusText">{{ startTime }} - {{ endTime }}</div>
        <div class="duration">{{ duration }}</div>
      </div>
      <div v-if="firstClassNum" class="ticket-detail">
        <span class="bt_focusText">头等舱</span>
        <span> × </span>
        <span class=""> {{ firstClassNum }} </span>
      </div>
      <div v-if="secondClassNum" class="ticket-detail">
        <span class="bt_focusText">商务舱</span>
        <span> × </span>
        <span class=""> {{ secondClassNum }} </span>
      </div>
      <div v-if="economyClassNum" class="ticket-detail">
        <span class="bt_focusText">经济舱</span>
        <span> × </span>
        <span class=""> {{ economyClassNum }} </span>
      </div>


    </div>

  </div>
</template>

<script>
export default {
  name: 'ChoosenTicketCard',
  props: {
    ticketInfo: { type: Object, default: null }
  },
  data() {
    return {

    }
  },
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
    economyClassNum() {
      return this.ticketInfo && this.ticketInfo.economyClassNum ? this.ticketInfo.economyClassNum : 0
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
    firstClassNum() {
      return this.ticketInfo && this.ticketInfo.firstClassNum ? this.ticketInfo.firstClassNum : 0
    },
    secondClassNum() {
      return this.ticketInfo && this.ticketInfo.secondClassNum ? this.ticketInfo.secondClassNum : 0
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
  methods: {
    deleteOption() {
      console.log('delete')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/components/choosenTicketCard.scss"
</style>
