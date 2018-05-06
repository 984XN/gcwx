# 藁城党建微信端

> vue + vue-router + vuex + vux + webpack + ESLint

##项目

开始时间：20180409

结束时间：

## 开发

``` bash
# 安装依赖
npm install

# 本机运行 localhost:8080
npm run dev

# 编译线上版本 /dist/
npm run build
```

## 目录

```
.
├─build  // webpack 的配置文件
├─config // webpack 项目配置文件
├─dist   // build 的线上用代码会出现在这里
├─src    // 项目源码
│  ├─api // 服务接口
│  ├─assets
│  │  ├─font
│  │  └─img
│  ├─components // 公用组件
│  ├─config     // 项目配置文件
│  ├─filter     // 模板和组件的过滤器
│  ├─function   // 项目公共函数
│  ├─router     // 项目路由
│  ├─store      // vuex
│  └─view
│      ├─activity // 互动专区
│      ├─article  // 学习平台
│      ├─login    // 登录入口（PC端和微信端）
│      └─user     // 个人中心
└─static // 项目公用静态文件
```

-- 完 --