<template>
  <div class="card-container">
    <div class="flex">
      <div>{{ firstName }}</div>
      <div>{{ lastName }}</div>
    </div>
    <div class="flex">
      <div class="label">身份证：</div>
      <div>{{ idCard }}</div>
    </div>


  </div>
</template>

<script>
export default {
  name: 'PassengerCard',
  props: {
    passengrtInfo: { type: Object, default: null }
  },
  computed: {
    firstName() {
      return this.passengrtInfo && this.passengrtInfo.firstName ? this.passengrtInfo.firstName : 'firstName'
    },
    lastName() {
      return this.passengrtInfo && this.passengrtInfo.lastName ? this.passengrtInfo.lastName : 'lastName'
    },
    idCard() {
      return this.passengrtInfo && this.passengrtInfo.idCard ? this.passengrtInfo.idCard : 'idCard'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/components/passengerCard.scss"
</style>
