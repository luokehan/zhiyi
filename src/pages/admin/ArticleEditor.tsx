import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, Plus, Trash, RefreshCw } from 'lucide-react';
import { Article, Paragraph, KeyTerm, ComplexSentence } from '../../types';
import { fetchArticleById, createArticle, updateArticle } from '../../services/articleService';
import { generateTranslation, generateKeyTermDefinition, generateSentenceAnalysis } from '../../services/apiService';

const ArticleEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [loading, setLoading] = useState<boolean>(isEditMode);
  const [saving, setSaving] = useState<boolean>(false);
  const [article, setArticle] = useState<Article>({
    id: '',
    title: '',
    summary: '',
    content: [{ english: '', chinese: '' }],
    author: '',
    authorTitle: '',
    category: '科技',
    status: 'draft',
    publishedAt: new Date().toISOString(),
    coverImage: '',
    imageCaption: '',
    readingTime: 5,
    keyTerms: [],
    complexSentences: []
  });

  useEffect(() => {
    const fetchArticle = async () => {
      if (isEditMode) {
        try {
          const data = await fetchArticleById(id!, true); // 管理员可以查看草稿
          if (data) {
            setArticle(data);
          }
          setLoading(false);
        } catch (error) {
          console.error('Error fetching article:', error);
          setLoading(false);
        }
      }
    };

    fetchArticle();
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setArticle(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (index: number, field: keyof Paragraph, value: string) => {
    const updatedContent = [...article.content];
    updatedContent[index] = { ...updatedContent[index], [field]: value };
    setArticle(prev => ({ ...prev, content: updatedContent }));
  };

  const addParagraph = () => {
    setArticle(prev => ({
      ...prev,
      content: [...prev.content, { english: '', chinese: '' }]
    }));
  };

  const removeParagraph = (index: number) => {
    if (article.content.length <= 1) return;
    
    const updatedContent = [...article.content];
    updatedContent.splice(index, 1);
    setArticle(prev => ({ ...prev, content: updatedContent }));
  };

  const handleKeyTermChange = (index: number, field: keyof KeyTerm, value: string) => {
    const updatedKeyTerms = [...article.keyTerms];
    updatedKeyTerms[index] = { ...updatedKeyTerms[index], [field]: value };
    setArticle(prev => ({ ...prev, keyTerms: updatedKeyTerms }));
  };

  const addKeyTerm = () => {
    setArticle(prev => ({
      ...prev,
      keyTerms: [...prev.keyTerms, { term: '', definition: '' }]
    }));
  };

  const removeKeyTerm = (index: number) => {
    const updatedKeyTerms = [...article.keyTerms];
    updatedKeyTerms.splice(index, 1);
    setArticle(prev => ({ ...prev, keyTerms: updatedKeyTerms }));
  };

  const handleComplexSentenceChange = (index: number, field: keyof ComplexSentence, value: string) => {
    const updatedSentences = [...article.complexSentences];
    updatedSentences[index] = { ...updatedSentences[index], [field]: value };
    setArticle(prev => ({ ...prev, complexSentences: updatedSentences }));
  };

  const addComplexSentence = () => {
    setArticle(prev => ({
      ...prev,
      complexSentences: [...prev.complexSentences, { english: '', chinese: '', analysis: '' }]
    }));
  };

  const removeComplexSentence = (index: number) => {
    const updatedSentences = [...article.complexSentences];
    updatedSentences.splice(index, 1);
    setArticle(prev => ({ ...prev, complexSentences: updatedSentences }));
  };

  const generateTranslationForParagraph = async (index: number) => {
    const paragraph = article.content[index];
    if (!paragraph.english.trim()) return;

    try {
      const translation = await generateTranslation(paragraph.english);
      handleContentChange(index, 'chinese', translation);
    } catch (error) {
      console.error('Error generating translation:', error);
    }
  };

  const generateDefinitionForTerm = async (index: number) => {
    const term = article.keyTerms[index];
    if (!term.term.trim()) return;

    try {
      const definition = await generateKeyTermDefinition(term.term);
      handleKeyTermChange(index, 'definition', definition);
    } catch (error) {
      console.error('Error generating definition:', error);
    }
  };

  const generateAnalysisForSentence = async (index: number) => {
    const sentence = article.complexSentences[index];
    if (!sentence.english.trim()) return;

    try {
      const analysis = await generateSentenceAnalysis(sentence.english);
      handleComplexSentenceChange(index, 'analysis', analysis);
    } catch (error) {
      console.error('Error generating analysis:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (isEditMode) {
        await updateArticle(id!, article);
      } else {
        await createArticle(article);
      }
      // 成功保存后导航到文章管理页面
      navigate('/admin/articles', { replace: true });
    } catch (error) {
      console.error('Error saving article:', error);
      setSaving(false);
    }
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
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/admin/articles')}
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditMode ? '编辑文章' : '创建新文章'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">基本信息</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  标题
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={article.title}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  分类
                </label>
                <select
                  id="category"
                  name="category"
                  value={article.category}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="观点">观点</option>
                  <option value="科技">科技</option>
                  <option value="人文">人文</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                  作者
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={article.author}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="authorTitle" className="block text-sm font-medium text-gray-700 mb-1">
                  作者头衔
                </label>
                <input
                  type="text"
                  id="authorTitle"
                  name="authorTitle"
                  value={article.authorTitle}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  状态
                </label>
                <select
                  id="status"
                  name="status"
                  value={article.status}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="draft">草稿</option>
                  <option value="published">已发布</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="readingTime" className="block text-sm font-medium text-gray-700 mb-1">
                  阅读时间（分钟）
                </label>
                <input
                  type="number"
                  id="readingTime"
                  name="readingTime"
                  value={article.readingTime}
                  onChange={handleChange}
                  className="input-field"
                  min="1"
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
                  摘要
                </label>
                <textarea
                  id="summary"
                  name="summary"
                  value={article.summary}
                  onChange={handleChange}
                  rows={3}
                  className="input-field"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">
                  封面图片 URL
                </label>
                <input
                  type="url"
                  id="coverImage"
                  name="coverImage"
                  value={article.coverImage}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="imageCaption" className="block text-sm font-medium text-gray-700 mb-1">
                  图片说明
                </label>
                <input
                  type="text"
                  id="imageCaption"
                  name="imageCaption"
                  value={article.imageCaption}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">文章内容</h2>
              <button
                type="button"
                onClick={addParagraph}
                className="btn-secondary flex items-center"
              >
                <Plus size={16} className="mr-1" />
                添加段落
              </button>
            </div>
            
            {article.content.map((paragraph, index) => (
              <div key={index} className="mb-8 p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">段落 {index + 1}</h3>
                  {article.content.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeParagraph(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash size={16} />
                    </button>
                  )}
                </div>
                
                <div className="mb-4">
                  <label htmlFor={`english-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    英文内容
                  </label>
                  <textarea
                    id={`english-${index}`}
                    value={paragraph.english}
                    onChange={(e) => handleContentChange(index, 'english', e.target.value)}
                    rows={4}
                    className="input-field"
                    required
                  />
                </div>
                
                <div className="mb-2">
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor={`chinese-${index}`} className="block text-sm font-medium text-gray-700">
                      中文翻译
                    </label>
                    <button
                      type="button"
                      onClick={() => generateTranslationForParagraph(index)}
                      className="text-xs flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <RefreshCw size={12} className="mr-1" />
                      自动翻译
                    </button>
                  </div>
                  <textarea
                    id={`chinese-${index}`}
                    value={paragraph.chinese}
                    onChange={(e) => handleContentChange(index, 'chinese', e.target.value)}
                    rows={4}
                    className="input-field"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Key Terms */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">关键术语</h2>
              <button
                type="button"
                onClick={addKeyTerm}
                className="btn-secondary flex items-center"
              >
                <Plus size={16} className="mr-1" />
                添加术语
              </button>
            </div>
            
            {article.keyTerms.map((term, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">术语 {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeKeyTerm(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash size={16} />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`term-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      术语
                    </label>
                    <input
                      type="text"
                      id={`term-${index}`}
                      value={term.term}
                      onChange={(e) => handleKeyTermChange(index, 'term', e.target.value)}
                      className="input-field"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="flex justify-between items-center mb-1">
                      <label htmlFor={`definition-${index}`} className="block text-sm font-medium text-gray-700">
                        定义
                      </label>
                      <button
                        type="button"
                        onClick={() => generateDefinitionForTerm(index)}
                        className="text-xs flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <RefreshCw size={12} className="mr-1" />
                        自动生成
                      </button>
                    </div>
                    <textarea
                      id={`definition-${index}`}
                      value={term.definition}
                      onChange={(e) => handleKeyTermChange(index, 'definition', e.target.value)}
                      rows={3}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            {article.keyTerms.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                暂无关键术语，点击"添加术语"按钮添加
              </p>
            )}
          </div>

          {/* Complex Sentences */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">复杂句分析</h2>
              <button
                type="button"
                onClick={addComplexSentence}
                className="btn-secondary flex items-center"
              >
                <Plus size={16} className="mr-1" />
                添加复杂句
              </button>
            </div>
            
            {article.complexSentences.map((sentence, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">复杂句 {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeComplexSentence(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash size={16} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor={`sentence-english-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      英文句子
                    </label>
                    <textarea
                      id={`sentence-english-${index}`}
                      value={sentence.english}
                      onChange={(e) => handleComplexSentenceChange(index, 'english', e.target.value)}
                      rows={3}
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor={`sentence-chinese-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      中文翻译
                    </label>
                    <textarea
                      id={`sentence-chinese-${index}`}
                      value={sentence.chinese}
                      onChange={(e) => handleComplexSentenceChange(index, 'chinese', e.target.value)}
                      rows={3}
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label htmlFor={`sentence-analysis-${index}`} className="block text-sm font-medium text-gray-700">
                        分析
                      </label>
                      <button
                        type="button"
                        onClick={() => generateAnalysisForSentence(index)}
                        className="text-xs flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <RefreshCw size={12} className="mr-1" />
                        自动分析
                      </button>
                    </div>
                    <textarea
                      id={`sentence-analysis-${index}`}
                      value={sentence.analysis}
                      onChange={(e) => handleComplexSentenceChange(index, 'analysis', e.target.value)}
                      rows={3}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            {article.complexSentences.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                暂无复杂句分析，点击"添加复杂句"按钮添加
              </p>
            )}
          </div>

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
                  保存文章
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArticleEditor;