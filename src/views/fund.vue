<!-- 基金详情 -->
<template lang="html">
  <div class="fund" v-if="!loading">
    <router-link :to="{ name: 'home' }">基金排行</router-link>
    <div class="fund-header">
      <div class="">
        <p>近一年涨跌幅</p>
        <p>{{ fund.lastYearGrowth | formatGrowth }}</p>
      </div>
      <div class="">
        <p>日涨跌幅</p>
        <p>{{ fund.dayGrowth | formatGrowth }}</p>
      </div>
      <div class="">
        <p>单位净值</p>
        <p>{{ fund.netWorth }}</p>
      </div>
    </div>

    <div class="">
      <chart-line :dataset="fund.netWorthData" />
    </div>

    <div class="net-worth">
      <p class="title">历史净值</p>
      <div class="net-worth-head">
        <p class="item left">日期</p>
        <p class="item center">历史净值</p>
        <p class="item right">日涨幅</p>
      </div>
      <div
        class="net-worth-item"
        v-for="(item, index) in historyNetWorth.slice(0, 5)"
        :key="index"
      >
        <p class="item left">{{ item[0] }}</p>
        <p class="item center">{{ item[1] }}</p>
        <p
          class="item right"
          :class="[item[2] > 0 ? 'color-up' : 'color-down']"
        >
          {{ item[2] | formatGrowth }}
        </p>
      </div>
      <div class="net-worth-footer" @click="dialogVisible = true">
        查看更多
      </div>
    </div>

    <el-dialog
      :visible.sync="dialogVisible"
      :top="0"
      width="600px"
      class="net-worth-dialog"
    >
      <div class="net-worth-head">
        <p class="item left">日期</p>
        <p class="item center">历史净值</p>
        <p class="item right">日涨幅</p>
      </div>
      <div class="net-worth-body">
        <div
          class="net-worth-item"
          v-for="(item, index) in historyNetWorth"
          :key="index"
        >
          <p class="item left">{{ item[0] }}</p>
          <p class="item center">{{ item[1] }}</p>
          <p
            class="item right"
            :class="[item[2] > 0 ? 'color-up' : 'color-down']"
          >
            {{ item[2] | formatGrowth }}
          </p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import ChartLine from '@/components/chart-line'
require('promise.prototype.finally').shim()

export default {
  components: {
    ChartLine
  },

  data() {
    return {
      code: '', // 基金代码
      loading: true,
      dialogVisible: false,
      historyNetWorth: [],
      fund: {}
    }
  },

  created() {
    this.code = this.$route.params.code
    this.getFund()
  },

  methods: {
    getFund() {
      this.loading = true
      axios
        .get('/v1/fund/detail?code=' + this.code)
        .then(res => {
          this.fund = res.data
          this.historyNetWorth = res.data.netWorthData.reverse()
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="less" scoped>
.fund {
  width: 1000px;
  margin: 0 auto;
  padding: 32px 0;
}

.fund-header {
  display: flex;
  align-items: center;
}

.net-worth {
  margin-top: 24px;

  .title {
    font-size: 16px;
    line-height: 24px;
    font-weight: 600;
    margin-bottom: 20px;
  }
}

.net-worth-head {
  display: flex;
  align-items: center;
  background: #f7f7f7;
  height: 46px;
  font-weight: 600;

  p {
    color: @color-text-2;
  }
}

.net-worth-item {
  display: flex;
  align-items: center;
  height: 46px;
  border-bottom: 1px solid @color-bg;
}

.item {
  width: calc(100% / 3);
}

.left {
  text-align: left;
  padding-left: 16px;
}

.center {
  text-align: center;
}

.right {
  text-align: right;
  padding-right: 16px;
}

.net-worth-footer {
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: @color-primary;
  cursor: pointer;
}
</style>

<style lang="less">
.net-worth-dialog {
  .el-dialog {
    border-radius: 2px;
  }

  .el-dialog__header {
    display: none;
  }

  .el-dialog__body {
    position: relative;
    overflow-y: hidden;
  }

  .net-worth-body {
    overflow-y: auto;
    height: calc(80vh - 46px);
  }
}
</style>
