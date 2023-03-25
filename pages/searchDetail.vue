<template>
  <div class="search-bar">
    <header-tab></header-tab>

    <!-- search-bar -->
    <div class="relative sticky-search-position">
      <div class="a-container">
        <div
          class="collapsed-search-form"
        >
          <search-tab></search-tab>
        </div>
      </div>
    </div>

    <div class="mainLayout flex">
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
            <button class="btn is-solid-secondary btn-choose" style="padding: 5px 50px;" @click="onPay">
              <font style="vertical-align: inherit;">结算</font>
            </button>
          </div>

        </div>
      </div>

      <!-- ticket-list -->
      <div class="flex flex-column" style="flex-direction: column; flex: 1;">
        <div
          v-for="(item, index) in detailList"
          :key="index"
          class="cardList"
        >
          <ticket-card
            @chooseTicket="chooseTicket"
          ></ticket-card>
        </div>
      </div>

    </div>



  </div>
</template>

<script>
import SearchTab from '../components/SearchTab.vue'
import HeaderTab from '~/components/HeaderTab.vue'
import TicketCard from '~/components/TicketCard.vue'
import ChoosenTicketCard from '~/components/ChoosenTicketCard.vue'

export default {
  name: 'SearchDetailPage',
  comments: {
    ChoosenTicketCard,
    HeaderTab,
    SearchTab,
    TicketCard
  },
  data() {
    return {
      chooseTicketList: [],
      detailList: new Array(10),
    }
  },
  created() {
    this.init()
  },
  methods: {
    chooseTicket(obj) {
      console.log('chooseTicket', obj)
      this.chooseTicketList.push(obj)
    },
    deleteOption(obj) {
      console.log('delete', obj)
    },
    init() {
      console.log(this.$route)
    },
    onPay() {
      console.log('pay')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/searchDetail.scss"
</style>>
