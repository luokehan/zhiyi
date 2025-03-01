import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, Eye, EyeOff, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { getApiSettings, updateApiSettings, testApiConnection } from '../../services/apiService';

interface ApiSettingsData {
  apiKey: string;
  apiEndpoint: string;
  model: string;
  useProxy: boolean; 
}

const ApiSettings: React.FC = () => {
  const [settings, setSettings] = useState<ApiSettingsData>({
    apiKey: '',
    apiEndpoint: 'https://api.openai.com/v1',
    model: 'gpt-4',
    useProxy: true 
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [testing, setTesting] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showApiKey, setShowApiKey] = useState<boolean>(false);
  const [customModel, setCustomModel] = useState<string>('');
  
  const predefinedModels = ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo', 'claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku', 'gemini-pro'];

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getApiSettings();
        setSettings(data);
        if (data.model && !predefinedModels.includes(data.model)) {
          setCustomModel(data.model);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching API settings:', error);
        setErrorMessage('加载 API 设置时出错。请刷新页面重试。');
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
    
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSettings(prev => ({ ...prev, [name]: checked }));
    
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'custom') {
      const modelValue = customModel || 'gpt-4o-mini';
      setCustomModel(modelValue);
      setSettings(prev => ({ ...prev, model: modelValue }));
    } else {
      setSettings(prev => ({ ...prev, model: value }));
    }
  };

  const handleCustomModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomModel(value);
    if (!predefinedModels.includes(settings.model)) {
      setSettings(prev => ({ ...prev, model: value || 'gpt-4o-mini' }));
    }
  };

  const validateSettings = () => {
    if (!settings.apiKey || settings.apiKey.trim() === '') {
      setErrorMessage('API 密钥不能为空');
      return false;
    }
    
    if (!settings.apiEndpoint || settings.apiEndpoint.trim() === '') {
      setErrorMessage('API 端点不能为空');
      return false;
    }
    
    try {
      new URL(settings.apiEndpoint);
    } catch (e) {
      setErrorMessage('API 端点必须是有效的 URL');
      return false;
    }
    
    if (!settings.model || settings.model.trim() === '') {
      if (!predefinedModels.includes(settings.model)) {
        setSettings(prev => ({ ...prev, model: 'gpt-4o-mini' }));
      } else {
        setErrorMessage('请选择或输入模型名称');
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!predefinedModels.includes(settings.model) && (!settings.model || settings.model.trim() === '')) {
      setSettings(prev => ({ ...prev, model: 'gpt-4o-mini' }));
      setCustomModel('gpt-4o-mini');
    }
    
    if (!validateSettings()) {
      return;
    }
    
    setSaving(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await updateApiSettings(settings);
      setSuccessMessage('API 设置已成功保存！');
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error: any) {
      console.error('Error saving API settings:', error);
      setErrorMessage(`保存 API 设置失败: ${error.message || '未知错误'}`);
    } finally {
      setSaving(false);
    }
  };

  const handleTestConnection = async () => {
    if (!predefinedModels.includes(settings.model) && (!settings.model || settings.model.trim() === '')) {
      setSettings(prev => ({ ...prev, model: 'gpt-4o-mini' }));
      setCustomModel('gpt-4o-mini');
    }
    
    if (!validateSettings()) {
      return;
    }
    
    setTesting(true);
    setTestResult(null);
    setErrorMessage('');

    try {
      const result = await testApiConnection(settings);
      setTestResult(result);
    } catch (error: any) {
      console.error('Error testing API connection:', error);
      setTestResult({
        success: false,
        message: `连接测试失败: ${error.message || '未知错误'}`
      });
    } finally {
      setTesting(false);
    }
  };

  const toggleShowApiKey = () => {
    setShowApiKey(!showApiKey);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">API 设置</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          {/* Info Box */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg flex items-start">
            <Info className="text-blue-500 mr-3 flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="text-blue-800 font-medium">关于 API 设置</h3>
              <p className="text-blue-700 text-sm mt-1">
                这些设置用于连接到 AI 服务提供商的 API，以实现翻译和语言分析功能。
                您需要提供自己的 API 密钥才能使用这些功能。API 密钥将安全地存储在您的浏览器中，不会发送到我们的服务器。
              </p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            {/* API Key */}
            <div className="mb-6">
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
                API 密钥
              </label>
              <div className="relative">
                <input
                  type={showApiKey ? "text" : "password"}
                  id="apiKey"
                  name="apiKey"
                  value={settings.apiKey}
                  onChange={handleChange}
                  className="input-field pr-10"
                  placeholder="sk-..."
                />
                <button
                  type="button"
                  onClick={toggleShowApiKey}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showApiKey ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                您的 OpenAI API 密钥或兼容的 API 密钥
              </p>
            </div>
            
            {/* API Endpoint */}
            <div className="mb-6">
              <label htmlFor="apiEndpoint" className="block text-sm font-medium text-gray-700 mb-1">
                API 端点
              </label>
              <input
                type="text"
                id="apiEndpoint"
                name="apiEndpoint"
                value={settings.apiEndpoint}
                onChange={handleChange}
                className="input-field"
                placeholder="https://api.openai.com/v1"
              />
              <p className="mt-1 text-sm text-gray-500">
                OpenAI API 端点或兼容的 API 端点
              </p>
            </div>
            
            {/* Model Selection */}
            <div className="mb-6">
              <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
                模型
              </label>
              <select
                id="model"
                name="model"
                value={predefinedModels.includes(settings.model) ? settings.model : 'custom'}
                onChange={handleModelChange}
                className="input-field"
              >
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-4-turbo">GPT-4 Turbo</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="claude-3-opus">Claude 3 Opus</option>
                <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                <option value="claude-3-haiku">Claude 3 Haiku</option>
                <option value="gemini-pro">Gemini Pro</option>
                <option value="custom">自定义</option>
              </select>
              
              {/* Custom Model Input */}
              {!predefinedModels.includes(settings.model) && (
                <div className="mt-3">
                  <label htmlFor="customModel" className="block text-sm font-medium text-gray-700 mb-1">
                    自定义模型名称
                  </label>
                  <input
                    type="text"
                    id="customModel"
                    value={customModel}
                    onChange={handleCustomModelChange}
                    className="input-field"
                    placeholder="输入模型名称，例如 gpt-4o-mini"
                  />
                </div>
              )}
              
              <p className="mt-1 text-sm text-gray-500">
                用于生成翻译和分析的模型
              </p>
            </div>
            
            {/* Proxy Settings */}
            <div className="mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="useProxy"
                  name="useProxy"
                  checked={settings.useProxy}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="useProxy" className="ml-2 block text-sm font-medium text-gray-700">
                  使用代理服务器
                </label>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                启用代理服务器以解决跨域资源共享 (CORS) 问题。如果您遇到"Network Error"错误，请启用此选项并确保代理服务器正在运行。
              </p>
              <div className="mt-2 p-3 bg-yellow-50 rounded-lg text-sm text-yellow-800">
                <p>
                  <strong>注意：</strong> 使用代理服务器需要在本地运行代理服务器。请按照以下步骤操作：
                </p>
                <ol className="list-decimal list-inside mt-1 ml-2">
                  <li>打开命令行终端</li>
                  <li>导航到 <code className="bg-yellow-100 px-1 rounded">server</code> 目录</li>
                  <li>运行 <code className="bg-yellow-100 px-1 rounded">npm install</code> 安装依赖</li>
                  <li>运行 <code className="bg-yellow-100 px-1 rounded">node proxy.js</code> 启动代理服务器</li>
                </ol>
              </div>
            </div>
            
            {/* Error Message */}
            {errorMessage && (
              <div className="mb-6 p-3 bg-red-50 rounded-lg flex items-start">
                <AlertCircle className="text-red-500 mr-3 flex-shrink-0 mt-1" size={18} />
                <span className="text-red-800">{errorMessage}</span>
              </div>
            )}
            
            {/* Test Connection Button */}
            <div className="mb-6">
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={testing}
                className="btn-secondary flex items-center"
              >
                {testing ? (
                  <>
                    <RefreshCw size={16} className="mr-2 animate-spin" />
                    测试中...
                  </>
                ) : (
                  <>
                    <RefreshCw size={16} className="mr-2" />
                    测试连接
                  </>
                )}
              </button>
              
              {testResult && (
                <div className={`mt-3 p-3 rounded-lg flex items-start ${
                  testResult.success ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  {testResult.success ? (
                    <CheckCircle className="text-green-500 mr-3 flex-shrink-0 mt-1" size={18} />
                  ) : (
                    <AlertCircle className="text-red-500 mr-3 flex-shrink-0 mt-1" size={18} />
                  )}
                  <span className={testResult.success ? 'text-green-800' : 'text-red-800'}>
                    {testResult.message}
                  </span>
                </div>
              )}
            </div>
            
            {/* Success Message */}
            {successMessage && (
              <div className="mb-6 p-3 bg-green-50 rounded-lg flex items-start">
                <CheckCircle className="text-green-500 mr-3 flex-shrink-0 mt-1" size={18} />
                <span className="text-green-800">{successMessage}</span>
              </div>
            )}
            
            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="btn-primary flex items-center"
              >
                {saving ? (
                  <>
                    <RefreshCw size={16} className="mr-2 animate-spin" />
                    保存中...
                  </>
                ) : (
                  <>
                    <Save size={16} className="mr-2" />
                    保存设置
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApiSettings;