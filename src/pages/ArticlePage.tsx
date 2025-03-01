import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, Clock, BookOpen, ChevronLeft, Share2, Bookmark, ThumbsUp, Languages, Eye, EyeOff, HandPlatter as Translate } from 'lucide-react';
import { Article } from '../types';
import { fetchArticleById } from '../services/articleService';

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTermIndex, setActiveTermIndex] = useState<number | null>(null);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [translationVisibility, setTranslationVisibility] = useState<Record<number, boolean>>({});
  const [showAllTranslations, setShowAllTranslations] = useState<boolean>(true);

  useEffect(() => {
    const getArticle = async () => {
      if (!id) return;
      
      try {
        const data = await fetchArticleById(id, false); // 普通用户不能查看草稿
        
        if (!data) {
          // 如果文章不存在或是草稿状态，重定向到首页
          navigate('/');
          return;
        }
        
        setArticle(data);
        // Initialize random like count between 5-50
        setLikeCount(Math.floor(Math.random() * 45) + 5);
        
        // Initialize translation visibility for each paragraph
        if (data) {
          const initialVisibility: Record<number, boolean> = {};
          data.content.forEach((_, index) => {
            initialVisibility[index] = true;
          });
          setTranslationVisibility(initialVisibility);
        }
        
        setLoading(false);
        
        // Scroll to top when article loads
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Error fetching article:', error);
        setLoading(false);
      }
    };

    getArticle();
  }, [id]);

  const toggleTerm = (index: number) => {
    if (activeTermIndex === index) {
      setActiveTermIndex(null);
    } else {
      setActiveTermIndex(index);
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleLike = () => {
    setLikeCount(likeCount + 1);
  };

  const shareArticle = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title || '知译文章',
        text: article?.summary || '',
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('链接已复制到剪贴板'))
        .catch((error) => console.error('无法复制链接', error));
    }
  };

  const toggleTranslation = (index: number) => {
    setTranslationVisibility(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const toggleAllTranslations = () => {
    const newState = !showAllTranslations;
    setShowAllTranslations(newState);
    
    // Update all individual paragraph translations
    if (article) {
      const newVisibility: Record<number, boolean> = {};
      article.content.forEach((_, index) => {
        newVisibility[index] = newState;
      });
      setTranslationVisibility(newVisibility);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center bg-white rounded-lg shadow-md p-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">文章未找到</h2>
          <p className="text-gray-500 mb-6">抱歉，您请求的文章不存在或已被删除。</p>
          <Link to="/" className="btn-primary inline-flex items-center">
            <ChevronLeft size={16} className="mr-2" />
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  // Determine category badge style
  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case '科技':
        return 'bg-blue-100 text-blue-800';
      case '观点':
        return 'bg-yellow-100 text-yellow-800';
      case '人文':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <article className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors">
              <ChevronLeft size={20} className="mr-1" />
              <span>返回首页</span>
            </Link>
          </div>

          {/* Article Header */}
          <header className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryBadgeClass(article.category)}`}>
                {article.category}
              </span>
              <div className="flex items-center ml-4">
                <Calendar size={14} className="mr-1" />
                <span>{new Date(article.publishedAt).toLocaleDateString('zh-CN')}</span>
              </div>
              {article.readingTime && (
                <div className="flex items-center ml-4">
                  <Clock size={14} className="mr-1" />
                  <span>{article.readingTime} 分钟阅读</span>
                </div>
              )}
            </div>

            <h1 className="article-title mb-4">
              {article.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {article.summary}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <User size={24} className="text-gray-600" />
                </div>
                <div className="ml-3">
                  <p className="text-base font-medium text-gray-900">{article.author}</p>
                  {article.authorTitle && (
                    <p className="text-sm text-gray-500">{article.authorTitle}</p>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  onClick={shareArticle}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="分享"
                >
                  <Share2 size={20} />
                </button>
                <button 
                  onClick={toggleBookmark}
                  className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${isBookmarked ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                  aria-label={isBookmarked ? '取消收藏' : '收藏'}
                >
                  <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
                </button>
                <button 
                  onClick={handleLike}
                  className="flex items-center space-x-1 px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                >
                  <ThumbsUp size={16} />
                  <span>{likeCount}</span>
                </button>
              </div>
            </div>
          </header>

          {/* Cover Image */}
          <div className="mb-8 rounded-xl overflow-hidden shadow-sm">
            <img 
              src={article.coverImage} 
              alt={article.title} 
              className="w-full h-auto object-cover"
            />
            {article.imageCaption && (
              <p className="text-sm text-gray-500 mt-2 text-center bg-white p-3 italic">
                {article.imageCaption}
              </p>
            )}
          </div>

          {/* Translation Toggle Button */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-8 flex justify-between items-center">
            <div className="flex items-center">
              <Languages size={20} className="text-blue-600 mr-2" />
              <h3 className="text-lg font-medium text-gray-800">翻译控制</h3>
            </div>
            <button
              onClick={toggleAllTranslations}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                showAllTranslations 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {showAllTranslations ? (
                <>
                  <EyeOff size={18} />
                  <span>隐藏所有翻译</span>
                </>
              ) : (
                <>
                  <Eye size={18} />
                  <span>显示所有翻译</span>
                </>
              )}
            </button>
          </div>

          {/* Article Content */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <div className="article-content prose prose-lg max-w-none">
              {article.content.map((paragraph, index) => (
                <div key={index} className="mb-8">
                  <div className="relative">
                    <p className="english-text">{paragraph.english}</p>
                    
                    {paragraph.chinese && (
                      <button
                        onClick={() => toggleTranslation(index)}
                        className={`translation-toggle-btn absolute -right-3 top-0 transform -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full shadow-lg transition-all duration-300 ${
                          translationVisibility[index] 
                            ? 'bg-blue-600 text-white hover:bg-blue-700' 
                            : 'bg-white text-blue-600 hover:bg-gray-100 border border-blue-200'
                        }`}
                        aria-label={translationVisibility[index] ? '隐藏翻译' : '显示翻译'}
                      >
                        <Translate size={16} />
                      </button>
                    )}
                  </div>
                  
                  {paragraph.chinese && translationVisibility[index] && (
                    <div className="chinese-text mt-3 relative overflow-hidden transition-all duration-500 ease-in-out">
                      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                      <p className="pl-4">{paragraph.chinese}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Key Terms and Complex Sentences */}
          {(article.keyTerms.length > 0 || article.complexSentences.length > 0) && (
            <div className="learning-notes p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
                <BookOpen size={24} className="mr-3 text-blue-600" />
                学习笔记
              </h2>
              
              {/* Key Terms */}
              {article.keyTerms.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">关键术语</h3>
                  <ul className="space-y-4">
                    {article.keyTerms.map((term, index) => (
                      <li key={index} className="term-card">
                        <div 
                          className="flex justify-between items-center p-4 cursor-pointer"
                          onClick={() => toggleTerm(index)}
                        >
                          <span className="font-medium text-blue-700">{term.term}</span>
                          <span className="text-sm bg-blue-50 text-blue-600 px-2 py-1 rounded">
                            {activeTermIndex === index ? '收起' : '展开'}
                          </span>
                        </div>
                        {activeTermIndex === index && (
                          <div className="p-4 pt-0 border-t border-gray-100 mt-2 bg-blue-50 rounded-b-lg">
                            <p className="text-gray-700">{term.definition}</p>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Complex Sentences */}
              {article.complexSentences.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">复杂句分析</h3>
                  <div className="space-y-6">
                    {article.complexSentences.map((sentence, index) => (
                      <div key={index} className="bg-white p-5 rounded-lg shadow-sm">
                        <p className="font-medium text-gray-800 mb-3 english-text">{sentence.english}</p>
                        <p className="text-gray-600 mb-3 chinese-text">{sentence.chinese}</p>
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                          <h4 className="text-sm font-semibold text-yellow-800 mb-2">语法分析</h4>
                          <p className="text-sm text-gray-700">{sentence.analysis}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Article Footer */}
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h3 className="text-xl font-bold mb-4">感谢阅读</h3>
            <p className="text-gray-600 mb-6">如果您喜欢这篇文章，请考虑分享给您的朋友或收藏它</p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={shareArticle}
                className="btn-primary flex items-center"
              >
                <Share2 size={18} className="mr-2" />
                分享文章
              </button>
              <button 
                onClick={toggleBookmark}
                className={`btn-secondary flex items-center ${isBookmarked ? 'bg-blue-50 text-blue-600 border-blue-200' : ''}`}
              >
                <Bookmark size={18} className="mr-2" fill={isBookmarked ? 'currentColor' : 'none'} />
                {isBookmarked ? '已收藏' : '收藏文章'}
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ArticlePage;