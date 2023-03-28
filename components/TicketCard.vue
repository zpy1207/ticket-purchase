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
                {{ airplaneId }}
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

              <div class="price flex flex-column floatLeft">
                <div>{{ priceFirstClass }} 元</div>
                <div>{{ priceSecondClass }} 元</div>
                <div>{{ priceEconomyClass }} 元</div>
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
    airplaneId() {
      return this.ticketInfo && this.ticketInfo.airplaneId ? this.ticketInfo.airplaneId : 'airplaneId'
    },
    companyAndNumber() {
      return this.ticketInfo && this.ticketInfo.companyAndNumber ? this.ticketInfo.companyAndNumber : '公司名-飞机编号'
    },
    classIcon() {
      return this.showDetail ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
    },
    duration() {
      return this.ticketInfo && this.ticketInfo.startTime && this.ticketInfo.endTime ? `${(this.ticketInfo.endTime - this.ticketInfo.startTime) / 1000 / 60} min` : 'duration'
    },
    endAddress() {
      return this.ticketInfo && this.ticketInfo.endCity ? this.ticketInfo.endCity : 'endAddress'
    },
    endDate() {
      if (this.ticketInfo && this.ticketInfo.endTime) {
        const date = new Date(this.ticketInfo.endTime)
        return `${padding(date.getMonth()+1)}月${padding(date.getDate())}日`
      }
      return 'endDate'
    },
    endTime() {
      if (this.ticketInfo && this.ticketInfo.endTime) {
        const date = new Date(this.ticketInfo.endTime)
        return `${padding(date.getHours())} : ${padding(date.getMinutes())}`
      }
      return 'endTime'
    },
    price() {
      if (this.ticketInfo && this.ticketInfo.detailVoList && Array.isArray(this.ticketInfo.detailVoList)) {
        const arr = this.ticketInfo.detailVoList.filter((e) => e.freeNum > 0)
        arr.sort((a, b) => (a.price - b.price))
        return `${arr[0].price} 元起`
      }
      return 'price'
    },
    priceEconomyClass() {
      return this.ticketInfo && this.ticketInfo.detailVoList && Array.isArray(this.ticketInfo.detailVoList) ? this.ticketInfo.detailVoList.find((e) => e.seatName === '经济舱').price  : 'priceEconomyClass'
    },
    priceFirstClass() {
      return this.ticketInfo && this.ticketInfo.detailVoList && Array.isArray(this.ticketInfo.detailVoList) ? this.ticketInfo.detailVoList.find((e) => e.seatName === '头等舱').price  : 'priceFirstClass'
    },
    priceSecondClass() {
      return this.ticketInfo && this.ticketInfo.detailVoList && Array.isArray(this.ticketInfo.detailVoList) ? this.ticketInfo.detailVoList.find((e) => e.seatName === '商务舱').price  : 'priceSecondClass'
    },
    seatEconomyClass() {
      return this.ticketInfo && this.ticketInfo.detailVoList && Array.isArray(this.ticketInfo.detailVoList) ? this.ticketInfo.detailVoList.find((e) => e.seatName === '经济舱').freeNum  : 'seatEconomyClass'
    },
    seatFirstClass() {
      return this.ticketInfo && this.ticketInfo.detailVoList && Array.isArray(this.ticketInfo.detailVoList) ? this.ticketInfo.detailVoList.find((e) => e.seatName === '头等舱').freeNum  : 'seatFirstClass'
    },
    seatSecondClass() {
      return this.ticketInfo && this.ticketInfo.detailVoList && Array.isArray(this.ticketInfo.detailVoList) ? this.ticketInfo.detailVoList.find((e) => e.seatName === '商务舱').freeNum  : 'seatSecondClass'
    },
    startAddress() {
      return this.ticketInfo && this.ticketInfo.beginCity ? this.ticketInfo.beginCity : 'startAddress'
    },
    startDate() {
      if (this.ticketInfo && this.ticketInfo.startTime) {
        const date = new Date(this.ticketInfo.startTime)
        return `${padding(date.getMonth()+1)}月${padding(date.getDate())}日`
      }
      return 'startDate'
    },
    startTime() {
      if (this.ticketInfo && this.ticketInfo.startTime) {
        const date = new Date(this.ticketInfo.startTime)
        return `${padding(date.getHours())} : ${padding(date.getMinutes())}`
      }
      return 'startTime'
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
      const { selectedClass } = obj
      const choosenClass = this.ticketInfo.detailVoList.find((e) => e.seatName === selectedClass)
      debugger
      this.$emit('chooseTicket',{
        choosenClass: JSON.stringify(choosenClass),
        ...this.ticketInfo
      })
      this.showModal = false
    }
  }
}

function padding(num) {
  return num < 10 ? `0${num}` : num

}
</script>

<style lang="scss" scoped>
@import "~assets/styles/components/ticketCard.scss"
</style>
