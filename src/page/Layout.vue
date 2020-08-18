<template>
  <div style="height:100%">
    <!-- 这是侧导航 -->
    <slide-bar></slide-bar>
    <div class="con-wrap">
        <!-- 这是顶部导航 -->
        <top-bar></top-bar>
        <!-- 这是组件要插入的地方 -->
        <router-view class="page-component-wrap"></router-view>
    </div>
  </div>
</template>
<script>
import TopBar from '@/components/TopBar'
import SlideBar from '@/components/SlideBar'
export default {
  name:"layout",
  components:{
    TopBar,SlideBar
  }
}
</script>

