<template>
  <div>
    <header-tab
      :user="user"
    ></header-tab>
  </div>
</template>

<script>
import HeaderTab from '~/components/HeaderTab.vue'
export default {
  components: { HeaderTab },
  data() {
    return {
      user: null
    }
  },
  mounted() {
    this.user = this.$route.query.user
    console.log(this.user)
  }
}
</script>

<style>

</style>
