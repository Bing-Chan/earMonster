<template>
	<div>
		<!--打印按钮-->
		<el-button type="default" :loding="loading" @click="openPrint">打 印</el-button>
		<!--支持预览-->
		<div id="printPage" class="printPage">
			<div v-for="(path, index) in imgSrc" class="modelItem" :key="index">
				<img :src="path" :style="{ width: '100%' }" />
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { toRefs, reactive, defineComponent } from 'vue';
import html2canvas from 'html2canvas';
import printJs from 'print-js';

export default defineComponent({
	name: '截图打印',
	props: {
		modelIds: {
			type: Array,
			default() {
				return [];
			},
		},
	},
	setup(props) {
		const state = reactive({
			imgSrc: [],
			loading: false,
		});

		// 打印点击
		const onPrintJs = () => {
			printJs({
				printable: 'printPage',
				type: 'html',
				css: ['//at.alicdn.com/t/font_2298093_o73r8wjdhlg.css', 'https://unpkg.com/element-plus/lib/theme-chalk/index.css'],
				scanStyles: false,
				style: `@media print{.mb15{margin-bottom:15px;}.el-button--small i.iconfont{font-size: 12px !important;margin-right: 5px;}}`,
			});
		};

		const openPrint = async () => {
			state.loading = true;
			state.imgSrc = [];
			for (var id of props.modelIds) {
				const url = await generatePicture(id);
				state.imgSrc.push(url);
			}
			setTimeout(() => {
				state.loading = false;
				onPrintJs();
			}, 200);
		};

		const generatePicture = (id: any) => {
			return new Promise((resolve) => {
				html2canvas(document.querySelector('#' + id), {
					scale: window.devicePixelRatio,
					useCORS: true,
					backgroundColor: '#ffffff',
					height: document.querySelector('#' + id).scrollHeight,
					windowHeight: document.querySelector('#' + id).scrollHeight,
				}).then(function (canvas) {
					let imgUrl = canvas.toDataURL('image/png');
					resolve(imgUrl);
				});
			});
		};

		return {
			...toRefs(state),
			generatePicture,
			openPrint,
		};
	},
});
</script>
<style lang="scss" scoped>
.printPage {
	height: 100000px;
	display: block;
	position: fixed;
	background: #eeeeee;
	width: 70%;
	z-index: -999;
	top: -1000px;
	left: -1000px;

	.modelItem {
		height: auto;
		margin-bottom: 20px;
	}
}
</style>
