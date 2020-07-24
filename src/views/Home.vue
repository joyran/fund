<!-- 首页 -->
<template lang="html">
  <div class="home">
    <div class="home-head">
      <div
        v-for="menu in menus"
        :key="menu.path"
        class="menu"
        :class="{ active: menu.path === activePath }"
        @click="$router.push({ path: menu.path })"
      >
        {{ menu.title }}
      </div>
    </div>
    <div class="home-body">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activePath: '', // 当前激活的菜单路径
      menus: [
        {
          name: 'rank',
          path: '/rank',
          title: '排行'
        },
        {
          name: 'optional',
          path: '/optional',
          title: '自选'
        }
      ]
    }
  },

  watch: {
    $route(to) {
      this.activePath = to.path
    }
  },

  created() {
    this.activePath = this.$route.path
  }
}
</script>

<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
}

.home-head {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #ebebeb;

  .menu {
    font-weight: 600;
    cursor: pointer;
    position: relative;
    height: 64px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;

    &.active {
      color: @color-primary;

      &::after {
        content: '';
        position: absolute;
        height: 3px;
        left: 0;
        width: 100%;
        bottom: 0;
        background: @color-primary;
      }
    }
  }

  .menu + .menu {
    margin-left: 48px;
  }
}

.home-body {
  padding: 32px;
  background: @color-bg;
}
</style>
