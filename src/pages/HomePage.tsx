import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import { Article } from '../types';
import { fetchArticles } from '../services/articleService';
import { BookOpen, Lightbulb, Cpu, TrendingUp, ArrowRight, Calendar, Clock, Brain, RefreshCw, CheckCircle, XCircle } from 'lucide-react';

const HomePage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [quizQuestion, setQuizQuestion] = useState<{question: string, options: string[], answer: number}>({
    question: '',
    options: [],
    answer: 0
  });
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [factIndex, setFactIndex] = useState<number>(0);

  const languageQuizzes = [
    {
      question: '以下哪个词的词源与"翻译"相关？',
      options: ['Interpret', 'Translate', 'Convey', 'Articulate'],
      answer: 1
    },
    {
      question: '世界上使用人数最多的语言是？',
      options: ['英语', '西班牙语', '汉语', '印地语'],
      answer: 2
    },
    {
      question: '以下哪个不是形容词？',
      options: ['Eloquent', 'Verbose', 'Discourse', 'Articulate'],
      answer: 2
    },
    {
      question: '以下哪个词在中文和英文中有相似的含义？',
      options: ['Gift', 'Pain', 'Embarrassed', 'Talent'],
      answer: 3
    },
    {
      question: '以下哪个成语的英文翻译最为贴切？"一石二鸟"',
      options: ['One stone hits two birds', 'Kill two birds with one stone', 'A stone for two birds', 'Two birds on one stone'],
      answer: 1
    }
  ];

  const translationFacts = [
    "联合国使用的六种官方语言是：阿拉伯语、中文、英语、法语、俄语和西班牙语。",
    "世界上最难翻译的书之一是《尤利西斯》,由爱尔兰作家詹姆斯·乔伊斯创作。",
    "谷歌翻译每天处理超过1000亿个单词的翻译。",
    "日语中有超过50个表示'雨'的不同词汇，取决于雨的强度和性质。",
    "最早的翻译作品可以追溯到公元前3世纪,当时希腊文本被翻译成拉丁文。",
    "一个专业翻译每天平均可以翻译约2,000-3,000个单词。",
    "汉语中大约有50,000个汉字,但日常使用只需要2,000-3,000个。",
    "世界上有超过7,000种语言,但其中约40%面临灭绝的危险。",
    "英语中约60%的词汇来源于其他语言，主要是拉丁语和法语。",
    "专业翻译通常只翻译成他们的母语，而不是从母语翻译成外语。"
  ];

  useEffect(() => {
    const getArticles = async () => {
      try {
        const data = await fetchArticles();
        setArticles(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setLoading(false);
      }
    };

    getArticles();
    
    // Set random quiz question
    const randomIndex = Math.floor(Math.random() * languageQuizzes.length);
    setQuizQuestion(languageQuizzes[randomIndex]);
    
    // Set random fact
    const randomFactIndex = Math.floor(Math.random() * translationFacts.length);
    setFactIndex(randomFactIndex);
  }, []);

  // Group articles by category
  const opinionArticles = articles.filter(article => article.category === '观点');
  const technologyArticles = articles.filter(article => article.category === '科技');
  const humanitiesArticles = articles.filter(article => article.category === '人文');

  // Get featured article (first article)
  const featuredArticle = articles.length > 0 ? articles[0] : null;
  
  // Get remaining articles
  const remainingArticles = articles.length > 0 ? articles.slice(1) : [];

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    setShowAnswer(true);
  };

  const handleNewQuestion = () => {
    const randomIndex = Math.floor(Math.random() * languageQuizzes.length);
    setQuizQuestion(languageQuizzes[randomIndex]);
    setSelectedOption(null);
    setShowAnswer(false);
  };

  const handleNewFact = () => {
    let newIndex = Math.floor(Math.random() * translationFacts.length);
    // Make sure we don't get the same fact twice in a row
    while (newIndex === factIndex) {
      newIndex = Math.floor(Math.random() * translationFacts.length);
    }
    setFactIndex(newIndex);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="nature-style">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">跨越语言的知识桥梁</h1>
            <p className="text-xl text-gray-600 mb-8">探索优质的中英双语学术内容，拓展您的知识视野</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/category/technology" className="btn-primary flex items-center">
                <Cpu size={18} className="mr-2" />
                探索科技文章
              </Link>
              <Link to="/about" className="btn-secondary flex items-center">
                了解更多
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Article */}
        {featuredArticle && (
          <div className="mb-16">
            <div className="flex items-center mb-6">
              <TrendingUp size={24} className="text-blue-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">精选文章</h2>
            </div>
            <ArticleCard article={featuredArticle} featured={true} />
          </div>
        )}

        {/* Category Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          <CategorySection 
            title="观点" 
            icon={<Lightbulb className="text-yellow-500" />}
            articles={opinionArticles.slice(0, 3)} 
            linkTo="/category/opinions"
            color="from-yellow-50 to-orange-50"
          />
          <CategorySection 
            title="科技" 
            icon={<Cpu className="text-blue-500" />}
            articles={technologyArticles.slice(0, 3)} 
            linkTo="/category/technology"
            color="from-blue-50 to-cyan-50"
          />
          <CategorySection 
            title="人文" 
            icon={<BookOpen className="text-green-500" />}
            articles={humanitiesArticles.slice(0, 3)} 
            linkTo="/category/humanities"
            color="from-green-50 to-emerald-50"
          />
        </div>

        {/* Interactive Widgets Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Language Quiz Widget */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Brain size={20} className="text-purple-600 mr-2" />
                <h2 className="text-xl font-bold text-gray-900">语言小测验</h2>
              </div>
              <button 
                onClick={handleNewQuestion}
                className="text-purple-600 hover:text-purple-800 p-2 rounded-full hover:bg-purple-100 transition-colors"
              >
                <RefreshCw size={18} />
              </button>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg mb-4">{quizQuestion.question}</h3>
              <div className="space-y-2">
                {quizQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    disabled={showAnswer}
                    className={`w-full text-left p-3 rounded-md transition-colors ${
                      selectedOption === index 
                        ? showAnswer 
                          ? index === quizQuestion.answer 
                            ? 'bg-green-100 border border-green-300' 
                            : 'bg-red-100 border border-red-300'
                          : 'bg-purple-100 border border-purple-300'
                        : showAnswer && index === quizQuestion.answer
                          ? 'bg-green-100 border border-green-300'
                          : 'bg-gray-50 hover:bg-purple-50 border border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{option}</span>
                      {showAnswer && index === quizQuestion.answer && (
                        <CheckCircle size={18} className="text-green-600" />
                      )}
                      {showAnswer && selectedOption === index && index !== quizQuestion.answer && (
                        <XCircle size={18} className="text-red-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              {showAnswer && (
                <div className="mt-4 text-center">
                  <button 
                    onClick={handleNewQuestion}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                  >
                    下一题
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Translation Facts Widget */}
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Lightbulb size={20} className="text-teal-600 mr-2" />
                <h2 className="text-xl font-bold text-gray-900">翻译知识小贴士</h2>
              </div>
              <button 
                onClick={handleNewFact}
                className="text-teal-600 hover:text-teal-800 p-2 rounded-full hover:bg-teal-100 transition-colors"
              >
                <RefreshCw size={18} />
              </button>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm h-full flex flex-col justify-between">
              <div>
                <p className="text-gray-700 text-lg leading-relaxed">{translationFacts[factIndex]}</p>
              </div>
              <div className="mt-6 text-center">
                <button 
                  onClick={handleNewFact}
                  className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                >
                  换一条
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Articles */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-900">最新文章</h2>
            </div>
            <Link to="/articles" className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium">
              查看全部
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface CategorySectionProps {
  title: string;
  icon: React.ReactNode;
  articles: Article[];
  linkTo: string;
  color: string;
}

const CategorySection: React.FC<CategorySectionProps> = ({ title, icon, articles, linkTo, color }) => {
  return (
    <div className={`bg-gradient-to-br ${color} p-6 rounded-xl shadow-sm`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {icon}
          <h2 className="text-xl font-bold ml-2">{title}</h2>
        </div>
        <Link to={linkTo} className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
          更多
          <ArrowRight size={14} className="ml-1" />
        </Link>
      </div>
      <div className="space-y-4">
        {articles.map(article => (
          <div key={article.id} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-medium text-lg mb-2 line-clamp-2">
              <Link to={`/article/${article.id}`} className="hover:text-blue-600 transition-colors">
                {article.title}
              </Link>
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">{article.summary}</p>
            <div className="flex items-center text-xs text-gray-500">
              <Calendar size={12} className="mr-1" />
              <span>{new Date(article.publishedAt).toLocaleDateString('zh-CN')}</span>
              {article.readingTime && (
                <>
                  <span className="mx-1">•</span>
                  <Clock size={12} className="mr-1" />
                  <span>{article.readingTime} 分钟</span>
                </>
              )}
            </div>
          </div>
        ))}
        {articles.length === 0 && (
          <div className="bg-white p-4 rounded-lg text-center text-gray-500">
            暂无文章
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;