<template>
  <BookingScreen/>
</template>

<script>
import BookingScreen from '@/components/BookingScreen.vue'
import { arraySlicer, filterItems } from './utils/helpers'
import destinations from './data/destinations.json'
import { provide } from 'vue'
import store from '@/store'
export default {
  name: 'App',
  setup() {
    provide( 'store', store)
  },
  data() {
    return {
      text: null,
      actions: [{ message: 'filtering', func: filterItems }],
      worker: null,
      searchResults: []
    }
  },
  components: {
    BookingScreen
  },
  beforeMount() {
    const chunkedDestinations = arraySlicer(
        destinations.splice(0, destinations.length),
        3000,
    )
    store.methods.setChunkDestinations(chunkedDestinations)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
