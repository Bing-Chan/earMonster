<template>
	<div id="pages">
		<div class="tabs is-hover-shadow">
			<ul class="tabs-header">
				<li @click="handelTabs(1)" :class="activeName == 1 ? 'is-active' : ''">
					<span class="first-title">薪资项</span>
				</li>
				<li @click="handelTabs(2)" :class="activeName == 2 ? 'is-active' : ''">
					<span class="first-title">系统计算</span>
				</li>
				<li @click="handelTabs(3)" :class="activeName == 3 ? 'is-active' : ''">
					<span class="first-title">分摊到日</span>
				</li>
			</ul>
		</div>
		<div>
			<div v-if="activeName == 1">
				<xinzixiang></xinzixiang>
			</div>
			<div class="" v-else-if="activeName == 2">
				<xitongjisuan></xitongjisuan>
			</div>
			<div class="" v-else>
				<fentan></fentan>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { toRefs, reactive, defineComponent, onMounted, getCurrentInstance, nextTick, ref, toRaw } from 'vue';
import fentan from './src/fentan.vue';
import xinzixiang from './src/xinzixiang.vue';
import xitongjisuan from './src/xitongjisuan.vue';

export default defineComponent({
	name: 'parameterResult',
	components: {
		fentan,
		xitongjisuan,
		xinzixiang,
	},
	setup() {
		const operRef = ref();
		const state = reactive({
			activeName: 1,
		});

		const changeTabs = () => {
			if (Object.is(state.activeName, 1)) {
				console.log(operRef);
				operRef.value.getList();
			}
		};

		const handelTabs = (tabs: any) => {
			state.activeName = tabs;
		};

		return {
			...toRefs(state),
			changeTabs,
			operRef,
			handelTabs,
		};
	},
});
</script>
<style lang="scss" scoped>
.tabs {
	display: flex;
	width: 100%;
	flex-direction: column;
	transition: 0.3s;
	background-color: #ffffff;
	padding: 5px 20px;
	font-size: 14px;
	font-weight: 500;

	ul,
	li {
		padding: 0px 0px;
		margin: 0px 0px;
	}

	li {
		list-style-type: none;
		float: left;
		min-width: 80px;
		margin-right: 15px;

		cursor: pointer;
		text-align: center;
		padding: 0px 5px;
		padding-left: 0px;
		line-height: 40px;
		height: 40px;
	}

	li:hover {
		color: $color-primary;
		span {
			color: $color-primary;
		}
	}

	&-header {
		padding-top: 5px;
		line-height: 40px;
		background-color: inherit;
		width: 100%;
		border-bottom: solid 1px $border-gray;

		&--more {
			float: right !important;
			line-height: 40px;
			height: 100%;
			button {
				vertical-align: middle;
				margin-top: 5px;
			}
		}
	}
	&-body {
		padding: 20px 0px;
		background-color: inherit;
	}

	&-header-scroll {
		display: flex;
		padding-top: 5px;
		line-height: 40px;
		background-color: inherit;
		width: 100%;
		border-bottom: solid 1px $border-gray;
		flex: 1;
		&-left {
			width: 90%;
			display: flex;
			flex: 1;
			.menuList {
				flex-shrink: 0;
				display: flex;
				&-item {
					flex-shrink: 0;
					display: flex;
					align-items: center;
					justify-content: center;
					min-width: 80px;
					padding: 0px 5px;
					padding-left: 0px;
					line-height: 40px;
					margin-right: 15px;
					cursor: pointer;
				}
				&-item:hover {
					color: $color-primary;
					span {
						color: $color-primary;
					}
				}
			}
		}
		&-right {
			width: 100px;
		}
	}

	.is-active {
		color: $color-primary;
		border-bottom: solid 2px $color-primary;
		span {
			color: $color-primary;
		}
	}
}
</style>
