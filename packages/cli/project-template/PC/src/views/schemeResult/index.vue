<template>
	<div id="pages">
		<div class="tabs is-hover-shadow">
			<ul class="tabs-header">
				<li v-show="!isformSchame" @click="handelTabs(1)" :class="activeName == 1 ? 'is-active' : ''">
					<span class="first-title">操作工</span>
				</li>
				<li v-show="!isformSchame" @click="handelTabs(2)" :class="activeName == 2 ? 'is-active' : ''">
					<span class="first-title">职能</span>
				</li>
				<div v-if="isformSchame" class="right">
					<span class="first-title"><el-button type="primary" class="more-button" @click="goBack(activeName)">返回</el-button></span>
				</div>
			</ul>
		</div>
		<div>
			<!-- <el-tabs type="card" v-model="activeName" class="tabs">
        <el-tab-pane label="操作工" :name="1"> -->
			<div v-if="activeName == 1">
				<result-oper @formSchame="formSchame"></result-oper>
			</div>
			<!-- </el-tab-pane> -->
			<!-- <el-tab-pane label="职能" :name="2"> -->
			<div class="" v-else>
				<result-no-oper @formSchame="formSchame"></result-no-oper>
			</div>
			<!-- </el-tab-pane> -->
			<!-- </el-tabs> -->
		</div>
	</div>
</template>
<script lang="ts">
import { toRefs, reactive, defineComponent, onMounted, getCurrentInstance, nextTick, ref, toRaw } from 'vue';
import resultOper from './src/result-oper.vue';
import { useRoute, useRouter } from 'vue-router';
import resultNoOper from './src/result-noOper.vue';
import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated';

export default defineComponent({
	name: 'schemeResult',
	components: {
		resultOper,
		resultNoOper,
	},
	setup() {
		const router: any = useRouter();
		const route: any = useRoute();
		const state = reactive({
			activeName: 1,
			backButton: false,
			isformSchame: false,
		});

		const handelTabs = (tabs: any) => {
			state.activeName = tabs;
		};
		const formSchame = () => {
			state.backButton = true;
		};
		const goBack = () => {
			router.go(-1);
		};

		onMountedOrActivated(() => {
			state.isformSchame = route.query.schemeName ? true : false;
			if (route.query.jobType) {
				state.activeName = parseInt(route.query.jobType);
			}
		});

		return {
			...toRefs(state),
			handelTabs,
			formSchame,
			goBack,
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

		.right {
			float: right !important;
			button {
				vertical-align: middle;
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
