<template>
	<button :class="className" :value="111" :style="style" @click="handleClick" :autofocus="autofocus">
		<slot></slot>
	</button>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { buttonEmits, buttonProps } from './type'
import { useCssVar } from '@vueuse/core'
import { lighten, darken } from '@request_cb/utils/color'

export default defineComponent({
	name: 'GaButton',
	props: buttonProps,
	emits: buttonEmits,
	setup(props, { emit }) {
		const handleClick = (evt: MouseEvent) => {
			emit('click', evt)
		}

		const className = computed(() => {
			const buttonType = props.type || 'default'
			const classArr = [
				'ga-button',
				buttonType ? 'ga-button--' + buttonType : '',
				{
					'is-disabled': props.disabled,
					'is-round': props.round,
				},
			]
			console.log(classArr, 'classArr')
			return classArr
		})

		const style = computed(() => {
			let styles = {}
			const typeColor = useCssVar(`--d-color-${props.type}`)
			const buttonColor = props.color || typeColor.value
			if (buttonColor) {
				const darkenBgColor = darken(buttonColor, 0.1)
				const lightenBgColor = lighten(buttonColor)
				styles = {
					'--d-button-bg-color': buttonColor,
					'--d-button-border-color': buttonColor,
					'--d-button-hover-bg-color': lightenBgColor,
					'--d-button-hover-border-color': lightenBgColor,
					'--d-button-active-bg-color': darkenBgColor,
					'--d-button-active-border-color': darkenBgColor,
				}
				if (props.disabled) {
					const disabledButtonColor = lighten(buttonColor, 0.5)
					styles['--d-button-disabled-bg-color'] = disabledButtonColor
					styles['--d-button-disabled-border-color'] = disabledButtonColor
				}
			}
			return styles
		})

		return {
			handleClick,
			className,
			style,
		}
	},
})
</script>
<style lang="scss">
@import '../../theme-chalk/button.scss';
</style>
