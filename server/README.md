# 知译 API 代理服务器

这个代理服务器用于解决浏览器中的跨域资源共享 (CORS) 问题，允许前端应用程序直接与 OpenAI、Anthropic 和 Google 等 AI 服务提供商的 API 进行通信。

## 为什么需要代理服务器？

由于浏览器的同源策略，当前端应用直接从浏览器调用第三方 API 时，可能会遇到 CORS 限制。这个代理服务器充当中间人，将请求转发到相应的 API 端点，并将响应返回给前端应用。

## 安装和运行

1. 确保您已安装 [Node.js](https://nodejs.org/)（版本 14 或更高）

2. 在终端中导航到 `server` 目录：
   ```
   cd server
   ```

3. 安装依赖：
   ```
   npm install
   ```

4. 启动代理服务器：
   ```
   node proxy.js
   ```

5. 服务器将在 http://localhost:3001 上运行

## 代理端点

代理服务器提供以下端点：

- `/api/openai/*` - 代理到 OpenAI API (`https://api.openai.com/v1/*`)
- `/api/anthropic/*` - 代理到 Anthropic API (`https://api.anthropic.com/v1/*`)
- `/api/google/*` - 代理到 Google API (`https://generativelanguage.googleapis.com/v1/*`)

## 在前端应用中使用

在知译应用的 API 设置页面中，启用"使用代理服务器"选项。这将使应用通过代理服务器发送所有 API 请求，而不是直接发送到 AI 服务提供商。

## 安全注意事项

- 这个代理服务器仅用于本地开发和测试
- 代理服务器不会存储或记录任何 API 密钥或请求内容
- 所有请求都是通过 HTTPS 发送到原始 API 端点的
