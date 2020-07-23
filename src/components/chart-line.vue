<!-- 折线图 -->
<template>
  <div class="chart-line-wrapper">
    <div class="chart-line" ref="chart"></div>
    <div class="chart-line-toolbar">
      <span
        v-for="(item, index) in toolbars"
        :key="index"
        :class="{ active: toolbarActiveIndex === index }"
        @click="changeDate(index)"
      >
        {{ item }}
      </span>
    </div>
  </div>
</template>

<script>
// 引入 echarts 主模块
import * as echarts from 'echarts/lib/echarts'
// 引入折线图
import 'echarts/lib/chart/line'
import 'echarts/lib/component/grid'

export default {
  props: {
    dataset: Array
  },

  data() {
    return {
      option: [],
      source: [],
      toolbars: ['近一月', '近3月', '近半年', '近一年', '近3年', '成立来'],
      toolbarActiveIndex: 0
    }
  },

  watch: {
    dataset: {
      handler() {
        this.source = [...this.dataset]
        this.source.unshift(['date', 'netWorth', 'dayGrowth', 'totalWorth'])
        this.drawChart()
      },
      deep: true
    }
  },

  mounted() {
    this.source = [...this.dataset]
    this.source = this.source.slice(-30)
    this.source.unshift(['date', 'netWorth', 'dayGrowth', 'totalWorth'])
    this.drawChart()
  },

  methods: {
    changeDate(index) {
      this.toolbarActiveIndex = index
      this.source = [...this.dataset]

      if (index === 0) {
        this.source = this.source.slice(-30)
      }

      if (index === 1) {
        this.source = this.source.slice(-90)
      }

      if (index === 2) {
        this.source = this.source.slice(-180)
      }

      if (index === 3) {
        this.source = this.source.slice(-365)
      }

      if (index === 4) {
        this.source = this.source.slice(-1095)
      }

      this.source.unshift(['date', 'netWorth', 'dayGrowth', 'totalWorth'])
      this.drawChart()
    },

    // 绘制图形
    drawChart() {
      this.option = {
        // 直角坐标系内绘图网格离容器上下左右边的距离
        grid: {
          left: 16,
          right: 16,
          top: 32,
          bottom: 0,
          containLabel: true
        },
        dataset: {
          source: this.source
        },
        // X轴
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#f7f7f7', // X 坐标轴样式
              width: 1
            }
          },
          axisPointer: {
            show: false
          },
          axisLabel: {
            textStyle: {
              fontSize: 12, // X 轴名称样式
              color: '#999'
            },
            margin: 12,
            align: 'auto',
            formatter: (value, index) => {
              // 第一个标签左对齐，最后一个标签右对齐，中间居中对齐
              if (index === 0) {
                return `{left|${value}}`
              } else if (index === this.dataset.length - 1) {
                return `{right|${value}}`
              } else {
                return `{center|${value}}`
              }
            },
            rich: {
              left: {
                align: 'left',
                width: '100%'
              },
              center: {
                align: 'center',
                width: '100%'
              },
              right: {
                align: 'right',
                width: '100%'
              }
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          gridIndex: 0,
          splitLine: {
            show: true,
            lineStyle: {
              color: '#f7f7f7', // Y 轴分割线样式
              width: 1
            }
          },
          axisLine: {
            show: false // 不显示 Y 坐标轴
          },
          axisTick: {
            show: false // 不显示 Y 轴刻度线
          }
        },
        series: [
          {
            type: 'line',
            smooth: true,
            encode: {
              x: 'date',
              y: 'netWorth'
            },
            symbol: 'none',
            lineStyle: {
              color: '#0075de'
            }
          }
        ]
      }

      const chart = echarts.init(this.$refs.chart)
      chart.setOption(this.option)
      chart.resize()

      chart.on('mouseover', function(params) {
        // 控制台打印数据的名称
        console.log(params)
      })

      window.onresize = () => {
        chart.resize()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.chart-line-wrapper {
  width: 100%;

  .chart-line {
    background-color: @color-white;
    border-radius: 0px;
    padding-bottom: 32px;
    height: 427px;
    width: 100%;
  }

  .chart-line-toolbar {
    display: flex;
    align-items: center;
    height: 40px;
    background-color: @color-white;

    span {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      width: calc(100% / 6);
      background: #ebebeb;
      cursor: pointer;
      border-top: 1px solid #f7f7f7;
      border-right: 1px solid #f7f7f7;

      &.active {
        background: #fff;
      }

      &:last-child {
        border-right: 0;
      }
    }
  }
}
</style>

<style lang="less">
// 自定义 tooltip 样式
.chart-line-tooltip {
  min-width: 200px;
  border-radius: 0 8px 8px 8px;
  background: @color-bg;
  box-shadow: @box-shadow;

  .chart-line-tooltip-title {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    padding-left: 16px;
    color: @color-text-3;
    border-bottom: 1px solid @color-bg;
  }
}

.chart-line-tooltip-content {
  padding: 16px;
}

.chart-line-tooltip-row {
  height: 14px;
  line-height: 14px;
  margin-bottom: 16px;

  .dashed {
    display: inline-block;
    height: 8px;
    width: 8px;
    border-radius: 100%;
    margin-right: 6px;
    margin-bottom: 1px;
  }

  .name {
    font-size: 14px;
    color: @color-text-3;
  }

  .value {
    font-size: 14px;
    color: @color-text-1;
    float: right;
  }
}
</style>
