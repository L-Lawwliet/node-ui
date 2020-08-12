import Http from './utils/http';
import Hello from '../packages/hello/Hello';
import Tables from '../packages/tables/Tables';
import ChooseMap from '../packages/choose-map/ChooseMap';


const install = (Vue) => {
  if (install.installed) return;
  Vue.component(Hello.name, Hello);
  Vue.component(Tables.name, Tables);
  Vue.component(ChooseMap.name, ChooseMap);
  Vue.prototype.$http = new Http({
    productionApi: 'https://market-sys.zberp.net/',
    developmentApi: 'http://test-market-sys.zberp.net/',
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  Hello,
  Http
};
