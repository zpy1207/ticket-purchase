<template>
  <div class="choosen-ticket-card ticketCardLayout">
    <button class="button-close" @click="deleteOption">
      <svg t="1678710572127" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2798" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><path d="M570 510.8l254.9-255.1c16.4-16.5 16.4-43 0-59.5s-43-16.5-59.5 0L510.5 451.3 255.8 196.2c-16.4-16.5-43-16.5-59.5 0-16.4 16.5-16.4 43 0 59.5l254.9 255.1-254.9 255c-16.4 16.5-16.4 43 0 59.5 8.1 8.2 18.9 12.4 29.7 12.4s21.5-4.1 29.7-12.4l254.7-255 254.8 255c8.1 8.2 19 12.4 29.7 12.4 10.8 0 21.5-4.1 29.6-12.4 16.4-16.5 16.4-43 0-59.5L570 510.8z m0 0" p-id="2799"></path></svg>
    </button>
    <div class="content">
      <div class="company itrTxtPair">
        <span class="bt_focusText">
          公司名-飞机编号
        </span>
        <span class="bt_focusText"> 航班编号 </span>
      </div>
      <div class="time itrTxtPair">
        <div class="bt_focusText">startTime - endTime</div>
        <div class="duration">duration</div>
      </div>
      <div class="ticket-detail">
        <span class="bt_focusText">first-class</span>
        <span> × </span>
        <span class=""> 1 </span>
      </div>


    </div>

  </div>
</template>

<script>
export default {
  name: 'ChoosenTicketCard',
  data() {
    return {

    }
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
