<!-- 自选 -->
<template>
  <div>
    <div class="optional-loading" v-if="loading" v-loading="loading"></div>
    <template v-else>
      <div class="optional-init" v-if="optionals.length === 0">
        <p class="optional-init-head">热门自选基金</p>
        <el-row :gutter="16" style="width: 1000px; margin-bottom: 24px;">
          <el-col :span="8" v-for="(fund, index) in hotFunds" :key="index">
            <div class="fund-card" @click="handleSelectFund(fund.code)">
              <div class="fund-name">
                <h3>{{ fund.name }}</h3>
                <p class="fund-code">{{ fund.code }}</p>
              </div>
              <img
                v-if="selectCodes.indexOf(fund.code) !== -1"
                class="right"
                src="~@/assets/right.png"
                alt=""
              />
              <div class="fund-growth">
                <div class="">
                  <p
                    class="text-left"
                    :class="[fund.dayGrowth >= 0 ? 'color-up' : 'color-down']"
                  >
                    {{ fund.dayGrowth | formatGrowth }}
                  </p>
                  <h5 class="text-left">日涨跌幅</h5>
                </div>
                <div class="">
                  <p
                    class="text-center"
                    :class="[
                      fund.lastThreeMonthsGrowth >= 0
                        ? 'color-up'
                        : 'color-down'
                    ]"
                  >
                    {{ fund.lastThreeMonthsGrowth | formatGrowth }}
                  </p>
                  <h5 class="text-center">近3月涨跌幅</h5>
                </div>
                <div class="">
                  <p
                    class="text-right"
                    :class="[
                      fund.lastYearGrowth >= 0 ? 'color-up' : 'color-down'
                    ]"
                  >
                    {{ fund.lastYearGrowth | formatGrowth }}
                  </p>
                  <h5 class="text-right">近一年涨跌幅</h5>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>

        <el-button
          :disabled="selectCodes.length === 0"
          type="primary"
          @click="handleAddOptional"
        >
          加自选
        </el-button>
      </div>

      <div class="optional-table-wrapper" v-else>
        <div class="search-fundcode">
          <el-select
            v-model="searchFundCode"
            filterable
            placeholder="输入基金名称搜索"
            remote
            :remote-method="remoteMethod"
            :loading="selectLoading"
            clearable
            no-match-text="无匹配基金"
            @change="handleChange"
          >
            <el-option
              v-for="item in filterFunds"
              :key="item[0]"
              :label="item[2]"
              :value="item[0]"
            >
              <span>{{ item[2] }}</span>
              <span style="color: #999; font-size: 13px; margin-left: 8px;">
                {{ item[0] }}
              </span>
              <span class="add-optional">加自选</span>
            </el-option>
          </el-select>
        </div>
        <el-table
          class="optional-table"
          v-loading="tableLoading"
          :data="dataSource"
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
              >
                {{ scope.row.name }}
              </a>
            </template>
          </el-table-column>
          <el-table-column label="基金代码" prop="code"></el-table-column>
          <el-table-column
            label="估值"
            prop="expectGrowth"
            sortable
            :sort-orders="['descending', 'ascending', null]"
          >
            <template slot-scope="scope">
              <span v-if="!scope.row.expectGrowth">-</span>
              <span
                v-else
                :class="[
                  scope.row.expectGrowth >= 0 ? 'color-up' : 'color-down'
                ]"
              >
                {{ scope.row.expectGrowth | formatGrowth }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="日涨幅"
            prop="dayGrowth"
            sortable
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
            label="近一月"
            prop="lastMonthGrowth"
            sortable
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
            sortable
            :sort-orders="['descending', 'ascending', null]"
          >
            <template slot-scope="scope">
              <span v-if="!scope.row.lastThreeMonthsGrowth">-</span>
              <span
                v-else
                :class="[
                  scope.row.lastThreeMonthsGrowth >= 0
                    ? 'color-up'
                    : 'color-down'
                ]"
              >
                {{ scope.row.lastThreeMonthsGrowth | formatGrowth }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="近半年"
            prop="lastSixMonthsGrowth"
            sortable
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
            sortable
            :sort-orders="['descending', 'ascending', null]"
          >
            <template slot-scope="scope">
              <span v-if="!scope.row.lastYearGrowth">-</span>
              <span
                v-else
                :class="[
                  scope.row.lastYearGrowth >= 0 ? 'color-up' : 'color-down'
                ]"
              >
                {{ scope.row.lastYearGrowth | formatGrowth }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span class="add" @click="handleRemoveOptional(scope.row.code)">
                删除自选
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </template>
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
      loading: true, // 数据表格加载状态
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
      optionals: [], // 自选基金 code 集合
      hotCodes: [
        '004851',
        '006003',
        '003745',
        '004997',
        '005940',
        '161725',
        '161903',
        '206009',
        '180012'
      ], // 推荐的热门基金代码
      hotFunds: [], // 根据热门基金代码获取的名称和近一年收益率
      selectCodes: [], // 用户勾选的热门基金
      searchFundCode: '', // 搜索的基金 code
      allFunds: [], // 所有基金
      filterFunds: [], // 根据输入的条件过滤后的基金
      selectLoading: false,
      tableLoading: true // 表格 loading 状态
    }
  },

  created() {
    this.optionals = this.$ls.get('optionals') || []
    this.optionals.length === 0 ? this.getHots() : this.getData()
    this.getAllFunds()
  },

  methods: {
    getData() {
      this.tableLoading = true

      // 自选基金 code
      const optionals = this.$ls.get('optionals') || []
      this.$axios
        .get('/v1/fund', {
          params: { code: optionals.join(',') }
        })
        .then(res => {
          this.dataSource = res.data
        })
        .finally(() => {
          this.tableLoading = false
          this.loading = false
        })
    },

    getHots() {
      this.loading = true

      // 自选基金 code
      this.$axios
        .get('/v1/fund', {
          params: { code: this.hotCodes.join(',') }
        })
        .then(res => {
          this.hotFunds = res.data
        })
        .finally(() => {
          this.loading = false
        })
    },

    getAllFunds() {
      // 自选基金 code
      this.$axios.get('/v1/fund/all').then(res => {
        this.allFunds = res.data
      })
    },

    handleRemoveOptional(code) {
      const optionals = this.$ls.get('optionals') || []
      const index = optionals.indexOf(code)
      optionals.splice(index, 1)
      this.optionals = optionals
      this.$ls.set('optionals', optionals)
      this.optionals.length === 0 ? this.getHots() : this.getData()
    },

    handleSelectFund(code) {
      const index = this.selectCodes.indexOf(code)
      if (index === -1) {
        this.selectCodes.push(code)
      } else {
        this.selectCodes.splice(index, 1)
      }
    },

    handleAddOptional() {
      this.$ls.set('optionals', this.selectCodes)
      this.optionals = this.selectCodes
      this.getData()
      this.selectCodes = []
    },

    remoteMethod(query) {
      if (query !== '') {
        this.selectLoading = true
        setTimeout(() => {
          this.selectLoading = false
          this.filterFunds = this.allFunds.filter(item => {
            return item[2].indexOf(query) > -1
          })
          this.filterFunds = this.filterFunds.splice(0, 100)
        }, 200)
      } else {
        this.filterFunds = []
      }
    },

    handleChange(code) {
      const optionals = this.$ls.get('optionals') || []
      if (optionals.indexOf(code) === -1) {
        optionals.unshift(code)
        this.$ls.set('optionals', optionals)
        this.optionals = optionals
        this.getData()
      }
      this.filterFunds = []
      this.searchFundCode = ''
    }
  }
}
</script>

<style lang="less" scoped>
.optional {
  background: @color-bg;
  padding: 24px;
}

.optional-init {
  height: calc(100vh - 176px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .optional-init-head {
    color: @color-text-2;
    margin-bottom: 40px;
  }

  .fund-card {
    background: @color-white;
    width: 100%;
    margin-bottom: 16px;
    padding: 24px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;

    &:hover {
      box-shadow: @box-shadow;
      transform: translateY(-4px);
    }

    .right {
      position: absolute;
      right: 24px;
      top: 24px;
      width: 28px;
      height: 28px;
    }
  }

  .fund-name {
    display: flex;
    align-items: flex-end;
    margin-bottom: 16px;
  }

  .fund-code {
    color: @color-text-2;
    margin-left: 8px;
  }

  .fund-growth {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > div {
      width: calc(100% / 3);

      p {
        font-size: 20px;
        margin-bottom: 8px;
      }
    }
  }
}

.optional-table {
  background: @color-white;
}

.optional-header-item {
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

.optional-pagination {
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

.search-input {
  width: 500px;
}

.optional-table-wrapper {
  background: @color-white;
  padding: 24px;
}

.search-fundcode {
  width: 400px;
  margin-bottom: 16px;

  /deep/ .el-select {
    width: 100%;
  }
}

.optional-loading {
  height: calc(100vh - 128px);
}

.add-optional {
  color: @color-primary;
  font-size: 13px;
  float: right;
  cursor: pointer;
}
</style>
