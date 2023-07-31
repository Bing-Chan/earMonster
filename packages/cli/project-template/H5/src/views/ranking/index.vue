<template>
  <div class="yzs_page">
    <div class="date_head">
      <span class="date-show" @click="handleSelectDate"
        >{{ defaultTime }}
        <van-icon style="margin-left: 5px" name="arrow-down" />
      </span>
    </div>
    <div class="tabs">
      <van-tabs @change="handleChange" v-model:active="active" type="card">
        <van-tab v-for="(item, index) in tabs" :title="item" :name="item" :key="index">
          <div class="tabs-body">
            <van-cell-group>
              <van-cell>
                <template #title>
                  <span class="title">{{ defaultTime }}{{ item }}排行榜</span>
                </template>
              </van-cell>
              <div class="tabs-body-title">
                <span v-if="info.ranking == 0">暂无数据</span>
                <h3 v-show="info.ranking > 0">第{{ info.ranking }}名</h3>
                <span v-show="info.ranking > 0">{{ info.ranking == 1 ? '你太棒了，继续保持！' : '加油，挑战更高绩效！' }}</span>
              </div>
              <!-- <div class="tabs-body-content table-box">
                <div class="list-custom" id="tableHead" ref="tableHead">
                  <ul class="list-head">
                    <li>排名</li>
                    <li>姓名</li>
                    <li>日均效率</li>
                    <li>日均单价</li>
                    <li>操作量</li>
                    <li>绩效</li>
                  </ul>
                  <div class="infiniteScroll" infinite-scroll-distance="10">
                    <ul class="list-body" v-for="(item, index) in tableList" :key="index">
                      <li
                        ><span>{{ item.ranking }}</span></li
                      >
                      <li
                        ><span>{{ item.empName }}</span></li
                      >
                      <li class="w200 right"
                        ><span>{{ item.efficiencyValue }}</span></li
                      >
                      <li class="w200 right"
                        ><span>{{ item.priceValue }}</span></li
                      >
                      <li class="right"
                        ><span>{{ item.operateQuantity }}</span></li
                      >
                      <li class="right"
                        ><span>{{ item.performanceScore }}</span></li
                      >
                    </ul>
                    <ul v-show="loading" style="width: 100%; text-align: center">
                      <van-loading type="spinner" color="#2482FC" />
                    </ul>
                    <ul v-show="tableList.length === 0" class="list-foot">
                      <li>暂无数据</li>
                    </ul>
                  </div>
                </div>
              </div> -->

              <div class="tabs-body-content table-box">
                <van-row class="th-rows">
                  <van-col :span="3">排名</van-col>
                  <van-col :span="4">姓名</van-col>
                  <van-col :span="5">日均效率</van-col>
                  <van-col :span="4">日均单价</van-col>
                  <van-col :span="4">操作量</van-col>
                  <van-col :span="4">绩效</van-col>
                </van-row>
                <van-row v-for="(item, index) in tableList" :key="index" :class="item.empNo === info.empNo ? 'tb-rows active' : 'tb-rows'">
                  <van-col :span="3">
                    <span v-if="item.ranking > 3">{{ item.ranking }}</span>
                    <span v-else>
                      <img width="20" height="20" :src="`/img/top${item.ranking}.png`" />
                    </span>
                  </van-col>
                  <van-col :span="4"
                    ><span>{{ item.empName }}</span></van-col
                  >
                  <van-col :span="5" class="right"
                    ><span>{{ item.efficiencyValue }}</span></van-col
                  >
                  <van-col :span="4" class="right"
                    ><span>{{ item.priceValue }}</span></van-col
                  >
                  <van-col :span="4" class="right"
                    ><span>{{ item.operateQuantity }}</span></van-col
                  >
                  <van-col :span="4" class="right"
                    ><span>{{ item.performanceScore }}</span></van-col
                  >
                </van-row>
                <van-row class="tb-rows" style="color: #666666" v-if="!loading && tableList.length == 0">
                  <van-col :span="24">暂无数据</van-col>
                </van-row>
                <van-row class="tb-rows" v-if="loading">
                  <van-col :span="24">
                    <van-loading type="spinner" color="#2482FC" />
                  </van-col>
                </van-row>
              </div>
            </van-cell-group>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <van-calendar :min-date="minDate" :max-date="getMaxDate" v-model:show="show" @confirm="handleCompleteDate" :show-confirm="false" />
  </div>
</template>
<script lang="ts">
  import { reactive, toRefs, defineComponent, onMounted } from 'vue';
  import dayjs from 'dayjs';
  import { getRankList, positionlable } from '/@/api/rank/index';
  import { useDefaultTime } from '/@/hooks/useDefaultTime';

  export default defineComponent({
    name: 'Ranking',
    setup() {
      const state = reactive({
        show: false,
        loading: false,
        active: 0,
        selectDate: '',
        minDate: new Date(2023, 1, 1),
        currDate: '',
        tableList: [],
        tabs: ['工序岗位'],
        info: {
          empNo: '00258478',
          ranking: 0,
        },
      });

      const defaultTime = ref('');

      const handleSelectDate = () => {
        state.show = true;
      };

      const getMaxDate = computed(() => {
        const v = dayjs(state.currDate.replace('年', '-').replace('月', '-').replace('日', ''));
        console.log(v, '2');
        return new Date(v.year(), v.month(), v.day());
      });

      const handleCompleteDate = (val) => {
        defaultTime.value = dayjs(val).format('YYYY年MM月DD日');
        state.show = false;
        setTimeout(() => {
          init();
        }, 500);
      };

      const init = async () => {
        if (!defaultTime.value) {
          return false;
        }
        const date = defaultTime.value.replace('年', '-').replace('月', '-').replace('日', '');
        state.tableList = [];
        state.info.ranking = 0;
        state.tabs = ['工序岗位'];
        state.active = '工序岗位';

        const res1 = await positionlable({ selectDate: date });
        if (res1.status == 0 && res1.data.length > 0) {
          state.tabs = res1.data;
          state.tabs.push('装车');
          state.active = state.tabs[0];
        } else {
          return false;
        }
        state.loading = true;
        const res = await getRankList({ selectDate: date, positionLable: state.active });
        state.loading = false;
        if (res.status == 0) {
          if (res.data && res.data.length) {
            state.info = res.data.find((x) => x.empNo == state.info.empNo);
            state.tableList = [...res.data, ...res.data, ...res.data, ...res.data, ...res.data];
            state.tableList = state.tableList.map((x, index) => {
              return {
                ...x,
                ...{
                  ranking: index + 1,
                },
              };
            });
          }
        } else {
        }
      };

      const getList = async () => {
        if (!defaultTime.value) {
          return false;
        }
        const date = defaultTime.value.replace('年', '-').replace('月', '-').replace('日', '');
        state.tableList = [];
        state.info.ranking = 0;
        state.loading = true;
        const res = await getRankList({ selectDate: date, positionLable: state.active });
        state.loading = false;
        if (res.status == 0) {
          if (res.data && res.data.length) {
            state.info = res.data.find((x) => x.empNo == state.info.empNo);
            state.tableList = [...res.data, ...res.data, ...res.data, ...res.data, ...res.data];
            state.tableList = state.tableList.map((x, index) => {
              return {
                ...x,
                ...{
                  ranking: index + 1,
                },
              };
            });
          }
        } else {
        }
      };

      const handleChange = () => {
        getList();
      };

      useDefaultTime(async (val) => {
        // state.minDate = dayjs().add(-1, 'year');
        defaultTime.value = val;
        state.currDate = val;
        init();
      });

      return {
        ...toRefs(state),
        defaultTime,
        handleChange,
        handleCompleteDate,
        getMaxDate,
        handleSelectDate,
      };
    },
  });
</script>

<style lang="scss">
  .title {
    border-left: solid 5px #2482fc;
    padding: 0px 15px;
    color: #333;
    font-size: 14pt;
  }

  .van-tab--card {
    border-color: #2482fc;
    color: #2482fc;
  }

  .van-tab--card.van-tab--active {
    background: #2482fc;
  }
</style>
