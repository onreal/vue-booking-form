<template>
  <v-date-picker
      color="red"
      is-range
      v-model="dateRange"
      :value="null"
      :rows="2"
      :min-date="minimumDate.toISOString()"
      :max-date="maximumDate.toISOString()"
      @update:modelValue="resetRange"
      @dayclick="handleDays"
  />
  <!--    :from-page="new Date()"-->
</template>

<script>
import 'v-calendar/dist/style.css'
const {provide} = require("vue")
import store from '@/store'
export default {
  name: "CalendarRange",
  setup() {
    provide( 'store', store)
  },
  data () {
    return {
      dateRange: {
        start: "",
        end: ""
      },
      minDate: new Date(),
      maxDate: new Date()
    }
  },
  methods: {
    async getMinimumDate () {
      this.minDate = this.dateDayExtend()
    },
    getMaximumDate (isRange = false) {
      if (!isRange) {
        this.maxDate = this.dateYearExtend()
        return
      }
      this.maxDate = this.dateDayExtend(this.minDate, 30)
    },
    dateYearExtend (year = 1) {
      let normDate = this.minDate.toISOString()
      normDate = new Date(normDate)
      normDate.setFullYear(normDate.getFullYear() + year)
      return normDate
    },
    dateDayExtend (nowDate = new Date(), days = 2) {
      nowDate = nowDate.toISOString()
      nowDate = new Date(nowDate)
      nowDate.setDate(nowDate.getDate() + days)
      return nowDate
    },
    resetRange() {
      this.getMinimumDate()
          .then(() => this.getMaximumDate())
          .then(() => this.setStateRange())
    },
    setStateRange() {
      store.state.dateRanges = {
        from: this.dateRange.start,
        to: this.dateRange.end
      }
    },
    async handleDays(day) {
      if (day.isDisabled) return
      this.minDate = new Date(day.id)
      await this.getMaximumDate(true)
    }
  },
  computed: {
    minimumDate () {
      return this.minDate
    },
    maximumDate () {
      return this.maxDate
    }
  },
  beforeMount() {
    this.getMinimumDate().then(() => this.getMaximumDate())
  }
}
</script>

<style scoped>

</style>
