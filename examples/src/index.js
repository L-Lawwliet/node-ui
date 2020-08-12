import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'packages/lfn-css/src/index.less';
import Vue from 'vue';
import App from './App';
import router from './router.config';

import lfn from '../../src/index';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(lfn);
/* eslint-disable no-new */
new Vue({
  el: '#app-container',
  router,
  components: { App },
  template: '<App/>'
});
