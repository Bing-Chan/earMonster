<template>
  <div id="JumpPage"></div>
</template>

<script>
export default {
  name: 'JumpPage',
  data() {
    return {}
  },

  mounted() {
    this.$loading.open()
  },

  methods: {},

  beforeRouteEnter(to, from, next) {
    if (from.path === '/company/CompanyBusiness') {
      this.$loading.close()
    }
    next()
  },
}
</script>
