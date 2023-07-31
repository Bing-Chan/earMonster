import { YtoHttp, configYtoHttpConfig } from '@yto-security/vue3-sdk';

/**
 * 模板列表
 * @param params {}
 * @returns {}
 */
export function getNoticeList(params: object) {
	return new Promise((resolve) => {
		resolve({
			status: 0,
			message: 'success',
			data: {
				limit: 20,
				total: 12,
				totalPages: 1,
				pageNo: 1,
				resultData: [
					{
						annTitle: '测试公告001',
						annCategoryId: 3,
						annContent: '<p>测试公告001</p>',
						publishStatus: true,
						hrAnnAttachmentReq: null,
						userVo: null,
						annId: 330,
						categoryName: '常用资料',
						pubUserCode: '01496812',
						pubUserName: '王刚',
						pubUserInfo: '01496812-王刚',
						publishTime: '2022-11-15 10:41:52',
						isReader: true,
						isNew: false,
					},
					{
						annTitle: '新闻类',
						annCategoryId: 3,
						annContent: '<p>123123123123</p>',
						publishStatus: true,
						hrAnnAttachmentReq: null,
						userVo: null,
						annId: 329,
						categoryName: '常用资料',
						pubUserCode: '02525006',
						pubUserName: '宋娟',
						pubUserInfo: '02525006-宋娟',
						publishTime: '2022-11-14 10:13:40',
						isReader: true,
						isNew: false,
					},
					{
						annTitle: '新闻类',
						annCategoryId: 3,
						annContent: '<p>123412312312</p>',
						publishStatus: true,
						hrAnnAttachmentReq: null,
						userVo: null,
						annId: 328,
						categoryName: '常用资料',
						pubUserCode: '01496812',
						pubUserName: '王刚',
						pubUserInfo: '01496812-王刚',
						publishTime: '2022-11-07 17:07:27',
						isReader: true,
						isNew: false,
					},
					{
						annTitle: '新闻类',
						annCategoryId: 3,
						annContent: '<p>請親衛隊請問請問得到</p>',
						publishStatus: true,
						hrAnnAttachmentReq: null,
						userVo: null,
						annId: 327,
						categoryName: '常用资料',
						pubUserCode: '01496812',
						pubUserName: '王刚',
						pubUserInfo: '01496812-王刚',
						publishTime: '2022-11-07 17:07:09',
						isReader: true,
						isNew: false,
					},
					{
						annTitle: 'chenbing',
						annCategoryId: 1,
						annContent: '<p>1111</p>',
						publishStatus: true,
						hrAnnAttachmentReq: null,
						userVo: null,
						annId: 318,
						categoryName: '规范性文件',
						pubUserCode: '02359935',
						pubUserName: '陈冰',
						pubUserInfo: '02359935-陈冰',
						publishTime: '2022-08-19 10:53:23',
						isReader: true,
						isNew: false,
					},
					{
						annTitle: '231',
						annCategoryId: 1,
						annContent: '<p>123</p>',
						publishStatus: true,
						hrAnnAttachmentReq: null,
						userVo: null,
						annId: 246,
						categoryName: '规范性文件',
						pubUserCode: '01542456',
						pubUserName: '张晓锋',
						pubUserInfo: '01542456-张晓锋',
						publishTime: '2022-07-26 09:25:04',
						isReader: true,
						isNew: false,
					},
					{
						annTitle: '代表大会',
						annCategoryId: 1,
						annContent: '<p>地方</p>',
						publishStatus: true,
						hrAnnAttachmentReq: null,
						userVo: null,
						annId: 178,
						categoryName: '规范性文件',
						pubUserCode: '02525006',
						pubUserName: '宋娟',
						pubUserInfo: '02525006-宋娟',
						publishTime: '2022-07-18 14:07:00',
						isReader: true,
						isNew: false,
					},
					{
						annTitle: '哈哈哈',
						annCategoryId: 1,
						annContent:
							'<p>2019年1月16日至18日，习近平在京津冀考察，主持召开京津冀协同发展座谈会并发表重要讲话。这是1月16日上午，习近平在河北雄安新区规划展示中心，仔细听取新区总体规划、政策体系及建设情况介绍。<br/></p><p>2019年1月16日至18日，习近平在京津冀考察，主持召开京津冀协同发展座谈会并发表重要讲话。这是1月16日下午，在雄安新区“千年秀林”大清河片林一区造林区域，习近平登上秀林驿站二层平台远眺林区全貌。</p><p>2019年1月16日至18日，习近平在京津冀考察，主持召开京津冀协同发展座谈会并发表重要讲话。这是1月16日上午，习近平在雄安新区规划展示中心，通过大屏幕连线京雄城际铁路雄安站建设工地现场。</p><p>5年间，众多规划者、建设者在这幅面向未来的“工笔画”上细笔勾勒、精雕细琢。中国高质量发展的要义，正在新区建设的细节里充分展现。</p><p>位于雄安新区首座新建220千伏变电站——剧村站内的“碳达峰、碳中和”监测平台，通过电力大数据折算碳排放量，对雄安新区碳排放、碳减排、碳汇进行实时监测分析（2022年3月18日摄）。</p><p>工作人员在介绍雄安新区市民服务中心地下管廊（2019年8月30日摄）。在雄安新区，水、电、气、暖、网等市政配套基础设施管线全都集纳在地下综合管廊中，设有专门的检修口、吊装口和监测系统，实施统一规划、统一设计、统一建设和管理，充分体现了创新引领和高质量发展理念。</p><p>近年来，河北省统筹黄河水、长江水和水库水向白洋淀实施生态补水，淀区面积由170多平方公里恢复至275平方公里左右，水位稳定在7米左右，“华北之肾”功能恢复。</p><p>雄安新区“千年秀林”（无人机照片，2021年3月31日摄）。截至2022年3月，雄安新区森林覆盖率已超过30%。根据规划，雄安未来蓝绿空间占比稳定在70%。</p><p>这是建设中的雄安新区城市计算（超算云）中心项目（无人机照片，2022年1月5日摄）。该项目是雄安数字孪生城市“之脑”“之眼”“之芯”，将为整个数字孪生城市的大数据、区块链、物联网、AI、VR/AR提供网络、计算、存储服务。</p><p>中科院雄安创新研究院工作人员介绍微纳器件与系统实验室主要研究方向（2022年3月8日摄）。2019年12月，中国科学院与河北省政府签署协议，合作共建“雄安创新研究院”，重点突破产业基础性关键技术、新兴产业核心技术和开辟新领域的变革性技术，推动研究成果转移转化。</p><p>群众在雄安市民服务中心内办理业务（2019年1月17日摄）。2021年，雄安新区提出“一窗受理、一网通办、一次办结、一枚印章管到底”的“四个一”审批模式，推动技术、人才、资金等要素资源集聚。</p><p><img src="http://10.130.136.139:9005/hrplatform/file/downLoadGetUrlNoAuth?filePath=group3/M00/00/9C/CoIk62JIDuaIdLtMAAg_Z5ZYsIMAAACrQHViikACD9_322.png" style="max-width:100%;" contenteditable="false"/></p><p>这是雄安新区首家三甲医院——首都医科大学宣武医院雄安院区项目建设施工现场（无人机照片，2022年3月29日摄）。该工程由北京市援建，总建筑面积12.2万平方米，包括门诊楼、医技楼、住院楼、科研楼等，主体结构于2021年8月封顶，建成后将成为拥有600张床位的独立运行三级甲等医院。</p><p>2018年12月开建的雄安站，是新区开工的第一个重大基础设施项目，规模相当于6个北京站。“智能大脑”、光伏供电、全周期三维数字档案等前沿技术，让雄安站成为一座智能客站、绿色客站。2020年12月27日，京雄城际铁路全线开通运营，从北京西站到雄安站，最快仅需50分钟。</p><p>在雄安智绘未来科技园，雄安数字交通实验室工作人员操控无人驾驶汽车进行自动驾驶（2021年3月26日摄）。</p><p>这是雄安新区商务服务中心（无人机照片，2022年3月28日摄）。该中心设有酒店、专家公寓、商业、会议展览、科技成果展示交易中心等配套功能，将为雄安新区提供急需的各项商务服务。</p><p>工作人员在河北雄安新区政务服务中心综合办税服务区为居民办理业务（2021年5月12日摄）。雄安新区政务服务中心成立于2018年5月30日，为企业和个人提供“一站式”行政审批事项受理和便民业务受理。</p><p>一家入驻雄安新区的企业工作人员在市民服务中心内展示办理的营业执照（2019年1月17日摄）。</p><p>企业工作人员在中国（河北）自由贸易试验区雄安片区政务服务中心办理业务（2019年8月30日摄）。2019年8月，中国（河北）自由贸易试验区在雄安新区正式揭牌。试验区实施范围119.97平方公里，涵盖雄安片区、正定片区、曹妃甸片区、大兴机场片区四个片区。</p><p>未来的雄安</p><p><br/></p><p>将是更加宜居宜业的城市</p><p>是新时代中国高质量发展的样板</p><p>总策划：周宗敏</p><p>监制：孙承斌 班玮</p><p>策划：刘洁 郑卫 兰红光 赖向东 王建华</p><p>统筹：鱼澜 邢广利 毕晓洋</p><p>制作：毕晓洋</p><p>摄影：鞠鹏 邢广利 杨世尧 朱旭东 牟宇 骆学峰 金皓原</p><p>编辑：李鹏 李京 毕晓洋 虞东升 罗晓光</p><p>新华社第一工作室</p><p>新华社摄影部</p><p>新华社河北分社</p><p>联合出品</p><p>举报/反馈</p><h2>发表评论</h2><p><textarea></textarea></p><p>发表</p><h2>作者最新文章</h2><p><a target="_blank" href="https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_9715475607221009379%22%7D&amp;n_type=1&amp;p_from=3"></a></p><p><a target="_blank" href="https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_9715475607221009379%22%7D&amp;n_type=1&amp;p_from=3"></a></p><h3><a target="_blank" href="https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_9715475607221009379%22%7D&amp;n_type=1&amp;p_from=3">新华全媒+｜让“星星的孩子”走出“孤独星球”</a></h3><p>38分钟前1阅读</p><p><a target="_blank" href="https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_9456691260462408935%22%7D&amp;n_type=1&amp;p_from=3"></a></p><p><a target="_blank" href="https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_9456691260462408935%22%7D&amp;n_type=1&amp;p_from=3"></a></p><h3><a target="_blank" href="https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_9456691260462408935%22%7D&amp;n_type=1&amp;p_from=3">暖！交警铁骑挡住身后滚滚车流 守护拄拐老人过马路</a></h3><p>1小时前1阅读</p><p><a target="_blank" href="https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_9362792254369294619%22%7D&amp;n_type=1&amp;p_from=3"></a></p><p><a target="_blank" href="https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_9362792254369294619%22%7D&amp;n_type=1&amp;p_from=3"></a></p><h3><a target="_blank" href="https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_9362792254369294619%22%7D&amp;n_type=1&amp;p_from=3">春季防火，森林消防在行动<img src="http://10.130.136.139:9005/hrplatform/file/downLoadGetUrlNoAuth?filePath=group3/M00/00/9C/CoIk62JIDt-Ic4NZAAmZCDBr568AAACrQHL8QkACZkg066.png" contenteditable="false" style="font-size: 14px; font-weight: 400; max-width: 100%;"/></a><img src="http://10.130.136.139:9005/hrplatform/file/downLoadGetUrlNoAuth?filePath=group3/M00/00/99/CoIk62JIDvGIIAVzAACFUxcHAhcAAABsAI7E0IAAIVs09.jpeg" style="max-width:100%;" contenteditable="false"/></h3>',
						publishStatus: true,
						hrAnnAttachmentReq: null,
						userVo: null,
						annId: 17,
						categoryName: '规范性文件',
						pubUserCode: '00409941',
						pubUserName: '王欣',
						pubUserInfo: '00409941-王欣',
						publishTime: '2022-04-06 16:39:34',
						isReader: true,
						isNew: false,
					},
					{
						annTitle: '广东佛山鬼斧神工',
						annCategoryId: 1,
						annContent: '<p>分公司的分公司发电公司告诉对方是个复读生供奉的是广东佛山对公司的股份</p>',
						publishStatus: true,
						hrAnnAttachmentReq: null,
						userVo: null,
						annId: 16,
						categoryName: '规范性文件',
						pubUserCode: '00409941',
						pubUserName: '王欣',
						pubUserInfo: '00409941-王欣',
						publishTime: '2022-04-01 10:30:09',
						isReader: true,
						isNew: false,
					},
					{
						annTitle: '大范德萨发生的发',
						annCategoryId: 1,
						annContent:
							'<p>东方闪电开发及肯德基发了家里肯定就发ll</p><p>地方叫啥会计法接口了打飞机来看待结案快疯了的接口劳动法j<img src="http://10.130.136.139:9005/hrplatform/file/downLoadGetUrlNoAuth?filePath=group2/M00/00/1F/CoIk6WJD88CIfCslAAgcj7siKBgAAACugCRPwwACByn783.jpg" contenteditable="false" style="font-size: 14px; max-width: 100%;"/></p>',
						publishStatus: true,
						hrAnnAttachmentReq: null,
						userVo: null,
						annId: 11,
						categoryName: '规范性文件',
						pubUserCode: '02359935',
						pubUserName: '陈冰',
						pubUserInfo: '02359935-陈冰',
						publishTime: '2022-03-30 14:10:16',
						isReader: true,
						isNew: false,
					},
					{
						annTitle: '发都发啥的',
						annCategoryId: 1,
						annContent: '<p>东方闪电</p>',
						publishStatus: true,
						hrAnnAttachmentReq: null,
						userVo: null,
						annId: 12,
						categoryName: '规范性文件',
						pubUserCode: '00409941',
						pubUserName: '王欣',
						pubUserInfo: '00409941-王欣',
						publishTime: '2022-03-29 14:39:06',
						isReader: true,
						isNew: false,
					},
					{
						annTitle: 'lcmtest1',
						annCategoryId: 1,
						annContent: 'lcmtestcontent',
						publishStatus: true,
						hrAnnAttachmentReq: null,
						userVo: null,
						annId: 302,
						categoryName: '规范性文件',
						pubUserCode: null,
						pubUserName: null,
						pubUserInfo: '',
						publishTime: null,
						isReader: true,
						isNew: false,
					},
				],
			},
		});
	});
}

/**
 * @description 新增
 * @returns
 */
export function indicatorResultAdd(params) {
	return YtoHttp.post('quotaResult/add', params);
}

/**
 * @description 修改
 * @returns
 */
export function indicatorResultUpdate(params) {
	return YtoHttp.post('quotaResult/update', params);
}

/**
 * @description 详情
 * @returns
 */
export function indicatorResultInfo(params) {
	return YtoHttp.post('quotaResult/display', params);
}

/**
 * @description 启用/禁用
 * @returns
 */
export function indicatorResultDisable(params) {
	return YtoHttp.post('quotaResult/disable', params);
}

/**
 * @description 导出
 * @returns
 */
export function indicatorExport(params) {
	return YtoHttp.post('quotaResult/export', params, { responseType: 'blob' });
}

/**
 * @description 下载模板
 * @returns
 */
export function indicatorDownTemplete(params) {
	return YtoHttp.post('quotaResult/template/down', params, { responseType: 'blob' });
}

/**
 * @description 列表
 * @returns
 */
export function indicatorResultList(params) {
	return YtoHttp.post('quotaResult/list', params);
}

/**
 * @description 列表
 * @returns
 */
export function uploadFile(params) {
	return YtoHttp.post('quotaResult/import', params);
}

/**
 * @description 列表
 * @returns
 */
export function exportFail(params) {
	return YtoHttp.post('quotaResult/import/downFailData', params, { responseType: 'blob' });
}

// uploadFile = uploadFile;
// exportDemo = indicatorDownTemplete;
// exportFail = exportFail;


/**
 * 获取模块详情
 * @param params {}
 * @returns {}
 */
export function getModelInfo(params: object) {
	return new Promise((resolve) => {
		resolve({
			status: 0,
			message: 'success',
			data: {
				basic: {
					name: params.name,
					tag: params.tag,
					desc: '测试描述',
				},
				zhibiao: [],
			},
		});
	});
}

//AddType
export enum AddType {
	// eslint-disable-next-line no-unused-vars
	ADD_MODEL = 'model', // 新增模块
	// eslint-disable-next-line no-unused-vars
	ADD_ZHIBIAO = 'zhibiao', //指标引入
	// eslint-disable-next-line no-unused-vars
	ADD_YIPIAOFOUJUE = 'yipiao', //一票否决
	// eslint-disable-next-line no-unused-vars
	ADD_JISUANGONGSHI = 'jisuangongshi', //计算公式
	// eslint-disable-next-line no-unused-vars
	ADD_YULAN = 'yulan', //计算公式
	NONE = 'none',
}
