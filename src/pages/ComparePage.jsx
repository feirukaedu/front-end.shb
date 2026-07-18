import React from 'react';
import { Columns, ArrowRight, FileText } from 'lucide-react';

export default function ComparePage() {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Đối chiếu Văn bản pháp lý</h1>
      </div>
      
      <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-8 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-shb-orange/10 rounded-full flex items-center justify-center mb-6">
          <Columns className="w-10 h-10 text-shb-orange" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Tính năng đang được phát triển</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
          Không gian này sẽ cho phép chuyên viên tín dụng đặt 2 văn bản song song để bôi sáng (highlight) các điều khoản thay đổi.
        </p>
        
        <div className="flex items-center space-x-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 w-48">
            <FileText className="w-6 h-6 text-slate-400 mb-2 mx-auto" />
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-full mb-2"></div>
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mx-auto"></div>
          </div>
          <ArrowRight className="w-6 h-6 text-slate-300 dark:text-slate-600" />
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 w-48">
            <FileText className="w-6 h-6 text-shb-orange mb-2 mx-auto" />
            <div className="h-2 bg-shb-orange/20 rounded w-full mb-2"></div>
            <div className="h-2 bg-shb-orange/20 rounded w-3/4 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
