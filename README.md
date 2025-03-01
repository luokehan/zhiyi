# 知译 - 中英文出版平台

知译是一个专为中英文双语内容创作和学习设计的现代化出版平台。它不仅提供文章的双语展示功能，还集成了AI辅助翻译工具，帮助作者和读者更好地进行语言学习和内容创作。

## 作者声明
我本意是想找一个可以收集外刊的网站，然后可以ai翻译用来学习英语，我在GitHub上没有找到这种项目，我想用博客，但是它的功能过于臃肿，没有ai功能，所以我自己就开发了这个项目，这个项目是我的第一个项目，知译，就是对于外语精华知识的翻译，先有了翻译，我们才能慢慢提升自己阅读能力，最后实现脱离翻译来阅读。由于我对于web开发（前后端）都不了解，我便使用ai来辅助完成整个项目，可能项目不是很完美，但是正常使用是没问题的，还是希望大家多多谅解。

## 项目特点

- **双语文章展示**：支持中英文并排展示，方便语言学习和对比
- **专业术语解释**：提供文章中关键术语的详细解释
- **复杂句分析**：对难理解的句子进行语法和语义分析
- **AI辅助翻译**：集成兼容openai格式的AI模型辅助翻译（可以使用one api转一下）
- **响应式设计**：适配各种设备尺寸，提供良好的阅读体验
- **管理员后台**：提供内容管理、用户管理、API设置等功能


## 技术栈

- **前端**：React 18、TypeScript、Tailwind CSS、React Router、Vite
- **后端**：Supabase (PostgreSQL、Auth、Storage)
- **API代理**：Node.js、Express (用于解决CORS问题)
- **AI集成**：支持OpenAI、Anthropic Claude、Google Gemini等模型

## 安装和设置

### 前提条件

- Node.js 14.0+
- npm 或 yarn
- Supabase 账户

### 前端安装

1. 克隆仓库
   ```
   git clone https://github.com/luokehan/zhiyi.git
   cd zhiyi
   ```

2. 安装依赖
   ```
   npm install
   ```

3. 创建并配置环境变量
   在项目根目录创建 `.env` 文件，添加以下内容(https://supabase.com/)里的项目网址和API 密钥：
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. 启动开发服务器
   ```
   npm run dev
   ```

### API代理服务器

1. 进入服务器目录
   ```
   cd server
   ```

2. 安装依赖
   ```
   npm install
   ```

3. 启动代理服务器
   ```
   node proxy.js
   ```
   
   代理服务器将在 http://localhost:3001 上运行

## 项目结构

```
├── public/            # 静态资源
├── src/               # 源代码
│   ├── components/    # UI组件
│   ├── contexts/      # React上下文
│   ├── lib/           # 工具库
│   ├── pages/         # 页面组件
│   │   └── admin/     # 管理员页面
│   ├── services/      # API服务
│   └── types/         # TypeScript类型定义
├── server/            # API代理服务器
├── .env               # 环境变量
└── vite.config.ts     # Vite配置
```

## 主要功能

### 用户功能

- **浏览文章**：按分类、最新、推荐等方式浏览文章
- **文章详情**：查看双语文章内容、关键术语、复杂句分析
- **搜索**：通过关键词搜索相关文章
- **语言学习**：通过小测验和翻译知识点进行互动学习

### 管理功能

- **文章管理**：创建、编辑、删除、发布文章
- **API设置**：配置AI服务提供商的API密钥和参数
- **用户管理**：创建和管理管理员账户
- **数据统计**：查看平台使用数据和趋势

## 贡献

欢迎提交问题或功能请求。如果您想贡献代码，请先提出功能请求以讨论您想要更改的内容。

## 许可证

[MIT](LICENSE) 
