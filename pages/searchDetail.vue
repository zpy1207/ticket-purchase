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


          <choosen-ticket-card></choosen-ticket-card>
        </div>
      </div>

      <!-- ticket-list -->
      <div class="flex flex-column" style="flex-direction: column; flex: 1;">
        <div
          v-for="(item, index) in detailList"
          :key="index"
          class="cardList"
        >
          <ticket-card></ticket-card>
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
      detailList: new Array(10)
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/searchDetail.scss"
</style>>
