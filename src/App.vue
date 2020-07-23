<template>
  <div id="app">
    <div class="app-nav"></div>
    <div class="app-body">
      <router-view />
    </div>
  </div>
</template>

<style lang="less" scoped>
.app-body {
  min-height: 100vh;
  background: #fff;
}
</style>
