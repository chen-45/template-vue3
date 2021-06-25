<template>
  <div ref='container' id="tags-view-container" class="tags-view-container">
    <div ref='wrapper' class="tags-view-wrapper">
      <el-tag effect="plain" type="info" closable>标签一哒哒哒哒哒哒哒哒哒哒哒</el-tag>
      <el-tag effect="plain" type="info" closable>标签一哒哒哒哒哒哒哒哒哒哒哒</el-tag>
      <el-tag effect="plain" type="info" closable>标签一哒哒哒哒哒哒哒哒哒哒哒</el-tag>
      <el-tag effect="plain" type="info" closable>标签一哒哒哒哒哒哒哒哒哒哒哒</el-tag>
      <el-tag effect="plain" type="info" closable>标签一哒哒哒哒哒哒哒哒哒哒哒</el-tag>
      <el-tag effect="plain" type="info" closable>标签一哒哒哒哒哒哒哒哒哒哒哒</el-tag>
      <el-tag effect="plain" type="info" closable>标签一哒哒哒哒哒哒哒哒哒哒哒</el-tag>
      <el-tag effect="plain" type="info" closable>标签一哒哒哒哒哒哒哒哒哒哒哒</el-tag>
      <el-tag effect="plain" type="info" closable>标签一哒哒哒哒哒哒哒哒哒哒哒</el-tag>
      <el-tag effect="plain" type="info" closable>标签一哒哒哒哒哒哒哒哒哒哒哒</el-tag>
      <el-tag effect="plain" type="info" closable>标签一哒哒哒哒哒哒哒哒哒哒哒</el-tag>
      <el-tag effect="plain" type="info" closable>标签一哒哒哒哒哒哒哒哒哒哒哒</el-tag>
      <el-tag effect="plain" type="info" closable>标签一哒哒哒哒哒哒哒哒哒哒哒</el-tag>
      <el-tag effect="plain" type="info" closable>标签一哒哒哒哒哒哒哒哒哒哒哒</el-tag>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent, onMounted, ref,
} from '@vue/runtime-core'

export default defineComponent({
  name: 'TagsView',
  setup () {
    const container = ref(null)
    const wrapper = ref(null)
    onMounted(() => {
      console.log('container', container.value.offsetWidth)
      console.log('wrapper', wrapper.value.offsetWidth, wrapper.value.scrollWidth)
    })
    return {
      container,
      wrapper,
    }
  },
})

</script>

<style scoped lang="less">
  .tags-view-container {
    height: 50px;
    line-height: 50px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    overflow-y: hidden;
    overflow-x: auto;

    .tags-view-wrapper {
      white-space: nowrap;
    }
  }

</style>
