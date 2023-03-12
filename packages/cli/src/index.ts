import cac from 'cac'

import pkg from '../package.json'
import { actionBuild, actionDev } from './actions'

const cli = cac('plasticine-islands')

// build 命令
cli.command('build [root]', '构建产物').option('-o, --outdir <outdir>', 'Output directory').action(actionBuild)

// dev 命令
cli.command('dev [root]', '启动开发环境服务器').action(actionDev)

// 支持 `--help` 和 `-h` 显示帮助信息
cli.help()

// 支持 `--version` 和 `-v` 显示版本信息
cli.version(pkg.version)

cli.parse()
