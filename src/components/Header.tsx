import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, Search, BookOpen, Lightbulb, Cpu, FileText, Key, LayoutDashboard, FileEdit, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const adminMenuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const categories = [
    { name: '观点', path: '/category/opinions', icon: <Lightbulb size={18} className="mr-2 text-yellow-500" /> },
    { name: '科技', path: '/category/technology', icon: <Cpu size={18} className="mr-2 text-blue-500" /> },
    { name: '人文', path: '/category/humanities', icon: <BookOpen size={18} className="mr-2 text-green-500" /> }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // 点击页面其他地方关闭管理员菜单
    const handleClickOutside = (event: MouseEvent) => {
      if (adminMenuRef.current && !adminMenuRef.current.contains(event.target as Node)) {
        setIsAdminMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // 当搜索框打开时，自动聚焦搜索输入框
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery('');
    }
  };

  const toggleAdminMenu = () => {
    setIsAdminMenuOpen(!isAdminMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsSearchOpen(false);
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white shadow-sm py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center">
              <span className="mr-1">知</span>
              <span className="text-gray-800">译</span>
            </Link>
            <span className="ml-2 text-sm text-gray-500 hidden sm:block">中英双语学术平台</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/articles"
              className={`nav-link text-base font-medium flex items-center ${
                location.pathname === '/articles'
                  ? 'text-blue-600 active'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <FileText size={18} className="mr-2 text-purple-500" />
              所有文章
            </Link>
            {categories.map((category) => (
              <Link
                key={category.path}
                to={category.path}
                className={`nav-link text-base font-medium flex items-center ${
                  location.pathname === category.path
                    ? 'text-blue-600 active'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {category.icon}
                {category.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleSearch}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="搜索"
            >
              <Search size={20} />
            </button>
            {isAuthenticated ? (
              <div className="relative" ref={adminMenuRef}>
                <button 
                  onClick={toggleAdminMenu}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <User size={20} />
                  <span>管理员</span>
                </button>
                {isAdminMenuOpen && (
                  <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl z-20 animate-fade-in">
                    <Link 
                      to="/admin/dashboard" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                      onClick={() => setIsAdminMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <LayoutDashboard size={16} className="mr-2 text-blue-500" />
                        控制面板
                      </div>
                    </Link>
                    <Link 
                      to="/admin/articles" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                      onClick={() => setIsAdminMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <FileEdit size={16} className="mr-2 text-green-500" />
                        文章管理
                      </div>
                    </Link>
                    <Link 
                      to="/admin/api-settings" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                      onClick={() => setIsAdminMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <Settings size={16} className="mr-2 text-purple-500" />
                        API 设置
                      </div>
                    </Link>
                    <Link 
                      to="/admin/change-password" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                      onClick={() => setIsAdminMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <Key size={16} className="mr-2 text-orange-500" />
                        修改密码
                      </div>
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={() => {
                        logout();
                        setIsAdminMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                    >
                      退出登录
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/admin/login" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors">
                管理员登录
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleSearch}
              className="p-2 mr-2 rounded-full hover:bg-gray-100"
              aria-label="搜索"
            >
              <Search size={20} />
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label={isMenuOpen ? '关闭菜单' : '打开菜单'}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/articles"
                className={`text-base font-medium flex items-center ${
                  location.pathname === '/articles'
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <FileText size={18} className="mr-2 text-purple-500" />
                所有文章
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.path}
                  to={category.path}
                  className={`text-base font-medium flex items-center ${
                    location.pathname === category.path
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.icon}
                  {category.name}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/admin/dashboard"
                    className="text-gray-700 hover:text-blue-600 flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LayoutDashboard size={18} className="mr-2 text-blue-500" />
                    控制面板
                  </Link>
                  <Link
                    to="/admin/change-password"
                    className="text-gray-700 hover:text-blue-600 flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Key size={18} className="mr-2 text-orange-500" />
                    修改密码
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-red-600 hover:text-red-700 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    退出登录
                  </button>
                </>
              ) : (
                <Link
                  to="/admin/login"
                  className="text-gray-700 hover:text-blue-600 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={18} className="mr-2" />
                  管理员登录
                </Link>
              )}
            </nav>
          </div>
        )}

        {/* Search overlay */}
        {isSearchOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20 px-4 animate-fade-in">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-4">
              <form onSubmit={handleSearch} className="flex items-center mb-4">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="搜索文章..."
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyPress}
                  autoFocus
                />
                <button
                  type="submit"
                  className="ml-2 p-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                  aria-label="搜索"
                >
                  <Search size={20} />
                </button>
                <button
                  type="button"
                  onClick={toggleSearch}
                  className="ml-2 p-3 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="关闭搜索"
                >
                  <X size={24} />
                </button>
              </form>
              <div className="text-center text-gray-500 py-4">
                <p>输入关键词搜索文章标题和摘要</p>
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                  <span className="text-sm text-gray-500">热门搜索：</span>
                  {['人工智能', '气候变化', '哲学', '科技伦理', '教育'].map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => {
                        setSearchQuery(term);
                        searchInputRef.current?.focus();
                      }}
                      className="text-sm bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-md transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;