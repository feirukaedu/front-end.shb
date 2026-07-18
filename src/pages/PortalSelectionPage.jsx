import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, ArrowRight, ShieldCheck } from 'lucide-react';

export default function PortalSelectionPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col transition-colors duration-300">
      <header className="py-6 px-12 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center shadow-sm z-10">
        <img src="/Logo-SHB-VN.png" alt="SHB" className="h-10 object-contain mr-4 bg-white p-1 rounded-md" />
        <div className="border-l border-slate-300 dark:border-slate-700 pl-4">
          <h1 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-widest">SHB Knowledge</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Enterprise AI Portal</p>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        {/* Decorative BG */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-shb-orange/10 dark:bg-shb-orange/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-shb-navy/10 dark:bg-shb-navy/20 rounded-full blur-3xl"></div>

        <div className="text-center mb-16 relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Vui lòng chọn Không gian làm việc
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
            Hệ thống phân quyền (Role-based) tự động định tuyến các chức năng chuyên môn dựa trên vai trò của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl relative z-10">
          {/* Card 1: End-User (Kinh doanh) */}
          <button 
            onClick={() => navigate('/chat')}
            className="group bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-shb-orange dark:hover:border-shb-orange hover:shadow-2xl hover:shadow-shb-orange/20 transition-all duration-300 text-left flex flex-col h-full"
          >
            <div className="w-16 h-16 bg-orange-50 dark:bg-orange-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <User className="w-8 h-8 text-shb-orange" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Khối Kinh Doanh</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8 flex-1">
              Dành cho Chuyên viên Tín dụng, Giao dịch viên. Sử dụng Trợ lý AI để tra cứu quy chế, thông tư và đối chiếu văn bản nghiệp vụ.
            </p>
            <div className="flex items-center text-shb-orange font-bold mt-auto">
              Truy cập Không gian Chat <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </button>

          {/* Card 2: Admin (Pháp chế/Quản trị) */}
          <button 
            onClick={() => navigate('/ingest')}
            className="group bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-shb-navy dark:hover:border-shb-navy hover:shadow-2xl hover:shadow-shb-navy/20 transition-all duration-300 text-left flex flex-col h-full"
          >
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-8 h-8 text-shb-navy dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Khối Pháp Chế (Admin)</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8 flex-1">
              Dành cho Quản trị viên hệ thống. Chịu trách nhiệm nạp văn bản, khai báo liên kết pháp lý và cấu hình tham số lõi RAG.
            </p>
            <div className="flex items-center text-shb-navy dark:text-blue-400 font-bold mt-auto">
              Truy cập Quản trị Hệ thống <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </button>
        </div>

        {/* Card 3: Benchmark (Demo) - Smaller access for judges */}
        <div className="mt-12">
          <button 
            onClick={() => navigate('/benchmark')}
            className="flex items-center space-x-2 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors font-medium bg-white dark:bg-slate-800 px-6 py-3 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm"
          >
            <Settings className="w-4 h-4" />
            <span>Phân hệ Giám khảo (Demo Đối sánh RAG Benchmark)</span>
          </button>
        </div>
      </main>
    </div>
  );
}
