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
      <shopping-cart></shopping-cart>
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
// import ChoosenTicketCard from '~/components/ChoosenTicketCard.vue'
import ShoppingCart from '~/components/shoppingCart.vue'

export default {
  name: 'SearchDetailPage',
  components: {
    // ChoosenTicketCard,
    ShoppingCart,
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
    async getFlight(obj) {
      try {
        const ticketList = await this.$axios({
          method: 'get',
          url: '/api/ticket/enter/api/flight/flightQuery',
          params: {
            beginCity: obj.startCity,
            endCity: obj.endCity,
            flightDate: obj.startDate
          }
        })
        return ticketList
      } catch(err) {
        console.log(err)
      }
    },
    async init() {
      console.log(this.$route.query)
      const ticketList = await this.getFlight(this.$route.query)
      console.log('ticketList', ticketList)
    },
    onPay() {
      this.$router.push({
        path: '/payment',
        query: {
          ...this.chooseTicketList
        }
      })
      console.log('pay')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/searchDetail.scss"
</style>>
