import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import { Article } from '../types';
import { fetchArticlesByCategory } from '../services/articleService';
import { BookOpen, Lightbulb, Cpu, ChevronLeft } from 'lucide-react';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getArticles = async () => {
      if (!category) return;
      
      setLoading(true);
      try {
        const categoryMap: Record<string, string> = {
          'opinions': '观点',
          'technology': '科技',
          'humanities': '人文'
        };
        
        const categoryName = categoryMap[category];
        if (!categoryName) {
          setArticles([]);
          setLoading(false);
          return;
        }
        
        const data = await fetchArticlesByCategory(categoryName);
        setArticles(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setLoading(false);
      }
    };

    getArticles();
  }, [category]);

  const getCategoryInfo = () => {
    switch (category) {
      case 'opinions':
        return {
          title: '观点',
          description: '探讨当代社会议题、政策分析和思想评论',
          icon: <Lightbulb className="text-yellow-500 h-10 w-10" />,
          color: 'from-yellow-50 to-orange-50',
          textColor: 'text-yellow-800'
        };
      case 'technology':
        return {
          title: '科技',
          description: '关注最新科技发展、创新研究和技术应用',
          icon: <Cpu className="text-blue-500 h-10 w-10" />,
          color: 'from-blue-50 to-cyan-50',
          textColor: 'text-blue-800'
        };
      case 'humanities':
        return {
          title: '人文',
          description: '探索哲学、历史、文学和艺术领域的思想与作品',
          icon: <BookOpen className="text-green-500 h-10 w-10" />,
          color: 'from-green-50 to-emerald-50',
          textColor: 'text-green-800'
        };
      default:
        return {
          title: '分类',
          description: '文章分类',
          icon: null,
          color: 'from-gray-50 to-gray-100',
          textColor: 'text-gray-800'
        };
    }
  };

  const { title, description, icon, color, textColor } = getCategoryInfo();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6 max-w-7xl mx-auto">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <ChevronLeft size={20} className="mr-1" />
            <span>返回首页</span>
          </Link>
        </div>

        {/* Category Header */}
        <div className={`bg-gradient-to-r ${color} rounded-xl shadow-sm p-8 mb-10 max-w-7xl mx-auto`}>
          <div className="flex items-center mb-4">
            <div className="bg-white p-4 rounded-full shadow-sm mr-5">
              {icon}
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${textColor}`}>{title}</h1>
              <p className="text-gray-600 mt-2">{description}</p>
            </div>
          </div>
        </div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {articles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm max-w-2xl mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-xl font-bold text-gray-700 mb-2">暂无文章</h2>
            <p className="text-gray-500 mb-6">该分类下暂时没有文章，请稍后再来查看。</p>
            <Link to="/" className="btn-primary inline-flex items-center">
              <ChevronLeft size={16} className="mr-2" />
              返回首页
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;