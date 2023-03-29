<template>
  <div class="order-info flex">
    <div class="state">
      <el-tag v-if="state===1" size="medium">正在支付</el-tag>
      <el-tag v-else-if="state===2" type="success" size="medium">已支付</el-tag>
      <el-tag v-else-if="state===3" type="info" size="medium">已取消</el-tag>
      <el-tag v-else type="danger" size="medium">未支付</el-tag>
    </div>

    <div class="flex flex-column time-container">
      <div class="order-time order-label">下单时间：{{ orderTime }}</div>
      <div class="pay-time order-label">支付时间：{{ payTime }}</div>
    </div>


  </div>
</template>

<script>
export default {
  props: {
    orderInfo: { type: Object, default: null }
  },
  computed:{
    isUnpaid() {
      console.log(this.state === '0')
      return this.state === 0
    },
    orderTime() {
      if (this.orderInfo && this.orderInfo.orderTime) {
        const date = new Date(this.orderInfo.orderTime)
        return `${date.getFullYear()}年${padding(date.getMonth()+1)}月${padding(date.getDate())}日 ${padding(date.getHours())}:${padding(date.getMinutes())}`
      }
      return 'order-time'
    },
    payTime() {
      if (this.orderInfo && this.orderInfo.payTime) {
        const date = new Date(this.orderInfo.payTime)
        return `${date.getFullYear()}年${padding(date.getMonth()+1)}月${padding(date.getDate())}日 ${padding(date.getHours())}:${padding(date.getMinutes())}`
      }
      return 'pay-time'
    },
    state() {
      console.log(typeof(this.orderInfo.payStatus))
      return this.orderInfo?.payStatus  ? Number(this.orderInfo.payStatus) : ''
    }
  },
  created() {
    // console.log('this.orderInfo', this.orderInfo)
  }
}

function padding(num) {
  return num < 10 ? `0${num}` : num
}
</script>

<style>
.order-info {
  padding: 10px 20px;
  border-bottom: 1px solid #edebe9;
  justify-content: space-between
}

.order-label {
  padding: 5px 5px;
}

.state {
  display: flex;
  align-self: center;
  padding-left: 20px;
}

.time-container {
  align-content: flex-end;
}
</style>
