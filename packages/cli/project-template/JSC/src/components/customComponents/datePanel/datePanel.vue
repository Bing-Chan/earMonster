<template>
  <div class="yto-date-panel" :style="{ height: height + 'px' }">
    <!--<div class="fixed" :class="{'fixed-none': hasHeaderTab}" :style="{height: height + 'px',top: top + 'px'}">-->
    <div
      :class="{ 'fixed-none': hasHeaderTab }"
      :style="{ height: height + 'px', top: top + 'px' }"
    >
      <!--增加实时按钮-->
      <p
        v-if="activeType === 'hour'"
        class="default-date hour-time"
        @click="$emit('select')"
      >
        {{ updateDateFilter(currentDate) }}
      </p>
      <!--实时与自定义之外-->
      <p
        v-if="activeType !== 'custom' && activeType !== 'hour'"
        class="default-date"
        @click="$emit('select')"
      >
        {{ currentDate | dateFormat(activeType) }}
      </p>
      <p
        v-if="activeType === 'custom' && !customDateType"
        class="custom-date"
        @click="$emit('select')"
      >
        <span class="start">{{ customStartDay | dateFormat('date') }}</span>
        <span class="gap">-</span>
        <span class="end">{{ customEndDay | dateFormat('date') }}</span>
      </p>
      <p
        v-if="activeType === 'custom' && customDateType === 'customMonth'"
        class="custom-date"
        @click="$emit('select')"
      >
        <span class="start">{{ customStartDay | dateFormat("month") }}</span>
        <span class="gap">-</span>
        <span class="end">{{ customEndDay | dateFormat("month") }}</span>
      </p>
      <div class="date-type" v-show="buttons.length > 1">
        <div class="buttons">
          <yto-button
            v-for="(item, i) in buttons"
            :key="i"
            size="small"
            :type="activeType === item ? 'primary' : 'default'"
            :class="'col-' + buttons.length"
            @click="changeType(item)"
            >{{ textMap[item] }}
          </yto-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import dayjs from "dayjs";
import { Session } from "@/utils/storge";
let DMYTReg = new RegExp(/^(\d{4}-\d{2}-\d{2})\s*(\d{2}:\d{2}):\d{2}$/); // 时间格式；2020-06-03 14:10:00
let DMYReg = new RegExp(/^\d{4}-(\d{2}-\d{2})$/); // 时间格式；2020-06-03
export default {
  props: {
    top: {
      type: Number,
      default: 40,
    },
    height: {
      type: Number,
      default: 80,
    },
    buttons: {
      type: Array,
      default: () => ['date', "month", "year", "custom"],
    },
    customDateType: {
      type: String,
      default: "",
    },
    hasHeaderTab: {
      type: Boolean,
      default: false,
    },
    tableType: {
      type: String,
      default: "",
    },
    switchBtnTime: {
      // 切换时间控件按钮是否切换时间
      type: Boolean,
      default: true,
    },
    orgCode: {
      //有的表需要，有的表不需要，按需要传这个参数
      type: String,
      default: "",
    },
    pageType: {
      type: String,
      default: "",
    },
    customstartDate: {
      type: String,
      default: "",
    },
    queryFlag: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      textMap: {
        date: "日",
        month: "月",
        year: "年",
        custom: "自定义",
        hour: "实时",
      },
      selectedDate: new Date(Date.now() - 1000 * 3600 * 24),
      startDate: null,
      endDate: null,
    };
  },
  computed: mapState("common", [
    "currentDate",
    "customStartDay",
    "customEndDay",
    "activeType",
    "timeFlag",
  ]),
  created() {
    if (!this.activeType) {
      this.getTime(this.buttons[0]);
    }
    // else {
    //     this.switchType(this.buttons[0])
    //   }
  },
  methods: {
    ...mapMutations("common", [
      "switchType",
      "setCurrentDate",
      "setActiveType",
      "setIsNullData",
      "setCustomStartDay",
      "setCustomEndDay",
      "setSwitchBtnType",
    ]),
    getTime(sumType) {
      this.flag = false;
      let sum;
      switch (sumType) {
        case 'date':
          sum = "D";
          break;
        case "month":
          sum = "M";
          break;
        case "year":
          sum = "Y";
          break;
        case "custom":
          sum = "D";
          break;
      }
      this.setActiveType(sumType);
      if (this.currentDate) {
        let userInfo = Session.getJson("user");
        this.setIsNullData(false);
        // if (sumType === "custom") {
        //   if (this.pageType == "orderTrack") {
        //     this.setCustomStartDay(
        //       new Date(+new Date(userInfo.systemTime) - 2000 * 3600 * 24)
        //     );
        //     this.setCustomEndDay(this.selectedDate);
        //   } else {
        //     this.setCustomStartDay(
        //       new Date(+new Date(userInfo.systemTime) - 14000 * 3600 * 24)
        //     );
        //     this.setCustomEndDay(new Date(userInfo.systemTime));
        //   }
        // } else {}
        let day
        if (sumType == 'date') {
          day = new Date(dayjs(userInfo.systemTime).subtract(1, 'day'));
        } else if (sumType == 'month') {
          // 中心人员流动页面，切换到月份标签的时候，月份设置为当月
          if (this.pageType == 'LossKeepBase') {
            day = dayjs().date() == 1 ? new Date(dayjs(userInfo.systemTime).subtract(1, 'month')): new Date(dayjs(userInfo.systemTime));
          } else {
            day = new Date(dayjs(userInfo.systemTime).subtract(1, 'month'));
          }
        } else if (sumType == 'year') {
          // 中心人员流动页面，切换到年份标签的时候，月份设置为当年12月
          if (this.pageType == 'LossKeepBase') {
            day = new Date(dayjs(userInfo.systemTime).month(11));
          } else {
            day = new Date(dayjs(userInfo.systemTime));
          }
        }
        this.setCurrentDate(day);
        this.$emit("timeupdate");
      }
    },
    changeType(type) {
      if (type === this.activeType) return;
      this.getTime(type);
      // if (this.switchBtnTime && this.tableType) {
      // } else if (!this.switchBtnTime) {
      //   this.setSwitchBtnType(type);
      // } else {
      //   this.switchType(type);
      // }
      this.$emit("switchDateBtn", type);
    },
    updateTime() {
      this.getTime(this.activeType);
    },
    // 获取实时数据显示
    updateDateFilter(time) {
      // DMYTReg 时间格式；2020-06-03 14:10:00
      // DMYReg 时间格式；2020-06-03
      // updateDate展示格式化
      let timeStr = time.toString();
      if (timeStr.trim().match(DMYTReg)) {
        // 包含空格的时间返回即 2020-06-03 14:10:00
        return timeStr.trim().match(DMYTReg)[2]; // 获取时分
      } else if (timeStr.trim().match(DMYReg)) {
        return timeStr.trim().match(DMYReg)[1]; // 获取月年
      }
    },
  },
  watch: {
    // tableType(val) {
    //   this.getTime(this.activeType);
    // },
  },
};
</script>
<style lang="scss" scoped>
.yto-date-panel {
  background-color: rgba(255, 255, 255, 0);
  height: 80px;

  .fixed {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    height: 80px;
    z-index: 999;
    background: #f5f5f5;
  }

  .fixed-none {
    /*top: 40px !important;*/
    top: 40px;
  }

  p {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    /*color: #999999;*/
    color: #0066cc !important;
    padding-right: 15px;
    text-align: right;
  }

  .gap {
    margin: 0 5px;
  }

  .hour-time {
    color: #999999 !important;
  }
}
</style>
