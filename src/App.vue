<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
<style lang="less">
@import "./assets/css/public.less";
  #app {
    height: 100%; 
    overflow: hidden;
    .con-wrap {
      height: 100%;
      padding-left: 200px;
      transition: all 0.3s;
      background: #F7F7F7;
      h3 {
        margin-top: 0;
        color: #324157;
      }
      .page-component-wrap {
        padding: 30px;
        height: calc(100% - 124px);
        overflow: auto;
      }
    }
    .con-wrap.conCollapse {
      padding-left: 64px;
      transition: all 0.3s;
    }
  }
</style>
