import React from 'react';
import { Settings2, Database, Sliders, Shield } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="h-full flex flex-col space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Cấu hình Hệ thống & RAG</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
              <Sliders className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-bold text-slate-800 dark:text-white">Tham số mô hình AI</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500 dark:text-slate-400">Temperature (Độ sáng tạo)</span>
                <span className="font-medium dark:text-white">0.1</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full">
                <div className="h-full bg-blue-500 rounded-full" style={{width: '10%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500 dark:text-slate-400">Top-K (Retrieval)</span>
                <span className="font-medium dark:text-white">5</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full">
                <div className="h-full bg-blue-500 rounded-full" style={{width: '50%'}}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-orange-50 dark:bg-orange-500/10 rounded-lg">
              <Database className="w-5 h-5 text-shb-orange" />
            </div>
            <h3 className="font-bold text-slate-800 dark:text-white">Từ điển nghiệp vụ (Dict)</h3>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Quản lý danh sách các từ viết tắt chuyên ngành ngân hàng để RAG engine nhận diện chính xác.
          </p>
          <button className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 w-full hover:bg-slate-100 dark:hover:bg-slate-800">
            Quản lý 1,245 Keywords
          </button>
        </div>
      </div>
    </div>
  );
}
