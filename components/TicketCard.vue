<template>
  <div class="ticketCardContainer">
    <div class="ticketCardLayout">
      <div class="ticketCard" @click="onCollapse">
        <div class="company itrTxtPair">
          <div class="bt_focusText">
            {{ companyAndNumber }}
          </div>
        </div>
        <div class="time itrTxtPair">
          <div class="bt_focusText">{{ startTime }} - {{ endTime }}</div>
          <div class="duration">{{ duration }}</div>
        </div>
        <div class="price itrTxtPair">
          <div class="bt_focusText">
            {{ price }}
          </div>
        </div>
        <div class="itrTxtPair">
          <button class="btn is-solid-secondary btn-choose" @click.stop="onChoose">
            <font style="vertical-align: inherit; width: 70px;">选择</font>
          </button>
          <div class="btn icon">
            <i :class="classIcon"></i>
          </div>
        </div>

      </div>

      <div
        v-if="showDetail"
        class="detailCard"
      >
        <div class="flex flex-column">
          <div class="ticketCard">
            <div class="detail-company-num itrTxtPair">
              <div class="bt_focusText pd-5">
                {{ companyAndNumber }}
              </div>
              <div class="bt_focusText pd-5">
                {{ airlineNum }}
              </div>
            </div>
            <div class="rest-seat ">
              <div class="class-level bt_focusText flex flex-column floatLeft">
                <div>头等舱</div>
                <div>商务舱</div>
                <div>经济舱</div>
              </div>
              <div class="rest-seats flex flex-column floatLeft">
                <div>rest {{ seatFirstClass }} seats</div>
                <div>rest {{ seatSecondClass }} seats</div>
                <div>rest {{ seatEconomyClass }} seats</div>
              </div>

            </div>
          </div>
          <div class="itrDetails clearfix">
            <div class="deptDetails floatLeft">
              <div class="bt_focusText airportCode">
                <!-- start-airport-code -->
              </div>
              <div>
                <div class="bt_focusText">
                  {{ startTime }}
                </div>
                <div class="itrDate">
                  {{ startDate }}
                </div>
              </div>
              <div>{{ startAddress }}</div>
            </div>
            <div class="fltDurationPair floatLeft">
              <div class="fltDuration">{{ duration }}</div>
            </div>
            <div class="deptDetails floatRight">
              <div class="bt_focusText airportCode">
                <!-- end-airport-code -->
              </div>
              <div>
                <div class="bt_focusText">
                  {{ endTime }}
                </div>
                <div class="itrDate">
                  {{ endDate }}
                </div>
              </div>
              <div>{{ endAddress }}</div>
            </div>
          </div>
        </div>


      </div>
    </div>

    <div
      v-if="showModal"
      class="choose-modal a-modal-container"
    >
      <modal-choose-ticket
        :ticket="ticket"
        @chooseTicket="chooseTicket"
        @closeModal="closeModal"
      ></modal-choose-ticket>
    </div>
  </div>
</template>

<script>
import modalChooseTicket from './modalChooseTicket.vue'
export default {
  name: 'TicketCard',
  components: {
    modalChooseTicket
  },
  props: {
    ticket: { type: Object, default: null },
    ticketInfo: { type: Object, default: null }
  },

  data() {
    return {
      selectedClass: '',
      showDetail: false,
      showModal : false,
    }
  },
  computed: {
    airlineNum() {
      return this.ticketInfo && this.ticketInfo.airlineNum ? this.ticketInfo.airlineNum : 'airlineNum'
    },
    companyAndNumber() {
      return this.ticketInfo && this.ticketInfo.companyAndNumber ? this.ticketInfo.companyAndNumber : '公司名-飞机编号'
    },
    classIcon() {
      return this.showDetail ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
    },
    duration() {
      return this.ticketInfo && this.ticketInfo.duration ? this.ticketInfo.duration : 'duration'
    },
    endAddress() {
      return this.ticketInfo && this.ticketInfo.endAddress ? this.ticketInfo.endAddress : 'endAddress'
    },
    endDate() {
      return this.ticketInfo && this.ticketInfo.endDate ? this.ticketInfo.endDate : 'endDate'
    },
    endTime() {
      return this.ticketInfo && this.ticketInfo.endTime ? this.ticketInfo.endTime : 'endTime'
    },
    price() {
      return this.ticketInfo && this.ticketInfo.price ? this.ticketInfo.price : 'price'
    },
    seatEconomyClass() {
      return this.ticketInfo && this.ticketInfo.seatEconomyClass ? this.ticketInfo.seatEconomyClass : 'seatEconomyClass'
    },
    seatFirstClass() {
      return this.ticketInfo && this.ticketInfo.seatFirstClass ? this.ticketInfo.seatFirstClass : 'seatFirstClass'
    },
    seatSecondClass() {
      return this.ticketInfo && this.ticketInfo.seatSecondClass ? this.ticketInfo.seatSecondClass : 'seatSecondClass'
    },
    startAddress() {
      return this.ticketInfo && this.ticketInfo.startAddress ? this.ticketInfo.startAddress : 'startAddress'
    },
    startDate() {
      return this.ticketInfo && this.ticketInfo.startDate ? this.ticketInfo.startDate : 'startDate'
    },
    startTime() {
      return this.ticketInfo && this.ticketInfo.startTime ? this.ticketInfo.startTime : 'startTime'
    },
  },
  methods: {
    closeModal() {
      this.showModal = false
    },
    onChoose() {
      this.showModal = true
    },
    onCollapse() {
      this.showDetail = !this.showDetail
    },
    chooseTicket(obj) {
      this.$emit('chooseTicket',{
        ...obj,
        companyAndNumber: this.companyAndNumber,
        airlineNum: this.airlineNum,
        startTime: this.startTime,
        startDate: this.startDate,
        endTime: this.endTime,
        duration: this.duration
      })
      this.showModal = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/components/ticketCard.scss"
</style>
