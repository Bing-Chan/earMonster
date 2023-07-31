<template>
    <div id="complaintRateList" class="yto-panel">
        <div class="yto-panel-head">明细数据
            <search-panel v-if="hasSearch && orgType==='branch'" :columnName="'complaintRate'" :orgType="orgType"
                          :orgCode="orgCode" :dimension="dimension"
                          @handlerSelectOrgCode="handlerSelectOrgCode"></search-panel>
            <search-panel-share v-else-if="complaintChannelType==='shareCenter'" :orgType="'REGION_MANAGE'"
                                :orgCode="orgCode"
                                @handlerSelectOrgCode="handlerSelectOrgCode"></search-panel-share>
        </div>
        <div class="list-custom" id="tableHead">
            <ul class="list-head"
                :class="{'tableFixed':tableHeadFixed,'topFixed':tableHeadFixed && topFixed===80}" :style="{top: headPos + 'px'}">
                <li v-show="item.show" v-for="(item,index) in tableHead" :key="index"
                    @click="handleSort(item)">
                    {{item.label==='升级投诉率(‱)'?'升级投诉率(百万分之)':item.label}}
                    <i v-show="item.sortable" class="icon-sort-default"
                       :class="{'icon-sort-desc':sortColumn===item.prop && sortType==='DESC','icon-sort-asc':sortColumn===item.prop && sortType==='ASC'}">
                    </i>

                </li>
            </ul>
            <ul class="list-head-space" v-if="tableHeadFixed">
                <li></li>
            </ul>
            <div class="infiniteScroll"
                 v-infinite-scroll="loadMore"
                 infinite-scroll-distance="10">

                <ul class="list-body" v-for="(item,index) in tableData" :key="index"
                    @click="rowClick(item)">
                    <template v-for="(sub,i) in tableHead">
                        <li v-if="sub.show" :key="i"
                            :class="{'blue-li':sub.prop === 'orgName' || sub.prop === 'shareName' || (sub.prop === 'waybillNo' && !isWangDianGuanJia) || (sub.prop === 'rptDate' && item.rptDate!=='合计') ,
                            'black-li':($route.path === '/ComplaintRate/RegionManage' &&( item.orgCode===orgCode || item.orgCode==='999999')) || ($route.path === '/ComplaintRate/Head' && complaintHeaderTabType==='appealRate'  && item.shareName==='合计')    || ($route.path === '/ComplaintRate/Emp' && activeType!=='date') || (($route.path === '/ComplaintRate/TransferCenter' && (complaintRateTabType === 'cainiao' || complaintRateTabType === 'pdd') && item.orgName===orgName)),
                            'red-li':(sub.prop === 'typeNum' && item.colorTag === '红色') || ($route.path === '/ComplaintRate/Bill' && sub.prop === 'waybillNo'  && item.colorTag === '红色') }
                            ">
                            <span  v-if="sub.prop === 'complaintNum' || sub.prop ==='typeNum' || sub.prop ==='complaintNum' || sub.prop ==='waybillNum' || sub.prop ==='send'  ">{{ item[sub.prop] | formatTenThousand}}</span>
                            <span v-else-if="sub.prop === 'linkRelative'" v-html="relativeColor(item[sub.prop])"></span>
                            <span v-else>{{item[sub.prop]}}</span>
                        </li>
                    </template>
                    <!--                    <template v-if="complaintHeaderTabType==='complaintRate' && complaintChannelType!=='shareCenter' && (orgType!=='SUB_DEPARTMENT' && orgType !=='EMP' && orgType!=='ORDER')">-->
                    <!--                        <li :class="{'blue-li': orgType==='prov' || (orgType==='center' && item.orgName!=='全国' && item.orgName!==orgName) || (complaintBranchDrillType==='byTab' && complaintRateTabType ==='cainiao'&& orgType==='branch'&& item.orgName!==orgName)|| (complaintBranchDrillType==='byTab'&& complaintRateTabType !=='cainiao' && orgType==='branch' && item.orgName!=='全国' && item.orgName!==orgName)|| (complaintBranchDrillType!=='byTab' && complaintRateTabType ==='cainiao' && orgType==='branch' &&item.orgName!=='全国'&& item.orgName!==orgName) || (complaintBranchDrillType!=='byTab' && complaintRateTabType !=='cainiao' && orgType==='branch' &&item.orgName!=='全国')}"-->
                    <!--                            v-if="item.orgCode !== '000000'">-->
                    <!--                            {{item.orgName}}-->
                    <!--                        </li>-->
                    <!--                        <li v-else :class="{'blue-li':orgType==='prov'}">其他</li>-->
                    <!--                        <li>{{item.complaintNum | formatTenThousand}}</li>-->
                    <!--                        <li>{{item.typeNum | formatTenThousand}}</li>-->
                    <!--                        <li>{{item.typeRate?item.typeRate:'0'}}</li>-->
                    <!--                    </template>-->
                    <!--                   <template v-if="complaintHeaderTabType==='complaintRate'&& complaintChannelType!=='shareCenter' && (orgType==='SUB_DEPARTMENT' || orgType==='EMP')">-->
                    <!--                        <li :class="{'blue-li':(orgType==='SUB_DEPARTMENT'&& item.orgName!=='合计') || (orgType==='EMP' && activeType==='date' && item.orgName!=='合计')}">{{item.orgName}}</li>-->
                    <!--                        <li>{{item.complaints}}</li>-->
                    <!--                        <li>{{item.send}}</li>-->
                    <!--                    </template>-->
                    <!--                    <template v-if="complaintHeaderTabType==='complaintRate'&& complaintChannelType!=='shareCenter' && orgType==='ORDER'">-->
                    <!--                        <li class="blue-li">{{item.waybillNo}}</li>-->
                    <!--                        <li>{{item.complaintTime}}</li>-->
                    <!--                        <li>{{item.complaintType}}</li>-->
                    <!--                    </template>-->
                    <!--                    <template v-if="complaintHeaderTabType==='appealRate'&& complaintChannelType!=='shareCenter'  && (orgType!=='SUB_DEPARTMENT' && orgType !=='EMP' && orgType!=='ORDER')">-->
                    <!--                        <li :class="{'blue-li': orgType==='prov' || (orgType==='center' && item.orgName!=='全国' && item.orgName!==orgName) ||  (complaintBranchDrillType==='byTab' && complaintRateTabType ==='cainiao'&& orgType==='branch'&& item.orgName!==orgName)|| (complaintBranchDrillType==='byTab'&& complaintRateTabType !=='cainiao' && orgType==='branch' && item.orgName!=='全国' && item.orgName!==orgName)|| (complaintBranchDrillType!=='byTab' && complaintRateTabType ==='cainiao' && orgType==='branch' &&item.orgName!=='全国'&& item.orgName!==orgName) || (complaintBranchDrillType!=='byTab' && complaintRateTabType !=='cainiao' && orgType==='branch' &&item.orgName!=='全国')} "-->
                    <!--                            v-if="item.orgCode !== '000000'">-->
                    <!--                            {{item.orgName}}-->
                    <!--                        </li>-->
                    <!--                        <li v-else>其他</li>-->
                    <!--                        <li>{{item.appealNum | formatTenThousand}}</li>-->
                    <!--                        <li>{{item.complaintNum | formatTenThousand}}</li>-->
                    <!--                        <li>{{item.appealRate?item.appealRate:'0'}}</li>-->
                    <!--                    </template>-->
                    <!--                    <template v-if="complaintHeaderTabType==='appealRate' && complaintChannelType!=='shareCenter' && (orgType==='SUB_DEPARTMENT' || orgType==='EMP')">-->
                    <!--                        <li :class="{'blue-li':(orgType==='SUB_DEPARTMENT'&& item.orgName!=='合计') || (orgType==='EMP' && activeType==='date' && item.orgName!=='合计')}">{{item.orgName}}</li>-->
                    <!--                        <li>{{item.complaints}}</li>-->
                    <!--                        <li>{{item.send}}</li>-->
                    <!--                    </template>-->
                    <!--                    <template v-if="complaintHeaderTabType==='appealRate'&& complaintChannelType!=='shareCenter' && orgType==='ORDER'">-->
                    <!--                        <li class="blue-li">{{item.waybillNo}}</li>-->
                    <!--                        <li>{{item.repeatTime}}</li>-->
                    <!--                    </template>-->
                    <!--                    <template v-if="complaintChannelType==='shareCenter' && (complaintHeaderTabType==='appealRate' || complaintHeaderTabType==='complaintRate' )">-->
                    <!--                        <li v-for="(sub,i) in tableHead"   :key="i"  v-show="sub.show" >-->
                    <!--                            <span :class="{'blue-li':(sub.prop === 'shareName' && complaintHeaderTabType ==='appealRate' && item[sub.prop] !=='合计') || (sub.prop === 'shareName' && complaintHeaderTabType ==='complaintRate')}">-->
                    <!--                                <span v-if="sub.prop === 'shareName'">{{item[sub.prop]!==null?item[sub.prop]:'-'}}</span>-->
                    <!--                                <span v-else-if="sub.prop === 'allComplaintRate' || sub.prop === 'appealRate'|| sub.prop === 'normalAppealRate'||sub.prop === 'cainiaoAppealRate'|| sub.prop === 'normalComplaintRate'|| sub.prop === 'cainiaoComplaintRate'||sub.prop === 'upgradeComplaintRate'|| sub.prop ==='percent'">-->
                    <!--                                    {{item[sub.prop]!==null?item[sub.prop]:'-'}}</span>-->
                    <!--                                <span v-else>{{item[sub.prop]===null?'-': item[sub.prop] | formatTenThousand}}</span>-->
                    <!--                            </span>-->
                    <!--                        </li>                    -->
                    <!--                   </template>-->
                </ul>

            </div>
            <ul v-show="tableData.length===0 && !pageLoading" class="list-foot">
                <li v-if="searchType===1">暂无搜索结果 <span class="refresh-btn"
                                                       @click="getTableList();searchType=0">返回</span>
                </li>
                <li v-else>暂无数据</li>
            </ul>
        </div>
        <div class="loading-panel">
            <mt-spinner v-if="isPaging && hasMore" type="fading-circle" :size="30"></mt-spinner>
            <div class="no-more" v-show="isPaging && !hasMore && tableData.length!==0">我也是有底线的...</div>
        </div>
    </div>


</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import searchPanel from '@/components/common/searchPanel'
    import searchPanelShare from '@/components/common/searchPanelShareCenter'
    import utils from '@/utils/utils'
    import {
        queryComplaintByCondition,
        queryComplaintAppealByCondition,
        queryComplaintByShareCenterList,//共享中心列表接口
    } from '@/api'

    export default {
        name: "complaintRateList",
        props: {
            orgName: {
                type: String,
                default: ''
            },
            orgType: {
                type: String,
                default: ''
            },
            orgCode: {
                type: String,
                default: ''
            },
            dimension: {
                type: String,
                default: ''
            },
            headPos: {
              type: Number,
              default: 0
            },
            topFixed: {
                type: Number,
                default: 0
            },
            judge: {
                type: String,
                default: ''
            },
            orgCodeCenter: {
                type: String,
                default: ''
            },
            orgCodeBranch: {
                type: String,
                default: ''
            },
            orgNameTag: {
                type: String,
                default: ''
            },
            hasSearch: { //是否有搜索框
                type: Boolean,
                default: true,
            }

        },
        data() {
            return {
                isWangDianGuanJia: utils.getSessionStorage('YTO_JSC_WEB_APP_VUE') === 'true', // 是否网点管家嵌入
                tabType: 'all',
                tableHead: [],
                tableData: [],
                sortColumn: 'typeRate',
                sortType: 'DESC',
                pageNo: 1,       		  //分页序号
                limit: 20,         		//每页条数
                isPaging: true,    		//是否分页： true / false
                hasMore: false,         //是否有下一页
                tableHeadFixed: false,
                pageLoading: false,
                scrollType: false,
                selectOrgCode: '', //检索
                searchType: 0,  // 1 搜索标记
                tableHasData: true,  //列表是否有数据
            }
        },
        computed: {
            ...mapState('common', ['currentDate', 'customStartDay', 'customEndDay', 'activeType', 'isNullData']),
            ...mapState('business', ['complaintHeaderTabType', 'complaintRateTabType', 'complaintRatePieType', 'complaintEChartLineName', 'complaintBranchDrillType', 'complaintChannelType']),
        },
        mounted() {
            if (this.complaintHeaderTabType === 'complaintRate') {
                if (this.complaintChannelType === 'shareCenter') {
                    if (this.complaintRatePieType === 'all') {
                        const sortComplaintRate = {
                            "all": 'allComplaintRate',
                            "normal": 'normalComplaintRate',
                            "cainiao": 'cainiaoComplaintRate',
                            "upgrade": 'upgradeComplaintRate',
                        }
                        this.sortColumn = sortComplaintRate[this.complaintRateTabType]
                    } else {
                        this.sortColumn = 'percent'
                    }
                } else {
                    this.sortColumn = 'typeRate';
                }
            } else {
                if (this.complaintChannelType === 'shareCenter') {
                    const sortAppealRate = {
                        "total": 'appealRate',
                        "normal": 'normalAppealRate',
                        "cainiao": 'cainiaoAppealRate',
                    }
                    this.sortColumn = sortAppealRate[this.complaintRateTabType]
                } else {
                    this.sortColumn = 'appealRate';
                }
            }
        },
        methods: {
            ...mapMutations('common', ['setCurrentDate', 'setCustomStartDay', 'setCustomEndDay', 'setActiveType', 'setIsTimeFlag']),
            ...mapMutations('business', ['setComplaintHeaderTabType', 'setComplaintRateTabType', 'setComplaintRatePieType', 'setComplaintEChartLineName', 'setComplaintBranchDrillType', 'setComplaintChannelType']),
            //监听滚动条
            handleScroll() {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                let offsetTop = utils.getElementToPageTop(document.getElementById('tableHead')) - this.topFixed;
                this.tableHeadFixed = scrollTop > offsetTop;

            },

            //重置默认排序
            resetColumn() {
                if (this.complaintHeaderTabType === 'complaintRate' && this.complaintChannelType !== 'shareCenter' && (this.orgType === 'SUB_DEPARTMENT' || this.orgType === 'EMP')) {
                    this.sortColumn = 'complaints';
                } else if (this.complaintHeaderTabType === 'complaintRate' && this.complaintChannelType !== 'shareCenter' && this.orgType === 'ORDER') {
                    this.sortColumn = '';
                } else if (this.complaintHeaderTabType === 'complaintRate' && this.complaintChannelType !== 'shareCenter') {
                    this.sortColumn = 'typeRate';
                }
                if (this.complaintHeaderTabType === 'appealRate' && this.complaintChannelType !== 'shareCenter' && (this.orgType === 'SUB_DEPARTMENT' || this.orgType === 'EMP')) {
                    this.sortColumn = 'complaints';
                } else if (this.complaintHeaderTabType === 'appealRate' && this.complaintChannelType !== 'shareCenter' && this.orgType === 'ORDER') {
                    this.sortColumn = '';
                } else if (this.complaintHeaderTabType === 'appealRate' && this.complaintChannelType !== 'shareCenter') {
                    this.sortColumn = 'appealRate';
                }
                if (this.$route.path ==='/ComplaintRate/Branch'){
                    this.sortColumn = 'rptDate';
                }

            },

            //重置默认页
            resetPageNo() {
                this.pageNo = 1;
                this.searchType = 0;
            },
            //重置默认页
            resetTable() {
                this.tableHead = [];
                this.tableData = [];
            },
            //分页
            loadMore() {
                if (this.pageLoading) {
                    return
                }
                if (this.hasMore) {
                    this.pageNo = this.pageNo + 1;
                    this.getTableList();
                }
            },
            //排序字段重置
            sortColumnSet(type) {
                if (this.complaintChannelType === 'shareCenter') {
                    if (this.complaintRatePieType === 'all') {
                        const sortComplaintRate = {
                            "all": 'allComplaintRate',
                            "normal": 'normalComplaintRate',
                            "cainiao": 'cainiaoComplaintRate',
                            "upgrade": 'upgradeComplaintRate',
                            "pdd": 'pddComplaintRate',
                        }
                        this.sortColumn = sortComplaintRate[type]
                    } else {
                        this.sortColumn = 'percent'
                    }
                    const sortAppealRate = {
                        "total": 'appealRate',
                        "normal": 'normalAppealRate',
                        "cainiao": 'cainiaoAppealRate',
                        "pdd": 'pddAppealRate',

                    }
                    if (this.complaintHeaderTabType === 'appealRate') {
                        this.sortColumn = sortAppealRate[type]
                    }
                } else if (this.complaintChannelType === 'region') {
                    if (this.complaintHeaderTabType === 'appealRate') {
                        this.sortColumn = 'appealRate'
                    } else {
                        this.sortColumn = 'typeRate';
                    }
                }
            },
            // 点击表格列
            rowClick(row) {
                // if (row.orgName === '合计' || this.orgType === 'branch') {
                //     return
                // }
                // if (this.complaintHeaderTabType === 'appealRate' && row.orgCode === "000000") {
                //     return
                // }
                //
                // if (this.activeType === 'custom') {
                //     localStorage.setItem('startDate', this.customStartDay);
                //     localStorage.setItem('endDate', this.customEndDay);
                // } else {
                //     localStorage.setItem('date', this.currentDate);
                // }
                // localStorage.setItem('activeType', this.activeType);
                // if (row.orgCode === '000000') {
                //     row.orgName = "其他";
                // }
                // this.$router.push({
                //     path: '/complaintRateCenter',
                //     query: {
                //         orgCode: encodeURIComponent(row.orgCode),
                //         orgType: encodeURIComponent('center'),
                //         orgName: encodeURIComponent(row.orgName)
                //     }
                // })
                this.$emit('rowClick', row);
            },
            //排序
            handleSort(item) {
                if (this.pageLoading) {
                    return
                }
                if (!item.sortable) {
                    return
                }
                this.scrollType = true;
                this.pageNo = 1;
                this.searchType = 0;
                if (item.prop !== this.sortColumn) {
                    this.sortType = 'DESC';

                } else {
                    this.sortType = this.sortType === 'DESC' ? 'ASC' : 'DESC';

                }
                this.sortColumn = item.prop;
                this.getTableList();
            },
            //表格数据
            getTableList() {
                if (this.complaintChannelType === 'region') {
                    this.getTableListOld()
                } else {
                    this.getShareCenterList()
                }
            },
            //表格数据
            getTableListOld() {
                this.pageLoading = true;
                let fetchMthodName;
                if (this.complaintHeaderTabType === 'complaintRate') {
                    fetchMthodName = queryComplaintByCondition;
                }
                if (this.complaintHeaderTabType === 'appealRate') {
                    fetchMthodName = queryComplaintAppealByCondition;

                }
                let params = {
                    tabType: this.complaintRateTabType, //列表类型
                    queryDate: this.currentDate,  //查询时间 (日 2019-02-28, 月 201902, 年 2019)
                    queryType: this.activeType, //查询时间类型 (日 date,  月 month , 年 year, 自定义 custom)
                    startDate: this.customStartDay, //自定义时间查询 开始日期 2019-02-28
                    endDate: this.customEndDay,    //自定义时间查询  结束日期 2019-03-01
                    pageNo: this.pageNo,       		  //分页序号
                    limit: this.limit,         		//每页条数
                    isPaging: this.isPaging,    		//是否分页： true / false
                    sortType: this.sortType,    		// 排序方式：升序 asc  / 降序 desc
                    sortColumn: this.sortColumn, 		//排序列属性名
                    orgType: this.orgType,     		//查询机构 ( 省区 prov, 中心 center, 分公司 branch)
                    orgCode: this.orgCode,  		//查询机构代码（省区列表页面为当前用户所在组织机构code）
                    selectOrgCode: this.selectOrgCode,  //检索
                    pieType: this.complaintRatePieType,  //扇形图类型
                    branchDrillType: this.complaintBranchDrillType,// 区分tabs下钻类型，中心维度byCol，分公司维度byTab
                    judge: this.judge,
                    orgCodeCenter: this.orgCodeCenter,
                    orgCodeBranch: this.orgCodeBranch,
                    orgNameTag: this.orgNameTag,
                };
                if ((this.complaintHeaderTabType === 'complaintRate' || this.complaintHeaderTabType === 'appealRate') && (this.orgType === 'SUB_DEPARTMENT' || this.orgType === 'EMP' || this.orgType === 'ORDER')) {
                    params.orgName = this.orgName;
                }
                if ((this.complaintRateTabType === 'cainiao'|| this.complaintRateTabType === 'pdd') && (this.orgType === 'center' || this.orgType === 'branch')) {
                    params.orgType = 'branch';
                    params.branchDrillType = 'byTab';
                }
                let that = this
                fetchMthodName(params).then(res => {
                    this.selectOrgCode = '';
                    this.tableHead = res.data.thead;
                    this.tableHasData = res.data.tbody !== undefined && res.data.tbody.length !== 0;
                    this.$emit('dataStates', 'tableHasData', this.tableHasData);
                    if (res.data.tbody !== undefined) {
                        if ((res.data.page.pageNum <= res.data.page.totalPage) && res.data.page.pageNum !== 1) {
                            this.tableData = this.tableData.concat(res.data.tbody);
                        }
                        if (this.pageNo === 1) {
                            this.tableData = res.data.tbody;
                        }
                        this.hasMore = this.pageNo < res.data.page.totalPage;
                        this.$nextTick(() => {
                            if (this.scrollType && this.tableHeadFixed) {
                                window.scrollTo(0, utils.getElementToPageTop(document.getElementById('tableHead')) - this.topFixed)
                            }
                            this.scrollType = false;
                        });
                        this.pageLoading = false;
                    } else {
                        this.tableData = [];
                        this.hasMore = false;
                        this.pageLoading = false;
                    }
                    window.addEventListener('scroll', this.handleScroll);
                }).catch(() => {
                    that.pageLoading = false;
                    that.tableHead = []
                    that.tableData = []
                })
            },
            // 共享中心列表
            getShareCenterList() {
                this.pageLoading = true;
                let params = {
                    tabType: this.complaintRateTabType, //列表类型
                    queryDate: this.currentDate,  //查询时间 (日 2019-02-28, 月 201902, 年 2019)
                    queryType: this.activeType, //查询时间类型 (日 date,  月 month , 年 year, 自定义 custom)
                    startDate: this.customStartDay, //自定义时间查询 开始日期 2019-02-28
                    endDate: this.customEndDay,    //自定义时间查询  结束日期 2019-03-01
                    pageNo: this.pageNo,       		  //分页序号
                    limit: this.limit,         		//每页条数
                    isPaging: this.isPaging,    		//是否分页： true / false
                    sortType: this.sortType,    		// 排序方式：升序 asc  / 降序 desc
                    sortColumn: this.sortColumn, 		//排序列属性名
                    // sortColumn :'percent',
                    orgType: this.orgType === 'prov' ? 'REGION_MANAGE' : this.orgType,     		//查询机构 ( 省区 prov, 中心 center, 分公司 branch)
                    orgCode: this.orgCode,  		//查询机构代码（省区列表页面为当前用户所在组织机构code）
                    selectOrgCode: this.selectOrgCode,  //检索
                    pieType: this.complaintRatePieType,  //扇形图类型
                    complaintType: this.complaintHeaderTabType,
                };
                this.$loading.open();
                queryComplaintByShareCenterList(params).then(res => {
                    this.selectOrgCode = '';
                    this.tableHead = res.data.thead;
                    this.tableHasData = res.data.tbody !== undefined && res.data.tbody.length !== 0;
                    this.$emit('dataStates', 'tableHasData', this.tableHasData);
                    if (res.data.tbody !== undefined) {
                        if ((res.data.page.pageNum <= res.data.page.totalPage) && res.data.page.pageNum !== 1) {
                            this.tableData = this.tableData.concat(res.data.tbody);
                        }
                        if (this.pageNo === 1) {
                            this.tableData = res.data.tbody;
                        }
                        this.hasMore = this.pageNo < res.data.page.totalPage;
                        this.$nextTick(() => {
                            if (this.scrollType && this.tableHeadFixed) {
                                window.scrollTo(0, utils.getElementToPageTop(document.getElementById('tableHead')) - this.topFixed)
                            }
                            this.scrollType = false;
                        });
                        this.pageLoading = false;
                        this.$loading.close();
                    } else {
                        this.tableData = [];
                        this.hasMore = false;
                        this.pageLoading = false;
                        this.$loading.close();
                    }
                    this.$loading.close();
                    window.addEventListener('scroll', this.handleScroll);
                })
            },
            //选择组织
            handlerSelectOrgCode(item) {
                this.pageNo = 1;
                this.selectOrgCode = item.code;
                this.getTableList();
                this.searchType = 1;
            },
            //  环比差颜色
            relativeColor(val) {
                return utils.relativeColor(val)
            },
        },
        components: {
            'search-panel': searchPanel,
            'search-panel-share': searchPanelShare,
        },
        filters: {
            //  格式化万
            formatTenThousand(val) {
                return utils.formatTenThousand(val)
            },

        },
        destroyed() {
            window.removeEventListener('scroll', this.handleScroll);
        },
    }
</script>

<style scoped lang="scss">
    #complaintRateList {

        .tableFixed {
            top: 0;

            &.topFixed {
                top: 80px;
            }
        }


    }
</style>
