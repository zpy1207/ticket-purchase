<template>
  <div
    class="card-container pointer"
    :class="klassSelected"
    @click="onSelect"
  >
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
  data() {
    return {
      selected: false
    }
  },
  computed: {
    firstName() {
      return this.passengerInfo && this.passengerInfo.firstName ? this.passengerInfo.firstName.toUpperCase() : 'firstName'
    },
    klassSelected() {
      return this.selected ? 'selected' :''
    },
    lastName() {
      return this.passengerInfo && this.passengerInfo.lastName ? this.passengerInfo.lastName.toUpperCase() : 'lastName'
    },
    idCard() {
      return this.passengerInfo && this.passengerInfo.identifyCard ? this.passengerInfo.identifyCard : 'idCard'
    }
  },
  methods: {
    onSelect() {
      this.selected = !this.selected
      this.$emit('selectPassenger', this.passengerInfo, this.selected)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/components/passengerCard.scss"
</style>
