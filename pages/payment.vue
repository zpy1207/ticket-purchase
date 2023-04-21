<template>
  <div>
    <div class="header">
      <header-tab></header-tab>
    </div>

    <div class="flex flex-center payment-container-container">
      <div class="payment-container">
        <div class="ticketCardContainer">
          <div class="ticketCardLayout">
            <div
              v-if="ticketInfo"
            >
              <ticket-outline
                :ticketInfo="ticketInfo"
              ></ticket-outline>
            </div>


            <div
              class="detailCard"
            >
              <div class="flex flex-column">
                <div class="flex card-title">
                  <div class="bt_focusText title-choose-passenger">请选择乘机人：</div>
                  <div class="btn__pay">
                    <button class="btn is-solid-secondary btn-choose pointer" style="padding: 5px 50px;" @click="onClickAddPassenger">
                      <font style="vertical-align: inherit;">+ 新增乘机人</font>
                    </button>
                  </div>
                </div>

                  <div class="passenger-card-list-container">
                    <div
                      v-for="(item, idx) in passengerList"
                      :key="idx"
                    >
                      <passenger-card
                        :passengerInfo="item"
                        @selectPassenger="selectPassenger"
                      ></passenger-card>
                    </div>
                  </div>
                <div class="itrDetails clearfix">
                </div>
              </div>
            </div>


            <div class="btn__pay">
              <button class="btn is-solid-secondary btn-choose pointer" style="padding: 5px 50px;" @click="onPay">
                <font style="vertical-align: inherit;">结算</font>
              </button>
            </div>

          </div>


        </div>


<!-- modal -->
        <div
          v-if="showModal"
        >
          <modal-add-passenger
            @updatePanegerList="updatePanegerList"
            @closeModal="closeModal"
          ></modal-add-passenger>
        </div>

      </div>
    </div>


  </div>
</template>

<script>
import passengerCard from '~/components/passengerCard.vue'
import HeaderTab from '~/components/HeaderTab.vue'
import modalAddPassenger from '~/components/modalAddPassenger.vue'
// import TicketCard from "~/components/TicketCard.vue"

export default {
  components: {
    modalAddPassenger,
    HeaderTab,
    passengerCard,
  },
  data() {
    return {
      passengerList: [],
      selectedPassengers: [],
      showModal: false,
      ticketInfo: null
    }
  },

  async created() {
    await this.updatePanegerList()
    this.init()
  },
  methods: {
    closeModal() {
      this.showModal = false
    },
    async createOrder() {
      try{
        const data = JSON.stringify({
          flightId: this.ticketInfo.id,
          passengerId: this.selectedPassengers.map((e) => e.id),
          seatName: this.seatName
        })
        const token = JSON.parse(window.localStorage.getItem('user')).token
        const { data: { data: info } } = await this.$axios({
          headers: {
              'Content-Type': 'application/json',
              'Authorization': token
          },
          method: 'post',
          url: '/api/order/api/order/addAndPay ',
          data
        })

        if(info) {
          return true
        }

        return false
      }catch(err) {
        return false
      }

    },
    async getPassengerList() {
      try {
        // debugger
        const token = JSON.parse(window.localStorage.getItem('user')).token || 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwidXNlcklkIjoiMiIsIm5hbWUiOiIxNjc5NzI2MDkyNTU5MTM3Mjk1MTAwODMiLCJyb2xlIjowLCJleHAiOjE3NjYyMTYwNjV9.O9sbmALG5SuiiLuzhhv8Dq67p_3CKZF_FFVGod4-MQX3pk0f1L5y_8Nv154DvwH2DSdFLCA-wfUl4I2rUsbM_Q'
        const { data: { data } } = await this.$axios({
          headers: {
              'Authorization': token
          },
          method: 'get',
          url: '/api/user/api/passenger/list',
        })
        return data
      } catch(err) {

      }
    },
    init() {
      this.ticketInfo = this.$route.query
      this.seatName = this.ticketInfo && this.ticketInfo.choosenClass ? JSON.parse(this.ticketInfo.choosenClass).seatName : null
    },
    onClickAddPassenger() {
      this.showModal = true
    },
    async onPay() {
      const state = await this.createOrder()
      if (state) {
        this.$notify({
          type: 'success',
          message: '订单创建成功，即将转到订单页面'
        })
        const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
        await sleep(3000)
        this.$router.push('/myOrder')
      }else {
        this.$notify.error({
          message: '订单创建失败'
        })
      }
    },
    selectPassenger(obj, selected) {
      if (selected) {
        this.selectedPassengers.push(obj)
      } else {
        this.selectedPassengers = this.selectedPassengers.filter((p) => p.id !== obj.id)
      }
    },
    async updatePanegerList() {
      const list = await this.getPassengerList()
      if (!list) {
        this.passengerList = [{id: 2, identifyCard: "110", firstName: "peiyi", lastName: "zeng"}]
      } else {
        this.passengerList = list
      }
    }

  }
}

</script>

<style lang="scss" scoped>
@import "~assets/styles/payment.scss"
</style>

