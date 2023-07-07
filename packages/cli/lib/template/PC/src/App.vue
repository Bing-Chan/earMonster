<template>
  <router-view v-slot="{ Component }">
    <keep-alive  :include="include" >
      <component :is="Component" class="w100"/>
    </keep-alive>
  </router-view>
  	<!-- <keep-alive :include="include" >
      <router-view></router-view>
    </keep-alive> -->
</template>

<script lang="ts">
import { defineComponent, reactive,toRefs } from 'vue';
export default defineComponent({
  name: 'App',
  setup() {
    const state = reactive({
			include: ['perProgram','sectionPrice'],
    });
    
    	return {
      ...toRefs(state),
		};
  },
	data() {
		return {
			source: 'PORTAL',
			isProcessError: false,
			token:
				'Portal-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJAdHlwZVwiOlwiY24ueXRvLnBvcnRhbC5hdXRob3JpdHkudm8uVXNlclZvXCIsXCJiZWxvbmdPcmdDb2RlXCI6XCI5OTk5OTlcIixcImJlbG9uZ09yZ05hbWVcIjpcIuaAu-WFrOWPuFwiLFwiYmVsb25nT3JnVHlwZVwiOlwiSEVBRFwiLFwib3JnQ29kZVwiOlwiOTk5OTk5XCIsXCJvcmdOYW1lXCI6XCLmgLvlhazlj7hcIixcIm9yZ1R5cGVcIjpcIkhFQURcIixcInN5c3RlbUNvZGVcIjpcIlBvcnRhbFwiLFwidXNlckNvZGVcIjpcIjAyMjUwNTc4XCIsXCJ1c2VyTmFtZVwiOlwi6L6555aGXCJ9IiwianRpIjoiMzQzMTQ2ZWItYzA1ZS00Y2UzLTgyOTktZGI4YThhNmIzMjUxIiwiaWF0IjoxNjM0NTQ1MjA1LCJleHAiOjE2MzQ1NTk2MDV9.xNgefeKvprqi10ueNRx2agqM39mCVVMG1RgyEJ2018XzFGH5e2CpfCx5_vmF3i6t4URsy15h2vyilBbE9nNAjQ',
			userInfo: {},
		};
	},
	computed: {
		welcomeLink(): string {
			return `/welcome?source=${this.source}&token=${this.token}`;
		},
	},
	mounted() {},
	methods: {},
});
</script>
