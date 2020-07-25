;(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  ['chunk-c4bd82da'],
  {
    6511: function(t, a, e) {
      'use strict'
      e.r(a)
      var n = function() {
          var t = this,
            a = t.$createElement,
            e = t._self._c || a
          return e('div', { staticClass: 'home' }, [
            e(
              'div',
              { staticClass: 'home-head' },
              t._l(t.menus, function(a) {
                return e(
                  'div',
                  {
                    key: a.path,
                    staticClass: 'menu',
                    class: { active: a.path === t.activePath },
                    on: {
                      click: function(e) {
                        return t.$router.push({ path: a.path })
                      }
                    }
                  },
                  [t._v(' ' + t._s(a.title) + ' ')]
                )
              }),
              0
            ),
            e('div', { staticClass: 'home-body' }, [e('router-view')], 1)
          ])
        },
        i = [],
        c = {
          data: function() {
            return {
              activePath: '',
              menus: [
                { name: 'rank', path: '/rank', title: '排行' },
                { name: 'optional', path: '/optional', title: '自选' }
              ]
            }
          },
          watch: {
            $route: function(t) {
              this.activePath = t.path
            }
          },
          created: function() {
            this.activePath = this.$route.path
          }
        },
        s = c,
        u = (e('90e2'), e('2877')),
        o = Object(u['a'])(s, n, i, !1, null, '30a6c646', null)
      a['default'] = o.exports
    },
    '90e2': function(t, a, e) {
      'use strict'
      var n = e('daf6'),
        i = e.n(n)
      i.a
    },
    daf6: function(t, a, e) {}
  }
])
