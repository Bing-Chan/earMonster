<template>
  <div class="page">

  </div>
</template>
<script setup lang="ts">
import { markRaw, reactive, ref } from 'vue'
import { ElScrollbar } from '~/element'
import { isDark } from '@/util'
import { Moon, Sunny } from '@element-plus/icons-vue'
import { ElSwitch } from 'element-plus'

interface Props {
  title?: string
  components: any[]
}

const props = defineProps<Props>()

const currentTab = reactive({
  name: props.components[0].name,
  components: markRaw(props.components[0])
})

const bindClass = (tab: any) => {
  return currentTab.name.toLocaleLowerCase() === tab.name.toLocaleLowerCase() ? 'current-tab' : ''
}

const switchTab = (tab: any) => {
  currentTab.name = tab.name
  currentTab.components = markRaw(tab)
}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  justify-content: start;
  height: 100vh;
  .slider {
    text-align: center;
    width: 200px;
    border: 1px solid #e1e1e1;
    box-sizing: border-box;
    min-height: 100vh;
    .title {
      margin-bottom: 10px;
    }
    .menu-li {
      height: 40px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 400;
    }
  }
  .container {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
  .current-tab {
    color: rgb(30, 128, 255);
  }
}
</style>
