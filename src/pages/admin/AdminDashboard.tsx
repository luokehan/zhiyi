import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Settings, Users, BarChart2, Clock, Plus, ArrowRight, Lightbulb, Cpu, BookOpen, Key } from 'lucide-react';
import { fetchArticles } from '../../services/articleService';
import { Article } from '../../types';

const AdminDashboard: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [stats, setStats] = useState({
    totalArticles: 0,
    publishedArticles: 0,
    draftArticles: 0,
    categories: {
      opinions: 0,
      technology: 0,
      humanities: 0
    }
  });

  useEffect(() => {
    const getArticles = async () => {
      try {
        const data = await fetchArticles();
        setArticles(data);
        
        // Calculate stats
        const published = data.filter(article => article.status === 'published').length;
        const drafts = data.filter(article => article.status === 'draft').length;
        const opinions = data.filter(article => article.category === '观点').length;
        const technology = data.filter(article => article.category === '科技').length;
        const humanities = data.filter(article => article.category === '人文').length;
        
        setStats({
          totalArticles: data.length,
          publishedArticles: published,
          draftArticles: drafts,
          categories: {
            opinions,
            technology,
            humanities
          }
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setLoading(false);
      }
    };

    getArticles();
  }, []);

  const recentArticles = articles.slice(0, 5);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">管理员控制面板</h1>
          <p className="text-gray-600 mt-2">欢迎回来，管理员。这里是您的网站概览。</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="文章总数" 
            value={stats.totalArticles} 
            icon={<FileText size={24} className="text-blue-500" />} 
            bgColor="bg-blue-50"
            trend={stats.totalArticles > 0 ? '+' + stats.totalArticles : '0'}
          />
          <StatCard 
            title="已发布文章" 
            value={stats.publishedArticles} 
            icon={<BarChart2 size={24} className="text-green-500" />} 
            bgColor="bg-green-50"
            trend={stats.publishedArticles > 0 ? '+' + stats.publishedArticles : '0'}
          />
          <StatCard 
            title="草稿文章" 
            value={stats.draftArticles} 
            icon={<Clock size={24} className="text-yellow-500" />} 
            bgColor="bg-yellow-50"
            trend={stats.draftArticles > 0 ? '+' + stats.draftArticles : '0'}
          />
          <StatCard 
            title="用户数" 
            value={1} 
            icon={<Users size={24} className="text-purple-500" />} 
            bgColor="bg-purple-50"
            trend="管理员"
          />
        </div>

        {/* Quick Actions */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">快速操作</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Link 
              to="/admin/articles/new" 
              className="admin-card bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all flex items-center"
            >
              <div className="bg-blue-100 p-4 rounded-full mr-4">
                <Plus size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">添加新文章</h3>
                <p className="text-sm text-gray-500">创建新的文章内容</p>
              </div>
            </Link>
            
            <Link 
              to="/admin/articles" 
              className="admin-card bg-white p-6 rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md transition-all flex items-center"
            >
              <div className="bg-green-100 p-4 rounded-full mr-4">
                <BarChart2 size={24} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">管理文章</h3>
                <p className="text-sm text-gray-500">编辑或删除现有文章</p>
              </div>
            </Link>
            
            <Link 
              to="/admin/api-settings" 
              className="admin-card bg-white p-6 rounded-xl border border-gray-200 hover:border-purple-500 hover:shadow-md transition-all flex items-center"
            >
              <div className="bg-purple-100 p-4 rounded-full mr-4">
                <Settings size={24} className="text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">API 设置</h3>
                <p className="text-sm text-gray-500">配置 OpenAI API</p>
              </div>
            </Link>
            
            <Link 
              to="/admin/change-password" 
              className="admin-card bg-white p-6 rounded-xl border border-gray-200 hover:border-orange-500 hover:shadow-md transition-all flex items-center"
            >
              <div className="bg-orange-100 p-4 rounded-full mr-4">
                <Key size={24} className="text-orange-600" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">修改密码</h3>
                <p className="text-sm text-gray-500">更新管理员账户密码</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Articles */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">最近文章</h2>
            <Link to="/admin/articles" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
              查看全部
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    标题
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    分类
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    发布日期
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img 
                          src={article.coverImage} 
                          alt={article.title} 
                          className="h-10 w-16 object-cover rounded-md mr-3"
                        />
                        <div className="text-sm font-medium text-gray-900 line-clamp-1">{article.title}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        article.category === '科技' ? 'bg-blue-100 text-blue-800' :
                        article.category === '观点' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {article.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        article.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {article.status === 'published' ? '已发布' : '草稿'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(article.publishedAt).toLocaleDateString('zh-CN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <Link to={`/admin/articles/edit/${article.id}`} className="text-blue-600 hover:text-blue-900 transition-colors">
                          编辑
                        </Link>
                        <Link to={`/article/${article.id}`} className="text-gray-600 hover:text-gray-900 transition-colors">
                          查看
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
                {recentArticles.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500">
                      暂无文章
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Category Distribution */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">分类分布</h2>
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <CategoryStat 
                title="观点" 
                count={stats.categories.opinions} 
                percentage={stats.totalArticles > 0 ? Math.round((stats.categories.opinions / stats.totalArticles) * 100) : 0} 
                color="bg-yellow-500" 
                icon={<Lightbulb size={20} className="text-yellow-100" />}
              />
              <CategoryStat 
                title="科技" 
                count={stats.categories.technology} 
                percentage={stats.totalArticles > 0 ? Math.round((stats.categories.technology / stats.totalArticles) * 100) : 0} 
                color="bg-blue-500" 
                icon={<Cpu size={20} className="text-blue-100" />}
              />
              <CategoryStat 
                title="人文" 
                count={stats.categories.humanities} 
                percentage={stats.totalArticles > 0 ? Math.round((stats.categories.humanities / stats.totalArticles) * 100) : 0} 
                color="bg-green-500" 
                icon={<BookOpen size={20} className="text-green-100" />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  bgColor: string;
  trend: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, bgColor, trend }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 admin-card">
      <div className="flex items-center">
        <div className={`${bgColor} p-4 rounded-full mr-4`}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{trend}</p>
        </div>
      </div>
    </div>
  );
};

interface CategoryStatProps {
  title: string;
  count: number;
  percentage: number;
  color: string;
  icon: React.ReactNode;
}

const CategoryStat: React.FC<CategoryStatProps> = ({ title, count, percentage, color, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-100">
      <div className="flex items-center mb-4">
        <div className={`${color} p-2 rounded-md mr-3`}>
          {icon}
        </div>
        <span className="text-lg font-medium text-gray-800">{title}</span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{count} 篇文章</span>
        <span className="text-sm font-medium text-gray-700">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className={`h-3 rounded-full ${color}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default AdminDashboard;