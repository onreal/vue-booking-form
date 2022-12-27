<template>
  <div v-for="(error, index) in getErrors" :key="index">
    {{index + 1}}.) {{error}}
  </div>
  <div class="hello">
    <DestinationSearch />
    <CalendarRange />
    <RoomSetup />
  </div>
  <button @click="sendBooking()">Submit</button>
</template>

<script>
import DestinationSearch from '@/components/DestinationSearch.vue'
import CalendarRange from '@/components/CalendarRange.vue'
import RoomSetup from '@/components/RoomSetup.vue'
const {provide} = require("vue")
import store from '@/store'
export default {
  name: 'BookingScreen',
  setup() {
    provide( 'store', store)
  },
  data() {
    return {
      errors: []
    }
  },
  components: { DestinationSearch, CalendarRange, RoomSetup },
  methods: {
    sendBooking () {
      this.validateStates()
      if (this.getErrors.length > 0) {
        return
      }
      const response = {
        destination: store.state.destination,
        dateRange: store.state.dateRanges,
        rooms: store.state.rooms
      }
      console.log('submit', JSON.parse(JSON.stringify(response)))
    },
    validateStates () {
      this.errors = []
      if (store.state.destination === null) {
        this.errors.push('Set a destination')
      }
      if (store.state.dateRanges === null) {
        this.errors.push('Set calendar date range')
      }
      if (store.state.rooms.length === 0) {
        this.errors.push('Set rooms and passengers')
      }
      if (store.methods.isNoAdults().length > 0) {
        this.errors.push('At least one adult must be inserted on every room')
      }
    }
  },
  computed: {
    getErrors() {
      return this.errors
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
