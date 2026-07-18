import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  MessageSquare, Upload, BarChart2, Layers, LogOut, Sun, Moon,
  Columns, Settings2, User, ShieldCheck, Settings
} from 'lucide-react';

export default function MainLayout({ children, role }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Define Menus based on Role
  let menuItems = [];
  let profile = {};

  if (role === 'user') {
    menuItems = [
      { path: '/chat', name: 'Trợ lý Tra cứu AI', icon: <MessageSquare className="w-5 h-5" /> },
      { path: '/compare', name: 'Đối chiếu Văn bản', icon: <Columns className="w-5 h-5" /> }
    ];
    profile = {
      name: 'Chuyên viên Tín dụng',
      dept: 'Khối Kinh Doanh',
      icon: <User className="w-5 h-5" />,
      color: 'text-shb-orange bg-orange-100 dark:bg-orange-900/30'
    };
  } else if (role === 'admin') {
    menuItems = [
      { path: '/ingest', name: 'Quản lý Nạp liệu', icon: <Upload className="w-5 h-5" /> },
      { path: '/settings', name: 'Cấu hình Hệ thống', icon: <Settings2 className="w-5 h-5" /> }
    ];
    profile = {
      name: 'Chuyên viên Pháp chế',
      dept: 'Khối Quản Trị',
      icon: <ShieldCheck className="w-5 h-5" />,
      color: 'text-shb-navy dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
    };
  } else if (role === 'judge') {
    menuItems = [
      { path: '/benchmark', name: 'Thử nghiệm & So sánh', icon: <BarChart2 className="w-5 h-5" /> }
    ];
    profile = {
      name: 'Ban Giám Khảo',
      dept: 'Demo Day',
      icon: <Settings className="w-5 h-5" />,
      color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30'
    };
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden font-sans transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-72 bg-shb-navy text-white flex flex-col justify-between shadow-xl z-20 transition-colors duration-300">
        <div>
          {/* Logo & Header */}
          <div className="p-6 border-b border-shb-navy-light">
            <div className="bg-white py-3 px-4 rounded-xl w-full flex items-center justify-center shadow-sm">
              <img src="/Logo-SHB-VN.png" alt="SHB Logo" className="h-10 w-auto object-contain" />
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="mt-6 px-4 space-y-2">
            <div className="px-4 pb-2">
              <h1 className="text-[11px] font-extrabold text-slate-400 tracking-widest uppercase">
                Không gian làm việc
              </h1>
            </div>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-shb-orange text-white shadow-lg shadow-shb-orange/20 font-medium'
                      : 'text-slate-300 hover:bg-shb-navy-light hover:text-white'
                  }`}
                >
                  <div className={`transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                    {item.icon}
                  </div>
                  <span className="text-sm font-semibold">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Info */}
        <div className="p-4 space-y-4">
          <div className="p-4 border border-shb-navy-light bg-shb-navy-dark/40 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400">Engine Status</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-slate-300">
              <Layers className="w-3.5 h-3.5 text-shb-orange" />
              <span>RAG v1.0-Core</span>
            </div>
          </div>

          <button 
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center space-x-2 text-sm font-semibold text-slate-300 hover:text-white hover:bg-shb-navy-light py-3 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Đổi Vai Trò</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 shadow-sm z-10 transition-colors duration-300">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 hidden md:inline">
              Hệ thống Tri thức AI
            </h2>
          </div>

          <div className="flex items-center space-x-6">
            {/* Theme Toggle */}
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
              title="Toggle Dark Mode"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Profile */}
            <div className="flex items-center space-x-3 border-l border-slate-200 dark:border-slate-700 pl-6">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{profile.name}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">{profile.dept}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${profile.color}`}>
                {profile.icon}
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Pages */}
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 p-8 relative transition-colors duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}
