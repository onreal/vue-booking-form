<template>
  <div style="width: 100%; display:block;">
    <div v-if="error">{{error}}</div>
    <div v-for="(room, index) in theRooms" :key="room.id">
      {{index + 1}}.) <PassengersRoom :room-id="room.id" /> ||
      <span @click="removeRoom(index)">Remove</span>
    </div>
  </div>
<button :disabled="theRooms.length === limit" @click="addRoom()">Add Room</button>
</template>

<script>
import PassengersRoom from '@/components/roomsPassengersComponents/PassengersRoom.vue'
const {provide} = require("vue")
import store from '@/store'
export default {
  name: "RoomSetup",
  components: {PassengersRoom},
  setup() {
    provide( 'store', store)
  },
  data () {
    return {
      limit: 4,
      error: null
    }
  },
  methods: {
    addRoom () {
      if (!this.isValidAddRoom()) return
      this.error = null
      store.state.rooms.splice(store.state.rooms.length, 1, {
        id:store.state.rooms.length + 1,
        adults: 0,
        infants: 0
      })
    },
    isValidAddRoom () {
      if (store.state.rooms.length === 0) {
        return true
      }
      if (this.limit === store.state.rooms.length) {
        this.error = "Limit for room reached (Max 4)"
        return false
      }
      if (store.methods.isNoAdults().length > 0) {
        this.error = "At least one adult must be inserted"
        return false
      }
      if (this.adults) this.adults = null
      return true;
    },
    removeRoom (index) {
      store.state.rooms.splice(index, 1)
    }
  },
  computed: {
    theRooms () {
      return store.state.rooms
    }
  }
}
</script>

<style scoped>

</style>
