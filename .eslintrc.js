module.exports = {
	root: true,
	env: {
		node: true,
	},
	globals: {
		echarts: true,
	},
	extends: [
		'plugin:vue/essential',
		'eslint:recommended',
		'@vue/typescript/recommended',
		'@vue/prettier',
		'@vue/prettier/@typescript-eslint',
	],
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'@typescript-eslint/ban-ts-ignore': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'vue/custom-event-name-casing': 'off',
		'no-use-before-define': 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-redeclare-function': 'off',
	},
}
