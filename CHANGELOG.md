# plasticine-islands

## 0.0.1

- feat(cli): 支持 build 命令
- feat(cli): 添加 build 命令的 -o, --outdir 参数, 用于配置产物输出保存目录

- 2d1afa1: feat(core): 开发环境服务器集成 vite-plugin-dev-server-html 插件
- feat(core): 支持配置构建产物的保存目录
- feat(core): 支持客户端渲染

- feat(types): 添加 build 命令的 options 类型
- feat(types): [core] 添加 build 的 server-entry 模块类型
- feat(types): [vite-plugin-dev-server-html] 添加插件选项参数 clientEntryPath
- 2d1afa1: feat(types): 添加 vite-plugin-dev-server-html 插件的参数类型
- feat(types): [core] 添加 build 的 html ejs 数据类型

- 2d1afa1: feat(vite-plugin-dev-server-html): 添加为 vite 开发环境服务器注入入口 html 的 vite 插件
- feat(vite-plugin-dev-server-html): 支持注入加载客户端运行时代码的 script 标签到生成的 html 中
- feat(vite-plugin-dev-server-html): 注入 vite 内置的 html transform 处理后的运行时代码
