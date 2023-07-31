<template>
  <div id="demo">
    <div class="hello">
      This is a demo!
      <p>businessStateValue值:{{ businessStateValue }}</p>
      <p>dateStateValue值:{{ dateStateValue }}</p>
      <p @click="jumpRegionManage">跳转省区</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';


export default {
  name: 'demo',
  data() {
    return {

    }
  },


  computed: {
    ...mapState({
      businessStateValue: state => state.business.businessStateValue,
      dateStateValue: state => state.common.dateStateValue,
    }),
  },

  mounted() {
    //this.$store.dispatch('login/commitToken','8989')
  },

  methods: {
    jumpRegionManage() {
      this.$router.push('/ANetAmount/RegionManage')
    }
  }
}
</script>
<style lang="scss" scoped=""  type="text/css">
#demo {
  background-color: saddlebrown;
  height: 500px;
  font-size: 18px;
  text-align: center;
  padding: 100px;
}
</style>
