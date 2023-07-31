<template>
	<div id="pages">
		<div class="header">
			<div class="first">
				<div class="circle left"></div>
				绩效管理系统
				<div class="circle right"></div>
			</div>
			<div class="secound">
				<div class="menus">
					<div class="menuItem menu1">
						<div class="left"><span>第1步</span>绩效制定</div>
					</div>
					<div class="menuItem menu2"><span>第2步</span>绩效实施</div>
					<div class="menuItem menu3"><span>第3步</span>结果应用</div>
					<div class="menuItem menu4">
						<div class="right">绩效改善</div>
					</div>
				</div>
			</div>
			<div class="thrid">
				<img src="../../assets/images/jixiao/dizuo_bg@2x1.png" />
			</div>
		</div>
		<!---模块列表-->
		<div class="first-menu">
			<div class="first-menu-left">
				<div class="heads">
					<div class="first">
						<div class="menuHead green">模板配置</div>
						<div class="menus">
							<menu-card title="参数配置" :list="menuList">
								<h3>1.1 参数配置</h3>
								<span>参数用于指标的计算</span>
								<div class="arrowIconRight" @click.stop="() => {}">
									<img src="../../assets/images/jixiao/left@2x.png" /></div
							></menu-card>
							<menu-card title="指标库配置" :list="menuList">
								<h3>1.2 指标配置</h3>
								<span>用于建立企业级指标库，按分类进行管理，包括操作工、职能指标 </span>
								<div class="arrowIconRight" @click.stop="() => {}">
									<img src="../../assets/images/jixiao/left@2x.png" />
								</div>
							</menu-card>

							<menu-card title="模板配置" :list="menuList">
								<h3>1.4 模板配置</h3>
								<span>选定考核流程、模板类型，配置模块及指标；配置流程各节点参与权限</span>
								<div class="arrowIconRight" @click.stop="() => {}">
									<img src="../../assets/images/jixiao/left@2x.png" />
								</div>
								<div class="arrowIconBottom" @click.stop="() => {}">
									<img src="../../assets/images/jixiao/up@2x.png" />
								</div>
							</menu-card>

							<menu-card title="参数结果" :list="menuList">
								<h3>参数结果</h3>
								<span>各个参数的基础计算数据</span>
							</menu-card>

							<menu-card title="指标结果" :list="menuList">
								<h3>指标结果</h3>
								<span>对于有系统值的指标，添加各个指标的基础计算数据 </span>
							</menu-card>

							<menu-card title="流程配置" :list="menuList">
								<h3>1.3 流程配置</h3>
								<div @click="goPage('角色配置')" :class="checkAuth('角色配置') ? 'subItem' : 'subDisabled'">
									<h4>1.角色配置</h4>
									<span>用于配置流程的找人规则</span>
								</div>
								<div style="padding-top: 10px" @click="goPage('流程配置')" :class="checkAuth('流程配置') ? 'subItem' : 'subDisabled'">
									<h4>2.流程配置</h4>
									<span>定义流程的各个节点</span>
								</div>
							</menu-card>

							<menu-card title="基础配置" :list="menuList">
								<h3>基础配置</h3>
								<div @click="goPage('数据字典配置')" :class="checkAuth('数据字典配置') ? 'subItem' : 'subDisabled'">
									<h4>1.数据字典配置</h4>
									<span>配置指标分类、考核周期等 </span>
								</div>
								<div style="padding-top: 10px" @click="goPage('强分规则配置')" :class="checkAuth('强分规则配置') ? 'subItem' : 'subDisabled'">
									<h4>2.强分规则配置</h4>
								</div>
							</menu-card>

							<menu-card title="阶梯单价" :list="menuList">
								<h3>阶梯单价</h3>
								<span>用于操作工效率考核阶梯单价</span>
							</menu-card>
							<div class="menuItem hideItem"></div>
						</div>
					</div>
					<div class="secound">
						<div class="menuHead green">方案制定</div>
						<div class="menus">
							<menu-card :height="height" title="自定义绩效方案" :list="menuList">
								<h3>1.5 自定义绩效方案</h3>
								<span>考核表配置: <br />选定考核模板+考核人员+考核周期</span>
								<div class="arrowIconRight" @click.stop="() => {}">
									<img src="../../assets/images/jixiao/left@2x.png" />
								</div>
								<div class="arrowIconBottom" @click.stop="() => {}">
									<img src="../../assets/images/jixiao/down@2x.png" />
								</div>
							</menu-card>

							<menu-card title="绩效合约书签订" :list="menuList">
								<h3>绩效合约书签订</h3>
								<span>选择前置流程；员工填写合约书；双方签字确认</span>
							</menu-card>
						</div>
					</div>
					<div class="thrid">
						<div class="menuHead blue">绩效评价</div>
						<div class="menus">
							<menu-card title="绩效自评" :list="menuList">
								<h3>2.1 绩效自评</h3>
								<span>HR发起绩效考核，考核表下发，员工在待办中填写/评价</span>
								<div class="arrowIconRight" @click.stop="() => {}">
									<img src="../../assets/images/jixiao/left@2x.png" />
								</div>
								<div class="arrowIconBottom" @click.stop="() => {}">
									<img src="../../assets/images/jixiao/up@2x.png" />
								</div>
							</menu-card>

							<menu-card title="上级评价" :list="menuList">
								<h3>2.2 上级评价</h3>
								<span>上级在待办中对员工进行评价、打分、评级、绩效合约书签订等 </span>
								<div class="arrowIconRight" @click.stop="() => {}">
									<img src="../../assets/images/jixiao/left@2x.png" />
								</div>
							</menu-card>

							<div class="menuItem lineItem">
								<div></div>
							</div>
						</div>
					</div>
					<div class="forth">
						<div class="menuHead blue">绩效结果</div>
						<div class="menus">
							<menu-card title="个人结果确认" :list="menuList">
								<h3>2.3 个人结果确认</h3>
								<span>员工对绩效结果签字确认 </span>
								<div class="arrowIconRight" @click.stop="() => {}">
									<img src="../../assets/images/jixiao/left@2x.png" />
								</div>
							</menu-card>

							<menu-card title="结果申诉" :list="menuList">
								<h3>2.4 结果申诉</h3>
								<span>员工若对绩效结果不认可，可进行绩效结果申诉</span>
							</menu-card>

							<menu-card title="结果查询" :list="menuList">
								<h3>2.5 结果查询</h3>
								<span>总部绩效管理部等人员可以对考核状态进行查询</span>
							</menu-card>
						</div>
					</div>
				</div>
			</div>
			<div class="first-menu-right">
				<div class="menuItem">绩效奖金报表</div>
				<div class="menuItem blue">改善目标</div>
				<div class="menuItem">结果分析报表</div>
				<div class="menuItem blue">改善计划</div>
				<div class="menuItem">结果推送薪酬</div>
				<div class="menuItem blue">改善效果</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { toRefs, reactive, defineComponent, onBeforeMount, getCurrentInstance, nextTick, onMounted } from 'vue';
import { menuAuth } from '/@/api/org/index.ts';
import { useWindowSize } from '@ear-monster/use';
import MenuCard from './src/card.vue';
import { ElMessage } from 'element-plus';
import $ from 'jquery';

export default defineComponent({
	components: {
		MenuCard,
	},
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const state = reactive({
			menuList: [],
			height: 0,
		});

		const checkAuth = (name) => {
			let titles = [name];
			if (state.menuList && state.menuList.some((x) => titles.includes(x.menuName) && x.defaultFlag == 1 && x.menuFlag == 1)) {
				return true;
			}
			return false;
		};

		const goPage = (name: any) => {
			let info = state.menuList.find((x) => x.menuName === name);
			if (info && info.routerUrl && info.routerUrl != '') {
				top.location.href = `${info.domain}${info.routerUrl}`;
			} else {
				ElMessage.error('该菜单未配置路由');
			}
		};

		const calcHeight = async () => {
			// debugger
			await nextTick();
			let h = 0;
			$('.first-menu-left .menuItem').each((index, element) => {
				if (h < $(element).outerHeight()) {
					h = $(element).outerHeight();
				}
			});
			$('.first-menu-left .menuItem').css({ 'min-height': `${h}px` });
		};

		useWindowSize(calcHeight, 200);

		onMounted(() => {
			setTimeout(() => {
				calcHeight();
			}, 200);
		});

		onBeforeMount(async () => {
			const res = await menuAuth({});
			if (res.status == 0) {
				state.menuList = res.data;
			} else {
				ElMessage.error(res.message);
			}
		});

		return {
			...toRefs(state),
			checkAuth,
			goPage,
			calcHeight,
		};
	},
});
</script>
<style lang="scss" scoped>
#pages {
	overflow-y: auto;
	margin: 0;
	padding: 0;
	min-width: 1440px;
	padding-top: 10px;
}

.header {
	font-family: PingFangSC-Medium, PingFang SC;
	height: 160px;
	width: 100%;
	margin-bottom: 20px;

	.first {
		height: 69px;
		width: calc(100% - 220px);
		background: url('../../assets/images/jixiao/jixiao_bg@2x.png') no-repeat;
		background-position: 0px 0px;
		background-size: 100% 69px;
		background-position: center bottom;
		text-align: center;
		background-repeat: no-repeat;
		// padding-top: calc(50% - 50px);
		padding-top: 15px;
		font-size: 20px;
		font-weight: 500;
		margin: 0 auto;
		margin-bottom: 5px;
		color: #ffffff;
		clear: both;
		position: relative;

		.circle {
			border-radius: 11px;
			width: 11px;
			height: 11px;
			border: solid 1px #007aff;
			position: absolute;
			top: 23px;
			background: #fff;
		}

		.left {
			left: 0px;
		}
		.right {
			right: 0px;
		}
	}

	.secound {
		height: 60px;
		width: 100%;
		background: url('../../assets/images/jixiao/dizuo_bg@2x.png') no-repeat;
		background-position: 10px 0px 0px 10px;
		background-origin: content-box;
		background-size: calc(100% - 20px) 30px;
		background-position: center bottom;

		.menus {
			display: flex;
			justify-content: space-between;
			display: flex;
			padding: 0px 50px;

			.menuItem {
				color: #007aff;
				background: #e4f3ff;
				border-top: solid 7px #c5e6ff;
				position: relative;
				line-height: 40px;
				text-align: center;
				text-shadow: 0px 2px 2px #e4f3ff;
				font-size: 20px;
				font-weight: 500;
				span {
					font-size: 18px;
					padding-right: 10px;
					color: #007aff;
				}
				// background: linear-gradient(#C5E6FF,10%,#1D639A,90%) ,
			}

			.menu1 {
				width: calc(((100% - 400px) / 9) * 4 + 30px);
				background: transparent;
				border-top: 0px;
				padding-left: 15px;
				div {
					color: #007aff;
					background: #e4f3ff;
					border-top: solid 7px #c5e6ff;
					width: 100%;
				}
			}
			.menu2 {
				width: calc(((100% - 400px) / 9) * 5 + 40px);
			}
			.menu3 {
				width: 180px;
			}
			.menu4 {
				width: 110px;
				background: transparent;
				border-top: 0px;
				padding-right: 15px;
				div {
					color: #007aff;
					background: #e4f3ff;
					border-top: solid 7px #c5e6ff;
					width: 100%;
				}
			}
		}
	}

	.thrid {
		height: 20px;
		width: 100%;
		padding: 0px 20px;
		img {
			height: 20px;
			width: 100%;
		}
	}
}

.first-menu {
	width: 100%;
	padding: 0px 50px;
	display: flex;
	box-sizing: border-box;

	&-left {
		flex: 1;
		margin-right: 10px;

		.heads {
			display: flex;
			justify-content: space-between;
			display: flex;
			flex-direction: row;

			.green {
				background: #3dcfba;
				color: #fff;
			}
			.blue {
				background: #33a2f7;
				color: #fff;
			}

			.first {
				width: calc(((100% - 80px) / 9) * 3 + 20px);
				::v-deep(.menuItem) {
					width: calc((100% - 20px) / 3);
				}
			}
			.secound {
				width: calc(((100% - 80px) / 9));
				::v-deep(.menuItem) {
					width: 100%;
				}
			}
			.thrid {
				width: calc(((100% - 80px) / 9) * 2 + 10px);
				::v-deep(.menuItem) {
					width: calc((100% - 10px) / 2);
				}
			}
			.forth {
				width: calc(((100% - 80px) / 9) * 3 + 20px);

				::v-deep(.menuItem) {
					width: calc((100% - 20px) / 3);
				}
			}
		}

		.menuHead {
			width: 100%;
			line-height: 40px;
			background: #e4f3ff;
			color: #333;
			text-align: center;
			font-size: 18px;
			font-weight: 500;
			margin-bottom: 10px;
		}

		.menus {
			display: flex;
			justify-content: space-between;
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			width: 100%;

			::v-deep(.menuItem:hover) {
				box-shadow: 0px 0px 8px 0px rgba(11, 102, 203, 0.54);
			}
			::v-deep(.menuItem) {
				cursor: pointer;
				background: #e4f3ff;
				color: #333;
				border: solid 0.5px #4c84ff;
				text-align: left;
				font-size: 14px;
				margin-bottom: 10px;
				padding: 10px 10px;
				position: relative;
				min-height: 160px;
				h3 {
					font-size: 14px;
					color: #333333;
					line-height: 20px
				}

				h4 {
					font-size: 12px;
					line-height: 20px;
				}

				span {
					font-size: 12px;
					color: #666666;
					line-height: 20px;
				}

				.arrowIconRight,
				.arrowIconBottom {
					z-index: 300;
					position: absolute;
					width: 10px;
					height: 20px;
					img {
						width: 20px;
						height: 20px;
					}
				}

				.arrowIconRight {
					right: -6.5px;
					top: calc((50% - 10px));
				}

				.arrowIconBottom {
					left: calc((50% - 10px));
					bottom: -13px;
				}

				.subDisabled {
					cursor: not-allowed;
					span,
					h4 {
						color: #bdbdbd;
					}
				}

				.subItem:hover {
					cursor: pointer;
					span,
					h4 {
						color: #007aff;
					}
				}
			}
			.hideItem {
				background: transparent;
				border: none;
			}

			.lineItem {
				background: transparent;
				border: none;
				padding: 0px;
				position: relative;
				div {
					position: absolute;
					border-right: solid 1px #007aff;
					border-bottom: solid 1px #007aff;
					height: 50%;
					width: calc(50% + 10px);
					left: -10px;
					border-bottom-right-radius: 8px;
				}
			}

			::v-deep(.disabled) {
				background: #ededed;
				cursor: not-allowed;
				border: solid 0.5px #c5c5c5;
			}
			.lineItem:hover,
			.hideItem:hover,
			::v-deep(.disabled:hover) {
				box-shadow: none;
			}

			.blue {
				background: #33a2f7;
			}
		}
	}

	&-right {
		width: 300px;
		flex-wrap: wrap;
		justify-content: space-between;
		align-content:flex-start;
		display: flex;
		flex-direction: row;
		.menuItem {
			line-height: 35px;
			background: #862b9b;
			color: #fff;
			text-align: center;
			font-size: 16px;
			font-weight: 500;
			width: 180px;
			height: 35px !important;
			min-height: 35px !important;
			margin-bottom: 10px;
		}

		.blue {
			background: #33a2f7;
			width: 110px;
		}
	}
}
</style>
