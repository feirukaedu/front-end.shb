import React, { useState } from 'react';
import { Play, Sparkles, AlertTriangle, ShieldAlert, Award, FileText, TrendingUp, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BenchmarkPage() {
  const [selectedScenario, setSelectedScenario] = useState('scenario-1');

  const scenarios = {
    'scenario-1': {
      query: 'Có được cho vay vốn để đặt cọc thực hiện dự án đầu tư chưa đủ điều kiện?',
      standardRag: {
        answer: 'Theo quy định tại Khoản 2 Điều 1 Thông tư 06/2023/TT-NHNN bổ sung khoản 10 Điều 8 Thông tư 39/2016/TT-NHNN, tổ chức tín dụng KHÔNG được cho vay đối với nhu cầu vốn để thanh toán tiền đặt cọc để thực hiện các giao dịch trong tương lai mà tại thời điểm đặt cọc chưa đủ điều kiện thực hiện theo quy định của pháp luật. Vì vậy, khách hàng không được vay cho mục đích này.',
        isCorrect: false,
        errorReason: 'Sử dụng luật cũ đã bị ngưng hiệu lực bởi Thông tư 10/2023/TT-NHNN.',
        sources: ['TT 06/2023/TT-NHNN (Điều 1)']
      },
      advancedRag: {
        answer: 'Hiện tại, việc cho vay vốn thanh toán tiền đặt cọc dự án đầu tư ĐƯỢC PHÉP thực hiện. Mặc dù Thông tư 06/2023/TT-NHNN từng cấm điều này, nhưng ngay sau đó Ngân hàng Nhà nước đã ban hành Thông tư 10/2023/TT-NHNN có hiệu lực cùng ngày (01/09/2023) để ngưng hiệu lực thi hành các khoản cấm cho vay đặt cọc, góp vốn của Thông tư 06 cho đến khi có văn bản mới hướng dẫn.',
        isCorrect: true,
        alertMsg: 'CẢNH BÁO: Khoản 8, 9, 10 Điều 8 của TT 39 (bổ sung bởi TT 06) đã bị NGƯNG hiệu lực bởi Thông tư 10/2023/TT-NHNN.',
        sources: ['TT 39/2016 (Điều 8)', 'TT 10/2023 (Điều 1)']
      }
    },
    'scenario-2': {
      query: 'Ngân hàng cho vay góp vốn để mua cổ phần công ty khác được không?',
      standardRag: {
        answer: 'Tổ chức tín dụng không được cho vay đối với nhu cầu vốn để gửi tiền hoặc để thanh toán tiền góp vốn, mua cổ phần của công ty khác theo quy định bổ sung của Thông tư 06/2023/TT-NHNN có hiệu lực từ ngày 01/09/2023. Do đó ngân hàng từ chối hồ sơ này.',
        isCorrect: false,
        errorReason: 'Quy định cấm này đã bị đình chỉ thi hành ngay lập tức bởi Thông tư 10/2023.',
        sources: ['TT 06/2023/TT-NHNN (Khoản 8 Điều 8)']
      },
      advancedRag: {
        answer: 'Tổ chức tín dụng vẫn được thực hiện hồ sơ cho vay góp vốn, mua cổ phần. Lý do là Thông tư 10/2023/TT-NHNN đã tạm thời ngưng thi hành lệnh cấm góp vốn của Thông tư 06/2023/TT-NHNN từ ngày 01/09/2023 cho đến khi có quy định mới. Ngân hàng áp dụng theo Thông tư 39/2016/TT-NHNN gốc.',
        isCorrect: true,
        alertMsg: 'CẢNH BÁO: Quy định cấm góp vốn mua cổ phần tại Khoản 8 Điều 8 đã bị ngưng thi hành bởi TT 10/2023/TT-NHNN.',
        sources: ['TT 39/2016 (Điều 8 gốc)', 'TT 10/2023 (Điều 1)']
      }
    }
  };

  const metrics = [
    { name: 'Độ chính xác quy định sửa đổi', advanced: 98, standard: 62, unit: '%' },
    { name: 'Tỷ lệ bịa luật (Hallucination)', advanced: 0.5, standard: 14.8, unit: '%' },
    { name: 'Khả năng lần vết chéo (Cross-ref)', advanced: 100, standard: 35, unit: '%' },
    { name: 'Độ trễ phản hồi (Latency)', advanced: 1.2, standard: 1.8, unit: 's' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn h-full">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Đánh Giá Hiệu Năng & Đối Sánh RAG</h1>
      </div>

      {/* Metrics Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-tr from-shb-navy to-shb-navy-light text-white p-5 rounded-2xl shadow-sm border border-slate-200/10">
          <span className="text-[10px] uppercase font-bold text-slate-300">Độ chính xác tổng thể</span>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-3xl font-extrabold text-shb-orange">98.2%</span>
            <span className="text-xs text-emerald-400 font-bold">▲ +36.2%</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Tỷ lệ bịa luật</span>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-3xl font-extrabold text-slate-700 dark:text-slate-200">0.5%</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">▼ -14.3%</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Thời gian tiết kiệm</span>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-3xl font-extrabold text-slate-700 dark:text-slate-200">2.5 giờ</span>
            <span className="text-xs text-shb-orange font-bold">/ ngày / người</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Đấu nối thành công</span>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-3xl font-extrabold text-slate-700 dark:text-slate-200">100%</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">Dẫn chiếu chéo</span>
          </div>
        </div>
      </div>

      {/* Simulator: Side by Side Comparison */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden transition-colors duration-300">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Cpu className="w-5 h-5 text-shb-orange" />
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100">Trình giả lập Đối Sánh Câu Trả Lời</h2>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedScenario('scenario-1')}
              className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
                selectedScenario === 'scenario-1'
                  ? 'bg-shb-orange text-white border-shb-orange shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              Kịch bản 1: Cho vay Đặt Cọc
            </button>
            <button
              onClick={() => setSelectedScenario('scenario-2')}
              className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
                selectedScenario === 'scenario-2'
                  ? 'bg-shb-orange text-white border-shb-orange shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              Kịch bản 2: Góp Vốn
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">Q</div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Câu hỏi thử nghiệm</span>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mt-1">{scenarios[selectedScenario].query}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Standard RAG */}
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Standard RAG</span>
                  <span className="bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 border border-rose-100 dark:border-rose-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Sai Quy Định</span>
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-100 dark:border-slate-700 font-medium italic">
                  "{scenarios[selectedScenario].standardRag.answer}"
                </p>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-700 pt-3 space-y-2">
                <div className="text-[10px] text-rose-600 dark:text-rose-400 font-bold bg-rose-50 dark:bg-rose-900/30 p-2.5 rounded-lg border border-rose-100/50 dark:border-rose-900/50">
                  Lỗi RAG: {scenarios[selectedScenario].standardRag.errorReason}
                </div>
                <div className="text-[9px] text-slate-400 dark:text-slate-500 font-medium">
                  Nguồn: {scenarios[selectedScenario].standardRag.sources.join(', ')}
                </div>
              </div>
            </div>

            {/* Advanced RAG */}
            <div className="border-2 border-shb-orange/40 rounded-xl p-5 flex flex-col justify-between space-y-4 bg-orange-50/10 dark:bg-orange-900/10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-tr from-shb-orange/10 to-transparent rounded-full -mr-8 -mt-8"></div>
              
              <div className="space-y-3 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-shb-navy dark:text-blue-400 uppercase tracking-wider flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-shb-orange" />
                    <span>Advanced RAG (SHB)</span>
                  </span>
                  <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                    <Award className="w-3 h-3 text-emerald-500" />
                    <span>Chuẩn Xác 100%</span>
                  </span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-100 dark:border-slate-600 font-medium italic shadow-sm">
                  "{scenarios[selectedScenario].advancedRag.answer}"
                </p>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-700 pt-3 space-y-2 relative z-10">
                <div className="text-[10px] text-rose-800 dark:text-rose-200 font-bold bg-rose-50 dark:bg-rose-900/50 border-l-4 border-rose-500 p-2.5 rounded-r-lg">
                  {scenarios[selectedScenario].advancedRag.alertMsg}
                </div>
                <div className="flex items-center justify-between text-[9px] text-slate-400 dark:text-slate-500 font-medium">
                  <span>Nguồn: {scenarios[selectedScenario].advancedRag.sources.join(', ')}</span>
                  <span className="text-shb-orange dark:text-orange-400 font-bold">Lọc trục thời gian thành công</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details bar metrics */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 transition-colors duration-300">
        <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-2 mb-6">
          <TrendingUp className="w-5 h-5 text-shb-orange" />
          <span>Biểu Đồ Đối Sánh RAG</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {metrics.map((m, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">{m.name}</span>
                <div className="font-bold flex space-x-3 text-right tracking-tight">
                  <span className="text-shb-orange">Adv: {m.advanced}{m.unit}</span>
                  <span className="text-slate-400">Std: {m.standard}{m.unit}</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-shb-orange h-2 rounded-full shadow-sm"
                    style={{ width: `${m.name.includes('Độ trễ') ? (m.standard / (m.advanced + m.standard)) * 100 : m.advanced}%` }}
                  ></div>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-slate-400 dark:bg-slate-500 h-2 rounded-full"
                    style={{ width: `${m.name.includes('Độ trễ') ? (m.advanced / (m.advanced + m.standard)) * 100 : m.standard}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
