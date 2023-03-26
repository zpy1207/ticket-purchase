<template>
        <div class="choosePane" style="">
        <div class="choose-pane-container" style="">
          <div class="choose-pane-title">
            <span class="icon-plane">
              <i class="el-icon-s-promotion"></i>
            </span>
            <span>已选择航班：</span>
          </div>

          <!-- 选择的list -->
          <div style="overflow-x: hidden; height: 80%; overflow: -moz-scrollbars-none;">
            <choosen-ticket-card
              v-for="(item, idx) in chooseTicketList"
              :key="idx"
              :ticketInfo="item"
              @deleteOption="deleteOption"
            ></choosen-ticket-card>
          </div>


          <div class="btn__pay">
            <button class="btn is-solid-secondary btn-choose pointer" style="padding: 5px 50px;" @click="onPay">
              <font style="vertical-align: inherit;">结算</font>
            </button>
          </div>

        </div>
      </div>

</template>

<script>
import ChoosenTicketCard from '~/components/ChoosenTicketCard.vue'
export default {
  components: {
    ChoosenTicketCard,
  },
  props: {
    chooseTicketList: { type: Object, default: null }
  },

  methods: {
    deleteOption() {
      console.log('deleteOption')
    }
  },
  onPay() {
    this.$emit('onPay')
  }

}
</script>

<style lang="scss" scoped>
@import "~assets/styles/searchDetail.scss"
</style>
