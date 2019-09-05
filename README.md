# 小程序质量球

## 插件背景

使小程序端 bug 集中到[tracup](https://www.tracup.com/)上，便于管理

## 使用说明

1. 下载该插件将其放置在项目文件的根目录
2. 在 app.json 中全局引入 quality-ball/component/component
3. 各个页面中引用该组件
4. 在 quality-ball/view/view 中更改参数 uKey、_api_key、pKey，他们分别代表 tracup 账号信息凭证 User Key、tracup 账号信息凭证 API Key、项目 pKey
5. 全局隐藏直接在quality-ball/component/component设置display: none
