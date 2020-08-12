# lfn-ui 开发手册

零烦恼团队内部组件库（基于element-ui框架）

## 目录结构

组件库目录

```
├── build                     webpack打包以及本地服务的文件都在里面
├── config                    不同环境的配置都在这里
├── docs                      主要用来存放说明文档
├── examples                  主要用来存放组件库的展示 demo 和 文档的所有相关文件
│   ├── assets                css，图片等资源都在这
│   ├── pages                 路由中所有的页面
│   ├── src
│   │   ├── components        demo中可以复用的模块放在这里面
│   │   ├── index.js          入口js
│   │   ├── index.html        页面入口
│   │   ├── App.vue           vue主入口文件
│   │   ├── router.config.js  路由js
├── lib                       组件库打包出来后的目录
├── node_modules              npm安装的依赖包都在这里面
├── packages                  主要用来存放所有组件
├── src                       管理组件的注册的主入口，工具，mixins等
│   ├── mixins                mixins方法存放在这
│   ├── utils                 一些常用辅助方法存放在这
│   ├── index.js              组件注册主入口
├── static                    被copy的静态资源存放地址
├── index.html                入口html
├── package.json              项目配置信息
├── README.md                 项目介绍
```

## 开发

```
npm run dev
```

## 校验

```
npm run lint
```

## 打包

打包所有

```
npm run build
```

打包JS

``` 
npm run build:lfn
```

打包CSS
```
npm run build:lfn-css
```

## 发布

登录npm

```
npm login
username: lfn
password: lfnAa123456
email: chenxiaomian@gainhon.com
```

**更新操作必须将package.json的version升级一个版本**

```
npm publish
```

## 开发进度

### 组件库

* [x] 地址坐标
* [ ] 导航栏
* [ ] 侧边栏
* [ ] 数据表格
* [ ] 导出excel
* [ ] 短信模板

### 工具

* [ ] axios封装
* [ ] 时间格式化
* [ ] 导出多页excel(流传递)
* [ ] zip下载