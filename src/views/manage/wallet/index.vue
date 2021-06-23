<template>
  <div class="wallet">
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Basic',
})
</script>

  <style lang='less' scoped>
    .wallet{
      display: flex;
      flex-direction: column;
      height:calc(100vh - 50px);
      overflow: hidden;
      .container{
        flex:1;
        height:100%;
      }
    }
  </style>
