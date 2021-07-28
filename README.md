# Kaisa

一款轻量级的项目框架，基于 [React](https://github.com/facebook/react)、[Mobx](https://github.com/mobxjs/mobx) 和 [React Navigation](https://github.com/react-navigation/react-navigation)

---

## 特性

- **快速上手**，只要您了解 `react`、`mobx` 和 `react-navigation`，就可以快速搭建 APP
- **路由系统**，基于 `react-navigation` 实现的路由系统
- **Loading**，不需要重复写按钮 `Loading` 判断
- **国际化**，基于 `react-intl-universal` 实现的国际化
- **网络请求**，基于 `axios` 实现的请求拦截
- **页面交互**，基于 `mobx` 实现的数据交互方式
- **代码规范校验**，使用 `eslint`、`lint-staged`、`prettier`、`stylelint`
- **模拟请求数据**，基于 `mockjs` 实现

## 开始

```
$ git clone https://github.com/xuya227939/kaisa.git

$ brew install cocoapods（macOS）

$ cd kaisa

$ npm i || yarn install

$ npx pod-install ios

$ npx react-native run-ios
```

## FAQ

1. 启动的时候，会有 map 报错，如下图

![WechatIMG2599](./WechatIMG2599.png)

![WechatIMG2500](./WechatIMG2600.png)

![WechatIMG2501](./WechatIMG2601.png)

这是由于 Amap 地图组件没有兼容新版，把这些报错代码删除即可

2. 如果 npm i 报错，请使用 yarn install

## License

[MIT](https://tldrlegal.com/license/mit-license)
