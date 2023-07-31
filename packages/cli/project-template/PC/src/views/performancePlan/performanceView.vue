<template>
  <div>
    <report-view ref="reportRef" :kind="2"></report-view>
  </div>
</template>
<script lang="ts">
import reportView from '/@/views/templateConfig/src/reportView.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'schemeDetail',
  components: {
		reportView,
	},
})

</script>
