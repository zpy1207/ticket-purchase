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
              <div class="ticketCard">
                <div class="company itrTxtPair">
                  <div class="bt_focusText">
                    {{ companyAndNumber }}
                  </div>
                </div>
                <div class="time itrTxtPair">
                  <div class="bt_focusText">{{ startTime }} - {{ endTime }}</div>
                  <div class="start-date">起飞日期： {{ startDate }}</div>
                </div>
                <div class="air-class itrTxtPair">
                  <div class="bt_focusText">
                    {{ airClass }}
                  </div>
                </div>
                <div class="price itrTxtPair">
                  <div class="bt_focusText">
                    {{ price }} 元
                  </div>
                </div>

              </div>
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
            @updatePanegerList="getPassengerList"
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
  computed: {
    airClass() {
      return this.choosenClass && this.choosenClass.seatName ? this.choosenClass.seatName : ''
    },
    choosenClass() {
      return this.ticketInfo && this.ticketInfo.choosenClass ? JSON.parse(this.ticketInfo.choosenClass) : null
    },
    companyAndNumber() {
      return this.ticketInfo && this.ticketInfo.companyAndNumber ? this.ticketInfo.companyAndNumber : '公司名-飞机编号'
    },
    duration() {
      return this.ticketInfo.startTime && this.ticketInfo.endTime ? `${(this.ticketInfo.endTime - this.ticketInfo.startTime) / 1000 / 60} min` : 'duration'
    },
    endAddress() {
      return this.ticketInfo && this.ticketInfo.endCity ? this.ticketInfo.endCity : 'endAddress'
    },
    endTime() {
      if (this.ticketInfo && this.ticketInfo.endTime) {
        const date = new Date(Number(this.ticketInfo.endTime))
        return `${padding(date.getHours())} : ${padding(date.getMinutes())}`
      }
      return 'endTime'
    },
    price() {
      return this.choosenClass && this.choosenClass.price ?  this.choosenClass.price : 'price'
    },
    startAddress() {
      return this.ticketInfo && this.ticketInfo.beginCity ? this.ticketInfo.beginCity : 'startAddress'
    },
    startDate() {
      if (this.ticketInfo && this.ticketInfo.startTime) {
        const date = new Date(Number(this.ticketInfo.startTime))
        return `${padding(date.getMonth()+1)}月${padding(date.getDate())}日`
      }
      return 'startDate'
    },
    startTime() {
      if (this.ticketInfo && this.ticketInfo.startTime) {
        const date = new Date(Number(this.ticketInfo.startTime))
        return `${padding(date.getHours())} : ${padding(date.getMinutes())}`
      }
      return 'startTime'
    },
  },
  async created() {
    await this.getPassengerList()
    this.init()
  },
  methods: {
    closeModal() {
      this.showModal = false
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
        console.log(data)
        this.passengerList = data
      } catch(err) {

      }
    },
    init() {
      // console.log(this.$route.query)
      this.ticketInfo = this.$route.query
      // console.log('ticketInfo', this.ticketInfo)
    },
    onClickAddPassenger() {
      this.showModal = true
    },
    onPay() {
      console.log(this.selectedPassengers)
    },
    selectPassenger(obj, selected) {
      if (selected) {
        this.selectedPassengers.push(obj)
      } else {
        this.selectedPassengers = this.selectedPassengers.filter((p) => p.id !== obj.id)
      }

    }

  }
}

function padding(num) {
  return num < 10 ? `0${num}` : num
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/payment.scss"
</style>

