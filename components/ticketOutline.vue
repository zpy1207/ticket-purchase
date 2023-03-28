<template>
  <div class="ticketCard">
    <div class="company itrTxtPair">
      <div class="bt_focusText">
        {{ companyAndNumber }}
      </div>
    </div>
    <div class="time itrTxtPair">
      <div class="bt_focusText">{{ startTime }} - {{ endTime }}</div>
      <div class="start-date">起飞日期： {{ startDate }}</div>
    </div>
    <div class="air-class itrTxtPair">
      <div class="bt_focusText">
        {{ airClass }}
      </div>
    </div>
    <div class="price itrTxtPair">
      <div class="bt_focusText">
        {{ price }} 元
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    ticketInfo: { type: Object, default: null }
  },

  computed: {
    airClass() {
      return this.choosenClass && this.choosenClass.seatName ? this.choosenClass.seatName : ''
    },
    airplaneId() {
      return this.ticketInfo && this.ticketInfo.airplaneId ? this.ticketInfo.airplaneId : 'airplaneId'
    },
    choosenClass() {
      return this.ticketInfo && this.ticketInfo.choosenClass ? JSON.parse(this.ticketInfo.choosenClass) : null
    },
    companyAndNumber() {
      return this.ticketInfo && this.ticketInfo.companyAndNumber ? this.ticketInfo.companyAndNumber : '公司名-飞机编号'
    },
    duration() {
      return this.ticketInfo.startTime && this.ticketInfo.endTime ? `${(this.ticketInfo.endTime - this.ticketInfo.startTime) / 1000 / 60} min` : 'duration'
    },
    endAddress() {
      return this.ticketInfo && this.ticketInfo.endCity ? this.ticketInfo.endCity : 'endAddress'
    },
    endTime() {
      if (this.ticketInfo && this.ticketInfo.endTime) {
        const date = new Date(Number(this.ticketInfo.endTime))
        return `${padding(date.getHours())} : ${padding(date.getMinutes())}`
      }
      return 'endTime'
    },
    price() {
      return this.choosenClass && this.choosenClass.price ?  this.choosenClass.price : 'price'
    },
    startAddress() {
      return this.ticketInfo && this.ticketInfo.beginCity ? this.ticketInfo.beginCity : 'startAddress'
    },
    startDate() {
      if (this.ticketInfo && this.ticketInfo.startTime) {
        const date = new Date(Number(this.ticketInfo.startTime))
        return `${padding(date.getMonth()+1)}月${padding(date.getDate())}日`
      }
      return 'startDate'
    },
    startTime() {
      if (this.ticketInfo && this.ticketInfo.startTime) {
        const date = new Date(Number(this.ticketInfo.startTime))
        return `${padding(date.getHours())} : ${padding(date.getMinutes())}`
      }
      return 'startTime'
    },
  },
}

function padding(num) {
  return num < 10 ? `0${num}` : num
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/payment.scss"
</style>
