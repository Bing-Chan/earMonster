<script lang="ts">
import { h, resolveComponent, defineComponent } from 'vue';
import * as Icons from '@element-plus/icons';
export default defineComponent({
	name: 'svgIcon',
	components: Icons,
	props: {
		// svg 图标组件名字
		name: {
			type: String,
		},
		// svg 大小
		size: {
			type: Number,
		},
		// svg 颜色
		color: {
			type: String,
		},
	},
	setup(props) {
		// 定义变量
		const linesString: any[] = ['https', 'http', '/src', '/assets', import.meta.env.VITE_PUBLIC_PATH];
		const onLineStyle: string = `font-size: ${props.size}px;color: ${props.color}`;
		const localsStyle: string = `width: ${props.size}px;height: ${props.size}px`;
		const eleSetStyle = { class: 'el-icon', style: onLineStyle };

		// 逻辑判断
		if (props.name?.startsWith('element')) return () => h('i', eleSetStyle, [props.name === 'ele-' ? '' : h(resolveComponent(props.name.replace('element', '')))]);
		else if (linesString.find((str) => props.name?.startsWith(str))) return () => h('img', { src: props.name, style: localsStyle });
		else return () => h('i', { class: props.name, style: onLineStyle });
	},
});
</script>
