<template>
  <div class="index-page">
    <header-tab
      title="home"
      :user="currentUser"
      @onRegister="onRegister"
    ></header-tab>
    <main>
      <div class="index-page__bg">
        <!-- <img class="index-page__bg-pic" src="https://cdn.alibaba.ir/h2/desktop/assets/images/hero/hero-e1fa22fb.webp" alt="airplane"> -->
        <img class="index-page__bg-pic" src="../static/picheader.webp" alt="airplane">
      </div>

      <div>
        <div class="index-page__search-container a-container">
          <div class="search-bar a-card products-box">
            <searchTab
              @onSearch = "onSearch"
            ></searchTab>
          </div>
        </div>
      </div>

      <div class="all-airline">
        <div class="label-airline-reco">推荐航班</div>
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

    </main>

  </div>
</template>

<script>
// import qs from 'qs'

import SearchTab from '../components/SearchTab.vue'
// import SelfModal from '../components/SelfModal.vue'
import HeaderTab from '~/components/HeaderTab.vue'
import TicketCard from '~/components/TicketCard.vue'



export default {
  name: 'HomePage',
  components: {
    SearchTab,
    // SelfModal,
    HeaderTab,
    TicketCard
  },
  data() {
    return {
      currentUser: null,
      showLogin: false,
      ticketList: []
    }
  },
  computed: {
  },
  created() {
    this.init()
  },
  methods: {
    chooseTicket(obj) {
      console.log(obj)
      this.onPay(obj)
    },
    logOut() {
      this.currentUser = null
      window.localStorage.clear()
    },
    init() {
      // get user
      const data ={
        "id": 10,
        "airplaneId": 26,
        "companyAndNumber": '南方航空公司-波音777',
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
      this.ticketList.push(data)
    },
    async onRegister(obj) {
      // send register request
      try {
        const data = JSON.stringify({
          phone: obj.phone,
          password: obj.psd,
          userName: obj.userName
        })
        // const user = await this.$axios.$post('/api/user/auth/register',data)
        const { data: user } = await this.$axios({
          headers: {
              'Content-Type': 'application/json'
          },
          method: 'post',
          // url: '/api/user/auth/register',
          url: '/api/user/auth/register',
          data
        })
        // const user = {
        //   userName: 'cxn'
        // }
        const { data: userName, message } = user
        if (userName) {
          this.$notify({
            message: '注册成功，请登录',
            type: 'success'
          });
        }else {
          throw new Error(message)
        }
        return user
      } catch(err) {
        this.$notify.error({
          // message: '注册失败，请重试'
          message: err.message
        })
      }
    },
    onSearch(searchInfo) {
      this.$router.push({
        path: '/searchDetail',
        query: {
          ...searchInfo
        }
      })
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
@import "~assets/styles/index.scss"
</style>

