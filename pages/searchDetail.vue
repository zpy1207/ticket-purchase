<template>
  <div class="search-bar">
    <header-tab></header-tab>

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
        <div class="choose-pane-container" style=""></div>
        <!-- choose-pane -->
      </div>
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

export default {
  name: 'SearchDetailPage',
  comments: {
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
