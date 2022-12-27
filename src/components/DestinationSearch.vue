<template>
  <div style="width: 100%; display:block;">
    <input v-model="text" @input="searchTerm">
    <div @click="setDestinations(dest)" v-for="(dest, index) in destinationResults.slice(0, 10)" :key="index">
      {{dest.name}} - {{index}}
    </div>
  </div>
</template>

<script>
const {filterItems} = require("@/utils/helpers")
const {provide} = require("vue")
import store from '@/store'
import SWorker from 'simple-web-worker'
export default {
  name: "DestinationSearch",
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
  methods: {
    clearSearch() {
      this.searchResults = []
      this.worker = null
    },
    setDestinations (destination) {
      store.state.destination = destination
    },
    searchTerm () {
      this.clearSearch()
      if (!this.text) {
        return
      }
      // do not wait this async, most probably will hang out search input field
      this.destinationFinder(this.text, 0)
    },
    async destinationFinder (search, filterIndex = 0) {
      if (!this.worker) {
        this.worker = SWorker.create(this.actions)
      }
      if (store.state.destinations[0].length <= filterIndex) {
        return
      }
      this.worker.postMessage('filtering', [JSON.parse(JSON.stringify(store.state.destinations[0][filterIndex])), search]).then((filterResp) => {
        if (filterResp.length > 0) {
          this.searchResults.splice(0, 1, ...filterResp)
        }
        // make sure that search term is not changed or is not empty, otherwise kill this worker and searchResults
        if (!this.text || this.text !== search) {
          this.clearSearch()
          return
        }
        filterIndex++
        this.destinationFinder(search, filterIndex)
      })
    },
  },
  computed: {
    destinationResults () {
      return this.searchResults
    }
  },
}
</script>

<style scoped>

</style>
