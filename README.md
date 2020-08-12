# lfn-ui

零烦恼团队内部组件库（基于element-ui框架）

## 安装

由于该组件库是基于element-ui框架，得先[安装element-ui](https://element.eleme.cn/2.8/#/zh-CN/component/quickstart) 

```
npm install lfn-ui --save
```

## 使用

`main.js`

```
import lfn from 'lfn-ui';

Vue.use(lfn)
```

`hello.vue`
```
<lfn-hello message="component library"></lfn-hello>
<lfn-table></lfn-table>
```