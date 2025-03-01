import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, BookOpen, Globe, Lightbulb, Users, Mail } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6 max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <ChevronLeft size={20} className="mr-1" />
            <span>返回首页</span>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-10">
            <div className="h-64 bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
              <div className="text-center px-4">
                <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
                  <span className="mr-2 text-5xl">知</span>
                  <span className="text-blue-100">译</span>
                </h1>
                <p className="text-xl text-blue-100">跨越语言的知识桥梁</p>
              </div>
            </div>

            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <BookOpen className="mr-3 text-blue-600" size={24} />
                关于我们
              </h2>

              <div className="prose prose-lg max-w-none">
                <p className="mb-4">
                  知译是一个致力于促进中英文学术交流的双语平台，我们的使命是通过高质量的翻译和解析，打破语言障碍，让优质的学术内容能够跨越语言的界限，为中文读者提供更广阔的知识视野。
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4 flex items-center">
                  <Globe className="mr-2 text-blue-600" size={20} />
                  我们的愿景
                </h3>
                <p className="mb-4">
                  我们相信知识不应该被语言所限制。在全球化的今天，跨语言的学术交流变得尤为重要。知译希望成为连接中英文学术世界的桥梁，让思想的火花能够自由地跨越语言的藩篱。
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4 flex items-center">
                  <Lightbulb className="mr-2 text-blue-600" size={20} />
                  我们的特色
                </h3>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li>
                    <strong>高质量翻译</strong>：我们的翻译团队由专业翻译和学科专家组成，确保翻译的准确性和专业性。
                  </li>
                  <li>
                    <strong>双语对照</strong>：所有文章均提供英文原文和中文翻译的对照阅读，方便读者理解和学习。
                  </li>
                  <li>
                    <strong>术语解析</strong>：对文章中的专业术语提供详细解释，帮助读者更好地理解专业内容。
                  </li>
                  <li>
                    <strong>语法分析</strong>：对复杂句式进行分析，帮助语言学习者提高英语阅读能力。
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4 flex items-center">
                  <Users className="mr-2 text-blue-600" size={20} />
                  我们的团队
                </h3>
                <p className="mb-4">
                  知译由一群热爱学术、热爱翻译的专业人士组成。我们的团队成员来自不同的学术背景，包括语言学、计算机科学、自然科学和人文社科等多个领域，这使我们能够覆盖广泛的学术主题。
                </p>
                <p className="mb-6">
                  <Link to="/team" className="text-blue-600 hover:text-blue-800 font-medium">
                    了解更多关于我们的团队 →
                  </Link>
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4 flex items-center">
                  <Mail className="mr-2 text-blue-600" size={20} />
                  联系我们
                </h3>
                <p className="mb-4">
                  我们欢迎各种形式的合作和交流。如果您有任何问题、建议或合作意向，请随时与我们联系。
                </p>
                <p className="mb-6">
                  <Link to="/contact" className="text-blue-600 hover:text-blue-800 font-medium">
                    查看联系方式 →
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-8 mb-10">
            <h3 className="text-xl font-bold text-blue-800 mb-4">加入我们</h3>
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

export default AboutPage;