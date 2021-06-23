<template>
  <svg-icon icon-class="favorite" />
</template>

<script lang="ts">
import {
  nextTick, watch,
  defineComponent,
} from 'vue'

export default defineComponent({
  name: 'Home',

  setup () {
    return {}
  },
})
</script>

  <style lang='less' scoped>
.div_txt {
  border: 1px solid #c3c3c3;
  padding: 1px;
  width: 300px;
  height: auto;
  min-height: 18px;
  font-family: Tahoma;
  cursor: text;
  .addr_base {
    height: 16px;
    // margin: 1px 3px 1px 3px;
    cursor: default;
    background-color: orange;
    font-family: "lucida Grande", Verdana, "Microsoft YaHei";
    float: left;
    white-space: nowrap;
    cursor: default;
    // padding:1px;
    margin:0 2px 1px 0;

    .active {
      background: #528bcb;
    }
  }
  .addr_text {
    word-break: break-all;
    height: 16px;
    background: transparent;
    input {
      font-family: Tahoma;
    }
  }
}
input {
  font: normal 12px Verdana, "Microsoft YaHei";
}
</style>
