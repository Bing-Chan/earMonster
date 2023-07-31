<template>
  <div id="EmployDetails">
    <div class="yto-page" v-wechat-title="title">
      <!--员工画像-->
      <div v-if="!noneData">
        <div class="employ-details-head">
          <h6 class="cl3">
            {{ tableData.name ? tableData.name : "-"
            }}<strong>{{ tableData.emplid ? tableData.emplid : "-" }}</strong>
          </h6>
          <p class="cl6">
            {{ tableData.deptName ? tableData.deptName : "-" }}
            {{ tableData.position ? tableData.position : "-" }}
          </p>
          <p class="cl9">
            <span>
              <img src="../../assets/images/Employ/icon_rank@2x.png" />
              {{ tableData.cZjId ? tableData.cZjId : "-" }}</span
            >
            <span>
              <img src="../../assets/images/Employ/icon_education@2x.png" />
              {{ tableData.zgxl ? tableData.zgxl : "-" }}</span
            >
            <span>
              <img src="../../assets/images/Employ/icon_phone@2x.png" />
              {{ tableData.mobilePhone ? tableData.mobilePhone : "-" }}</span
            >
          </p>
          <div class="head-pic" v-show="noneHead">
            <img
              v-show="tableData.sex == '男'"
              src="../../assets/images/Employ/icon_head_portrait_boy@2x.png"
              alt=""
            />
            <img
              v-show="tableData.sex == '女'"
              src="../../assets/images/Employ/icon_head_portrait_girl@2x.png"
              alt=""
            />
          </div>
          <div class="head-pic" v-show="!noneHead">
            <img :src="headUrl" alt="员工头像" />
          </div>
        </div>
        <div class="yto-panel">
          <p class="yto-panel-head">基本信息</p>
          <div class="employ-details-base">
            <p>
              <span class="cl9">单位名称</span
              ><span class="cl3">{{
                tableData.companyName ? tableData.companyName : "-"
              }}</span>
            </p>
            <p>
              <span class="cl9">部门名称</span
              ><span class="cl3">{{
                tableData.deptName ? tableData.deptName : "-"
              }}</span>
            </p>
            <p>
              <span class="cl9">岗位描述</span
              ><span class="cl3">{{
                tableData.position ? tableData.position : "-"
              }}</span>
            </p>
            <p>
              <span class="cl9">用工性质</span
              ><span class="cl3">{{
                tableData.descr ? tableData.descr : "-"
              }}</span>
            </p>
            <p>
              <span class="cl9">入职日期</span
              ><span class="cl3">{{
                tableData.lastHireDt ? tableData.lastHireDt : "-"
              }}</span>
            </p>
            <p>
              <span class="cl9">出生日期</span
              ><span class="cl3">{{
                tableData.birthdate ? tableData.birthdate : "-"
              }}</span>
            </p>
            <p>
              <span class="cl9">籍贯</span
              ><span class="cl3">{{
                tableData.nativePlace ? tableData.nativePlace : "-"
              }}</span>
            </p>
            <p>
              <span class="cl9">性别</span
              ><span class="cl3">{{
                tableData.sex ? tableData.sex : "-"
              }}</span>
            </p>
            <p>
              <span class="cl9">婚姻状况</span
              ><span class="cl3">{{
                tableData.marStatus ? tableData.marStatus : "-"
              }}</span>
            </p>
            <p>
              <span class="cl9">政治面貌</span
              ><span class="cl3">{{
                tableData.zzmm ? tableData.zzmm : "-"
              }}</span>
            </p>
            <p>
              <span class="cl9">职责概述</span
              ><span class="cl3">{{
                tableData.duty ? tableData.duty : "-"
              }}</span>
            </p>
          </div>
        </div>
        <div class="yto-panel">
          <p class="yto-panel-head">教育背景</p>
          <div class="employ-details-sect">
            <div v-if="hrEduBiList && hrEduBiList.length > 0">
              <div
                class="sect-li"
                v-for="(item, index) in hrEduBiList"
                :key="index + 1001"
              >
                <h6 class="cl3">
                  <span>学校：{{ item.school }}</span>
                  <span
                    >{{ item.startDate }}-{{
                      item.endDate ? item.endDate : "至今"
                    }}</span
                  >
                </h6>
                <p class="cl9">
                  <span v-show="item.major">专业：{{ item.major }}</span>
                  <span v-show="item.eduXueli">学历：{{ item.eduXueli }}</span>
                </p>
              </div>
            </div>
            <div class="employ-none-data" v-else>
              <p>暂无数据</p>
            </div>
          </div>
        </div>
        <div class="yto-panel">
          <legend-select
            @selectHandle="selectHandle"
            :active="activeTab"
            :tabContent="menuTabList"
          ></legend-select>

          <!-- 工作经历 -->
          <div class="employ-details-sect" v-show="activeTab == 'sect1'">
            <div v-if="hrWorkBiList && hrWorkBiList.length > 0">
              <div
                class="sect-li"
                v-for="(item, index) in hrWorkBiList"
                :key="index + 1101"
              >
                <p>
                  <span class="cl3">{{ item.company }}</span>
                  <span class="cl3"
                    >{{ item.startDate }}-{{
                      item.endDate ? item.endDate : "至今"
                    }}</span
                  >
                </p>
                <p class="cl9" v-show="item.dept && item.position">
                  <span>{{ item.dept }}-{{ item.position }}</span>
                </p>
                <p class="cl9" v-show="item.jobIndicator">
                  <span>职务：{{ item.jobIndicator }}</span>
                </p>
                <p class="cl9" v-show="item.cZjId">
                  <span>职级：{{ item.cZjId }}</span>
                </p>
                <p class="cl9" v-show="item.action">
                  <span>操作：{{ item.action }}</span>
                </p>
              </div>
            </div>
            <div class="employ-none-data" v-else>
              <p>暂无数据</p>
            </div>
          </div>
          <!-- 奖励情况 -->
          <div class="employ-details-sect" v-show="activeTab == 'sect2'">
            <div v-if="hrAwaBiList && hrAwaBiList.length > 0">
              <div
                class="sect-li"
                v-for="(item, index) in hrAwaBiList"
                :key="index + 1201"
              >
                <p>
                  <span class="cl3">{{ item.awaType }}</span>
                  <span class="cl3">{{ item.cHrXxName }}</span>
                  <span class="cl3">{{ item.awardDate }}</span>
                </p>
                <p class="cl9" v-show="item.cHrXxUnit">
                  <span>机构：{{ item.cHrXxUnit }}</span>
                </p>
                <p class="cl9" v-show="item.creason">
                  <span>事由：{{ item.creason }}</span>
                </p>
              </div>
            </div>
            <div class="employ-none-data" v-else>
              <p>暂无数据</p>
            </div>
          </div>
          <!-- 培训情况 -->
          <div class="employ-details-sect" v-show="activeTab == 'sect3'">
            <div v-if="hrTrainBiList && hrTrainBiList.length > 0">
              <div
                class="sect-li"
                v-for="(item, index) in hrTrainBiList"
                :key="index + 1301"
              >
                <p>
                  <span class="cl3">{{ item.cHrXxName }}</span>
                  <span class="cl3">{{ item.timedout }}课时</span>
                  <span class="cl3"
                    >{{ item.startDate }}-{{
                      item.endDate ? item.endDate : "至今"
                    }}</span
                  >
                </p>
                <p class="cl9" v-show="item.trainSite">
                  <span>培训类别：{{ item.trainSite }}</span>
                </p>
                <p class="cl9">
                  <span>取得证书：{{ item.name1 ? "是" : "否" }}</span>
                </p>
                <p class="cl9" v-show="item.name1">
                  <span>证书名称：{{ item.name1 }}</span>
                </p>
              </div>
            </div>
            <div class="employ-none-data" v-else>
              <p>暂无数据</p>
            </div>
          </div>
          <!-- 语言能力 -->
          <div class="employ-details-sect" v-show="activeTab == 'sect4'">
            <div v-if="hrLangBiList && hrLangBiList.length > 0">
              <div
                class="sect-li"
                v-for="(item, index) in hrLangBiList"
                :key="index + 1401"
              >
                <p>
                  <span class="cl3">{{ item.language }}</span>
                  <span class="cl3">{{ item.degree }}</span>
                </p>
                <p class="cl9" v-show="item.cHrLangLevel">
                  <span>级别：{{ item.cHrLangLevel }}</span>
                </p>
                <p class="cl9" v-show="item.certificateId">
                  <span>证书编号：{{ item.certificateId }}</span>
                </p>
              </div>
            </div>
            <div class="employ-none-data" v-else>
              <p>暂无数据</p>
            </div>
          </div>
          <!-- 任职资格 -->
          <div class="employ-details-sect" v-show="activeTab == 'sect5'">
            <div v-if="hrRzzgBiList && hrRzzgBiList.length > 0">
              <div
                class="sect-li"
                v-for="(item, index) in hrRzzgBiList"
                :key="index + 1501"
              >
                <p>
                  <span class="cl3">{{ item.zgType }}</span>
                  <span class="cl3">{{ item.nljb }}</span>
                  <span class="cl3">{{ item.cRzzgDt }}</span>
                </p>
                <p class="cl9" v-show="item.cCbzgFlag">
                  <span>通过储备资格选拔：{{ item.cCbzgFlag }}</span>
                </p>
                <p class="cl9" v-show="item.gzzgFlag">
                  <span>通过任职资格认证：{{ item.gzzgFlag }}</span>
                </p>
                <p class="cl9" v-show="item.cZzDt">
                  <span>通过见习转正：{{ item.cZzDt }}</span>
                </p>
              </div>
            </div>
            <div class="employ-none-data" v-else>
              <p>暂无数据</p>
            </div>
          </div>
          <!-- 亲属在本公司任职 -->
          <div class="employ-details-sect" v-show="activeTab == 'sect6'">
            <div v-if="hrKinwkList && hrKinwkList.length > 0">
              <div
                class="sect-li"
                v-for="(item, index) in hrKinwkList"
                :key="index + 1601"
              >
                <p>
                  <span class="cl3">{{ item.kinwkName }}</span>
                  <span class="cl3">{{ item.emplid }}</span>
                  <span class="cl3">{{ item.kinwkRel }}</span>
                </p>
                <p class="cl9" v-show="item.company">
                  <span>单位：{{ item.company }}</span>
                </p>
                <p class="cl9" v-show="item.abc">
                  <span>岗位：{{ item.kinwkPosition }}</span>
                </p>
              </div>
            </div>
            <div class="employ-none-data" v-else>
              <p>暂无数据</p>
            </div>
          </div>
        </div>
      </div>
      <div class="none-data" v-if="noneData">
        <span>您暂无权限查看该员工信息</span>
      </div>
    </div>
    <div class="yto-loading" v-if="loading">
      <van-loading size="32px" color="#1989fa"/>
    </div>
  </div>
</template>

<script>
import { queryEmpInfoNew } from "@/api/index";
import { mapState } from "vuex";
import dayjs from "dayjs";
import utils from "@/utils/utils";
import legendSelect from "@/components/customComponents/legentSelect";

export default {
  name: "EmployDetails",
  components: {
    "legend-select": legendSelect, //滚动选项卡
  },
  data() {
    return {
      id: null,
      title: "档案详情", // 页面标题
      cnData: [],
      cnDataList: [],
      cnDataProv: [],
      currentIndex: 0,
      baseRanking: 0,
      activeTab: "sect1",
      tableData: [],
      hrAwaBiList: [],
      hrEduBiList: [],
      hrLangBiList: [],
      hrRzzgBiList: [],
      hrTrainBiList: [],
      hrWorkBiList: [],
      hrQsBiList: [],
      hrKinwkList: [],
      sortColumn: "",
      sortType: "asc",
      sortName: "score",
      tableHeadFixed: false,
      desc: true,
      descScore: true,
      orgType: "",
      orgName: "",
      orgLevel: "",
      tabsHasData: true, // tabs是否有数据
      beforeRouteState: false,
      noneData: false,
      noneHead: true,
      loading: false,
      headUrl: "",
      menuTabList: [
        {
          value: "sect1",
          label: "工作经历",
        },
        {
          value: "sect2",
          label: "奖励情况",
        },
        {
          value: "sect3",
          label: "培训情况",
        },
        {
          value: "sect4",
          label: "语言能力",
        },
        {
          value: "sect5",
          label: "任职资格",
        },
        {
          value: "sect6",
          label: "亲属在本公司任职",
        },
      ],
    };
  },

  computed: {
    ...mapState("common", []),
  },

  mounted() {
    this.$nextTick(() => {
      window.scrollTo(0, 0);
    });
    this.tableHeadFixed = false;
    // if (this.$route.params.beforeRouteState === "true") {
    //   this.beforeRouteState = true;
    // }
    utils.setPageTitle(this.title);
    this.getEmployDetailsData();
  },

  watch: {},
  methods: {
    selectHandle(item) {
      //处理简历切换
      this.activeTab = item.value;
    },
    // 明细数据
    async getEmployDetailsData() {
      let that = this;
      that.loading = true;
      that.noneData = false;
      let params = {
        // orgDimension: that.orgLevel,
        // lx: that.$route.query.lx,
        emplid: decodeURIComponent(that.$route.query.emplid),
        // queryDate:that.$route.query.queryDate,
        // queryType: utils.toConvertDateType(that.$route.query.queryType),
        // orgDimension: that.$route.query.orgDimension,
      };
      const res = await queryEmpInfoNew(params);
      //debugger
      if (res.data) {
        that.loading = false;
        that.noneData = false;
        that.tableData = res.data;
        that.hrAwaBiList = res.data.hrAwaBiList;
        that.hrEduBiList = res.data.hrEduBiList;
        that.hrLangBiList = res.data.hrLangBiList;
        that.hrRzzgBiList = res.data.hrRzzgBiList;
        that.hrTrainBiList = res.data.hrTrainBiList;
        that.hrWorkBiList = res.data.hrWorkBiList;
        that.hrKinwkList = res.data.hrKinwkList;
        if (res.data.photo && res.data.photo != "") {
          that.headUrl = res.data.photo;
          that.noneHead = false;
        }
        // if (res.data.cFileid) {
        //   that.getImageData(res.data.cFileid)
        // }
        // that.getImageData()
        // that.findPersonBIDetailExpand()
      } else {
        that.loading = false;
        that.noneData = true;
        this.$router.replace("/403");
      }
    },
    // #region  扩展方法
    // findPersonBIDetailExpand() {
    //   let that = this;
    //   let params = {
    //     orgLevel: that.orgLevel,
    //     orgName: that.orgName,
    //     emplid: that.id,
    //   };

    //   findPersonBIDetailExpand(params).then((res) => {
    //     if (res.code === 200 && res.data) {
    //       that.hrAwaBiList = res.data.hrAwaBiList;
    //       that.hrEduBiList = res.data.hrEduBiList;
    //       that.hrLangBiList = res.data.hrLangBiList;
    //       that.hrRzzgBiList = res.data.hrRzzgBiList;
    //       that.hrTrainBiList = res.data.hrTrainBiList;
    //       let hrWorkBiList = res.data.hrWorkBiList;
    //       hrWorkBiList.sort((a, b) => {
    //         return (
    //           new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    //         );
    //       });
    //       that.hrWorkBiList = hrWorkBiList;
    //       that.hrKinwkList = res.data.hrKinwkList;
    //     }
    //   });
    // },

    // getImageData() {
    //   let that = this;

    //   that.noneHead = true;

    //   let params = {
    //     psncode: that.id,
    //     token: utils.getStorage("token"),
    //   };

    //   getImage(params).then((res) => {
    //     if (res.code === 200 && res.data) {
    //       that.noneHead = false;
    //       that.headUrl = res.data;
    //     }
    //   });
    // },
    // #endregion
  },

  destroyed() {
    window.removeEventListener("scroll", this.resetScroll);
  },

  // async beforeRouteEnter(to, from, next) {
  //   const res = await queryEmpInfoNew({
  //     emplid: decodeURIComponent(to.query.emplid) ,
  //   });
  //   if (res.status == 0 && res.data) {
  //     next();
  //   } else {
  //     next({ path: "/403" });
  //   }
  // },

  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    next();
  },
};
</script>

<style scoped lang="scss">
#EmployDetails {
  // min-height: 100vh;
  // overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  // height:100%;
  padding-bottom: 20px;

  .yto-page {
    height: 100%;

    .yto-panel {
      margin-top: 0;
    }
  }

  .yto-loading {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
    justify-content: center;
    -webkit-backdrop-filter: blur(2px);
    backdrop-filter: blur(2px);
  }

  .chart-memu {
    border-bottom: 1px solid #e9e9e9;
  }

  .employ-details-head {
    padding: 20px 15px;
    background-color: #fff;
    position: relative;
    h6 {
      min-height: 24px;
      font-size: 17px;
      line-height: 24px;
      padding: 0;
      margin: 0;
      strong {
        font-size: 14px;
        margin-left: 10px;
      }
    }
    p {
      min-height: 20px;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      margin-top: 10px;
      padding-right: 84px;
      span {
        margin-right: 20px;
        display: inline-block;
        img {
          float: left;
          height: 12px;
          width: 12px;
          margin: 4px 4px 0 0;
        }
        &:last-child {
          margin-right: 0;
          img {
            margin-top: 3px;
          }
        }
      }
    }
    .head-pic {
      width: 68px;
      height: 84px;
      border-radius: 2px;
      position: absolute;
      top: 20px;
      right: 15px;
      background-color: #ccc;
      img {
        height: 100%;
        width: 100%;
        border-radius: 2px;
      }
    }
  }

  .employ-details-base {
    padding: 20px 15px;
    background-color: #fff;
    position: relative;
    p {
      min-height: 20px;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      margin-top: 10px;
      &:first-child {
        margin-top: 0;
      }
      span {
        display: inline-block;
        &:first-child {
          min-width: 86px;
        }
      }
    }
  }

  .employ-details-sect {
    padding: 20px 15px;
    background-color: #fff;
    position: relative;
    .sect-li {
      margin-top: 15px;
      &:first-child {
        margin-top: 0;
      }
      h6 {
        min-height: 20px;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        padding: 0;
        margin: 0;
        span {
          margin-right: 30px;
        }
      }
      p {
        min-height: 20px;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        margin-top: 5px;
        &:first-child {
          margin-top: 0;
        }
        span {
          margin-right: 10px;
        }
      }
    }
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

  .employ-none-data {
    text-align: center;
    padding: 0 15px;
    color: #999;
  }
}
.none-data {
  text-align: center;
  padding: 40px 0;
  color: #999;
  font-size: 16px;
}
</style>
