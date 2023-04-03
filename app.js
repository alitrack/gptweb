// 导入所需的包
const express = require('express'); // Express 框架
const path = require('path'); // Node.js 路径模块
const bodyParser = require('body-parser'); // 请求体解析中间件
const basicAuth = require('express-basic-auth')  // 基本身份验证中间件
const openAIProxy = require('./api/index')  // OpenAI API 代理模块

// 创建 Express 应用程序实例
const app = express();

// 获取身份验证密码
const auth_password = process.env.SITE_PASSWORD || '';

// 如果设置了密码，则使用基本身份验证中间件
if (auth_password !== '') {
  app.use(basicAuth({
    users: { 'admin' : auth_password }, // 用户名和密码
    challenge: true, // 是否强制要求进行身份验证
    realm: 'GPT Web', // 身份验证领域
  }))
}

// 指定应用程序要监听的端口号
const port = process.env.PORT || 9000;

// 将路由请求交给 OpenAI API 代理模块处理
app.use('/v1/chat/completions', openAIProxy);

// 使用 body-parser 中间件解析请求体
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 从 public 文件夹提供静态文件
app.use(express.static(path.join(__dirname, 'public')));

// 为根 URL 提供 index.html 文件
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 启动 Express 应用程序
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});