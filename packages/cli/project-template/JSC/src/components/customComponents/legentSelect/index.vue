<template>
  <div class="chart-panel">
    <div id="chartMemu" class="chart-memu">
      <ul>
        <li
          :class="{ active: active === item.value }"
          v-for="(item, index) in tabContent"
          :key="index"
          @click="selectHandle(item)"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "legendSelect",
  props: {
    tabContent: {
      type: Array,
      default: () => [],
    },
    active: {
      type: [String, Date, Number, Object],
      default: "",
    },
  },
  methods: {
    selectHandle(item) {
      this.$emit("selectHandle", item);
    },
  },
};
</script>

<style scoped lang="scss">
.chart-panel {
  height: 52px;
  line-height: 52px;
}
.chart-memu {
  padding-bottom: 20px;
  box-sizing: border-box;
}
</style>
