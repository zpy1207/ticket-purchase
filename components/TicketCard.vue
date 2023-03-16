<template>
  <div class="ticketCardContainer">
    <div class="ticketCardLayout">
      <div class="ticketCard">
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
          <button class="btn is-solid-secondary btn-choose">
            <font style="vertical-align: inherit;">choose</font>
          </button>
          <div class="btn icon">
            <i class="el-icon-arrow-down"></i>
          </div>
        </div>

      </div>

      <div class="detailCard">
        
      </div>
    </div>

  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "~assets/styles/components/ticketCard.scss"
</style>
