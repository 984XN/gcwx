# 藁城智慧党建微信端

开发：20180409 ~ 20180512

测试：20180514 ~ 

作者：root@upall.cn

## 开发

### 1.调试
``` bash
# 安装依赖
npm install

# 本机运行 localhost:8080
npm run dev

# 编译线上版本 /dist/
npm run build
```

### 2.工具
> 环境：vue + vue-router + vuex + vux + webpack + ESLint
> 工具：VS Code

> VS Code 插件：
> * ESLint - 语法检查
> * Vetur - Vue 支持
> * language-stylus - stylus 语法支持
> * Manta's Stylus Supremacy
> * Prettier - 代码格式化工具

```json
// VS Code 配置
{
  // 窗口标题栏
  "window.title": "${dirty}${activeEditorShort}${separator}${activeEditorMedium}${separator}${rootName}",
  // 欢迎页
  "workbench.startupEditor": "none",
  // 使用 sublime 的快捷键设置
  "sublimeTextKeymap.promptV3Features": true,
  // 此键可多光标
  "editor.multiCursorModifier": "ctrlCmd",
  // 缩进栏线
  "editor.rulers": [
    80,
    120
  ],
  // 行号栏一块高亮
  "editor.renderLineHighlight": "all",
  // 自动缩进
  "editor.detectIndentation": false,
  // TAB宽度
  "editor.tabSize": 2,
  // 用空格代替TAB
  "editor.insertSpaces": true,
  // 粘贴后自动格式化
  "editor.formatOnPaste": false,
  // 保存后自动格式化
  "editor.formatOnSave": false,
  // 显示空格
  "editor.renderWhitespace": "all",
  // 代码提示中优先显示 snippet
  "editor.snippetSuggestions": "top",
  // 插入代码段
  "editor.tabCompletion": true,
  // 控制键入时是否应自动显示建议(貌似代码片段功能需要这个)
  "editor.quickSuggestions": {
    "strings": true
  },
  // 字符串使用单引号
  "prettier.singleQuote": true,
  "element-helper.version": "2.3",
  // 按下TAB展开emmet缩写
  "emmet.triggerExpansionOnTab": true,
  // vue 文件的格式化工具
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  "vetur.format.defaultFormatter.stylus": "stylus-supremacy",
  // 写 stylus 时插入冒号
  "stylusSupremacy.insertColons": false,
  // 写 stylus 时插入分号
  "stylusSupremacy.insertSemicolons": false,
  // 写 stylus 时插入大括号
  "stylusSupremacy.insertBraces": true,
  // 并列的选择器新加一行
  "stylusSupremacy.insertNewLineBetweenSelectors": true,
  // 样式块中间空行
  "stylusSupremacy.insertNewLineAroundBlocks": false,
  "explorer.confirmDragAndDrop": false,
  "explorer.confirmDelete": false,
  "vetur.validation.template": false,
  "fileheader.Author": "Mr.User",
  "fileheader.LastModifiedBy": "Mr.User"
}
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

## 部署

1. 请确认没有忘记修改 package.json 中的版本号
1. 生成前需要修改的内容
  1. 文档预览服务器地址。此项目不能提供文档预览功能，需要重定向到文档服务器的地址，到 /config/dev.env.js、/config.prod.evn.js 中找 FILE_SERVER。
  1. 微信回调地址及其它微信相关参数的设置见：/src/config/index.js
1. 部署时需要代理以下3个地址到 API 服务器上的 / 上，Upload 可以使用链接：
  1. /Upload
  1. ~/Upload
  1. /api
1. 链接
	```shell
	mklink /d /j Upload ..\..\gczhdj.gov.cn/Upload
	```
	```shell
	ln -s ../../gczhdj.gov.cn/public_html/Upload Upload
	```
1. 代理方法参考：
    ```
    # Nginx:
    server {
      listen 443;
      server_name m.upall.cn;
      location / {
        root /webroot/m.upall.cn;
      }
      location /api {
        proxy_pass http://apiServer/;
      }
      location /Upload {
        proxy_pass http://apiServer/;
      }
      location /~Upload {
        proxy_pass http://apiServer/;
      }
    }
    ```

    ```xml
    <!-- IIS 7 -->
    <?xml version="1.0" encoding="UTF-8"?>
    <configuration>
      <system.webServer>
        <rewrite>
          <rules>
            <rule name="api" stopProcessing="true">
              <match url="^api/(.*)" />
              <action type="Rewrite" url="http://gczhdj.demo.honzh.com/{R:1}" />
            </rule>
            <rule name="upload">
              <match url="^Upload/(.*)" />
              <action type="Rewrite" url="http://gczhdj.demo.honzh.com/{R:0}" />
            </rule>
            <rule name="upload~">
              <match url="~/Upload/(.*)" />
              <action type="Rewrite" url="http://gczhdj.demo.honzh.com/Upload/{R:1}" />
            </rule>
          </rules>
        </rewrite>
      </system.webServer>
    </configuration>
    ```

## 维护

1. 自 20180512 起 1 年 内可提供技术支持，1年后就不要找我了，找也想不起来了
1. 代码中可能会出现以下情况，遇到后保持淡定不要大惊小怪：
  1. 拼写错误，比如 activities 的单数会是 activitie
  1. 同一个对象的属性既有大写开头也有小写开头，甚至同时出现全大写或全小写
  1. 单数并不代表单个，复数并不代表多个
  1. 名称只是一个代号，与实际功能并不一一对应，
  1. 数组并不代表一个列表，它可能只是索引用0的一个对象

-- 完 --