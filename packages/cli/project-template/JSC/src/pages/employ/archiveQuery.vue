<template>
    <div id="Employ">
        <div class="yto-page" v-wechat-title="title">
            <!-- 人员简历 -->
            <div class="employ-search">
              <img src="../../assets/images/Employ/img_newbanner@2x.png">
              <div class="employ-search-box">
                <div class="employ-search-input">
                  <input v-model="params.keyWords" type="text" maxlength="11" placeholder="请输入工号/姓名/手机号">
                  <div class="closeImg" v-if="params.keyWords" @click.stop="deleteSerch()">
                    <img src="../../assets/images/close@2x.png">
                  </div>
                </div>
                <div class="employ-search-extra-btns">
                  <p><a @click="advancedChange(params.isAdvancedQuery)" href="javascript:void(0)">高级筛选 <van-icon :name="params.isAdvancedQuery == 1 ? 'arrow-up' : 'arrow-down'" /></a></p>
                </div>
                <div class="employ-search-extra" v-if="params.isAdvancedQuery == 1">
                  <div class="">
                    <van-cell-group>
                      <van-cell title="年龄：">
                        <van-dropdown-menu :overlay="false" active-color="#2482FC">
                          <van-dropdown-item v-model="params.ageRange" :options="categoryList.ageRange.list" />
                        </van-dropdown-menu>
                      </van-cell>
                      <van-cell title="学历：">
                        <van-dropdown-menu :overlay="false" active-color="#2482FC">
                          <van-dropdown-item v-model="params.zgxl" :options="categoryList.zgxl.list" />
                        </van-dropdown-menu>
                      </van-cell>
                      <van-cell title="职级：">
                        <van-dropdown-menu :overlay="false" active-color="#2482FC">
                          <van-dropdown-item v-model="params.zjLx" :options="categoryList.zjLx.list" />
                        </van-dropdown-menu>
                      </van-cell>
                      <van-cell title="工龄：">
                        <van-dropdown-menu :overlay="false" active-color="#2482FC">
                          <van-dropdown-item v-model="params.workmon" :options="categoryList.workmon.list" />
                        </van-dropdown-menu>
                      </van-cell>
                      <van-cell title="用工类型：">
                        <van-dropdown-menu :overlay="false" active-color="#2482FC">
                          <van-dropdown-item v-model="params.descr" :options="categoryList.descr.list" />
                        </van-dropdown-menu>
                      </van-cell>
                      <van-cell title="招聘来源：">
                        <van-dropdown-menu :overlay="false" active-color="#2482FC">
                          <van-dropdown-item v-model="params.cHrZpqd" :options="categoryList.cHrZpqd.list" />
                        </van-dropdown-menu>
                      </van-cell>
                    </van-cell-group>
                  </div>
                </div>
                <div class="employ-search-button">
                  <yto-button :disabled="pageLoading" type="default" @click.native="searchEmploy()">
                    <span v-show="!pageLoading">查询</span>
                    <span v-show="pageLoading">查询中...</span>
                  </yto-button>
                </div>
              </div>
            </div>

            <!-- 查询结果 -->
            <div class="yto-panel">
                <div class="employ-list" id="tableHead">
                    <div class="infiniteScroll"
                         v-infinite-scroll="loadMore"
                         infinite-scroll-distance="10">
                        <ul>
                            <li v-for="(item, index) in tableData" :key="index + 1001" @click="goDetail(item)">
                              <template>
                                  <h6 class="cl2482FC">{{item.name}}<strong>{{item.emplid}}</strong></h6>
                                  <p class="cl3">{{item.fullPathName}}</p>
                                  <div class="arr-icon">
                                      <span>{{index + 1}}</span>
                                  </div>
                              </template>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- <div v-show="tableData.length === 0 && !pageLoading" class="employ-list-foot">
                    <p>暂无查询结果</p>
                </div> -->
                <div v-show="tableData.length === 0 && !pageLoading && !historyLoading" class="employ-list-history">
                    <p class="tp"><strong>查询历史</strong></p>
                    <p class="tl" v-if="historyList.length">
                      <span v-for="(item, index) in historyList" :key="index" @click="htyBtnClick(item)">{{item}}</span>
                    </p>
                    <p class="te" v-if="!historyList.length">暂无查询历史</p>
                    <p class="tb" v-else><a  @click="clearHty()" href="javascript:void(0)">清空查询历史</a></p>
                </div>
            </div>

            <div class="loading-panel">
                <mt-spinner v-show="isPaging && hasMore && pageLoading" type="fading-circle" :size="30"></mt-spinner>
                <div class="no-more" v-show="isPaging && !hasMore && (tableData.length > limit)">我也是有底线的...</div>
            </div>
        </div>
    </div>
</template>

<script>
  import { newSelectPersonBIList, queryEmpInfoNew, getCategoryList, getRecordHistory, removeRecordHistory } from '@/api/index'
  import { mapState, mapMutations } from 'vuex'
  import utils from '@/utils/utils'
  import { Toast } from 'mint-ui'
  import { Session } from "@/utils/storge";


  export default {
    name: 'Employ',
    components: {},
    data () {
      return {
        title: '人员简历', // 页面标题
        cnData: [],
        cnDataList: [],
        cnDataProv: [],
        currentIndex: 0,
        baseRanking: 0,
        activeTab: 'sumNum',
        tableData: [],
        sortColumn: '',
        sortType: 'asc',
        sortName: 'score',
        tableHeadFixed: false,
        desc: true,
        descScore: true,
        orgType: '',
        orgName: '',
        orgLevel: '',
        orgCode: '',
        tabsHasData: true, // tabs是否有数据
        params: {
          keyWords: '',
          ageRange: '',
          cHrZpqd: '',
          zjLx: '',
          workmon: '',
          zgxl: '',
          descr: '',
          isAdvancedQuery: 0, // 是否是高级查询'1'-是,'0'-否
        },
        pageNo: 1, // 分页序号
        limit: 20, // 每页条数
        total: 0,
        isPaging: false, // 是否分页： true / false
        hasMore: false, // 是否有下一页
        pageLoading: false,
        historyLoading: false,
        scrollType: false,
        beforeRouteState: false,
        perHasData: true,
        pieHasData: true,
        // 高级删选枚举值
        categoryList: {
          ageRange: {
            code: 'AGE_RANGE', // 年龄
            list: []
          },
          zgxl: {
            code: 'DEGREE', // 学历
            list: []
          },
          zjLx: {
            code: 'PERSONNEL_FILE_RANK', // 职级
            list: []
          },
          workmon: {
            code: 'WORK_MONTH', // 工龄
            list: []
          },
          descr: {
            code: 'EMPLOYMENT_TYPE', // 用工类型
            list: []
          },
          cHrZpqd: {
            code: 'RECRUIT_SOURCE', // 招聘来源
            list: []
          },
        },
        historyList: [] // 查询历史列表
      }
    },

    computed: {
      ...mapState('common', ['currentDate', 'customStartDay', 'customEndDay', 'activeType', 'isNullData', 'employSearchParams'])
    },

    mounted () {
      this.$nextTick(() => {
          window.scrollTo(0, 0)
      })

      this.tableHeadFixed = false

      if (this.$route.params.beforeRouteState === 'true') {
        this.beforeRouteState = true
      }
    },

    watch: {},

    created(){
      if(Session.getJson("historySerch")){
        let that = this

        Object.assign(that.params, Session.getJson('historySerch'))

        if (Session.getJson('searchList') && Session.getJson('searchList').length) {
          that.tableData = Session.getJson('searchList')
          // that.hasMore = Session.getJson('hasMore')
          that.pageNo = Session.getJson('pageNo')
          that.total = Session.getJson('total')
          that.hasMore = that.pageNo * that.limit < that.total
          that.pageLoading = false
          that.isPaging = true
        } else {
          // 查询搜索历史记录
          that.getRecordHistory()
        }
      } else {
        Session.setJson("searchList", []);

        // 查询搜索历史记录
        this.getRecordHistory()
      }

      // 查询高级筛选枚举值
      this.getCategoryList()
    },

    methods: {
      ...mapMutations('common', ['setCurrentDate', 'setCustomStartDay', 'setCustomEndDay', 'setActiveType', 'setIsTimeFlag', 'setEmploySearchParams']),
      handleScroll () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        var offsetTop = utils.getElementToPageTop(document.getElementById('tableHead')) - 80
        this.tableHeadFixed = scrollTop > offsetTop
      },
      deleteSerch(){
        this.params.keyWords = ''
        this.tableData = []
        this.getRecordHistory()
      },
      // 重置滚动条
      resetScroll () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop > 0 && this.beforeRouteState) {
          window.scrollTo(0, 0)
        }
        this.beforeRouteState = false
      },
      advancedChange(val) {
        this.params.isAdvancedQuery = val == 1 ? 0 : 1
        this.params.ageRange = ''
        this.params.cHrZpqd = ''
        this.params.zjLx = ''
        this.params.workmon = ''
        this.params.zgxl = ''
        this.params.descr = ''
      },
      // 查询搜索历史记录
      getRecordHistory() {
        this.historyLoading = true
        getRecordHistory().then(res => {
          if (res.status === 0) {
            this.historyList = res.data && res.data.resultData ? [...new Set(res.data.resultData.map((item) => {
              return item.keyWord
            }))] : []
            this.historyLoading = false
          } else {
            this.historyLoading = false
          }
        })
      },
      // 查询高级筛选枚举值
      getCategoryList() {
        for (let item in this.categoryList) {
          let tempArr = Session.getJson(this.categoryList[item].code)
          if (tempArr && Array.isArray(tempArr)) {
            this.categoryList[item].list = tempArr
          } else {
            getCategoryList({
              categoryCode: this.categoryList[item].code
            }).then(res => {
              if (res.status === 0) {
                this.categoryList[item].list = res.data && res.data.length ? res.data.map((item) => {
                  return {
                    text: item.dictDesc,
                    value: item.dictCode
                  }
                }) : []
                this.categoryList[item].list.unshift({
                  text: '全部',
                  value: ''
                })

                Session.setJson(this.categoryList[item].code, this.categoryList[item].list)
              }
            })
          }
        }
      },
      htyBtnClick(val) {
        this.params.keyWords = val
        this.params.isAdvancedQuery = 0
        this.params.ageRange = ''
        this.params.cHrZpqd = ''
        this.params.zjLx = ''
        this.params.workmon = ''
        this.params.zgxl = ''
        this.params.descr = ''
        this.searchEmploy()
      },
      clearHty() {
        removeRecordHistory().then(res => {
          if (res.status === 0) {
            this.historyList = []
            Toast('清除成功')
          } else {
            Toast('清除失败')
          }
        })
      },
      searchEmploy () {
        let xmReg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")

        if (this.params.keyWords.trim() === '') {
          Toast('请输入工号或姓名或手机号')
        } else if (xmReg.test(this.params.keyWords)) {
          Toast('请输入正确的工号或姓名或手机号')
        } else {
          this.pageNo = 1
          this.tableData = []
          // this.setEmploySearchParams({
          //   'keyWords': this.params.keyWords,
          //   'searchList': []
          // })
          this.getEmployData()
        }
      },

      goDetail (item) {
        let path = "/employ/detailsNew";
        let query = {
          emplid: encodeURIComponent(item.aesEmplid),
        };
        this.$router.push({
          path: path,
          query: query,
        });
      },
      // 分页
      loadMore () {
        if (this.pageLoading) {
          return
        }
        if (this.hasMore) {
          this.pageNo = Number(this.pageNo) + 1
          this.getEmployData()
        }
      },
      // 明细数据
      getEmployData () {
        let that = this

        that.pageLoading = true

        Object.assign(that.params, {
          limit: that.limit,
          pageNo: that.pageNo
        })

        newSelectPersonBIList(that.params).then(res => {
          if (res.status === 0) {
            if (res.data && res.data.resultData && res.data.resultData.length) {
              if (Number(that.pageNo) === 1) {
                that.tableData = res.data.resultData
              } else {
                that.tableData = that.tableData.concat(res.data.resultData)
              }

              // this.setEmploySearchParams({
              //   'searchList': res.data.resultData
              // })

              that.total = res.data.total
              that.hasMore = that.pageNo * that.limit < res.data.total

              that.$nextTick(() => {
                if (that.scrollType && that.tableHeadFixed) {
                  // window.scrollTo(0, utils.getElementToPageTop(document.getElementById('tableHead')) - that.topFixed)
                }
                that.scrollType = false
              })

              that.pageLoading = false
              that.isPaging = true

              Session.setJson("historySerch", that.params);
              Session.setJson("searchList", that.tableData);
              Session.setJson("hasMore", that.hasMore);
              Session.setJson("pageNo", that.pageNo);
              Session.setJson("total", that.total);
            } else {
              that.tableData = []
              that.hasMore = false
              that.pageLoading = false
              Toast(res.message)
            }

            this.getRecordHistory()
          } else {
            that.tableData = []
            that.hasMore = false
            that.pageLoading = false
            Toast(res.message)
          }
        })
      }
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll)
      window.removeEventListener('scroll', this.resetScroll)
    },
    beforeRouteEnter (to, from, next) {
      if (from.path === '/employ/detailsNew' || from.path === '/403') {
        // to.params.beforeRouteState = 'true'
      } else {
        Session.setJson('historySerch', null);
        Session.setJson('searchList', []);
      }
      next()
    },

    beforeRouteLeave (to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      next()
    }
  }
</script>

<style scoped lang="scss">
    #Employ {
        // min-height: 100vh;
        // overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        // height:100%;
        padding-bottom: 20px;

        .yto-panel {
            background: none;
        }

        .yto-page {
            height: 100%;

            .tableFixed {
                position: fixed;
            }

            .yto-panel {
                margin-top: 12px;
            }
        }

        .employ-search {
          img {
            width: 100%;
            position: relative;
            z-index: 10;
          }
        }
        .employ-search-box {
          margin: -19.2% 15px 0 15px;
          padding: 10px 0 0 0;
          background:rgba(255,255,255,1);
          box-shadow:0px 5px 10px 0px rgba(0,0,0,0.05);
          border-radius:5px;
          position: relative;
          z-index: 11;
        }
        .employ-search-input{
          padding: 14px 30px 4px 30px;
          position: relative;
          input {
            -webkit-appearance: none;
            // background-color: #fff;
            background-image: none;
            border-radius: 4px;
            border: 1px solid #fff;
            box-sizing: border-box;
            color: #606266;
            display: inline-block;
            font-size: 14px;
            height: 34px;
            line-height: 34px;
            outline: none;
            padding: 0 1px;
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            width: 100%;
            &::-webkit-input-placeholder {
              color: #666;
            }
          }
          &:after{
            position: absolute;
            bottom: 0;
            left: 0;
            content: '';
            height:1px;
            left: 30px;
            right: 30px;
            box-shadow:0px 1px 0px 0px rgba(233,233,233,0.74);
          }
          .closeImg{
            position: absolute;
            top: 20px;
            right: 32px;
            transform: scale(0.9);
          }
        }
        .employ-search-button{
          padding: 14px 28px 30px 28px;
          button {
            width: 100%;
            height:48px;
            background:rgba(36,130,252,1);
            border-radius:2px;
            font-size:16px;
            font-weight:400;
            color:rgba(255,255,255,1);
            letter-spacing: 2px;
          }
        }
        .employ-list {
            padding: 0 15px;
            ul {
                li {
                    min-height:84px;
                    background:rgba(255,255,255,1);
                    box-shadow:0px 5px 10px 0px rgba(0,0,0,0.05);
                    border-radius:5px;
                    overflow: hidden;
                    position: relative;
                    margin-bottom: 10px;
                    h6 {
                        min-height:24px;
                        font-size:17px;
                        line-height:24px;
                        padding: 0 15px;
                        margin: 10px 0 0 0;
                        font-weight:400;
                        strong {
                            font-size:14px;
                            margin-left: 10px;
                            font-weight:400;
                        }
                    }
                    p {
                        min-height:20px;
                        font-size:14px;
                        font-weight:400;
                        line-height:24px;
                        padding: 0 15px;
                        margin: 8px 0 10px 0;
                        span {
                            margin-right: 21px;
                        }
                    }
                    .arr-icon {
                        position: absolute;
                        right: 0;
                        top: 0;
                        width:31px;
                        height:30px;
                        background:rgba(36,130,252,1);
                        text-align: right;
                        border-radius:0 5px 0 0;
                        overflow: hidden;
                        &:after{
                            content: '';
                            position: absolute;
                            right: 8px;
                            top: 8px;
                            width:50px;
                            height:50px;
                            background:rgba(255,255,255,1);
                            transform: rotate(45deg)
                        }
                        span {
                            display: inline-block;
                            font-size:12px;
                            font-weight:500;
                            color:rgba(255,255,255,1);
                            line-height:16px;
                            padding-right: 3px;
                            transform: scale(0.9)
                        }
                    }
                }
            }
        }

        .employ-list-foot {
          p {
            text-align: center;
            padding: 30px;
            color: #999;
          }
        }

        .employ-list-history {
          p {
            &.tp {
              text-align: left;
              padding: 10px 30px;
              color: #999;
            }
            &.tl {
              text-align: left;
              padding: 10px 5px 10px 26px;
              color: #878787;
              overflow: hidden;
              span {
                display: inline-block;
                padding: 4px 12px;
                margin: 0 4px 8px 0;
                font-size: 12px;
                color: #878787;
                line-height: 18px;
                border: 1px solid #ddd;
                border-radius: 14px;
                transform: scale(0.94);
              }
            }
            &.te {
              text-align: center;
              padding: 10px 30px;
              color: #999;
            }
            &.tb {
              text-align: center;
              padding: 10px 30px;
              color: #999;
              a {
                color: #2482FC;
              }
            }
          }
        }

        .cl2482FC {
          color: #2482FC;
        }

        .cl3 {
          color: #333;
        }

        .cl6 {
          color: #666;
        }

        .cl9 {
          color: #999;
        }
    }
</style>
