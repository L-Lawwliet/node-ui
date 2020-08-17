import ActivityMan from '@/page/liveCircle/activityMan'
import AllySet from '@/page/allyMan/allySet'
import CashAccount from '@/page/account/cashAccount'
import ClassifyMan from '@/page/liveCircle/classifyMan'
import ClerkMan from '@/page/clerkMan'
import CommodityMan from '@/page/liveCircle/commodityMan'
import Index from '@/page/index'
import IntegralAccount from '@/page/account/integralAccount'
import IntegralPool from '@/page/account/integralPool'
import Layout from '@/page/Layout'
import LiveCircleMan from '@/page/liveCircle/liveCircleMan'
import ManageCoupon from '@/page/coupon/manageCoupon'
import MemberMan from '@/page/memberMan'
import MessageCenter from '@/page/messageCenter'
import ModelClass from '@/page/liveCircle/modelClass'
import NotFound from '@/page/NotFound'
import OrderList from '@/page/orderList'
import RebatesSet from '@/page/allyMan/rebatesSet'
import RecruitmentMan from '@/page/allyMan/recruitmentMan'
import Router from 'vue-router'
import RuleCoupon from '@/page/coupon/ruleCoupon'
import SetCoupon from '@/page/coupon/setCoupon'
import Signin from '@/page/Signin'
import StoresInfo from '@/page/storesInfo'
import Suggestion from '@/page/suggestion'
import UserList from '@/page/userList'
import Vue from 'vue'

//新增账号中心




Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/signin',
      meta: {
        requireAuth: false
      },
      component: Signin
    }, {
      path: '/',
      meta: {
        requireAuth: true
      },
      name: '',
      component: Layout,
      redirect: '/index',
      children: [{
          path: 'index',
          meta: {
            requireAuth: true
          },
          component: Index
        }, {
          path: 'storesInfo',
          meta: {
            requireAuth: true
          },
          component: StoresInfo
        },

        {
          path: 'clerkMan',
          meta: {
            requireAuth: true
          },
          component: ClerkMan
        },
        {
          path: 'liveCircle/classifyMan',
          meta: {
            requireAuth: true
          },
          component: ClassifyMan
        },
        {
          path: 'liveCircle/activityMan',
          meta: {
            requireAuth: true
          },
          component: ActivityMan
        },
        {
          path: 'liveCircle/modelClass',
          meta: {
            requireAuth: true
          },
          component: ModelClass
        },
        {
          path: 'allyMan/allySet',
          meta: {
            requireAuth: true
          },
          component: AllySet
        },

        {
          path: 'allyMan/rebatesSet',
          meta: {
            requireAuth: true
          },
          component: RebatesSet
        },
        {
          path: 'allyMan/recruitmentMan',
          meta: {
            requireAuth: true
          },
          component: RecruitmentMan
        },
        {
          path: 'liveCircle/liveCircleMan',
          meta: {
            requireAuth: true
          },
          component: LiveCircleMan
        },
        {
          path: 'liveCircle/commodityMan',
          meta: {
            requireAuth: true
          },
          component: CommodityMan
        },
        {
          path: 'memberMan',
          meta: {
            requireAuth: true
          },
          component: MemberMan
        },
        {
          path: 'messageCenter',
          meta: {
            requireAuth: true
          },
          component: MessageCenter
        },
        {
          path: 'suggestion',
          meta: {
            requireAuth: true
          },
          component: Suggestion
        },
        {
          path: 'account/integralPool',
          meta: {
            requireAuth: true
          },
          component: IntegralPool
        },
        {
          path: 'account/cashAccount',
          meta: {
            requireAuth: true
          },
          component: CashAccount
        },
        {
          path: 'account/integralAccount',
          meta: {
            requireAuth: true
          },
          component: IntegralAccount
        },
        {
          path: 'coupon/manageCoupon',
          meta: {
            requireAuth: true
          },
          component: ManageCoupon
        },
        {
          path: 'coupon/ruleCoupon',
          meta: {
            requireAuth: true
          },
          component: RuleCoupon
        },
        {
          path: 'coupon/setCoupon',
          meta: {
            requireAuth: true
          },
          component: SetCoupon
        },
        {
          path: 'orderList',
          meta: {
            requireAuth: true
          },
          component: OrderList
        },
        {
          path: 'userList',
          meta: {
            requireAuth: true
          },
          component: UserList
        },

      ]
    },

    {
      path: '*',
      meta: {
        requireAuth: true
      },
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 判断该路由是否需要登录权限
  // if (to.meta.requireAuth) {
  //   if (localStorage.getItem('access_token')) {
  //     next()
  //   } else {
  //     next('/signin')
  //   }
  // } else {
  // next()
  // }
  let token = localStorage.getItem('access_token');
  if (token) {
    if (to.path == '/signin') {
      localStorage.removeItem('access_token');
      next();
    } else {
      next();
      // store.commit("setFunId",to.meta.FunId);
      // getPowerList(to.meta.FunId, next);
    }
  } else {
    if (to.path == '/signin') {
      localStorage.removeItem('access_token');
      next();
    } else if (to.path == '/404') {
      next({
        path: '/signin'
      });
    } else {
      next();
    }
  }

})
export default router
