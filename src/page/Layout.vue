<template>
  <div style="height:100%">
    <!-- 这是侧导航 -->
    <slide-bar></slide-bar>
    <div class="con-wrap" :class="{conCollapse: isCollapse}">
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
  computed:{
    isCollapse(){
      return this.$store.state.common.isCollapse
    }
  },
  components:{
    TopBar,SlideBar
  }
}
</script>

