import { reactive } from 'vue'

const state = reactive ({
    destinations: [],
    destination: null,
    dateRanges: null,
    rooms: []
})

const methods = {
    setChunkDestinations (chunks) {
        state.destinations.push(chunks)
    },
    isNoAdults () {
        return state.rooms.filter((room) => {
            return room.adults === 0
        })
    }
}

export default {
    state, methods
}
