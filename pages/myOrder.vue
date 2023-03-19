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
    this.mountedInit()
  },
  methods: {
    mountedInit() {
      if (process.browser) {
        this.user = JSON.parse(window.localStorage.getItem('user'))
      }
    }
  }
}
</script>

<style>

</style>
