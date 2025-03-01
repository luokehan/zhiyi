import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchArticles } from '../services/articleService';
import { Article } from '../types';
import ArticleCard from '../components/ArticleCard';
import { Search, ArrowLeft } from 'lucide-react';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      if (query) {
        const results = await searchArticles(query);
        setArticles(results);
      } else {
        setArticles([]);
      }
      setLoading(false);
    };

    fetchResults();
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link to="/" className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold">搜索结果: "{query}"</h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search size={48} className="mx-auto text-gray-300 mb-4" />
              <h2 className="text-xl font-medium text-gray-700 mb-2">未找到相关结果</h2>
              <p className="text-gray-500 mb-6">尝试使用不同的关键词或更广泛的搜索词</p>
              <Link to="/" className="btn-primary inline-flex items-center">
                <ArrowLeft size={18} className="mr-2" />
                返回首页
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;
