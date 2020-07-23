<template>
  <div class="home">
    <div class="home-header">
      <div class="home-header-item">
        <p class="bold">基金类型：</p>
        <span
          v-for="(fundType, index) in fundTypes"
          :key="index"
          class="tag"
          :class="{ active: query.fundType.indexOf(fundType) !== -1 }"
          @click="clickFundType(fundType)"
        >
          {{ fundType }}
        </span>
      </div>
      <div class="home-header-item">
        <p class="bold">基金公司：</p>
        <span
          v-for="(fundCompany, index) in fundCompanys"
          :key="index"
          class="tag"
          :class="{ active: query.fundCompany.indexOf(fundCompany) !== -1 }"
          @click="clickFundCompany(fundCompany)"
        >
          {{ fundCompany }}
        </span>
      </div>
    </div>

    <el-table
      class="home-table"
      v-loading="loading"
      :data="dataSource"
      :default-sort="{ prop: 'dayGrowth', order: 'descending' }"
      @sort-change="sortChange"
    >
      <el-table-column
        label="基金名称"
        prop="name"
        min-width="100"
        width="280px"
      >
        <template slot-scope="scope">
          <a
            style="font-weight: 600"
            target="_blank"
            :href="'https://danjuanapp.com/funding/' + scope.row.code"
          >
            {{ scope.row.name }}
          </a>
        </template>
      </el-table-column>
      <el-table-column label="基金代码" prop="code"></el-table-column>
      <el-table-column label="日涨幅" prop="dayGrowth" sortable="custom">
        <template slot-scope="scope">
          <span v-if="!scope.row.dayGrowth">-</span>
          <span
            v-else
            :class="[scope.row.dayGrowth > 0 ? 'color-up' : 'color-down']"
          >
            {{ scope.row.dayGrowth | formatGrowth }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="近一周"
        prop="lastWeekGrowth"
        sortable="custom"
        :sort-orders="['descending', 'ascending', null]"
      >
        <template slot-scope="scope">
          <span v-if="!scope.row.lastWeekGrowth">-</span>
          <span
            v-else
            :class="[scope.row.lastWeekGrowth > 0 ? 'color-up' : 'color-down']"
          >
            {{ scope.row.lastWeekGrowth | formatGrowth }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="近一月"
        prop="lastMonthGrowth"
        sortable="custom"
        :sort-orders="['descending', 'ascending', null]"
      >
        <template slot-scope="scope">
          <span v-if="!scope.row.lastMonthGrowth">-</span>
          <span
            v-else
            :class="[scope.row.lastMonthGrowth > 0 ? 'color-up' : 'color-down']"
          >
            {{ scope.row.lastMonthGrowth | formatGrowth }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="近三月"
        prop="lastThreeMonthsGrowth"
        sortable="custom"
        :sort-orders="['descending', 'ascending', null]"
      >
        <template slot-scope="scope">
          <span v-if="!scope.row.lastThreeMonthsGrowth">-</span>
          <span
            v-else
            :class="[
              scope.row.lastThreeMonthsGrowth > 0 ? 'color-up' : 'color-down'
            ]"
          >
            {{ scope.row.lastThreeMonthsGrowth | formatGrowth }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="近半年"
        prop="lastSixMonthsGrowth"
        sortable="custom"
        :sort-orders="['descending', 'ascending', null]"
      >
        <template slot-scope="scope">
          <span v-if="!scope.row.lastSixMonthsGrowth">-</span>
          <span
            v-else
            :class="[
              scope.row.lastSixMonthsGrowth > 0 ? 'color-up' : 'color-down'
            ]"
          >
            {{ scope.row.lastSixMonthsGrowth | formatGrowth }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="近一年"
        prop="lastYearGrowth"
        sortable="custom"
        :sort-orders="['descending', 'ascending', null]"
      >
        <template slot-scope="scope">
          <span v-if="!scope.row.lastYearGrowth">-</span>
          <span
            v-else
            :class="[scope.row.lastYearGrowth > 0 ? 'color-up' : 'color-down']"
          >
            {{ scope.row.lastYearGrowth | formatGrowth }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="今年来"
        prop="thisYearGrowth"
        sortable="custom"
        :sort-orders="['descending', 'ascending', null]"
      >
        <template slot-scope="scope">
          <span v-if="!scope.row.thisYearGrowth">-</span>
          <span
            v-else
            :class="[scope.row.thisYearGrowth > 0 ? 'color-up' : 'color-down']"
          >
            {{ scope.row.thisYearGrowth | formatGrowth }}
          </span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      background
      class="home-pagination"
      :total="6311"
      :page-sizes="[10, 20, 50, 100]"
      @current-change="pageChange"
      @size-change="pageSizeChange"
      :current-page.sync="query.pageIndex"
      layout="total, prev, pager, next, jumper"
    />
  </div>
</template>

<script>
import axios from 'axios'
require('promise.prototype.finally').shim()

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
        sort: 'dayGrowth'
      }, // 刷选查询条件
      dataSource: [], // 表格数据
      fundTypes: ['股票型', '混合型', '债券型', '指数型', 'QDII', 'FOF'], // 基金类型
      fundCompanys: [
        '易方达',
        '华夏',
        '广发',
        '嘉实',
        '南方',
        '中银',
        '工银',
        '博时',
        '汇添富'
      ], // 基金公司
      loading: false // 数据表格加载状态
    }
  },

  created() {
    this.getData()
  },

  methods: {
    getData() {
      this.loading = true
      axios
        .post('/v1/fund/rank', this.query)
        .then(res => {
          this.dataSource = res.data
        })
        .finally(() => {
          this.loading = false
        })
    },

    clickFundType(fundType) {
      const index = this.query.fundType.indexOf(fundType)
      if (index === -1) {
        this.query.fundType.push(fundType)
      } else {
        this.query.fundType.splice(index, 1)
      }

      this.getData()
    },

    clickFundCompany(fundCompany) {
      const index = this.query.fundCompany.indexOf(fundCompany)
      if (index === -1) {
        this.query.fundCompany.push(fundCompany)
      } else {
        this.query.fundCompany.splice(index, 1)
      }

      this.getData()
    },

    pageChange(page) {
      this.query.pageIndex = page
      this.getData()
    },

    sortChange({ prop, order }) {
      this.query.pageIndex = 1
      this.query.sort = prop
      this.query.asc = order === 'ascending' ? 1 : 0
      this.getData()
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  background: @color-white;
  padding: 24px;
}

.home-table {
  background: @color-white;
}

.home-header-item {
  display: flex;
  align-items: center;
  height: 24px;
  margin-bottom: 16px;
  user-select: none;

  .tag {
    height: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 12px;
    border-radius: 4px;
    cursor: pointer;
    color: @color-text-1;
    font-size: 12px;
    background-color: @color-bg;

    & + .tag {
      margin-left: 12px;
    }

    &.active {
      background-color: @color-primary;
      color: @color-white;
    }
  }
}

.home-pagination {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 24px;
}
</style>
