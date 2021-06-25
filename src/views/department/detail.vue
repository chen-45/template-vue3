<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>卡片名称</span>
        <el-button class="button" type="text">操作按钮</el-button>
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">
      {{ '部门管理 ' + o }}
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Basic',
})
</script>

  <style lang='less' scoped>

  </style>
