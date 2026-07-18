import React from 'react';
import { History, ShieldAlert, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockCitations } from '../../data/mockData';

export default function TimelineTab({ currentTopic, selectedCitation }) {
  return (
    <motion.div key="timeline-tab" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="relative pl-6 border-l-[3px] border-slate-200 dark:border-slate-700 space-y-8 py-2 ml-2">
        
        {currentTopic === 'cho vay' && (
          <motion.div initial="hidden" animate="visible" variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}>
            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="relative group mb-8">
              <div className="absolute -left-[33px] top-2 w-4 h-4 rounded-full border-[3px] border-white dark:border-slate-800 bg-slate-400 ring-4 ring-slate-100 dark:ring-slate-800 transition-all group-hover:scale-125"></div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-full font-bold">15/03/2017</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Bản gốc</span>
                </div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">TT 39/2016/TT-NHNN</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Quy định các nhu cầu vốn không được cho vay (Điều 8).</p>
              </div>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="relative group mb-8">
              <div className="absolute -left-[33px] top-2 w-4 h-4 rounded-full border-[3px] border-white dark:border-slate-800 bg-amber-500 ring-4 ring-amber-50 dark:ring-amber-900/30 transition-all group-hover:scale-125"></div>
              <div className="bg-amber-50/50 dark:bg-amber-900/10 p-4 rounded-2xl border border-amber-200/60 dark:border-amber-800/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 px-2.5 py-1 rounded-full font-bold">01/09/2023</span>
                  <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider flex items-center gap-1"><History className="w-3 h-3"/> Sửa đổi</span>
                </div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">TT 06/2023/TT-NHNN</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">Bổ sung khoản 8, 9, 10 (Cấm cho vay đặt cọc, góp vốn).</p>
              </div>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="relative group">
              <div className="absolute -left-[33px] top-2 w-4 h-4 rounded-full border-[3px] border-white dark:border-slate-800 bg-emerald-500 ring-4 ring-emerald-50 dark:ring-emerald-900/30 transition-all group-hover:scale-125 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              <div className="bg-emerald-50/50 dark:bg-emerald-900/10 p-4 rounded-2xl border border-emerald-200/60 dark:border-emerald-800/50 shadow-md hover:shadow-lg transition-shadow relative overflow-hidden">
                <div className="absolute right-0 top-0 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl -mr-4 -mt-4"></div>
                <div className="flex items-center justify-between mb-2 relative z-10">
                  <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-full font-bold">01/09/2023</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1"><ShieldAlert className="w-3 h-3"/> Đình chỉ</span>
                </div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1 relative z-10">TT 10/2023/TT-NHNN</h4>
                <p className="text-xs text-emerald-800 dark:text-emerald-200 font-medium leading-relaxed relative z-10">Ngưng hiệu lực thi hành các khoản cấm mới của TT 06. Áp dụng quy định cũ.</p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {currentTopic === 'an toan von' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative group">
            <div className="absolute -left-[33px] top-2 w-4 h-4 rounded-full border-[3px] border-white dark:border-slate-800 bg-blue-500 ring-4 ring-blue-50 dark:ring-blue-900/30 transition-all group-hover:scale-125"></div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-full font-bold">01/01/2020</span>
                <span className="text-[10px] text-blue-500 font-bold uppercase tracking-wider">Đang hiệu lực</span>
              </div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">TT 41/2016/TT-NHNN</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Quy định về tỷ lệ an toàn vốn (CAR) tối thiểu 8%.</p>
            </div>
          </motion.div>
        )}

        {currentTopic === 'phan loai no' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative group">
            <div className="absolute -left-[33px] top-2 w-4 h-4 rounded-full border-[3px] border-white dark:border-slate-800 bg-purple-500 ring-4 ring-purple-50 dark:ring-purple-900/30 transition-all group-hover:scale-125"></div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-full font-bold">01/10/2021</span>
                <span className="text-[10px] text-purple-500 font-bold uppercase tracking-wider">Đang hiệu lực</span>
              </div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">TT 11/2021/TT-NHNN</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Quy định phân loại nợ và trích lập dự phòng rủi ro.</p>
            </div>
          </motion.div>
        )}

      </div>

      {selectedCitation && mockCitations[selectedCitation] && (
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 space-y-2">
          <div className="flex items-center space-x-1.5 text-shb-orange dark:text-orange-400 font-bold text-xs border-b border-slate-200 dark:border-slate-600 pb-2">
            <FileText className="w-4 h-4" />
            <span>{mockCitations[selectedCitation].title}</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium italic">
            "{mockCitations[selectedCitation].content}"
          </p>
        </div>
      )}
    </motion.div>
  );
}
