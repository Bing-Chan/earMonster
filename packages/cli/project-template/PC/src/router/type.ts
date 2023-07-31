export interface RouterInfo {
	name: string;
	title: string;
	actived: boolean;
	router: string;
	meta: MetaInfo;
	query: object;
}

export interface MetaInfo {
	keepAlive: boolean;
}
