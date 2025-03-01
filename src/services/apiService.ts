// API Settings Service
import axios from 'axios';

interface ApiSettings {
  apiKey: string;
  apiEndpoint: string;
  model: string;
  useProxy: boolean; // 新增：是否使用代理
}

// Default API settings
const DEFAULT_API_SETTINGS: ApiSettings = {
  apiKey: '',
  apiEndpoint: 'https://api.openai.com/v1',
  model: 'gpt-4',
  useProxy: true // 默认使用代理
};

// 代理服务器地址
const PROXY_URL = 'http://localhost:3001';

// Local storage keys
const API_SETTINGS_KEY = 'zhiyi_api_settings';

// Get API settings from local storage or use defaults
export const getApiSettings = async (): Promise<ApiSettings> => {
  try {
    const storedSettings = localStorage.getItem(API_SETTINGS_KEY);
    if (storedSettings) {
      // 确保旧的设置也有 useProxy 字段
      const parsedSettings = JSON.parse(storedSettings);
      if (parsedSettings.useProxy === undefined) {
        parsedSettings.useProxy = true;
      }
      return parsedSettings;
    }
    return DEFAULT_API_SETTINGS;
  } catch (error) {
    console.error('Error retrieving API settings:', error);
    return DEFAULT_API_SETTINGS;
  }
};

// Update API settings in local storage
export const updateApiSettings = async (settings: ApiSettings): Promise<ApiSettings> => {
  try {
    // 确保设置中包含 useProxy 字段
    if (settings.useProxy === undefined) {
      settings.useProxy = true;
    }
    localStorage.setItem(API_SETTINGS_KEY, JSON.stringify(settings));
    return settings;
  } catch (error) {
    console.error('Error saving API settings:', error);
    throw new Error('保存 API 设置失败');
  }
};

// 获取实际 API 请求地址（直接或通过代理）
const getApiRequestUrl = (settings: ApiSettings, apiPath: string): string => {
  if (!settings.useProxy) {
    // 不使用代理，直接请求原始 API 端点
    return `${settings.apiEndpoint}${apiPath}`;
  }
  
  // 使用代理，根据不同的 API 提供商选择不同的代理路径
  if (settings.apiEndpoint.includes('anthropic.com')) {
    return `${PROXY_URL}/api/anthropic${apiPath}`;
  } else if (settings.apiEndpoint.includes('googleapis.com')) {
    return `${PROXY_URL}/api/google${apiPath}`;
  } else {
    // 默认使用 OpenAI 代理
    return `${PROXY_URL}/api/openai${apiPath}`;
  }
};

// Test API connection with actual API call
export const testApiConnection = async (settings: ApiSettings): Promise<{ success: boolean; message: string }> => {
  try {
    if (!settings.apiKey || settings.apiKey.trim() === '') {
      return {
        success: false,
        message: '连接失败：API 密钥不能为空。'
      };
    }

    console.log('Testing API connection with settings:', {
      endpoint: settings.apiEndpoint,
      model: settings.model,
      useProxy: settings.useProxy,
      // 不打印 API 密钥，但显示是否存在
      hasApiKey: !!settings.apiKey
    });

    // 创建一个带有超时设置的 axios 实例
    const axiosInstance = axios.create({
      timeout: 30000, // 30 秒超时
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${settings.apiKey}`
      }
    });

    // 确定正确的 API 路径
    let apiPath = '/chat/completions';
    
    // 对于不同的模型提供商，可能需要不同的 API 路径
    if (settings.apiEndpoint.includes('anthropic.com')) {
      apiPath = '/v1/messages';
    } else if (settings.apiEndpoint.includes('googleapis.com')) {
      apiPath = '/v1/models/gemini-pro:generateContent';
    }

    // 构建请求体，根据不同的 API 提供商调整
    let requestBody;
    if (settings.apiEndpoint.includes('anthropic.com')) {
      requestBody = {
        model: settings.model,
        messages: [{ role: 'user', content: 'Hello' }],
        max_tokens: 5
      };
    } else if (settings.apiEndpoint.includes('googleapis.com')) {
      requestBody = {
        contents: [{ parts: [{ text: 'Hello' }] }],
        generationConfig: { maxOutputTokens: 5 }
      };
    } else {
      // 默认 OpenAI 格式
      requestBody = {
        model: settings.model,
        messages: [{ role: 'user', content: 'Hello' }],
        max_tokens: 5
      };
    }

    // 获取实际请求 URL（直接或通过代理）
    const requestUrl = getApiRequestUrl(settings, apiPath);
    console.log(`Making test request to: ${requestUrl}`);
    
    // 发送请求
    const response = await axiosInstance.post(requestUrl, requestBody);

    console.log('API test response status:', response.status);

    if (response.status >= 200 && response.status < 300) {
      return {
        success: true,
        message: '连接成功！API 配置有效。'
      };
    } else {
      return {
        success: false,
        message: `连接失败：HTTP 状态码 ${response.status}`
      };
    }
  } catch (error: any) {
    console.error('API connection test failed:', error);
    
    // 详细的错误信息
    let errorMessage = '未知错误';
    
    if (error.code === 'ECONNABORTED') {
      errorMessage = '连接超时，请检查您的网络连接或 API 端点是否正确';
    } else if (error.code === 'ERR_NETWORK') {
      errorMessage = 'Network Error: 网络连接失败，可能是由于：\n1. 跨域资源共享 (CORS) 问题\n2. 网络连接问题\n3. API 端点不正确\n4. 防火墙或代理阻止了请求\n\n请尝试启动代理服务器或切换"使用代理"选项';
    } else if (error.response) {
      // 服务器返回了错误状态码
      errorMessage = `服务器错误 (${error.response.status}): ${error.response.data?.error?.message || JSON.stringify(error.response.data) || '未知服务器错误'}`;
    } else if (error.request) {
      // 请求已发送但没有收到响应
      errorMessage = '服务器没有响应，请检查 API 端点是否正确';
    } else {
      // 其他错误
      errorMessage = error.message || '未知错误';
    }
    
    return {
      success: false,
      message: `连接失败：${errorMessage}`
    };
  }
};

// Helper function to get API client with current settings
const getApiClient = async () => {
  const settings = await getApiSettings();
  
  if (!settings.apiKey) {
    throw new Error('API 密钥未配置。请在设置中配置 API 密钥。');
  }
  
  return axios.create({
    baseURL: settings.useProxy ? PROXY_URL : settings.apiEndpoint,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${settings.apiKey}`
    }
  });
};

// Generate translation using API
export const generateTranslation = async (text: string, targetLang: 'zh' | 'en' = 'zh'): Promise<string> => {
  try {
    const settings = await getApiSettings();
    const client = await getApiClient();
    
    const prompt = targetLang === 'zh' 
      ? `Translate the following English text to Chinese. Maintain academic tone and accuracy:\n\n${text}`
      : `Translate the following Chinese text to English. Maintain academic tone and accuracy:\n\n${text}`;
    
    // 确定正确的 API 路径
    let apiPath = '/chat/completions';
    if (settings.apiEndpoint.includes('anthropic.com')) {
      apiPath = '/v1/messages';
    } else if (settings.apiEndpoint.includes('googleapis.com')) {
      apiPath = '/v1/models/gemini-pro:generateContent';
    }
    
    // 获取实际请求 URL 路径（考虑代理）
    const requestPath = settings.useProxy 
      ? (settings.apiEndpoint.includes('anthropic.com') ? '/api/anthropic/messages' : 
         settings.apiEndpoint.includes('googleapis.com') ? '/api/google/models/gemini-pro:generateContent' : 
         '/api/openai/chat/completions')
      : apiPath;
    
    const response = await client.post(requestPath, {
      model: settings.model,
      messages: [
        { role: 'system', content: '你是一个专业的学术翻译助手，精通中英文翻译。请提供准确、流畅、符合学术风格的翻译。' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
      max_tokens: text.length * 2
    });
    
    return response.data.choices[0].message.content.trim();
  } catch (error: any) {
    console.error('Translation generation failed:', error);
    throw new Error(`翻译生成失败：${error.response?.data?.error?.message || error.message || '未知错误'}`);
  }
};

// Generate key term definitions using API
export const generateKeyTermDefinition = async (term: string): Promise<string> => {
  try {
    const settings = await getApiSettings();
    const client = await getApiClient();
    
    // 确定正确的 API 路径（考虑代理）
    const requestPath = settings.useProxy 
      ? (settings.apiEndpoint.includes('anthropic.com') ? '/api/anthropic/messages' : 
         settings.apiEndpoint.includes('googleapis.com') ? '/api/google/models/gemini-pro:generateContent' : 
         '/api/openai/chat/completions')
      : (settings.apiEndpoint.includes('anthropic.com') ? '/v1/messages' :
         settings.apiEndpoint.includes('googleapis.com') ? '/v1/models/gemini-pro:generateContent' :
         '/chat/completions');
    
    const response = await client.post(requestPath, {
      model: settings.model,
      messages: [
        { role: 'system', content: '你是一个专业的学术术语解释助手，精通中英文学术术语。请提供准确、简洁、易懂的术语解释。' },
        { role: 'user', content: `请提供以下学术术语的定义和解释，包括其在学术领域的用法：${term}` }
      ],
      temperature: 0.3,
      max_tokens: 300
    });
    
    return response.data.choices[0].message.content.trim();
  } catch (error: any) {
    console.error('Term definition generation failed:', error);
    throw new Error(`术语定义生成失败：${error.response?.data?.error?.message || error.message || '未知错误'}`);
  }
};

// Generate complex sentence analysis using API
export const generateSentenceAnalysis = async (sentence: string): Promise<string> => {
  try {
    const settings = await getApiSettings();
    const client = await getApiClient();
    
    // 确定正确的 API 路径（考虑代理）
    const requestPath = settings.useProxy 
      ? (settings.apiEndpoint.includes('anthropic.com') ? '/api/anthropic/messages' : 
         settings.apiEndpoint.includes('googleapis.com') ? '/api/google/models/gemini-pro:generateContent' : 
         '/api/openai/chat/completions')
      : (settings.apiEndpoint.includes('anthropic.com') ? '/v1/messages' :
         settings.apiEndpoint.includes('googleapis.com') ? '/v1/models/gemini-pro:generateContent' :
         '/chat/completions');
    
    const response = await client.post(requestPath, {
      model: settings.model,
      messages: [
        { role: 'system', content: '你是一个专业的语言分析助手，精通语法、句法和语义分析。请提供详细、准确的句子分析。' },
        { role: 'user', content: `请分析以下句子的结构、语法和含义，解释其中的复杂表达和修辞手法：\n\n${sentence}` }
      ],
      temperature: 0.3,
      max_tokens: 500
    });
    
    return response.data.choices[0].message.content.trim();
  } catch (error: any) {
    console.error('Sentence analysis generation failed:', error);
    throw new Error(`句子分析生成失败：${error.response?.data?.error?.message || error.message || '未知错误'}`);
  }
};