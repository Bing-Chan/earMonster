<template>
  <div>Hello World</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { SecurityUtils } from '@yto-security/vue3-sdk'
export default defineComponent({
  name: 'P404',
  props: {},
  mounted() {
    SecurityUtils.userInfo;
  },
});
</script>

<style scoped></style>
