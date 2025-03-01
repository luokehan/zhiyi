import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Github, Twitter, BookOpen, Lightbulb, Cpu, Heart, BookOpenCheck } from 'lucide-react';

const Footer: React.FC = () => {
  const [wordOfDay, setWordOfDay] = useState<{
    english: string;
    chinese: string;
    partOfSpeech: string;
    example: string;
  }>({
    english: '',
    chinese: '',
    partOfSpeech: '',
    example: ''
  });

  const words = [
    {
      english: 'Serendipity',
      chinese: '意外发现的美好',
      partOfSpeech: 'n.',
      example: 'Finding this book was pure serendipity.'
    },
    {
      english: 'Ephemeral',
      chinese: '短暂的',
      partOfSpeech: 'adj.',
      example: 'The beauty of cherry blossoms is ephemeral.'
    },
    {
      english: 'Ubiquitous',
      chinese: '无处不在的',
      partOfSpeech: 'adj.',
      example: 'Smartphones have become ubiquitous in modern society.'
    },
    {
      english: 'Mellifluous',
      chinese: '如蜜般甜美的',
      partOfSpeech: 'adj.',
      example: 'She spoke in a mellifluous voice that captivated the audience.'
    },
    {
      english: 'Quintessential',
      chinese: '典型的，精髓的',
      partOfSpeech: 'adj.',
      example: 'This restaurant offers the quintessential Italian dining experience.'
    },
    {
      english: 'Paradigm',
      chinese: '范例，模式',
      partOfSpeech: 'n.',
      example: 'His work created a new paradigm in scientific research.'
    },
    {
      english: 'Eloquent',
      chinese: '雄辩的，有说服力的',
      partOfSpeech: 'adj.',
      example: 'Her eloquent speech moved everyone in the room.'
    }
  ];

  useEffect(() => {
    // Get a random word for the day
    // In a real app, this would change daily, but for demo we use random
    const randomIndex = Math.floor(Math.random() * words.length);
    setWordOfDay(words[randomIndex]);
  }, []);

  return (
    <footer className="footer text-white py-12">
      <div className="container mx-auto px-4">
        {/* Word of the Day Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 mb-10 shadow-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <BookOpenCheck size={24} className="text-yellow-400 mr-3" />
              <h3 className="text-xl font-bold text-white">今日单词</h3>
            </div>
            <div className="bg-gray-700 px-5 py-4 rounded-lg w-full md:w-auto md:min-w-[70%]">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <span className="text-xl font-bold text-yellow-300">{wordOfDay.english}</span>
                    <span className="text-gray-400 text-sm ml-2">{wordOfDay.partOfSpeech}</span>
                  </div>
                  <p className="text-gray-300 text-lg mt-1">{wordOfDay.chinese}</p>
                </div>
                <div className="mt-3 md:mt-0 md:ml-6 md:border-l md:border-gray-600 md:pl-6">
                  <p className="text-gray-400 text-sm">例句：</p>
                  <p className="text-gray-300 italic mt-1">{wordOfDay.example}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center">
              <span className="mr-1">知</span>
              <span className="text-gray-300">译</span>
            </h3>
            <p className="text-gray-300 leading-relaxed">
              中英双语学术平台，致力于为中文读者提供优质的英文学术文章及其翻译，促进知识的跨语言传播与交流。
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a href="mailto:contact@zhiyi.com" className="text-gray-300 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-full">
                <Mail size={20} />
              </a>
              <a href="https://github.com/zhiyi" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-full">
                <Github size={20} />
              </a>
              <a href="https://twitter.com/zhiyi" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-full">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mr-2">
                <BookOpen size={16} className="text-white" />
              </span>
              分类
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/category/opinions" className="text-gray-300 hover:text-white footer-link flex items-center">
                  <Lightbulb size={16} className="mr-2 text-yellow-400" />
                  观点
                </Link>
              </li>
              <li>
                <Link to="/category/technology" className="text-gray-300 hover:text-white footer-link flex items-center">
                  <Cpu size={16} className="mr-2 text-blue-400" />
                  科技
                </Link>
              </li>
              <li>
                <Link to="/category/humanities" className="text-gray-300 hover:text-white footer-link flex items-center">
                  <BookOpen size={16} className="mr-2 text-green-400" />
                  人文
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              关于我们
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white footer-link flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  关于知译
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-300 hover:text-white footer-link flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  团队成员
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white footer-link flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  联系我们
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-8 text-center text-gray-400">
          <p className="flex items-center justify-center">
            &copy; {new Date().getFullYear()} 知译. 保留所有权利.
            <span className="mx-2">|</span>
            <span className="flex items-center">
              用 <Heart size={14} className="mx-1 text-red-500" /> 制作
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;