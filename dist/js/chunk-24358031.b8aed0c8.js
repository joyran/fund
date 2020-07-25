;(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  ['chunk-24358031'],
  {
    '0420': function(t, e, a) {
      'use strict'
      var n = a('6345'),
        o = a.n(n)
      o.a
    },
    '3a97': function(t, e, a) {
      'use strict'
      a.r(e)
      var n = function() {
          var t = this,
            e = t.$createElement,
            a = t._self._c || e
          return a(
            'div',
            { staticClass: 'rank' },
            [
              a('div', { staticClass: 'rank-header' }, [
                a(
                  'div',
                  { staticClass: 'rank-header-item' },
                  [
                    a('h3', [t._v('基金类型：')]),
                    t._l(t.fundTypes, function(e, n) {
                      return a(
                        'span',
                        {
                          key: n,
                          staticClass: 'tag',
                          class: {
                            active: -1 !== t.query.fundType.indexOf(e.value)
                          },
                          on: {
                            click: function(a) {
                              return t.clickFundType(e.value)
                            }
                          }
                        },
                        [t._v(' ' + t._s(e.label) + ' ')]
                      )
                    })
                  ],
                  2
                ),
                a(
                  'div',
                  { staticClass: 'rank-header-item' },
                  [
                    a('h3', { staticClass: 'bold' }, [t._v('基金公司：')]),
                    t._l(t.fundCompanys, function(e, n) {
                      return a(
                        'span',
                        {
                          key: n,
                          staticClass: 'tag',
                          class: {
                            active: -1 !== t.query.fundCompany.indexOf(e.value)
                          },
                          on: {
                            click: function(a) {
                              return t.clickFundCompany(e.value)
                            }
                          }
                        },
                        [t._v(' ' + t._s(e.label) + ' ')]
                      )
                    })
                  ],
                  2
                )
              ]),
              a(
                'el-table',
                {
                  directives: [
                    {
                      name: 'loading',
                      rawName: 'v-loading',
                      value: t.loading,
                      expression: 'loading'
                    }
                  ],
                  staticClass: 'rank-table',
                  attrs: {
                    data: t.dataSource,
                    'default-sort': {
                      prop: 'lastMonthGrowth',
                      order: 'descending'
                    }
                  },
                  on: { 'sort-change': t.sortChange }
                },
                [
                  a('el-table-column', {
                    attrs: {
                      label: '基金名称',
                      prop: 'name',
                      'min-width': '100',
                      width: '300px'
                    },
                    scopedSlots: t._u([
                      {
                        key: 'default',
                        fn: function(e) {
                          return [
                            a(
                              'a',
                              {
                                class: [
                                  -1 === t.optionals.indexOf(e.row.code)
                                    ? 'color-primary'
                                    : 'color-warning'
                                ],
                                staticStyle: { 'font-weight': '600' },
                                attrs: {
                                  target: '_blank',
                                  href:
                                    'https://danjuanapp.com/funding/' +
                                    e.row.code
                                }
                              },
                              [t._v(' ' + t._s(e.row.name) + ' ')]
                            )
                          ]
                        }
                      }
                    ])
                  }),
                  a('el-table-column', {
                    attrs: { label: '基金代码', prop: 'code' }
                  }),
                  a('el-table-column', {
                    attrs: {
                      label: '日涨幅',
                      prop: 'dayGrowth',
                      sortable: 'custom',
                      'sort-orders': ['descending', 'ascending', null]
                    },
                    scopedSlots: t._u([
                      {
                        key: 'default',
                        fn: function(e) {
                          return [
                            e.row.dayGrowth
                              ? a(
                                  'span',
                                  {
                                    class: [
                                      e.row.dayGrowth >= 0
                                        ? 'color-up'
                                        : 'color-down'
                                    ]
                                  },
                                  [
                                    t._v(
                                      ' ' +
                                        t._s(
                                          t._f('formatGrowth')(e.row.dayGrowth)
                                        ) +
                                        ' '
                                    )
                                  ]
                                )
                              : a('span', [t._v('-')])
                          ]
                        }
                      }
                    ])
                  }),
                  a('el-table-column', {
                    attrs: {
                      label: '近一周',
                      prop: 'lastWeekGrowth',
                      sortable: 'custom',
                      'sort-orders': ['descending', 'ascending', null]
                    },
                    scopedSlots: t._u([
                      {
                        key: 'default',
                        fn: function(e) {
                          return [
                            e.row.lastWeekGrowth
                              ? a(
                                  'span',
                                  {
                                    class: [
                                      e.row.lastWeekGrowth >= 0
                                        ? 'color-up'
                                        : 'color-down'
                                    ]
                                  },
                                  [
                                    t._v(
                                      ' ' +
                                        t._s(
                                          t._f('formatGrowth')(
                                            e.row.lastWeekGrowth
                                          )
                                        ) +
                                        ' '
                                    )
                                  ]
                                )
                              : a('span', [t._v('-')])
                          ]
                        }
                      }
                    ])
                  }),
                  a('el-table-column', {
                    attrs: {
                      label: '近一月',
                      prop: 'lastMonthGrowth',
                      sortable: 'custom',
                      'sort-orders': ['descending', 'ascending', null]
                    },
                    scopedSlots: t._u([
                      {
                        key: 'default',
                        fn: function(e) {
                          return [
                            e.row.lastMonthGrowth
                              ? a(
                                  'span',
                                  {
                                    class: [
                                      e.row.lastMonthGrowth >= 0
                                        ? 'color-up'
                                        : 'color-down'
                                    ]
                                  },
                                  [
                                    t._v(
                                      ' ' +
                                        t._s(
                                          t._f('formatGrowth')(
                                            e.row.lastMonthGrowth
                                          )
                                        ) +
                                        ' '
                                    )
                                  ]
                                )
                              : a('span', [t._v('-')])
                          ]
                        }
                      }
                    ])
                  }),
                  a('el-table-column', {
                    attrs: {
                      label: '近三月',
                      prop: 'lastThreeMonthsGrowth',
                      sortable: 'custom',
                      'sort-orders': ['descending', 'ascending', null]
                    },
                    scopedSlots: t._u([
                      {
                        key: 'default',
                        fn: function(e) {
                          return [
                            e.row.lastThreeMonthsGrowth
                              ? a(
                                  'span',
                                  {
                                    class: [
                                      e.row.lastThreeMonthsGrowth >= 0
                                        ? 'color-up'
                                        : 'color-down'
                                    ]
                                  },
                                  [
                                    t._v(
                                      ' ' +
                                        t._s(
                                          t._f('formatGrowth')(
                                            e.row.lastThreeMonthsGrowth
                                          )
                                        ) +
                                        ' '
                                    )
                                  ]
                                )
                              : a('span', [t._v('-')])
                          ]
                        }
                      }
                    ])
                  }),
                  a('el-table-column', {
                    attrs: {
                      label: '近半年',
                      prop: 'lastSixMonthsGrowth',
                      sortable: 'custom',
                      'sort-orders': ['descending', 'ascending', null]
                    },
                    scopedSlots: t._u([
                      {
                        key: 'default',
                        fn: function(e) {
                          return [
                            e.row.lastSixMonthsGrowth
                              ? a(
                                  'span',
                                  {
                                    class: [
                                      e.row.lastSixMonthsGrowth >= 0
                                        ? 'color-up'
                                        : 'color-down'
                                    ]
                                  },
                                  [
                                    t._v(
                                      ' ' +
                                        t._s(
                                          t._f('formatGrowth')(
                                            e.row.lastSixMonthsGrowth
                                          )
                                        ) +
                                        ' '
                                    )
                                  ]
                                )
                              : a('span', [t._v('-')])
                          ]
                        }
                      }
                    ])
                  }),
                  a('el-table-column', {
                    attrs: {
                      label: '近一年',
                      prop: 'lastYearGrowth',
                      sortable: 'custom',
                      'sort-orders': ['descending', 'ascending', null]
                    },
                    scopedSlots: t._u([
                      {
                        key: 'default',
                        fn: function(e) {
                          return [
                            e.row.lastYearGrowth
                              ? a(
                                  'span',
                                  {
                                    class: [
                                      e.row.lastYearGrowth >= 0
                                        ? 'color-up'
                                        : 'color-down'
                                    ]
                                  },
                                  [
                                    t._v(
                                      ' ' +
                                        t._s(
                                          t._f('formatGrowth')(
                                            e.row.lastYearGrowth
                                          )
                                        ) +
                                        ' '
                                    )
                                  ]
                                )
                              : a('span', [t._v('-')])
                          ]
                        }
                      }
                    ])
                  }),
                  a('el-table-column', {
                    attrs: {
                      label: '今年来',
                      prop: 'thisYearGrowth',
                      sortable: 'custom',
                      'sort-orders': ['descending', 'ascending', null]
                    },
                    scopedSlots: t._u([
                      {
                        key: 'default',
                        fn: function(e) {
                          return [
                            e.row.thisYearGrowth
                              ? a(
                                  'span',
                                  {
                                    class: [
                                      e.row.thisYearGrowth >= 0
                                        ? 'color-up'
                                        : 'color-down'
                                    ]
                                  },
                                  [
                                    t._v(
                                      ' ' +
                                        t._s(
                                          t._f('formatGrowth')(
                                            e.row.thisYearGrowth
                                          )
                                        ) +
                                        ' '
                                    )
                                  ]
                                )
                              : a('span', [t._v('-')])
                          ]
                        }
                      }
                    ])
                  }),
                  a('el-table-column', {
                    attrs: { label: '操作' },
                    scopedSlots: t._u([
                      {
                        key: 'default',
                        fn: function(e) {
                          return [
                            -1 === t.optionals.indexOf(e.row.code)
                              ? a(
                                  'span',
                                  {
                                    staticClass: 'add',
                                    on: {
                                      click: function(a) {
                                        return t.handleAddOptional(e.row.code)
                                      }
                                    }
                                  },
                                  [t._v(' 添加自选 ')]
                                )
                              : a(
                                  'span',
                                  {
                                    staticClass: 'delete',
                                    on: {
                                      click: function(a) {
                                        return t.handleRemoveOptional(
                                          e.row.code
                                        )
                                      }
                                    }
                                  },
                                  [t._v(' 删除自选 ')]
                                )
                          ]
                        }
                      }
                    ])
                  })
                ],
                1
              ),
              a('el-pagination', {
                staticClass: 'rank-pagination',
                attrs: {
                  background: '',
                  total: t.total,
                  'page-count': t.allPages,
                  'page-sizes': [20, 50, 100, 200],
                  'current-page': t.query.pageIndex,
                  'page-size': t.query.pageSize,
                  layout: 'total, sizes, prev, pager, next, jumper'
                },
                on: {
                  'current-change': t.pageChange,
                  'size-change': t.pageSizeChange,
                  'update:currentPage': function(e) {
                    return t.$set(t.query, 'pageIndex', e)
                  },
                  'update:current-page': function(e) {
                    return t.$set(t.query, 'pageIndex', e)
                  },
                  'update:pageSize': function(e) {
                    return t.$set(t.query, 'pageSize', e)
                  },
                  'update:page-size': function(e) {
                    return t.$set(t.query, 'pageSize', e)
                  }
                }
              })
            ],
            1
          )
        },
        o = [],
        r =
          (a('c975'),
          a('a434'),
          a('d3b7'),
          {
            data: function() {
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
                },
                dataSource: [],
                total: 0,
                fundTypes: [
                  { label: '股票型', value: 'gp' },
                  { label: '混合型', value: 'hh' },
                  { label: '债券型', value: 'zq' },
                  { label: '指数型', value: 'zs' },
                  { label: 'QDII', value: 'qdii' },
                  { label: 'FOF', value: 'fof' }
                ],
                fundCompanys: [
                  { label: '易方达', value: '80000229' },
                  { label: '广发', value: '80000248' },
                  { label: '华夏', value: '80000222' },
                  { label: '嘉实', value: '80000223' },
                  { label: '南方', value: '80000220' },
                  { label: '工银瑞信', value: '80064225' },
                  { label: '博时', value: '80000226' },
                  { label: '汇添富', value: '80053708' }
                ],
                loading: !1,
                allPages: 0,
                sortMap: {
                  dayGrowth: 'r',
                  lastWeekGrowth: 'z',
                  lastMonthGrowth: '1y',
                  lastThreeMonthsGrowth: '3y',
                  lastSixMonthsGrowth: '6y',
                  lastYearGrowth: '1n',
                  thisYearGrowth: 'jn'
                },
                optionals: []
              }
            },
            created: function() {
              ;(this.optionals = this.$ls.get('optionals') || []),
                this.getData()
            },
            methods: {
              getData: function() {
                var t = this
                ;(this.loading = !0),
                  this.$axios
                    .post('/v1/fund/rank', this.query)
                    .then(function(e) {
                      ;(t.dataSource = e.data.rank),
                        (t.allPages = e.data.allPages),
                        (t.total = t.query.pageSize * t.allPages)
                    })
                    .finally(function() {
                      t.loading = !1
                    })
              },
              clickFundType: function(t) {
                var e = this.query.fundType.indexOf(t)
                ;-1 === e
                  ? this.query.fundType.push(t)
                  : this.query.fundType.splice(e, 1),
                  (this.query.pageIndex = 1),
                  this.getData()
              },
              clickFundCompany: function(t) {
                var e = this.query.fundCompany.indexOf(t)
                ;-1 === e
                  ? this.query.fundCompany.push(t)
                  : this.query.fundCompany.splice(e, 1),
                  (this.query.pageIndex = 1),
                  this.getData()
              },
              pageChange: function(t) {
                ;(this.query.pageIndex = t), this.getData()
              },
              pageSizeChange: function(t) {
                ;(this.query.pageIndex = 1),
                  (this.query.pageSize = t),
                  this.getData()
              },
              sortChange: function(t) {
                var e = t.prop,
                  a = t.order
                ;(this.query.pageIndex = 1),
                  (this.query.sort = this.sortMap[e]),
                  (this.query.asc = 'ascending' === a ? 1 : 0),
                  this.getData()
              },
              handleAddOptional: function(t) {
                var e = this.$ls.get('optionals') || []
                ;-1 === e.indexOf(t) &&
                  (e.unshift(t),
                  this.$ls.set('optionals', e),
                  (this.optionals = e))
              },
              handleRemoveOptional: function(t) {
                var e = this.$ls.get('optionals') || [],
                  a = e.indexOf(t)
                e.splice(a, 1),
                  this.$ls.set('optionals', e),
                  (this.optionals = e)
              }
            }
          }),
        s = r,
        l = (a('0420'), a('2877')),
        i = Object(l['a'])(s, n, o, !1, null, '3c444766', null)
      e['default'] = i.exports
    },
    6345: function(t, e, a) {},
    8418: function(t, e, a) {
      'use strict'
      var n = a('c04e'),
        o = a('9bf2'),
        r = a('5c6c')
      t.exports = function(t, e, a) {
        var s = n(e)
        s in t ? o.f(t, s, r(0, a)) : (t[s] = a)
      }
    },
    a434: function(t, e, a) {
      'use strict'
      var n = a('23e7'),
        o = a('23cb'),
        r = a('a691'),
        s = a('50c4'),
        l = a('7b0b'),
        i = a('65f0'),
        u = a('8418'),
        c = a('1dde'),
        d = a('ae40'),
        p = c('splice'),
        h = d('splice', { ACCESSORS: !0, 0: 0, 1: 2 }),
        f = Math.max,
        g = Math.min,
        w = 9007199254740991,
        y = 'Maximum allowed length exceeded'
      n(
        { target: 'Array', proto: !0, forced: !p || !h },
        {
          splice: function(t, e) {
            var a,
              n,
              c,
              d,
              p,
              h,
              v = l(this),
              b = s(v.length),
              m = o(t, b),
              _ = arguments.length
            if (
              (0 === _
                ? (a = n = 0)
                : 1 === _
                ? ((a = 0), (n = b - m))
                : ((a = _ - 2), (n = g(f(r(e), 0), b - m))),
              b + a - n > w)
            )
              throw TypeError(y)
            for (c = i(v, n), d = 0; d < n; d++)
              (p = m + d), p in v && u(c, d, v[p])
            if (((c.length = n), a < n)) {
              for (d = m; d < b - n; d++)
                (p = d + n), (h = d + a), p in v ? (v[h] = v[p]) : delete v[h]
              for (d = b; d > b - n + a; d--) delete v[d - 1]
            } else if (a > n)
              for (d = b - n; d > m; d--)
                (p = d + n - 1),
                  (h = d + a - 1),
                  p in v ? (v[h] = v[p]) : delete v[h]
            for (d = 0; d < a; d++) v[d + m] = arguments[d + 2]
            return (v.length = b - n + a), c
          }
        }
      )
    },
    a640: function(t, e, a) {
      'use strict'
      var n = a('d039')
      t.exports = function(t, e) {
        var a = [][t]
        return (
          !!a &&
          n(function() {
            a.call(
              null,
              e ||
                function() {
                  throw 1
                },
              1
            )
          })
        )
      }
    },
    c975: function(t, e, a) {
      'use strict'
      var n = a('23e7'),
        o = a('4d64').indexOf,
        r = a('a640'),
        s = a('ae40'),
        l = [].indexOf,
        i = !!l && 1 / [1].indexOf(1, -0) < 0,
        u = r('indexOf'),
        c = s('indexOf', { ACCESSORS: !0, 1: 0 })
      n(
        { target: 'Array', proto: !0, forced: i || !u || !c },
        {
          indexOf: function(t) {
            return i
              ? l.apply(this, arguments) || 0
              : o(this, t, arguments.length > 1 ? arguments[1] : void 0)
          }
        }
      )
    }
  }
])
