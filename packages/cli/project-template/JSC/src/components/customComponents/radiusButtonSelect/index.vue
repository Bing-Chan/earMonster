<template>
  <div class="chart-panel">
    <div id="chartMemu" class="chart-memu">
      <ul>
        <li
          :class="{ active: active === item[value] }"
          v-for="(item, index) in list"
          :key="index"
          @click="buttonClick(item, index)"
        >
          {{ item[label] }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "legendSelect",
  props: {
    value: {
      type: String,
      default: "value",
    },
    label: {
      type: String,
      default: "label",
    },
    list: {
      type: Array,
      default: () => [],
    },
    active: {
      type: [String, Date, Number, Object],
      default: null,
    },
  },
  methods: {
    buttonClick(item, index) {
      this.$emit("buttonClick", item, index);
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
