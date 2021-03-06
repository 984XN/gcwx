'use strict';
require('./check-versions')();

process.env.NODE_ENV = 'production';

const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config');
const webpackConfig = require('./webpack.prod.conf');

const spinner = ora('正在构建为线上项目……');
spinner.start();

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err;
  webpack(webpackConfig, (err, stats) => {
    spinner.stop();
    if (err) throw err;
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
        chunks: false,
        chunkModules: false
      }) + '\n\n'
    );

    if (stats.hasErrors()) {
      console.log(chalk.red('  构建出错了\n'));
      process.exit(1);
    }

    console.log(chalk.cyan('  构建成功！构建文件位于 dist/\n'));
    console.log(
      chalk.yellow(
        '  提示：构建的文件只能在 HTTP 服务器环境中运行，\n' +
          "        直接打开 index.html 是预览不了项目的！\n"
      )
    );
  });
});
