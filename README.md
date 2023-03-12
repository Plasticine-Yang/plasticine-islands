# plasticine-islands

基于 [islands 架构](https://www.patterns.dev/posts/islands-architecture/) 实现的 SSG 框架

## Features

- 开发环境下支持 SPA 客户端渲染
- 生产环境下支持 SSG 方式构建
- build 命令支持 `-o, --outdir` 参数，用于配置产物输出保存目录

## Usage

```shell
pnpm i @plasticine-islands/cli

# 以 docs 目录作为 root 目录启动开发环境服务器
pnpm plasticine-islands dev docs

# 以 docs 目录作为 root 目录进行 SSG 构建
pnpm plasticine-islands build docs
```
