<template lang="html">
  <div class="mobile" v-if="!loading">
    <div class="mobile-head"></div>
    <div class="mobile-body">
      <div class="mobile-line" v-for="(item, index) in dataSource" :key="index">
        <p>{{ item.name }}</p>
        <p :class="[item.dayGrowth > 0 ? 'color-up' : 'color-down']">
          {{ item.dayGrowth | formatGrowth }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: {
        asc: 0,
        createTimeLimit: 0,
        fundCompany: [],
        fundScale: 0,
        fundType: [],
        pageIndex: 1,
        pageSize: 10,
        sort: '1y'
      }, // 刷选查询条件
      dataSource: [], // 表格数据
      loading: false // 数据表格加载状态
    }
  },

  created() {
    this.getData()
  },

  methods: {
    getData() {
      this.loading = true
      this.$axios
        .post('/v1/fund/rank', this.query)
        .then(res => {
          this.dataSource = res.data.rank
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="less" scoped>
.mobile-line {
  display: flex;
  height: 46px;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: @color-white;
  border-bottom: 0.5px solid #ebebeb;
}
</style>
