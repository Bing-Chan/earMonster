<template>
  <mt-popup v-model="visible" :closeOnClickModal="closeOnClickModal" position="bottom" class="date-picker"  @touchmove.native.stop.prevent>
    <mt-picker
      :slots="dateSlots"
      @change="onChange"
      :visible-item-count="visibleItemCount"
      class="mint-datetime-picker"
      ref="picker"
      show-toolbar
      rotate-effect>
      <div class="buttons">
        <span class="picker-cancel" @click="close">{{cancelText}}</span>
        <span class="picker-confirm" @click="confirm">{{confirmText}}</span>
        <span v-show="customDateError" class="custom-error">开始日期必选小于结束日期</span>
        <span v-show="customDateError2" class="custom-error">最多可选择12个月</span>
      </div>
      <p v-if="dateType !== 'custom'" class="normal">{{currentValue | dateFormat(dateType)}}</p>
      <p v-if="dateType === 'custom' && !customDateType" class="custom">
        <span
          :class="['start',{'active': customActive === 'start', 'error': customDateError === 'start'}]"
          @click="customActive = 'start'">{{selectStart | dateFormat('date')}}</span>
        <span class="gap">至</span>
        <span
          :class="['end',{'active': customActive === 'end', 'error': customDateError === 'end'}]"
          @click="customActive = 'end'">{{selectEnd | dateFormat('date')}}</span>
      </p>
      <p v-if="dateType === 'custom' && customDateType==='customMonth'" class="custom">
        <span
                :class="['start',{'active': customActive === 'start', 'error': customDateError === 'start'}]"
                @click="customActive = 'start'">{{selectStart | dateFormat('month')}}</span>
        <span class="gap">至</span>
        <span
                :class="['end',{'active': customActive === 'end', 'error': customDateError === 'end'}]"
                @click="customActive = 'end'">{{selectEnd | dateFormat('month')}}</span>
      </p>
    </mt-picker>
  </mt-popup>
</template>
<script>
import { Popup, Picker} from 'mint-ui'
  const FORMAT_MAP = {
    Y: 'year',
    M: 'month',
    D: 'date'
  };
  export default {
    name: 'mt-datetime-picker',
    props: {
      cancelText: {
        type: String,
        default: '取消'
      },
      confirmText: {
        type: String,
        default: '完成'
      },
      dateType: {
        type: String,
        default: 'date'
      },
      startDate: {
        type: Date,
        default() {
          return new Date(new Date().getFullYear() - 10, 0, 1);
        }
      },
      endDate: {
        type: Date,
        default() {
          return new Date(Date.now() - 1000*3600*24)
        }
      },
      yearFormat: {
        type: String,
        default: '{value}'
      },
      monthFormat: {
        type: String,
        default: '{value}'
      },
      dateFormat: {
        type: String,
        default: '{value}'
      },
      visibleItemCount: {
        type: Number,
        default: 7
      },
      customDateType: {
        type: String,
        default: ''
      },
      closeOnClickModal: {
        type: Boolean,
        default: true
      },
      value: null,
    },
    data() {
      return {
        visible: false,
        startYear: null,
        endYear: null,
        startMonth: 1,
        endMonth: 12,
        startDay: 1,
        endDay: 31,
        currentValue: null,
        selfTriggered: false,
        dateSlots: [],
        shortMonthDates: [],
        longMonthDates: [],
        febDates: [],
        selectedValue: '',
        selectStart: null,
        selectEnd: null,
        customActive: 'start',
        customDateError: '',
        customDateError2:false,
      };
    },
    methods: {
      open() {
        this.visible = true;
      },
       close() {
        this.visible = false;
      },
      isLeapYear(year) {
        return (year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0);
      },
      isShortMonth(month) {
        return [4, 6, 9, 11].indexOf(month) > -1;
      },
      getMonthEndDay(year, month) {
        if (this.isShortMonth(month)) {
          return 30;
        } else if (month === 2) {
          return this.isLeapYear(year) ? 29 : 28;
        } else {
          return 31;
        }
      },
      getTrueValue(formattedValue) {
        if (!formattedValue) return;
        while (isNaN(parseInt(formattedValue, 10))) {
          formattedValue = formattedValue.slice(1);
        }
        return parseInt(formattedValue, 10);
      },
      getValue(values) {
        let year = this.getTrueValue(values[0])
        let month = this.getTrueValue(values[1]) || 1
        let date = this.getTrueValue(values[2]) || 1
        return new Date(year, month - 1, date)
      },
      onChange(picker) {
        let values = picker.$children.filter(child => child.currentValue !== undefined).map(child => child.currentValue);
        if (this.selfTriggered) {
          this.selfTriggered = false;
          return;
        }
        this.customDateError = ''
        this.customDateError2 = false
        if (values.length !== 0) {
          this.currentValue = this.getValue(values)
          if (this.dateType === 'custom' && this.customActive === 'start') {
            this.selectStart = this.currentValue
          }
          if (this.dateType === 'custom' && this.customActive === 'end') {
            this.selectEnd = this.currentValue
          }
        }
      },
      fillValues(type, start, end) {
        let values = [];
        for (let i = start; i <= end; i++) {
          if (i < 10) {
            values.push(this[`${FORMAT_MAP[type]}Format`].replace('{value}', ('0' + i).slice(-2)));
          } else {
            values.push(this[`${FORMAT_MAP[type]}Format`].replace('{value}', i));
          }
        }
        return values;
      },
      pushSlots(slots, type, start, end) {
        slots.push({
          flex: 1,
          values: this.fillValues(type, start, end)
        })
      },
      generateSlots() {
        let dateSlots = []
        const INTERVAL_MAP = {
          Y: this.rims.year,
          M: this.rims.month,
          D: this.rims.date
        };
        let typesArr = (this.type === 'month' ? 'YM' : (this.type === 'year' ? 'Y' : 'YMD')).split('')
        typesArr.forEach(type => {
          if (INTERVAL_MAP[type]) {
            this.pushSlots.apply(null, [dateSlots, type].concat(INTERVAL_MAP[type]));
          }
        });
        this.dateSlots = dateSlots
        this.handleExceededValue()
      },
      handleExceededValue() {
          let values = [
              this.yearFormat.replace('{value}', this.getYear(this.currentValue)),
              this.monthFormat.replace('{value}', ('0' + this.getMonth(this.currentValue)).slice(-2)),
              this.dateFormat.replace('{value}', ('0' + this.getDate(this.currentValue)).slice(-2))
          ];
          if (this.type === 'month') {
              values.splice(-1)
          }
          if (this.type === 'year') {
              values.splice(-2)
          }
          this.dateSlots.filter(child => child.values !== undefined)
          .map(slot => slot.values).forEach((slotValues, index) => {
              if (slotValues.indexOf(values[index]) === -1) {
                  values[index] = slotValues[0]
              }
          })
          this.$nextTick(() => {
              this.setSlotsByValues(values)
          })
      },
      setSlotsByValues(values) {
          this.$refs.picker.setValues(values);
          //[].forEach.call(this.$refs.picker.$children, child => child.doOnValueChange());
      },
      rimDetect(result, rim) {
          let position = rim === 'start' ? 0 : 1;
          let rimDate = rim === 'start' ? this.startDate : this.endDate;
          if (this.getYear(this.currentValue) === rimDate.getFullYear()) {
            result.month[position] = rimDate.getMonth() + 1;
            if (this.getMonth(this.currentValue) === rimDate.getMonth() + 1) {
              result.date[position] = rimDate.getDate()
            }
          }
        },
        isDateString(str) {
          return /\d{4}(\-|\/|.)\d{1,2}\1\d{1,2}/.test(str);
        },
        getYear(value) {
          return this.isDateString(value) ? value.split(' ')[0].split(/-|\/|\./)[0] : value.getFullYear();
        },
        getMonth(value) {
          return this.isDateString(value) ? value.split(' ')[0].split(/-|\/|\./)[1] : value.getMonth() + 1;
        },
        getDate(value) {
          return this.isDateString(value) ? value.split(' ')[0].split(/-|\/|\./)[2] : value.getDate();
        },
        confirm() {
          // 校验自定义时间范围
          if (this.dateType === 'custom') {
            let dateStart = new Date( this.selectStart);
            let dateEnd = new Date(this.selectEnd);
            let difValue = (dateEnd - dateStart) / (1000 * 60 * 60 * 24*30);
            if (this.selectStart > this.selectEnd) {
              this.customDateError = this.customActive
              return
            }
            if (difValue > 13) {
            this.customDateError2 = true;
            return
            }
          }
          let data = this.dateType === 'custom' ? [this.selectStart, this.selectEnd] : this.currentValue
          this.visible = false
          this.$emit('confirm', data)
        }
    },
    computed: {
        rims() {
            if (!this.currentValue) return { year: [], month: [], date: [] }
            let result = {
                year: [this.startDate.getFullYear(), this.endDate.getFullYear()],
                month: [1, 12],
                date: [1, this.getMonthEndDay(this.getYear(this.currentValue), this.getMonth(this.currentValue))]
            }
            this.rimDetect(result, 'start')
            this.rimDetect(result, 'end')
            return result
        },
        type () {

          if(this.dateType === 'custom' && !this.customDateType){
            return (!this.dateType || this.dateType === 'custom') ? 'date' : this.dateType
          }
          if(this.customDateType==='customMonth'){
            return 'month'
          }

        },
        typeStr() {
            let typeMap = {
                'date': 'YMD',
                'month': 'YM',
                'year': 'Y'
            }
            return typeMap[this.type]
        }
    },
    watch: {
      value(val) {
        this.currentValue = val;
      },
      customActive (val) {
        this.currentValue = val === 'start' ? this.selectStart : this.selectEnd
      },
      rims() {
        this.generateSlots();
      },
      visible(val) {
        this.$emit('visible-change', val);
      },
      dateType (val) {
          this.generateSlots()
          if (val === 'custom') {
            this.currentValue = this.customActive === 'start' ? this.selectStart : this.selectEnd
          }
      }
    },
    created () {
      this.selectStart = new Date(Date.now() - 15000*3600*24)
      this.selectEnd = new Date(Date.now() - 1000*3600*24)
    },
    mounted() {
      this.currentValue = this.value
      if (!this.value) {
        this.currentValue = this.endDate
      }


    },
    components: {
      'mt-popup': Popup,
      'mt-picker': Picker
    }
  }
</script>
<style lang="scss">
$theme-color: #2482FC;
$error-color: #F35252;
.date-picker {
  width: 100%;
  /deep/.picker-toolbar {
    height: auto;
    .buttons {
      position: relative;
      padding: 0 15px;
      height: 40px;
      line-height: 40px;
      text-align: right;
      font-size: 16px;
      .picker-cancel {
        float: left;
        color: #999999;
      }
      .picker-confirm {
        color: $theme-color;
      }
      .custom-error {
          font-size: 12px;
          color: $error-color;
          position: absolute;
          top: 0;
          left: 80px;
          right: 0;
          bottom: 0;
          margin: auto;
          text-align: center;
          padding-right: 80px;
          box-sizing: border-box;
        }
    }
    p {
      height: 30px;
      line-height: 30px;
      text-align: center;
      margin: 0 25px 10px;
    }
    .normal {
      border-bottom: 1px solid $theme-color;
      color: $theme-color;
    }
    .custom {
      display: flex;
      .start, .end {
        position: relative;
        flex: 1;
        border-bottom: 1px solid #D2D2D2;
      }
      .gap {
        display: inline-block;
        margin: 0 10px;
      }
      .active {
        border-color: $theme-color;
        color: $theme-color;
      }
      .error {
        border-color: $error-color;
        color: $error-color;
      }
    }
  }
  /deep/.picker-slot{
    font-size: 15px;
  }
}
</style>
<style lang="scss">
  .picker-item.picker-selected{
    color: #2482FC!important;
  }
</style>
