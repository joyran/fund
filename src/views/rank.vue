<!-- 基金排行 -->
<template>
  <div class="rank">
    <div class="rank-header">
      <div class="rank-header-item">
        <h3>基金类型：</h3>
        <span
          v-for="(item, index) in fundTypes"
          :key="index"
          class="tag"
          :class="{ active: query.fundType.indexOf(item.value) !== -1 }"
          @click="clickFundType(item.value)"
        >
          {{ item.label }}
        </span>
      </div>
      <div class="rank-header-item">
        <h3 class="bold">基金公司：</h3>
        <span
          v-for="(item, index) in fundCompanys"
          :key="index"
          class="tag"
          :class="{ active: query.fundCompany.indexOf(item.value) !== -1 }"
          @click="clickFundCompany(item.value)"
        >
          {{ item.label }}
        </span>
      </div>
    </div>

    <el-table
      class="rank-table"
      v-loading="loading"
      :data="dataSource"
      :default-sort="{ prop: 'lastMonthGrowth', order: 'descending' }"
      @sort-change="sortChange"
    >
      <el-table-column
        label="基金名称"
        prop="name"
        min-width="100"
        width="300px"
      >
        <template slot-scope="scope">
          <a
            style="font-weight: 600"
            target="_blank"
            :href="'https://danjuanapp.com/funding/' + scope.row.code"
            :class="[
              optionals.indexOf(scope.row.code) === -1
                ? 'color-primary'
                : 'color-warning'
            ]"
          >
            {{ scope.row.name }}
          </a>
        </template>
      </el-table-column>
      <el-table-column label="基金代码" prop="code"></el-table-column>
      <el-table-column
        label="日涨幅"
        prop="dayGrowth"
        sortable="custom"
        :sort-orders="['descending', 'ascending', null]"
      >
        <template slot-scope="scope">
          <span v-if="!scope.row.dayGrowth">-</span>
          <span
            v-else
            :class="[scope.row.dayGrowth >= 0 ? 'color-up' : 'color-down']"
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
            :class="[scope.row.lastWeekGrowth >= 0 ? 'color-up' : 'color-down']"
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
            :class="[
              scope.row.lastMonthGrowth >= 0 ? 'color-up' : 'color-down'
            ]"
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
              scope.row.lastThreeMonthsGrowth >= 0 ? 'color-up' : 'color-down'
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
              scope.row.lastSixMonthsGrowth >= 0 ? 'color-up' : 'color-down'
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
            :class="[scope.row.lastYearGrowth >= 0 ? 'color-up' : 'color-down']"
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
            :class="[scope.row.thisYearGrowth >= 0 ? 'color-up' : 'color-down']"
          >
            {{ scope.row.thisYearGrowth | formatGrowth }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span
            v-if="optionals.indexOf(scope.row.code) === -1"
            class="add"
            @click="handleAddOptional(scope.row.code)"
          >
            添加自选
          </span>
          <span
            v-else
            class="delete"
            @click="handleRemoveOptional(scope.row.code)"
          >
            删除自选
          </span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      background
      class="rank-pagination"
      :total="total"
      :page-count="allPages"
      :page-sizes="[20, 50, 100, 200]"
      @current-change="pageChange"
      @size-change="pageSizeChange"
      :current-page.sync="query.pageIndex"
      :page-size.sync="query.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
    />
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
        pageSize: 20,
        sort: '1y'
      }, // 刷选查询条件
      dataSource: [], // 表格数据
      total: 0, // 总数
      fundTypes: [
        {
          label: '股票型',
          value: 'gp'
        },
        {
          label: '混合型',
          value: 'hh'
        },
        {
          label: '债券型',
          value: 'zq'
        },
        {
          label: '指数型',
          value: 'zs'
        },
        {
          label: 'QDII',
          value: 'qdii'
        },
        {
          label: 'FOF',
          value: 'fof'
        }
      ], // 基金类型
      fundCompanys: [
        {
          label: '易方达',
          value: '80000229'
        },
        {
          label: '广发',
          value: '80000248'
        },
        {
          label: '华夏',
          value: '80000222'
        },
        {
          label: '嘉实',
          value: '80000223'
        },
        {
          label: '南方',
          value: '80000220'
        },
        {
          label: '工银瑞信',
          value: '80064225'
        },
        {
          label: '博时',
          value: '80000226'
        },
        {
          label: '汇添富',
          value: '80053708'
        }
      ], // 基金公司
      loading: false, // 数据表格加载状态
      allPages: 0, // 总页数
      sortMap: {
        dayGrowth: 'r',
        lastWeekGrowth: 'z',
        lastMonthGrowth: '1y',
        lastThreeMonthsGrowth: '3y',
        lastSixMonthsGrowth: '6y',
        lastYearGrowth: '1n',
        thisYearGrowth: 'jn'
      }, // 排序字段和表格映射表
      optionals: [] // 自选基金 code 集合
    }
  },

  created() {
    this.optionals = this.$ls.get('optionals') || []
    this.getData()
  },

  methods: {
    getData() {
      this.loading = true
      this.$axios
        .post('/v1/fund/rank', this.query)
        .then(res => {
          this.dataSource = res.data.rank
          this.allPages = res.data.allPages
          this.total = this.query.pageSize * this.allPages
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
      this.query.pageIndex = 1

      this.getData()
    },

    clickFundCompany(fundCompany) {
      const index = this.query.fundCompany.indexOf(fundCompany)
      if (index === -1) {
        this.query.fundCompany.push(fundCompany)
      } else {
        this.query.fundCompany.splice(index, 1)
      }
      this.query.pageIndex = 1

      this.getData()
    },

    pageChange(page) {
      this.query.pageIndex = page
      this.getData()
    },

    pageSizeChange(pageSize) {
      this.query.pageIndex = 1
      this.query.pageSize = pageSize
      this.getData()
    },

    sortChange({ prop, order }) {
      this.query.pageIndex = 1
      this.query.sort = this.sortMap[prop]
      this.query.asc = order === 'ascending' ? 1 : 0
      this.getData()
    },

    handleAddOptional(code) {
      const optionals = this.$ls.get('optionals') || []
      if (optionals.indexOf(code) === -1) {
        optionals.unshift(code)
        this.$ls.set('optionals', optionals)
        this.optionals = optionals
      }
    },

    handleRemoveOptional(code) {
      const optionals = this.$ls.get('optionals') || []
      const index = optionals.indexOf(code)
      optionals.splice(index, 1)
      this.$ls.set('optionals', optionals)
      this.optionals = optionals
    }
  }
}
</script>

<style lang="less" scoped>
.rank {
  background: @color-white;
  padding: 24px;
}

.rank-table {
  background: @color-white;
}

.rank-header-item {
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

.rank-pagination {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 24px;
}

.add {
  font-size: 14px;
  color: @color-primary;
  cursor: pointer;
}

.delete {
  font-size: 14px;
  color: @color-error;
  cursor: pointer;
}
</style>
