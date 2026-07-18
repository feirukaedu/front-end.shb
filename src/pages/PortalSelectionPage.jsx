import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, ArrowRight, ShieldCheck } from 'lucide-react';

export default function PortalSelectionPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col transition-colors duration-300">
      <header className="py-3 px-6 md:px-12 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center shadow-sm z-10">
        <img src="/Logo-SHB-VN.png" alt="SHB" className="h-8 md:h-10 object-contain mr-3 md:mr-4 bg-white p-1 rounded-md" />
        <div className="border-l border-slate-300 dark:border-slate-700 pl-3 md:pl-4">
          <h1 className="text-xs md:text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-widest">SHB Knowledge</h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 md:p-8 relative overflow-hidden">
        {/* Decorative BG */}
        <div className="absolute top-[-10%] left-[-10%] w-64 md:w-96 h-64 md:h-96 bg-shb-orange/10 dark:bg-shb-orange/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-64 md:w-96 h-64 md:h-96 bg-shb-navy/10 dark:bg-shb-navy/20 rounded-full blur-3xl"></div>

        <div className="text-center mb-10 md:mb-12 relative z-10">
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Chọn Không gian làm việc
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-2xl relative z-10">
          {/* Card 1: End-User (Kinh doanh) */}
          <button 
            onClick={() => navigate('/chat')}
            className="group bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-shb-orange dark:hover:border-shb-orange hover:shadow-xl hover:shadow-shb-orange/10 transition-all duration-300 flex flex-col items-center justify-center text-center"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-orange-50 dark:bg-orange-500/10 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
              <User className="w-8 h-8 md:w-10 md:h-10 text-shb-orange" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white mb-2">Khối Kinh Doanh</h3>
            <div className="flex items-center text-shb-orange font-bold mt-2 md:mt-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 text-sm">
              Truy cập <ArrowRight className="w-4 h-4 ml-1 md:group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 2: Admin (Pháp chế/Quản trị) */}
          <button 
            onClick={() => navigate('/ingest')}
            className="group bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-shb-navy dark:hover:border-shb-navy hover:shadow-xl hover:shadow-shb-navy/10 transition-all duration-300 flex flex-col items-center justify-center text-center"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-shb-navy dark:text-blue-400" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white mb-2">Khối Pháp Chế</h3>
            <div className="flex items-center text-shb-navy dark:text-blue-400 font-bold mt-2 md:mt-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 text-sm">
              Truy cập <ArrowRight className="w-4 h-4 ml-1 md:group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

        {/* Card 3: Benchmark (Demo) */}
        <div className="mt-12 relative z-10">
          <button 
            onClick={() => navigate('/benchmark')}
            className="flex items-center space-x-2 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors font-medium bg-white dark:bg-slate-800 px-6 py-3 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md"
          >
            <Settings className="w-4 h-4" />
            <span>Phân hệ Giám khảo (Demo)</span>
          </button>
        </div>
      </main>
    </div>
  );
}
