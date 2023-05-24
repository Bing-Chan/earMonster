<template lang="pug">
<GAButton  type="default" @click="handleClick">按钮</GAButton>
</template>
<script lang="ts">
import { GAButton } from '@ear-monster'
import '@ear-monster/theme-chalk/button.scss'
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'play',
	components: {
		GAButton,
	},
	setup() {
		return {
			handleClick: () => {
				alert('sadasd')
			},
		}
	},
})
</script>
