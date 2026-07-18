import React, { useState } from 'react';
import { Database } from 'lucide-react';
import { mockIngestedDocs } from '../data/mockData';

export default function LibraryPage() {
  const [ingestedDocs] = useState(mockIngestedDocs);

  return (
    <div className="max-w-6xl w-full mx-auto h-full flex flex-col space-y-4 md:space-y-6 px-4 md:px-8 py-6 md:py-8">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-3 bg-shb-navy dark:bg-slate-800 rounded-xl">
          <Database className="w-6 h-6 text-white dark:text-shb-orange" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Kho Dữ Liệu</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Quản lý các tài liệu đã nạp vào hệ thống AI</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-5 md:p-8 animate-slideDown">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {ingestedDocs.map((doc) => (
            <div key={doc.id} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 hover:border-shb-orange/50 transition-colors cursor-pointer group">
              <div className="mb-3">
                <span className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-shb-orange transition-colors">{doc.docNumber}</span>
              </div>
              <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-4">{doc.title}</h3>
              <div className="space-y-2 border-t border-slate-200 dark:border-slate-700 pt-4 text-xs font-medium">
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Trạng thái:</span>
                  <span className={doc.status === 'Đang hiệu lực' ? 'text-emerald-500' : 'text-amber-500'}>{doc.status}</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Liên kết pháp lý:</span>
                  <span className="text-shb-orange">{doc.relationsCount} nodes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
