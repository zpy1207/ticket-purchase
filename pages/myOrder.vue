<template>
  <div class="">
    <header-tab
    ></header-tab>

    <div class="flex flex-column order-list">

      <div
        v-for="(item, idx) in orderList"
        :key="idx"
        class="order-container ticketCardLayout"
      >

        <div>
          <order-outline
            :orderInfo="item"
          ></order-outline>
        </div>

        <div class="order-card">
          <ticket-outline
            :orderPrice="item.totalPrice"
            :orderSeat="item.seatName"
            :ticketInfo="item.flightPo"
          ></ticket-outline>

          <div class="flex flex-column detailCard">
            <div class="bt_focusText title-choose-passenger">乘机人信息：</div>

            <div class="passenger-card-list-container">
              <div
                v-for="(passenger, index) in item.ticketVoList"
                :key="index"
              >
                <passenger-card
                  :canChoose = false
                  :passengerInfo="passenger.passenger"
                >
                </passenger-card>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import HeaderTab from '~/components/HeaderTab.vue'
import ticketOutline from '~/components/ticketOutline.vue'

export default {
  components: {
    HeaderTab,
    ticketOutline
  },
  data() {
    return {
      orderList: []
    }
  },
  computed: {
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      await this.initOrderList()
    },
    initOrderList() {
      const data = {
      "flightPo": {
        "id": 10,
        "airplaneId": 26,
        "startPort": "广州白云机场",
        "endPort": "重庆国际机场",
        "beginCity": "广州",
        "endCity": "重庆",
        "startTime": 1679707800000,
        "endTime": 1679715000000,
      },
      "totalPrice": 800,
      "orderTime": 1679707800000,
      "payStatus": 0,
      "payTime": 1679707800000,
      "seatName": "商务舱",
      "ticketVoList": [
        {
          "passenger": {id: 2, identifyCard: "110", firstName: "peiyi", lastName: "zeng"},
          "price": 800,
          "status": 0,
          "ticketStatus": 0
        }
      ]
    }
      this.orderList.push(data)
      this.orderList.push(data)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/myOrder.scss"
</style>
