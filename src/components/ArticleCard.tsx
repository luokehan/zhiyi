import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, featured = false }) => {
  // Function to determine category badge style
  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case '科技':
        return 'category-badge tech';
      case '观点':
        return 'category-badge opinion';
      case '人文':
        return 'category-badge humanities';
      default:
        return 'category-badge tech';
    }
  };

  // Function to get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case '科技':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case '观点':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
      case '人文':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`card ${featured ? 'featured-article' : ''}`}>
      <Link to={`/article/${article.id}`} className="block overflow-hidden relative">
        <img 
          src={article.coverImage} 
          alt={article.title} 
          className={`w-full object-cover ${featured ? 'h-96' : 'h-56'} transition-transform duration-500`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-6 text-white">
            <span className="inline-flex items-center text-sm font-medium">
              查看文章 <ArrowRight size={16} className="ml-1" />
            </span>
          </div>
        </div>
      </Link>
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span className={`flex items-center ${getCategoryBadgeClass(article.category)}`}>
            {getCategoryIcon(article.category)}
            {article.category}
          </span>
          <div className="flex items-center ml-3">
            <Calendar size={14} className="mr-1" />
            <span>{new Date(article.publishedAt).toLocaleDateString('zh-CN')}</span>
          </div>
          {article.readingTime && (
            <div className="flex items-center ml-3">
              <Clock size={14} className="mr-1" />
              <span>{article.readingTime} 分钟</span>
            </div>
          )}
        </div>
        
        <Link to={`/article/${article.id}`}>
          <h2 className={`font-bold text-gray-900 hover:text-blue-600 transition-colors ${featured ? 'text-2xl leading-tight' : 'text-xl'} mb-3`}>
            {article.title}
          </h2>
        </Link>
        
        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
          {article.summary}
        </p>
        
        <div className="flex items-center text-sm mt-auto pt-3 border-t border-gray-100">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User size={16} className="text-gray-600" />
          </div>
          <div className="ml-2">
            <span className="text-gray-800 font-medium">{article.author}</span>
            {article.authorTitle && (
              <p className="text-xs text-gray-500">{article.authorTitle}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;