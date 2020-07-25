;(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  ['chunk-c5cf752e'],
  {
    '365c': function(t, a, n) {
      'use strict'
      var e = n('de49'),
        i = n.n(e)
      i.a
    },
    '9ae2': function(t, a, n) {
      'use strict'
      n.r(a)
      var e = function() {
          var t = this,
            a = t.$createElement,
            n = t._self._c || a
          return t.loading
            ? t._e()
            : n('div', { staticClass: 'mobile' }, [
                n('div', { staticClass: 'mobile-head' }),
                n(
                  'div',
                  { staticClass: 'mobile-body' },
                  t._l(t.dataSource, function(a, e) {
                    return n('div', { key: e, staticClass: 'mobile-line' }, [
                      n('p', [t._v(t._s(a.name))]),
                      n(
                        'p',
                        {
                          class: [a.dayGrowth > 0 ? 'color-up' : 'color-down']
                        },
                        [
                          t._v(
                            ' ' + t._s(t._f('formatGrowth')(a.dayGrowth)) + ' '
                          )
                        ]
                      )
                    ])
                  }),
                  0
                )
              ])
        },
        i = [],
        o =
          (n('d3b7'),
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
                  pageSize: 10,
                  sort: '1y'
                },
                dataSource: [],
                loading: !1
              }
            },
            created: function() {
              this.getData()
            },
            methods: {
              getData: function() {
                var t = this
                ;(this.loading = !0),
                  this.$axios
                    .post('/v1/fund/rank', this.query)
                    .then(function(a) {
                      t.dataSource = a.data.rank
                    })
                    .finally(function() {
                      t.loading = !1
                    })
              }
            }
          }),
        c = o,
        s = (n('365c'), n('2877')),
        d = Object(s['a'])(c, e, i, !1, null, '46647b35', null)
      a['default'] = d.exports
    },
    de49: function(t, a, n) {}
  }
])
