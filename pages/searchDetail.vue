<template>
  <div class="search-bar">
    <header-tab></header-tab>

    <div class="relative sticky-search-position">
      <div class="a-container">
        <div class="collapsed-search-form">
          <search-tab></search-tab>
        </div>
      </div>
    </div>

    <ticket-card></ticket-card>
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

    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/searchDetail.scss"
</style>>
