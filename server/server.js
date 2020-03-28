import React from "react"
import { renderToString } from "react-dom/server"
import path from 'path'
var minify = require('html-minifier').minify;
import LRU from 'lru-cache';
const fs = require('fs-extra');
const chalk = require('chalk');
import { Provider, useStaticRendering } from 'mobx-react';
import express from 'express';
import compression from 'compression';

const port = process.env.PORT || 8888;

import SSR_entry from '../client/src/page/ssr.entry'

function readFileContent(pathStr) {
  pathStr = path.resolve(process.cwd(), pathStr)
  if (fs.existsSync(pathStr) && fs.statSync(pathStr).isFile()) {
    const result = fs.readFileSync(pathStr).toString()
    return result
  }
}

useStaticRendering(true); // Mobx 的官方方法，防止多次渲染，避免内存泄漏
/**
 * 设置缓存工作方法的相关属性
 */
const microCache = new LRU({
  max: 100, // 缓存数量
  maxAge: 2000 // 缓存时间（毫秒）
});

const app = express();
app.use(compression());

app.use('/js', express.static(path.join(__dirname, '../dist/js')));
app.use('/css', express.static(path.join(__dirname, '../dist/css')));
app.use('/images', express.static(path.join(__dirname, '../dist/images')));

app.get('*.html', async (req, res) => {
  let { url } = req;
  const start = Date.now();

  if (url == '/') url = '/index.html';
  const hit = microCache.get(url);
  if (hit) { // 判断是否存在缓存，有则返回缓存，无则默认实时编译返回
    console.log(chalk.red.bold(`--> ${req.url}  ${Date.now() - start}ms, 使用的是缓存`));
    return res.end(hit);
  }

  const { App, Store } = SSR_entry[url];
  const { data } = await App.asyncDate();
  Store.replace(Object.assign(Store, data));

  const content = renderToString(<Provider $store={Store}>
    <App />
  </Provider>);

  const tpl = readFileContent(`./dist/${url}`);
  let html = tpl.replace('<div id="root"></div>', `<div id="root">${content}</div><script>window.__INITIAL_STATE__ = ${JSON.stringify(data)}</script>`);

  html = minify(html, {
    collapseWhitespace: true
  })
  console.log(chalk.blue.bold(`--> ${req.url}  ${Date.now() - start}ms, 使用的是非缓存`));

  microCache.set(url, html);

  res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });//设置response编码为utf-8
  return res.end(html);
});

app.get('/', function (req, res) {
  res.redirect('/index.html');
});

app.listen(port, () => {
  console.log(`施主，莫急，${port}号技师为您服务！！！`)
  console.log(chalk.red.bold(`
      ==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`
  ));
})







