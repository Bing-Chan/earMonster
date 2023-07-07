// 接口类型声明

// 用户信息
export interface UserInfosState {
	userInfos: object;
	showStep: Boolean;
}

// 路由列表
export interface RoutesListState {
	menuList: Array<object>;
	routesList: Array<object>;
	fastList: Array<object>;
	isColumnsMenuHover: Boolean;
	isColumnsNavHover: Boolean;
}

// 主接口(顶级类型声明)
export interface RootStateTypes {
	userInfos: UserInfosState;
}

export interface SearchNotice {
	searchMsg: String;
}
