<template>
  {{ title }}
  <span @click="increaseType()">+</span>
  {{typeCounter()}}
  <span @click="decreaseType()">-</span>
</template>

<script>
const {provide} = require("vue")
import store from '@/store'
export default {
  name: "SelectionsAmount",
  props: {
    type: String,
    title: String,
    roomId: Number
  },
  setup() {
    provide( 'store', store)
  },
  data () {
    return {
      limit: 9,
      index: null,
      room: null,
      rules: {
        'adults': {
          min: 0,
          max: 9,
          request: 'infants',
          isPrimary: true
        },
        'infants': {
          min: 0,
          max: 9,
          request: 'adults',
          isPrimary: false
        }
      }
    }
  },
  methods: {
    increaseType () {
      if (!this.isValidIncrease()) return
      store.state.rooms[this.index][this.type] ++
    },
    decreaseType () {
      if (!this.isValidDecrease()) return
      store.state.rooms[this.index][this.type] --
      this.clearStates()
    },
    isValidDecrease() {
      return this.rules[this.type].min !== store.state.rooms[this.index][this.type]
    },
    isValidIncrease() {
      if (this.rules[this.type].max === store.state.rooms[this.index][this.type]) {
        return false
      }
      const requestState = store.state.rooms[this.index][this.rules[this.type].request]
      if (requestState === 0 && !this.rules[this.type].isPrimary) {
        return false
      }
      const sumOfPass = requestState + store.state.rooms[this.index][this.type]
      return sumOfPass !== this.limit;
    },
    clearStates() {
      if (store.state.rooms[this.index][this.type] === 0 && this.rules[this.type].isPrimary) {
        store.state.rooms[this.index].infants = 0
      }
    },
    getRoom() {
      const room = store.state.rooms.filter((room, index) => {
        this.index = index
        return room.id === this.roomId
      })
      this.room = room[0]
    },
    typeCounter() {
      return this.room[this.type]
    }
  },
  beforeMount() {
    this.getRoom()
  }
}
</script>

<style scoped>

</style>
