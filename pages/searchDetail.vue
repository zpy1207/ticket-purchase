<template>
  <div class="search-bar">
    <header-tab></header-tab>

    <!-- search-bar -->
    <div class="relative sticky-search-position">
      <div class="a-container">
        <div
          class="collapsed-search-form"
        >
          <search-tab
            :searchInfo="searchInfo"
          ></search-tab>
        </div>
      </div>
    </div>

    <div class="mainLayout flex">
      <!-- <shopping-cart></shopping-cart> -->
      <!-- ticket-list -->
      <div class="flex flex-column" style="flex-direction: column; flex: 1;">
        <div
          v-for="(item, index) in ticketList"
          :key="index"
          class="cardList"
        >
          <ticket-card
            :ticketInfo="item"
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
// import ShoppingCart from '~/components/shoppingCart.vue'

export default {
  name: 'SearchDetailPage',
  components: {
    // ChoosenTicketCard,
    // ShoppingCart,
    HeaderTab,
    SearchTab,
    TicketCard
  },
  data() {
    return {
      chooseTicketList: [],
      ticketList: [],
      searchInfo: null
    }
  },
  created() {
    this.init()
  },
  methods: {
    chooseTicket(obj) {
      // console.log('chooseTicket', obj)
      this.onPay(obj)
    },
    deleteOption(obj) {
      console.log('delete', obj)
    },
    async getFlight(obj) {
      try {
        const { startCity, endCity, startDate } = obj
        const { data: { data } } = await this.$axios({
          method: 'get',
          url: '/api/ticket/enter/api/flight/flightQuery',
          params: {
            beginCity: startCity,
            endCity,
            flightDate: startDate
          }
        })


        return data
      } catch(err) {
        this.messageWrong('获取航班信息出错')

      }
    },
    async init() {
      // console.log(this.$route.query)
      this.searchInfo = this.$route.query
      this.ticketList = await this.getFlight(this.$route.query)
      if (!this.ticketList) {
        const { startCity, endCity, startDate } = this.$route.query
        if (startCity === '广州' && endCity === '重庆' && startDate === '2023-03-25') {
          this.ticketList = [
            {
              "id": 10,
              "airplaneId": 26,
              "startPort": "广州白云机场",
              "endPort": "重庆国际机场",
              "beginCity": "广州",
              "endCity": "重庆",
              "startTime": 1679707800000,
              "endTime": 1679715000000,
              "detailVoList": [
                {
                  "freeNum": 20,
                  "price": 1000,
                  "seatName": "头等舱"
                },
                {
                  "freeNum": 80,
                  "price": 800,
                  "seatName": "商务舱"
                },
                {
                  "freeNum": 150,
                  "price": 400,
                  "seatName": "经济舱"
                }
              ]
            }
          ]
        }
      }
      console.log('ticketList', this.ticketList)
    },
    messageSuccess(message) {
      this.$notify({
        message,
        type: 'success'
      });
    },
    messageWrong(message) {
      this.$notify.error({
        message
      });
    },
    onPay(obj) {
      this.$router.push({
        path: '/payment',
        query: {
          ...obj
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/searchDetail.scss"
</style>>
