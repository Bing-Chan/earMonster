<template>
	<div>
		<div>
			<my-upload
				url="https://httpbin.org/post"
				img-format="png"
				:width="400"
				:height="300"
				field="avatar1"
				key="0"
				:no-rotate="false"
				:value.sync="show1"
				:params="otherParams"
			></my-upload>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue'

export default defineComponent({
	setup() {
		const state = reactive({
			show1: false,
			show2: false,
			show3: false,
			avatarUrl1: null,
			avatarUrl2: null,
			avatarUrl3: null,
			otherParams: {
				token: '123456798',
				name: 'img',
			},
		})

		watch(
			() => state.values,
			() => {
				console.log(state.values, 'values1111')
			},
		)

		return {
			...toRefs(state),
		}
	},
})
</script>
