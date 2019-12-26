# Seed-Client-Shell

  Seed Client桌面应用程序之Electron壳程序。

## 环境

  * Node: V10.13.0
  * Npm: V6.4.1
  * Electron: V6.1.1

## 开发调试

1. 代码克隆到本地后，安装依赖
  
    ` npm install `

2. 启动Angular前端程序，打开`src\shell-config.json`文件，将`debug`属性改为`true`

3. 按`F5`启动调试程序

## 打包发布

1. 将`package-lock.json`和`package.json`中的`version`修改为要发布的版本号

2. 将`src\shell-config.json`文件中`debug`和`devTool`属性改为`false`

3. 卸载掉的`seed-client`, 安装最新版本

    `npm uninstall seed-client`

    `npm install seed-client --save`

4. 打windows安装包

    `npm run pack`



