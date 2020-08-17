<template>
  <div id="sidebar-wrap" :class="{ collapsed: toggSliderBar }">
    <img class="logo" src="https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/b09f82ee76e4118c2a1d244b0f492b08_121_121.jpg" />
    <div class="userName">{{userName}}</div>
    <el-menu background-color="#324157" text-color="#ddd" :default-active="$route.path" :unique-opened="isUnique" :router="isRouter" mode="vertical" :collapse="toggSliderBar">
      <template v-for="item in menu">
        <el-submenu v-if="item.children.length !== 0" :index="item.router" :key="item.router">
          <template slot="title">
            <span slot="title">{{item.name}}</span>
          </template>
          <el-menu-item v-for="child in item.children" :index="child.router" :key="child.router">
            <span slot="title">{{child.name}}</span>
          </el-menu-item>
        </el-submenu>

        <el-menu-item v-else :index="item.router" :key="item.router">
          <span slot="title">{{item.name}}</span>
        </el-menu-item>

      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "sidebar",
  data() {
    return {
      userName: localStorage.userName || "",
      isUnique: true,
      isRouter: true,
      menu: [
        {
          name: "门店信息",
          router: "/storesInfo",
          children: []
        },
        {
          name: "系统用户管理",
          router: "/userList",
          children: []
        },
        {
          name: "店员管理",
          router: "/clerkMan",
          children: []
        },
        {
          name: "盟友管理",
          router: "/allyMan",
          children: [
            {
              name: "盟友设置",
              router: "/allyMan/allySet"
            },
            {
              name: "返利设置",
              router: "/allyMan/rebatesSet"
            },
            {
              name: "招募管理",
              router: "/allyMan/recruitmentMan"
            }
          ]
        },
        {
          name: "会员管理",
          router: "/memberMan",
          children: []
        },
         {
          name: '优惠券管理',
          router: '/coupon',
          children: [{
          name: '发券规则',
          router: '/coupon/ruleCoupon',
        },
        {
          name: '优惠券设置',
          router: '/coupon/setCoupon',
        },
         {
          name: '优惠券管理',
          router: '/coupon/manageCoupon',
        }]
        },
        {
          name: '商品券管理',
          router: '/orderList',
          children: []
        },
         //新增
        {
          name: "生活圈管理",
          router: "/liveCircle",
          children: [
            {
              name: "基本信息",
              router: "/liveCircle/liveCircleMan"
            },
            {
              name: "分类管理",
              router: "/liveCircle/classifyMan"
            },
            {
              name: "型号分类管理",
              router: "/liveCircle/modelClass"
            },
            {
              name: "商品管理",
              router: "/liveCircle/commodityMan"
            },
            {
              name: "活动管理",
              router: "/liveCircle/activityMan"
            }
          ]
        },
        {
          name: "账户管理",
          router: "/account",
          children: [
            {
              name: "积分池",
              router: "/account/integralPool"
            },
            {
              name: "现金账户",
              router: "/account/cashAccount"
            },
            {
              name: "积分账户",
              router: "/account/integralAccount"
            }
          ]
        },
        {
          name: "消息中心",
          router: "/messageCenter",
          children: []
        },
        {
          name: "客服反馈",
          router: "/suggestion",
          children: []
        }
      ]
    };
  },
  computed: {
    toggSliderBar() {
      return this.$store.state.common.isCollapse;
    }
  },
  mounted() {
    //  this.getUserMenu()
  },
  methods: {
    getUserMenu() {
      let menu1 = {
        name: "售前人员管理",
        router: "/SalesmanList",
        icon: "el-icon-time",
        children: []
      };
      let menu2 = {
        name: "推荐记录",
        router: "/RecommendList",
        icon: "el-icon-time",
        children: []
      };
      if (localStorage.isSuper == 1) {
        this.menu.push(menu1);
        this.menu.push(menu2);
      } else {
        if (localStorage.mgrSaleUserFlag == 1) {
          this.menu.push(menu1);
        }
        if (localStorage.viewTuiJianRecordFlag == 1) {
          this.menu.push(menu2);
        }
      }
    }
  }
};
</script>
<style scoped lang="less">
#sidebar-wrap {
  width: 200px;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background: #324157;
  z-index: 5;
  transition: all 0.3s;
  overflow-x: hidden;
  overflow-y: auto;
  font-size: 14px;
  .logo {
    display: block;
    margin: 30px auto 10px;
    border-radius: 50%;
    height: 90px;
    width: 90px;
  }
  &::-webkit-scrollbar {
    display: none;
  }
}

// 动态改变左侧导航包裹层宽度
#sidebar-wrap.collapsed {
  width: 64px;
  transition: all 0.3s;
}

// 美化左侧导航的留白
.el-submenu .el-menu-item {
  padding: 0 20px;
  min-width: 160px;
  padding-left: 20px !important;
}
.userName {
  text-align: center;
  color: #fff;
}
</style>
