<template>
  <div class="card-container">
    <div class="flex text__name">
      <div style="padding-right: 10px;">{{ firstName }}</div>
      <div>{{ lastName }}</div>
    </div>
    <div class="flex">
      <div class="label idCard__label">身份证：</div>
      <div>{{ idCard }}</div>
    </div>


  </div>
</template>

<script>
export default {
  name: 'PassengerCard',
  props: {
    passengerInfo: { type: Object, default: null }
  },
  computed: {
    firstName() {
      return this.passengerInfo && this.passengerInfo.firstName ? this.passengerInfo.firstName.toUpperCase() : 'firstName'
    },
    lastName() {
      return this.passengerInfo && this.passengerInfo.lastName ? this.passengerInfo.lastName.toUpperCase() : 'lastName'
    },
    idCard() {
      return this.passengerInfo && this.passengerInfo.identifyCard ? this.passengerInfo.identifyCard : 'idCard'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/components/passengerCard.scss"
</style>
