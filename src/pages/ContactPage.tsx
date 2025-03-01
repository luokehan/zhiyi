import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Mail, MapPin, Phone, BookOpen, Briefcase, GraduationCap, Award } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6 max-w-6xl mx-auto">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <ChevronLeft size={20} className="mr-1" />
            <span>返回首页</span>
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-10">
            <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
              <div className="text-center px-4">
                <h1 className="text-3xl font-bold text-white mb-2">联系我们</h1>
                <p className="text-xl text-blue-100">我们期待听到您的声音</p>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">联系方式</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <Mail className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">电子邮件</h3>
                        <p className="text-gray-600 mt-1">contact@zhiyi.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <MapPin className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">地址</h3>
                        <p className="text-gray-600 mt-1">北京市海淀区</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <Phone className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">电话</h3>
                        <p className="text-gray-600 mt-1">+86 (10) 8888-7777</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-10">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">社交媒体</h3>
                    <div className="flex space-x-4">
                      <a href="https://twitter.com/zhiyi" target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                        </svg>
                      </a>
                      <a href="https://weibo.com/zhiyi" target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                          <path d="M20.9 19.1a8.5 8.5 0 0 0-8.9-14.2c-4.6-1.4-9.9 1-11.3 5.6-1.4 4.6 1 9.9 5.6 11.3 4.6 1.4 9.9-1 11.3-5.6.5-1.7.5-3.4 0-5.1"></path>
                          <path d="M10.9 12.5a3.5 3.5 0 0 0-3.9-2.9c-1.9.5-3 2.4-2.5 4.3.5 1.9 2.4 3 4.3 2.5 1.9-.5 3-2.4 2.5-4.3"></path>
                          <path d="M13 7.5a1 1 0 1 0 2 0a1 1 0 1 0-2 0"></path>
                        </svg>
                      </a>
                      <a href="https://linkedin.com/company/zhiyi" target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">个人简历</h2>
                  
                  {/* Education Section */}
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <GraduationCap className="text-blue-600 mr-3" size={24} />
                      <h3 className="text-xl font-bold text-gray-800">教育背景</h3>
                    </div>
                    
                    <div className="border-l-2 border-blue-200 pl-5 ml-3 space-y-6">
                      <div>
                        <div className="flex justify-between items-baseline">
                          <h4 className="text-lg font-semibold text-gray-800">北京大学</h4>
                          <span className="text-sm text-gray-500">2018 - 2022</span>
                        </div>
                        <p className="text-gray-700 font-medium">翻译学硕士</p>
                        <p className="text-gray-600 mt-1">专注于英汉文学翻译研究，毕业论文《文化差异下的翻译策略研究》获得优秀论文奖。</p>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-baseline">
                          <h4 className="text-lg font-semibold text-gray-800">清华大学</h4>
                          <span className="text-sm text-gray-500">2014 - 2018</span>
                        </div>
                        <p className="text-gray-700 font-medium">英语语言文学学士</p>
                        <p className="text-gray-600 mt-1">主修英语语言文学，辅修计算机科学。GPA 3.8/4.0，获得校级优秀毕业生称号。</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Experience Section */}
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <Briefcase className="text-blue-600 mr-3" size={24} />
                      <h3 className="text-xl font-bold text-gray-800">工作经历</h3>
                    </div>
                    
                    <div className="border-l-2 border-blue-200 pl-5 ml-3 space-y-6">
                      <div>
                        <div className="flex justify-between items-baseline">
                          <h4 className="text-lg font-semibold text-gray-800">知译翻译平台</h4>
                          <span className="text-sm text-gray-500">2022 - 至今</span>
                        </div>
                        <p className="text-gray-700 font-medium">资深翻译与内容策划</p>
                        <p className="text-gray-600 mt-1">负责平台高质量学术文章的翻译与审校，开发翻译指南与标准，组织翻译培训活动，管理翻译团队。</p>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-baseline">
                          <h4 className="text-lg font-semibold text-gray-800">国际出版社</h4>
                          <span className="text-sm text-gray-500">2020 - 2022</span>
                        </div>
                        <p className="text-gray-700 font-medium">翻译编辑</p>
                        <p className="text-gray-600 mt-1">参与多部国际畅销书籍的翻译项目，负责文学作品与学术著作的翻译与编辑工作。</p>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-baseline">
                          <h4 className="text-lg font-semibold text-gray-800">语言教育中心</h4>
                          <span className="text-sm text-gray-500">2018 - 2020</span>
                        </div>
                        <p className="text-gray-700 font-medium">英语教师</p>
                        <p className="text-gray-600 mt-1">为高级英语学习者提供专业语言培训，开发翻译与写作课程，指导学生参与翻译比赛。</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Skills Section */}
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <BookOpen className="text-blue-600 mr-3" size={24} />
                      <h3 className="text-xl font-bold text-gray-800">专业技能</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">语言能力</h4>
                        <ul className="text-gray-600 space-y-1">
                          <li>• 中文（母语）</li>
                          <li>• 英语（专业级，CATTI 二级）</li>
                          <li>• 法语（中级）</li>
                          <li>• 日语（初级）</li>
                        </ul>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">翻译专长</h4>
                        <ul className="text-gray-600 space-y-1">
                          <li>• 学术论文翻译</li>
                          <li>• 文学作品翻译</li>
                          <li>• 技术文档翻译</li>
                          <li>• 字幕翻译</li>
                        </ul>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">技术能力</h4>
                        <ul className="text-gray-600 space-y-1">
                          <li>• CAT工具：SDL Trados, MemoQ</li>
                          <li>• 排版：InDesign, LaTeX</li>
                          <li>• 编程：HTML, CSS, JavaScript</li>
                          <li>• 办公软件：Microsoft Office, Google Suite</li>
                        </ul>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">其他技能</h4>
                        <ul className="text-gray-600 space-y-1">
                          <li>• 项目管理</li>
                          <li>• 内容创作</li>
                          <li>• 语言教学</li>
                          <li>• 跨文化交流</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {/* Awards Section */}
                  <div>
                    <div className="flex items-center mb-4">
                      <Award className="text-blue-600 mr-3" size={24} />
                      <h3 className="text-xl font-bold text-gray-800">荣誉与认证</h3>
                    </div>
                    
                    <div className="border-l-2 border-blue-200 pl-5 ml-3 space-y-4">
                      <div>
                        <div className="flex justify-between items-baseline">
                          <h4 className="text-lg font-semibold text-gray-800">全国翻译大赛一等奖</h4>
                          <span className="text-sm text-gray-500">2021</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-baseline">
                          <h4 className="text-lg font-semibold text-gray-800">CATTI（中国翻译专业资格）二级证书</h4>
                          <span className="text-sm text-gray-500">2020</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-baseline">
                          <h4 className="text-lg font-semibold text-gray-800">优秀翻译工作者</h4>
                          <span className="text-sm text-gray-500">2019</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;