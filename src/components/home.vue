<template>
  <div>
    <layout></layout>
    <router-view></router-view>
    
  </div>
</template>

<script>
import layout from './layout'

export default {
  components:{
   layout,
  }
}
</script>
