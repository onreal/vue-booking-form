<template>
  <SelectionAmount :room-id="roomId" type="adults" title="Adults" />
  <SelectionAmount :room-id="roomId" type="infants" title="Infants" />
</template>

<script>
import SelectionAmount from '@/components/roomsPassengersComponents/SelectionsAmount.vue'
export default {
  name: "PassengersRoom",
  components: { SelectionAmount },
  props: {
    roomId: Number
  }
}
</script>

<style scoped>

</style>
