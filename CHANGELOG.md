# plasticine-islands

## 0.0.3

### Features

- feat: 支持以虚拟模块的方式让前端应用使用 SiteConfig 的数据
- feat: 配置文件热更新

### Fix

- fix: 单独导出 defineConfig, 解决无限死循环执行 build action 的问题

## 0.0.2

### Features

- ae730c4: feat: 支持解析配置文件 plasticine-islands.config.ts 和 .js
- refactor: 移除 build 命令的 option 参数

### Fix

- ae730c4: fix(core): 修复 build 时 fs-extra 的导入错误问题

## 0.0.1

### Features

- 开发环境下支持 SPA 客户端渲染
- 生产环境下支持 SSG 方式构建
- build 命令支持 `-o, --outdir` 参数，用于配置产物输出保存目录
