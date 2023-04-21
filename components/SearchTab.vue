<template>
  <div class="tab-view">
    <div class="flex w-full items-stretch justify-center">
      <!-- spot -->
      <div style="flex: 0 1 45%; margin-right:8px;">
        <div class="" style="position: relative;">
          <div class="search-bar__start-city-input-box a-input-group">
            <div class="a-input">
              <span class="input-box__input a-input__input is-first-input">
                <input
                  v-model="startCity"
                  @focus="onFocusStartCity"
                  @blur="unFocusStartCity"
                >
              </span>
              <fieldset></fieldset>
              <label class="input-box__label a-input__label">
                <font style="vertical-align: inherit;">{{ labelStartCity }}</font>
              </label>
            </div>
            <span class="input-group-swap-btn">
              <button @click="onChangeCity">
                <svg class="icon" width="32px" height="32.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#cdcdcd" d="M57.856 427.008h908.8c31.744 0 57.856-26.112 57.856-57.856 0-17.408-7.68-33.28-20.992-44.544-3.072-4.096-7.168-7.68-11.264-10.752l-339.456-238.08c-26.112-18.432-61.952-12.288-80.384 13.824-18.432 26.112-11.776 61.952 14.336 80.384l201.216 141.312H57.856C26.112 311.808 0 337.92 0 369.664s26.112 57.344 57.856 57.344zM966.144 596.992H57.856c-31.744 0-57.856 26.112-57.856 57.856 0 17.408 7.68 33.28 20.992 44.544 3.584 4.096 7.168 7.68 11.264 10.752l339.456 238.08c9.728 6.656 20.992 10.24 33.28 10.24 18.944 0 36.352-9.216 47.104-24.576 8.704-12.8 12.288-27.648 9.728-43.008s-11.264-28.16-23.552-37.376l-201.216-141.312h729.6c31.744 0 57.856-26.112 57.856-57.856-0.512-31.744-26.624-57.344-58.368-57.344z"  /></svg>
              </button>
            </span>
            <div class="a-input">
              <span class="input-box__input a-input__input is-last-input">
                <input
                  v-model="endCity"
                  @focus="onFocusEndCity"
                  @blur="unFocusEndCity"
                >
              </span>
              <fieldset></fieldset>
              <label class="input-box__label a-input__label">
                <font style="vertical-align: inherit;">{{ labelEndCity }}</font>
              </label>
            </div>

          </div>
        </div>

      </div>

      <!-- date -->
      <div style="flex: 0 1 25%; margin-left: 8px; margin-right: 8px;" class="relative">
        <div style="position: relative;">
          <div class="a-input-group">
            <div class="a-input">
              <span class="input-box__input a-input__input">
                <el-date-picker
                  v-model="startDate"
                  class="input-date"
                  type="date"
                  size="large"
                  align="center"
                  placeholder="出发日期"
                >
                </el-date-picker>
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- person -->
      <!-- search-button -->
      <div style="flex: 0 1 17%; margin-left: 10px">
        <button class="btn is-lg is-solid-primary is-block h-full" name="search" @click="onSearch">
          <font style="vertical-align: inherit;">搜索</font>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchTab',
  props: {
    searchInfo: { type: Object, default: null }
  },
  data() {
    return {
      startCity: '',
      endCity: '',
      startDate: '',
      labelStartCity: '起始地',
      labelEndCity: '目的地',
    }
  },
  created() {
    this.init()
  },
  methods: {
    getFormatDate(date) {
      const dateObj = new Date(Number(date))
      return  `${dateObj.getFullYear()}-${padding(dateObj.getMonth()+1)}-${padding(dateObj.getDate())}`
    },
    init() {
      this.startCity = this.searchInfo && this.searchInfo.startCity ? this.searchInfo.startCity : ''
      this.endCity = this.searchInfo && this.searchInfo.endCity ? this.searchInfo.endCity : ''
      this.startDate = this.searchInfo && this.searchInfo.startDate ? this.getFormatDate(this.searchInfo.startDate) : ''
      this.labelEndCity = this.searchInfo && this.searchInfo.endCity ? '' : '目的地'
      this.labelStartCity = this.searchInfo && this.searchInfo.startCity ? '' : '起始地'
    },
    onChangeCity() {
      const tmp = this.startCity
      this.startCity = this.endCity
      this.endCity = tmp
    },
    onSearch() {
      if (!this.startCity || !this.endCity || !this.startDate) {
        this.$notify.error({
          message: '请填写完整的搜索信息'
        });
      } else {
        // const formatDate = `${this.startDate.getFullYear()}-${padding(this.startDate.getMonth()+1)}-${padding(this.startDate.getDate())}`
        const timestamp = this.startDate.getTime()
        this.$emit('onSearch', {
          startCity: this.startCity,
          endCity: this.endCity,
          startDate: timestamp
        })
      }

    },
    onFocusStartCity() {
      this.labelStartCity = ''
    },
    unFocusStartCity() {
      if (!this.startCity) {
        this.labelStartCity = '起始地'
      }
    },
    onFocusEndCity() {
      this.labelEndCity = ''
    },
    unFocusEndCity() {
      if (!this.endCity) {
        this.labelEndCity = '目的地'
      }
    },
  }
}
function padding(num) {
  return num >= 10 ? num : `0${num}`
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/components/searchTab.scss"
</style>
