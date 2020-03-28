# 简介
网上能用好用的脚手架一大堆，我又为什么要重复的做这个东西呢？

首先，我认为一个自己经常使用的东西，自己是有必要去了解的，是可以随心所欲的为已所用的，是可以随手增减改造的。还好，「webpack」的官方文档写得还行，我可以选择造一个更适合自己的，更简洁明了的，一步到位的。

当然还有我认为最重要的"规范"，这些规范分为三类："目录结构规范"、"代码规范"、"组件规范"。其实没有这些规范也能完成项目，但终究只是自己一时写得爽快，对于接手的人来说，肯定会花费大量时间在熟悉项目代码上，因为我认识的人，包括我自己都是这样过来的。如果是在多人项目中，那整个项目就更是混乱，需要花费较多的时间在不必要的沟通上。这时如果有一个统一遵循的标准在，应该可以极大的避免这种问题。

「Server-Side-Render」这个功能我也给做到里面去了。现在还是有许多的前端项目十分注重 'SEO'，如果我们还想继续使用现在流行的框架，就只能通过「服务端渲染」来满足 'SEO' 这个需求了。我选择做到一起的原因是，「客户端渲染」和「服务端渲染」在写法上差异性并不是很大，完全可以只写一套代码，慢慢决定采用「客户端渲染」还是「服务端渲染」。

### 使用
```text

cnpm i             // 首先需要安装依赖

npm run dev        // 运行开发模式

npm run ssr        // 运行SSR模式【包含 npm run build  和  npm run server 】




// npm run build      // 打包生成静态文件
// npm run server     // 打包生成静态文件

```

### 目录结构
'/server'
这个文件下面都是跑在服务端的，因为其中包含 'react' 代码，所以会提前使用 'webpack' 打包后再运行。结构比较简单，可以很方便的拓展来支持更多的服务端需求。

'/src'
这个下面就全都是前端项目文件。对于项目中的文件放置问题，还是有必要做好分类放置的。在我们的工作中，不可避免的都会接手别人的项目，或者是多人项目，都会花比较长的时间来了解项目或者沟通上。一个管理混乱的项目，不管是谁都不想碰到的。

所以我们需要对整个项目的结构做一定的约束，统一管理起来。

- index.js 自然不用说，属于项目入口的文件，所有的起点都在这里，统一做一些初始化工作，例如加载各种依赖、加载状态管理库等等
- assets '公共'资源文件。请注意公共二字我特别打上了重点，其原因是很多开发人员将组件级别的资源文件放置到了公共资源文件进行统一的管理，但是在实践中我并不认为这是一个特别好的选择。与组件强依赖的资源文件我认为和组件一起放置在一个文件夹内，能够更快、更容易的进行管理。只有通用的公共文件才会放在这里来。
- pages 和 components 文件夹，前者放置的是页面以及页面强依赖的组件，例如注册页面 login，用户管理界面 user 等等。后者则放置的是公共组件。与公共资源文件一样，强依赖的组件就应该和其页面在同一个文件夹中去管理。

```text
├── build                       // webpack 配置相关
│   ├── webpack.base.conf.js    // 基础webpack配置，被其他配置所依赖
│   ├── webpack.dev.conf.js     // 「webpack-dev-server」配置，本地开发使用
│   ├── webpack.prod.conf.js    // 打包静态文件配置
│   ├── webpack.client.conf.js  // 「ssr」客户端的配置
│   └── webpack.server.conf.js  // 「ssr」服务端的配置
├── server                      // 服务端相关
│   ├── controller              // 控制器，用于数据处理返回
│   │   └── default.js          // 默认返回资源--在服务端生成页面
│   ├── util                    // 工具类文件
│   └── index.js                // 服务端入口
└── src                         // 客户端相关
    ├── assets                  // 公共资源文件
    ├── components              // 项目公共组件
    ├── options                 // 一些辅助的文件
    ├── controller              // 控制器，用于数据管理
    ├── pages                   // 页面具体逻辑
    ├── router                  // 路由
    ├── store                   // 状态管理
    ├── util                    // 工具类文件
    ├── index.html              // 需要提前写入的html配置，都可以写在这里面，所有生成的新html文件都以这个为基础
    ├── index.js                // 项目入口
    └── ssr.entry.js            // 「ssr」项目入口
```

### 代码规范
代码规范工具使用的是「eslint」，代码规则来源的是据说最严格的「airbnb」，当然最严格的并不一定是最好的，所以我也根据我个人的习惯修改了部分的规则。如果你在使用中对其中的规则有自己看法、有意见，也可以提给我，我们一起来修改「代码规则」，让它用起来更得心应手。

「eslint」的依赖和配置这里都已弄好了，只需要在你的编辑器上面安装「eslint」插件即可使用，目前「webstorm」、「vscode」等主流的编辑器上都有这款插件，我使用的是「atom」。

规则写在 '/.eslintrc' 中，如果你需要，可以直接修改。如果你不知道该如何添加修改，可以上这里看看[eslint中文](http://eslint.cn/)。

### 组件规范
每个人对于如何分组件的看法都不一样，但还是有个公认的做法，那就是单个文件不应该超过 250 行代码（不包含注释），对于目前的框架而言，250 行能够做成很多很多的事情，超过 250 行的 js 文件，应该思考如何进行拆分、剔除重复性逻辑。

当然你也可以参考有人气的 UI 框架（例如 antd、element），结合自己的使用感受，学习他们是如何做组件的，能在一大堆产品的脱颖而出，说明在使用上存在明显的优势，我有时候也会模仿他们的组件来开发。

### 可配置项
这一块写的是这个脚手架所有的可配置项（不包括服务端渲染部分，这部分下面另写），还有一些没写出来的，无关紧要的，自己搜索一下关键字也能了解如何配置。

#### /build/webpack.base.conf.js
这个是 webpack 的基础配置文件，被其他配置文件所依赖，有下列几个可配置部分：

1、输出文件路径

```javascript
output: {
    path: path.resolve(__dirname, '../dist/', 'static'),
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[name].[hash:8].js',
    publicPath: '/static/' // 这里可设置项目 '绝对路径' 和 '相对路径'
},
```

2、loader 相关

这里放置的都是loader相关的配置，使用了 'sass'、'postcss' 等，如需其他配置，请自行添加，可参考[loader](https://webpack.docschina.org/concepts/loaders/#%E7%A4%BA%E4%BE%8B)。

```javascript
module: {
    rules: [
        {
            test: /.(js|jsx)$/,
            use: [
                {
                    loader: 'happypack/loader?id=happyBabel'
                }
            ],
            exclude: [
                path.join(__dirname, '../node_modules')
            ]
        },
        {
            test: /\.(sa|sc|c)ss$/,
            use: [
                devMode ? MiniCssExtractPlugin.loader : 'style-loader',
                'css-loader',
                'postcss-loader',
                'sass-loader'
            ]
        },
        {
            test: /\.(png|jpeg|jpg|gif)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 5 * 1024, // 小于 5k 的转成 base64 格式，大于的生成图片放到 image 中
                        outputPath: 'images',
                    }
                }
            ]
        },
        {
            test: /\.(svg|bmp|eot|woff|woff2|ttf)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 5 * 1024,
                        outputPath: 'fonts',
                        publicPath: '../fonts/' // 因为引入位置在 css 中，所以单独设置相对路径
                    }
                }
            ]
        }
    ]
},
```

3、resolve

这些选项能设置模块如何被解析，自行设置请参考[模块解析](https://webpack.docschina.org/configuration/resolve/#src/components/Sidebar/Sidebar.jsx)。

```javascript
resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
        '@': path.join(__dirname, '..', 'src')
    }
},
```

4、统计信息

因为打包后的输出统计信息太多了，所以我把一些信息给关掉了，自行设置请参考[统计信息](https://webpack.docschina.org/configuration/stats/#stats)。

```javascript
stats: {
    children: false,
    modules: false,
    warnings: false
},
```

5、插件

提取 css 等样式文件：[MiniCssExtractPlugin](https://webpack.js.org/plugins/mini-css-extract-plugin/)

多核心打包，提升打包速度的，小项目提升不明显：[HappyPack](https://github.com/amireh/happypack)

没什么用，显示打包进度条：[ProgressBarPlugin](https://www.npmjs.com/package/progress-bar-webpack-plugin)

```javascript
plugins: [
    new MiniCssExtractPlugin({
        filename: devMode ? 'css/[name].[hash:8].css' : 'css/[name].css',
        chunkFilename: devMode ? 'css/[id].[hash:8].css' : 'css/[id].css'
    }),
    new HappyPack({
        id: 'happyBabel',
        loaders: [{
            loader: 'babel-loader?cacheDirectory=true'
        }],
        threadPool: happyThreadPool,
        verbose: true
    }),
    new ProgressBarPlugin({
        format: `build [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
        clear: false
    })
]
```

#### /build/webpack.dev.conf.js
1、devServer

webpack-dev-server 配置，参考[devServer](https://webpack.docschina.org/configuration/dev-server/)。

```javascript
devServer: {
    contentBase: path.join(__dirname, '../dist'), // 告诉服务器从哪个目录中提供内容
    publicPath: '/',
    compress: true, // 服务是否启用 gzip 压缩
    host: ip,
    port: 9090,
    hot: true, // 启用 webpack 的模块热替换特性
    inline: true, // 启用内联模式
    open: true, // 自动打开浏览器
    clientLogLevel: 'warning', // 使用内联模式时，会在开发工具(DevTools)的控制台(console)显示消息
    quiet: true, // 除了初始启动信息之外的任何内容都不会被打印到控制台
    historyApiFallback: true,
    // proxy: { // 本地代理
    //     '/api': {
    //         target: 'http://10.100.4.63:3000',
    //         // pathRewrite: { '^/api': '' },
    //         changeOrigin: true
    //     }
    // }
},
```

2、插件

webpack 内置的热替换模块，无需设置，可作了解：[HotModuleReplacementPlugin](https://webpack.docschina.org/plugins/hot-module-replacement-plugin/#src/components/Sidebar/Sidebar.jsx)

启用 HotModuleReplacementPlugin 时，此插件将显示模块的相对路径。无需设置，建议用于开发：[NamedModulesPlugin](https://webpack.docschina.org/plugins/named-modules-plugin/#src/components/Sidebar/Sidebar.jsx)

生成 html 用的：[HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin#options)

```javascript
plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, '../src/index.html'),
        inject: true,
        hash: true,
    }),
]
```

#### /build/webpack.prod.conf.js
1、optimization（优化）

splitChunks 用来分割模块打包，根据 splitChunks.cacheGroups 下的对象里面的条件进行分割的，具体的分割条件可查看[一步一步的了解webpack4的splitChunk插件](https://juejin.im/post/5af1677c6fb9a07ab508dabb)这篇文章，写得比较详细。

minimizer 在 production 模式下对代码进行压缩，因为某些原因，这里我从新引入两个更高效率的压缩插件。

```javascript
optimization: {
    runtimeChunk: {
        name: 'manifest'
    },
    splitChunks: {
        cacheGroups: {
            commons: {
                chunks: 'initial', // initial、async和all(默认是async)
                minChunks: 2, // 超过引用次数的会被分割（默认是1）
                maxInitialRequests: 5, // 最大初始化请求书，默认3
                minSize: 0 // 形成一个新代码块最小的体积(默认是30000)
            },
            // vendor: {
            //     test: /[\\/]node_modules[\\/]/, // 用于控制哪些模块被这个缓存组匹配到。原封不动传递出去的话，它默认会选择所有的模块。可以传递的值类型：RegExp、String和Function
            //     chunks: 'all',
            //     name: 'vendor', // 打包的chunks的名字(字符串或者函数，函数可以根据条件自定义名字)
            //     priority: -20, // 缓存组打包的先后优先级
            //     enforce: true
            // },
            styles: {
                name: 'styles',
                test: /\.css$/,
                chunks: 'all',
                enforce: true
            }
        }
    },
    minimizer: [
        new OptimizeCSSAssetsPlugin({}),
        new WebpackParallelUglifyPlugin({
            uglifyJS: {
                output: {
                    beautify: false, // 不需要格式化
                    comments: false // 不保留注释
                },
                compress: {
                    warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
                    drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
                    collapse_vars: true, // 内嵌定义了但是只用到一次的变量
                    reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
                }
            }
        })
    ]
},
```

2、插件
这俩插件比较常见，可自行搜索查看详细信息。
```javascript
plugins: [
    new CleanWebpackPlugin(
        ['dist/'],
        {
            root: path.join(__dirname, '../'),
            verbose: true,
            dry: false
        }
    ),
    new HtmlWebpackPlugin({
        // favicon: path.join(__dirname, '../src/favicon.ico'),
        filename: path.join(__dirname, '../dist/index.html'),
        template: path.join(__dirname, '../src/index.html'),
        inject: true
    })
]
```

#### /package.json
这个文件里面有一个对象是可以设置的，针对的是 autoprefixer 自动补全插件、babel 转码器等需要判断兼容版本的工具，所以我们可以自动的去适应大部分的浏览器。下面的这个设置项的意思是「使用量大于1%，浏览器的最后两个版本，不小于ie8」，所以最后打包出来的项目会自动补全 css 前缀到适应这个范围内。

当然这个插件并不是万无一失的，还是会有一些版本的浏览器的某些 css，是无法补全前缀来实现功能的，在开发中要多加注意像 ie 这种异类，然后在一些手机端项目上，主流浏览器上，都可以放心的去开发。

你可以在这里面加上我们常用的配置，例如："iOS >= 8",, "Android > 4.4", "Firefox >= 20" 等，我们在开发中需要特别针对的浏览器版本，查看[Browserslist](https://github.com/browserslist/browserslist#best-practices)了解更多配置列表。

```json
"browserslist": [
  "> 1%",
  "last 2 versions",
  "not ie <= 8"
]
```

# 服务端渲染
前端渲染面临的主要问题有两个：SEO、首屏性能。如果你们的项目并不重视这两个问题，那就没必要用「服务端渲染」，自己个人尝试和了解还是不错的。

「服务端渲染」最核心的是 'renderToString' 这个服务端方法，在服务端收到请求后能迅速的把项目代码转换成静态的 DOM 结构页面，然后直接返回给浏览器就好了，这样就是一个简单的服务端渲染。当然这只是最理想的状态，实际上我们需要考虑得更多，例如：页面加载时的数据该怎么处理、服务器的性能该如何兼顾、资源该如何加载等，这些在下面我都会一一介绍。

「服务端渲染」是我在上面的脚手架完成后才加入的，所以在结构上来说，「服务端渲染」完全依赖「客户端渲染」的配置，把「服务端渲染」相关的内容全部删掉，也不会影响到脚手架的基本功能。

### 使用
```text


npm i                  // 首先需要安装依赖

npm start              // 仍然使用 webpack-dev-server 作为开发模式，你需要把下面的「写法差异&数据处理」这一部分好好看看

npm run ssr-client     // 打包服务端渲染客户端静态文件

npm run ssr-server     // 打包服务端渲染服务端静态文件

npm run ssr-start      // 运行打包好的服务端静态文件

npm run ssr            // 或者你可以一次运行上面的三个命令

npm run inspect        // 运行服务端谷歌浏览器调式模式（同样需要客户端和服务端静态文件，只是 ssr-start 加了个 inspect 属性）

```

### 写法差异&数据处理
「服务端渲染」最直观的理解就是把完整的静态页面返回给客户端，包括页面的数据。

在服务端运行代码的时候，react 的生命周期只进行到 componentWillMount，之后的从 componentDidMount 开始在浏览器开始执行。

因为「服务端渲染」是需要在页面请求的时候把完整的页面传回去，包括你向后端请求的数据，所以我们需要在服务端把数据请求好，和页面一起传回去。

所以因为这一点，造成了我们在页面加载时请求的数据，需要用其他方法来处理，我们需要在服务端运行的时候捕获需要完成的任务，在这里我们定义了一个 'asyncData' 的异步方法，这样的就可以在服务端接收到请求时，主动去把当前请求页面的 'asyncData' 方法捕获出来并完成这个任务，然后再统一返回数据。

同时我们需要一个状态管理工具，这里我用的是 '[Mobx](https://cn.mobx.js.org/)'，在服务端将请求好的数据存储起来，一起传给浏览器端并同步数据，这样就能保持数据的一致性。

其实我们还是可以在前端渲染和服务端渲染统一写法，因为需要提前请求数据的方法都是通过静态方法 asyncData 来调用的，所以我们可以在 componentDidMount 里面来调用静态方法 asyncData，只需要写好满足调用条件就可以，例如： 可以判断store有没有数据、或者在store里面设置状态值（pending, status）等，来避免多余触发。这样就可以提前写好，想用哪种渲染方法都可以。

下面这一段是比较简单的服务端渲染的写法，可作参考。

```javascript
// /src/pages/a.js
@inject('a') @observer
class A extends Component {
    @action static asyncData = store => Promise.all([
        store.a.plus()
    ])

    constructor(props) {
        super(props);
        this.store = props.a;
    }

    componentDidMount() {
        if (!this.store.num) {
            A.asyncData(this.props);
        }
    }

    render() {
        const { num, minus, plus } = this.store;

        return (
            <div>
                <div>{num}</div>
                <button type="button" onClick={minus}>-</button>
                <button type="button" onClick={plus}>+</button>
            </div>
        );
    }
}
```

### 可配置项

因为是在前端渲染的基础上面做的这个服务端渲染，所以会存在相似但是有差异性的文件，这方面需要多注意。

#### /build/webpack.client.conf.js
这个是服务端打包的静态文件配置，依赖于 '/build/webpack.prod.conf.js' ，只是重新定义了入口文件，还有就是加了一个获取生成文件信息的插件。

#### /build/webpack.server.conf.js
用来打包 '/server' 下的服务端文件，生成可以在 node 环境下运行的文件，这个配置是用 '/build/webpack.base.conf.js' 文件修改得来的，如果你需要修改，请多关注这两个文件的异同性，小心修改，保证处理项目文件的相同功能。可以先看看[webpack文档](https://webpack.docschina.org/concepts)学习一下。

#### /src/ssr.entry.js
服务端静态文件打包入口文件，和 '/src/index.js' 入口文件类似，但多了一些服务端的相关配置（同步合并数据、代码分割相关），修改时也请对两个文件同时修改。

### 服务端相关

#### /server/index.js
服务端入口文件，这里面写的都是 express 相关，其中有一个随手写的测试用的接口，不需要的话请直接删除。

#### /server/controller/default.js
这里面写的是接口的默认处理的方法，根据请求链接返回相应的页面数据。

使用最核心的 'renderToString' 来实时编译成 dom 结构数据，但有两个前提需要满足：
- 需要使用 StaticRouter
- 需要插入 mobx 的 store 数据
- 使用 getLoadableState 方法来生成页面按需加载的状态信息
- 处理当前请求页面的 asyncData 静态方法，并在方法完成后通过 renderToString 方法，编译生成带有页面数据、页面状态的 dom 结构字符串

这样就生成的页面的 dom 结构字符串，我们只需要拼接好头部、尾部就完成了一个带有数据状态的页面。

这里有两个配置需要注意一下，一个是缓存策略。我这里使用的「[LRU-cache](https://www.npmjs.com/package/lru-cache)」来进行缓存的，你可以看看前面的介绍进行个性化配置，或者你可以看看这里 [micro-caching](https://www.nginx.com/blog/benefits-of-microcaching-nginx/)。另一个是我下面写到的 'isCacheable' 方法，在这里你可以根据请求来判断是否要做缓存处理。


```javascript
useStaticRendering(true); // Mobx 的官方方法，防止多次渲染，避免内存泄漏

const baseState = JSON.stringify(stores);

/**
 * 设置缓存工作方法的相关属性
 */
const microCache = LRU({
    max: 2,               // 缓存个数
    maxAge: 1000          // 缓存时间，毫秒
});

/**
 * 判断是否需要缓存处理
 * @param  {Object}  req 请求相关数据
 * @return {Boolean}     true: 需要缓存，false: 不需要。默认返回 true
 */
const isCacheable = (req) => {
    // console.log(req);
    return true;
};

/**
 * 默认实时编译页面数据
 * @return {String}     html 页面结构
 */
const defaultRes = async (req, res) => {
    const context = {};
    const content = (
        <Provider {...stores}>
            <StaticRouter location={req.url} context={context}>
                <Routes />
            </StaticRouter>
        </Provider>
    );

    try {
        const loadableState = await getLoadableState(content);
        await resState(req, stores);
        const main = await renderToString(content);
        const html = newHtml.replace('<div id="app"></div>', `<div id="app">${main}</div><script>window.__INITIAL_STATE__ = ${JSON.stringify(stores)}</script>${loadableState.getScriptTag()}`);
        res.status(200).send(html);
        resetStores(stores, baseState);
        return html;
    } catch (e) {
        console.log(e);
        return false;
    }
};

/**
 * 判断是返回缓存，默认实时编译返回
 * @param  {Object} req 请求相关数据
 * @param  {Object} res 返回相关数据
 */
const getCache = (req, res) => {
    const start = Date.now();
    const cacheable = isCacheable(req);
    if (cacheable) { // 判断是否需要缓存处理，否则默认实时编译返回
        const hit = microCache.get(req.url);
        if (hit) { // 判断是否存在缓存，有则返回缓存，无则默认实时编译返回
            console.log(`--> ${req.url}  ${Date.now() - start}ms, cache`);
            return res.end(hit);
        }
    }

    defaultRes(req, res).then((html) => {
        if (cacheable) { // 判断是否需要缓存
            microCache.set(req.url, html);
        }
        console.log(`--> ${req.url}  ${Date.now() - start}ms`);
    });
};
```

## PS
如果你只是随便用用，我应该写得很明白了，放心用就行了。

很多地方都只简单的写了下，详细的写起来估计得要好长时间，我大部分关键地方都写了注释，也贴了链接，多看看，多用用，应该就能明白了。

有问题就直接问我吧
