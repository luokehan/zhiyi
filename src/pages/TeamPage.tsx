import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Github, Twitter, Linkedin, Mail, Globe } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  social: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    website?: string;
    email?: string;
  };
}

const TeamPage: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: '张明',
      title: '创始人 & 首席编辑',
      bio: '张明拥有北京大学英语语言文学博士学位，曾在多家国际学术期刊担任翻译和编辑。他创立知译的初衷是希望能够让更多中文读者接触到国际前沿的学术思想。',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
      social: {
        twitter: 'https://twitter.com/zhangming',
        linkedin: 'https://linkedin.com/in/zhangming',
        email: 'zhang@zhiyi.com'
      }
    },
    {
      id: 2,
      name: '李华',
      title: '技术总监',
      bio: '李华是一位全栈开发工程师，拥有清华大学计算机科学硕士学位。他负责知译平台的技术开发和维护，致力于打造流畅、直观的用户体验。',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
      social: {
        github: 'https://github.com/lihua',
        linkedin: 'https://linkedin.com/in/lihua',
        website: 'https://lihua.dev'
      }
    },
    {
      id: 3,
      name: '王芳',
      title: '科技领域主编',
      bio: '王芳拥有麻省理工学院物理学博士学位，曾在多家科技媒体担任科学记者。她负责知译平台的科技类文章的选题和编辑工作，专注于将复杂的科学概念以通俗易懂的方式呈现给读者。',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
      social: {
        twitter: 'https://twitter.com/wangfang',
        linkedin: 'https://linkedin.com/in/wangfang',
        email: 'wang@zhiyi.com'
      }
    },
    {
      id: 4,
      name: '陈强',
      title: '人文社科主编',
      bio: '陈强毕业于哈佛大学，拥有哲学博士学位。他曾在多家学术机构从事研究工作，对哲学、历史和文化研究有深入的研究。他负责知译平台的人文社科类文章的选题和编辑工作。',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
      social: {
        twitter: 'https://twitter.com/chenqiang',
        website: 'https://chenqiang.org',
        email: 'chen@zhiyi.com'
      }
    },
    {
      id: 5,
      name: '林小雨',
      title: '资深翻译',
      bio: '林小雨拥有上海外国语大学翻译硕士学位，有超过10年的专业翻译经验。她精通英语、日语和法语，负责知译平台的多语种翻译工作。',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
      social: {
        linkedin: 'https://linkedin.com/in/linxiaoyu',
        email: 'lin@zhiyi.com'
      }
    },
    {
      id: 6,
      name: '赵天明',
      title: '观点专栏作家',
      bio: '赵天明是一位资深媒体人和评论家，曾在多家国际媒体担任专栏作家。他关注全球政治、经济和社会议题，为知译平台提供深度分析和评论。',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
      social: {
        twitter: 'https://twitter.com/zhaotianming',
        website: 'https://zhaotianming.com',
        email: 'zhao@zhiyi.com'
      }
    }
  ];

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
                <h1 className="text-3xl font-bold text-white mb-2">我们的团队</h1>
                <p className="text-xl text-blue-100">认识知译背后的专业人士</p>
              </div>
            </div>

            <div className="p-8">
              <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto text-center">
                知译由一群热爱学术、热爱翻译的专业人士组成。我们的团队成员来自不同的学术背景，
                共同致力于促进中英文学术交流，打破语言障碍，传播优质知识。
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {teamMembers.map((member) => (
                  <div key={member.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md">
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <img 
                          src={member.avatar} 
                          alt={member.name} 
                          className="w-16 h-16 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                          <p className="text-blue-600">{member.title}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-6 line-clamp-4">
                        {member.bio}
                      </p>
                      
                      <div className="flex space-x-3 mt-auto">
                        {member.social.email && (
                          <a 
                            href={`mailto:${member.social.email}`} 
                            className="text-gray-500 hover:text-blue-600 transition-colors"
                            aria-label="Email"
                          >
                            <Mail size={18} />
                          </a>
                        )}
                        {member.social.twitter && (
                          <a 
                            href={member.social.twitter} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-gray-500 hover:text-blue-400 transition-colors"
                            aria-label="Twitter"
                          >
                            <Twitter size={18} />
                          </a>
                        )}
                        {member.social.github && (
                          <a 
                            href={member.social.github} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-gray-500 hover:text-gray-900 transition-colors"
                            aria-label="GitHub"
                          >
                            <Github size={18} />
                          </a>
                        )}
                        {member.social.linkedin && (
                          <a 
                            href={member.social.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-gray-500 hover:text-blue-700 transition-colors"
                            aria-label="LinkedIn"
                          >
                            <Linkedin size={18} />
                          </a>
                        )}
                        {member.social.website && (
                          <a 
                            href={member.social.website} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-gray-500 hover:text-green-600 transition-colors"
                            aria-label="Website"
                          >
                            <Globe size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-8 mb-10">
            <h3 className="text-xl font-bold text-blue-800 mb-4">加入我们的团队</h3>
            <p className="text-blue-700 mb-6">
              我们始终欢迎有志于促进跨语言学术交流的人才加入我们的团队。无论您是专业翻译、学科专家还是技术开发人员，只要您对我们的使命感兴趣，都可以联系我们。
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
            >
              联系我们
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;