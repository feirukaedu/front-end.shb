import React, { useState, useEffect, useRef } from 'react';
import { Send, BookOpen, ShieldAlert, GitBranch, History, Clock, FileText, Layers, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ForceGraph2D from 'react-force-graph-2d';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Hệ thống Trợ lý Tra cứu Quy chế SHB đã sẵn sàng. Bạn có thể nhập từ khóa nghiệp vụ hoặc số hiệu văn bản để tra cứu.',
      timestamp: '10:00'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [activeTab, setActiveTab] = useState('timeline'); // timeline | graph
  const [selectedCitation, setSelectedCitation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTopic, setCurrentTopic] = useState('cho vay'); // 'cho vay' | 'an toan von' | 'phan loai no'
  const graphRef = useRef();

  useEffect(() => {
    if (graphRef.current && activeTab === 'graph') {
      graphRef.current.d3Force('charge').strength(-400); 
      graphRef.current.d3Force('link').distance(100); 
      graphRef.current.zoomToFit(200, 50);
    }
  }, [currentTopic, activeTab]);

  const graphDataScenarios = {
    'cho vay': {
      nodes: [
        { id: 'tt39', name: 'TT 39', color: '#002654', val: 20, desc: 'Bản gốc' },
        { id: 'tt06', name: 'TT 06', color: '#002654', val: 20, desc: 'Sửa đổi' },
        { id: 'tt10', name: 'TT 10', color: '#F36F21', val: 25, desc: 'Đình chỉ' }
      ],
      links: [
        { source: 'tt06', target: 'tt39', name: 'Sửa đổi', color: '#64748b' },
        { source: 'tt10', target: 'tt06', name: 'Đình chỉ', color: '#F36F21' }
      ]
    },
    'an toan von': {
      nodes: [{ id: 'tt41', name: 'TT 41', color: '#002654', val: 30, desc: 'Đang hiệu lực' }],
      links: []
    },
    'phan loai no': {
      nodes: [{ id: 'tt11', name: 'TT 11', color: '#002654', val: 30, desc: 'Đang hiệu lực' }],
      links: []
    }
  };

  const mockCitations = {
    'cit-1': {
      title: 'Điều 8 - TT 39/2016/TT-NHNN',
      effectiveDate: '15/03/2017',
      expiryDate: 'Bị sửa đổi một phần',
      content: 'Tổ chức tín dụng không được cho vay đối với các nhu cầu vốn: 1. Để thực hiện các hoạt động đầu tư kinh doanh thuộc ngành, nghề cấm... 2. Để mua, sử dụng các dịch vụ của ngành, nghề cấm...'
    },
    'cit-2': {
      title: 'Điều 1 - TT 06/2023/TT-NHNN',
      effectiveDate: '01/09/2023',
      expiryDate: 'Đình chỉ một phần',
      content: 'Bổ sung các khoản 8, 9, 10 về nhu cầu vốn không được cho vay bao gồm: mua cổ phần, góp vốn, thanh toán tiền đặt cọc dự án...'
    },
    'cit-3': {
      title: 'Điều 1 - TT 10/2023/TT-NHNN',
      effectiveDate: '01/09/2023',
      expiryDate: 'Đang hiệu lực',
      content: 'Ngưng hiệu lực thi hành đối với khoản 8, khoản 9 và khoản 10 Điều 8 của Thông tư số 39/2016/TT-NHNN (đã được bổ sung bởi khoản 2 Điều 1 Thông tư số 06/2023/TT-NHNN).'
    },
    'cit-4': {
      title: 'Điều 10 - TT 11/2021/TT-NHNN',
      effectiveDate: '01/10/2021',
      expiryDate: 'Đang hiệu lực',
      content: 'Tổ chức tín dụng thực hiện phân loại nợ theo 05 nhóm như sau: Nhóm 1 (Nợ đủ tiêu chuẩn), Nhóm 2 (Nợ cần chú ý), Nhóm 3 (Nợ dưới tiêu chuẩn), Nhóm 4 (Nợ nghi ngờ), Nhóm 5 (Nợ có khả năng mất vốn).'
    }
  };

  const mockQA = {
    'cho vay': {
      text: 'Điều kiện cho vay liên quan đến góp vốn, mua cổ phần hiện đang chịu sự điều chỉnh của nhiều văn bản pháp lý. Điều 8 TT 39/2016 [cit-1] đã được sửa đổi bởi TT 06/2023 [cit-2]. Đáng chú ý, TT 10/2023 [cit-3] đã đình chỉ hiệu lực các quy định cấm mới này.',
      citations: ['cit-1', 'cit-2', 'cit-3'],
      hasConflict: true,
      conflictMsg: 'Khoản 8, 9, 10 Điều 8 TT 39 (bổ sung bởi TT 06) về cấm cho vay góp vốn ĐÃ BỊ NGƯNG HIỆU LỰC bởi TT 10/2023. Áp dụng quy định cũ.',
    },
    'an toan von': {
      text: 'Theo Thông tư 41/2016/TT-NHNN, tổ chức tín dụng phải duy trì tỷ lệ an toàn vốn (CAR) tối thiểu 8%.',
      citations: ['cit-1'],
      hasConflict: false
    },
    'phan loai no': {
      text: 'Theo Thông tư 11/2021/TT-NHNN, tổ chức tín dụng phải thực hiện phân loại nợ thành 5 nhóm: Nợ đủ tiêu chuẩn, Nợ cần chú ý, Nợ dưới tiêu chuẩn, Nợ nghi ngờ, và Nợ có khả năng mất vốn [cit-4]. Việc phân loại nợ phải được thực hiện ít nhất mỗi quý một lần.',
      citations: ['cit-4'],
      hasConflict: false
    }
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, userMessage]);
    setInputText('');
    setIsLoading(true);

    setTimeout(() => {
      let aiResponseText = 'Hệ thống không tìm thấy kết quả. Vui lòng thử các từ khóa như: "cho vay", "an toàn vốn", "phân loại nợ".';
      let citations = [];
      let hasConflict = false;
      let conflictMsg = '';

      const query = userMessage.text.toLowerCase();
      if (query.includes('cho vay') || query.includes('mục đích') || query.includes('thông tư 39') || query.includes('thông tư 06')) {
        const qa = mockQA['cho vay'];
        setCurrentTopic('cho vay');
        aiResponseText = qa.text;
        citations = qa.citations;
        hasConflict = qa.hasConflict;
        conflictMsg = qa.conflictMsg;
      } else if (query.includes('an toàn vốn') || query.includes('car')) {
        const qa = mockQA['an toan von'];
        setCurrentTopic('an toan von');
        aiResponseText = qa.text;
        citations = qa.citations;
        hasConflict = qa.hasConflict;
      } else if (query.includes('phân loại nợ') || query.includes('nợ xấu')) {
        const qa = mockQA['phan loai no'];
        setCurrentTopic('phan loai no');
        aiResponseText = qa.text;
        citations = qa.citations;
        hasConflict = qa.hasConflict;
      }

      const aiMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: aiResponseText,
        citations,
        hasConflict,
        conflictMsg,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);

      if (citations.length > 0) {
        setSelectedCitation(citations[0]);
      }
    }, 1200);
  };

  const renderMessageText = (message) => {
    if (!message.citations) return message.text;
    let parts = [];
    let text = message.text;
    let lastIndex = 0;
    const regex = /\[(cit-\d+)\]/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
      const citId = match[1];
      const matchIndex = match.index;
      
      parts.push(text.substring(lastIndex, matchIndex));
      const docLabel = citId === 'cit-1' ? 'TT 39/2016' : citId === 'cit-2' ? 'TT 06/2023' : citId === 'cit-3' ? 'TT 10/2023' : 'TT 11/2021';
      parts.push(
        <button
          key={citId}
          onClick={() => setSelectedCitation(citId)}
          className={`mx-1 inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
            selectedCitation === citId
              ? 'bg-shb-orange dark:bg-shb-orange text-white border-shb-orange shadow-sm'
              : 'bg-orange-50 dark:bg-orange-900/30 text-shb-orange dark:text-orange-400 border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-800'
          }`}
        >
          <BookOpen className="w-3 h-3" />
          <span>{docLabel}</span>
        </button>
      );
      lastIndex = regex.lastIndex;
    }
    parts.push(text.substring(lastIndex));
    return parts;
  };

  return (
    <div className="flex h-full gap-6 animate-fadeIn">
      {/* Chat Area */}
      <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col overflow-hidden transition-colors duration-300">
        
        <div className="p-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100">RAG AI Assistant</h2>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium tracking-wide">SECURE CONNECTION</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <span className="bg-slate-200 dark:bg-slate-700 dark:text-slate-300 px-2 py-0.5 rounded font-mono">FastAPI</span>
            <span className="bg-slate-200 dark:bg-slate-700 dark:text-slate-300 px-2 py-0.5 rounded font-mono">GPT-4o</span>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm relative space-y-3 ${
                msg.sender === 'user'
                  ? 'bg-shb-navy dark:bg-blue-600 text-white rounded-tr-none'
                  : 'bg-slate-50 dark:bg-slate-700/50 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-600'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-line font-medium">
                  {msg.sender === 'user' ? msg.text : renderMessageText(msg)}
                </p>

                {msg.sender === 'ai' && msg.hasConflict && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-rose-50 dark:bg-rose-950/30 border-l-4 border-rose-500 text-rose-900 dark:text-rose-200 p-3 rounded-r-xl text-xs space-y-1 mt-2 shadow-sm"
                  >
                    <div className="flex items-center space-x-1.5 font-bold text-rose-700 dark:text-rose-400">
                      <ShieldAlert className="w-4 h-4 text-rose-500" />
                      <span>CẢNH BÁO MÂU THUẪN PHÁP LÝ</span>
                    </div>
                    <p className="leading-relaxed font-medium">{msg.conflictMsg}</p>
                  </motion.div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl rounded-tl-none p-4 border border-slate-200 dark:border-slate-600 flex space-x-1.5 items-center">
                <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center space-x-3">
          <input
            type="text"
            placeholder="Nhập yêu cầu tra cứu (VD: 'cho vay', 'an toàn vốn', 'phân loại nợ')..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:border-shb-orange dark:focus:border-shb-orange bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm font-medium"
          />
          <button
            onClick={handleSend}
            className="p-3 bg-shb-orange text-white rounded-xl hover:bg-shb-orange-hover transition-colors shadow-md shadow-shb-orange/20 active:scale-95"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Visual Workspace (Right Panel) */}
      <div className="w-[450px] bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col overflow-hidden transition-colors duration-300">
        <div className="flex border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex-1 py-4 text-xs font-bold tracking-wider flex items-center justify-center space-x-2 border-b-2 transition-all ${
              activeTab === 'timeline'
                ? 'border-shb-orange text-shb-orange dark:text-orange-400'
                : 'border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <History className="w-4 h-4" />
            <span>TIMELINE</span>
          </button>
          <button
            onClick={() => setActiveTab('graph')}
            className={`flex-1 py-4 text-xs font-bold tracking-wider flex items-center justify-center space-x-2 border-b-2 transition-all ${
              activeTab === 'graph'
                ? 'border-shb-orange text-shb-orange dark:text-orange-400'
                : 'border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            <span>KNOWLEDGE GRAPH</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 relative">
          <AnimatePresence mode="wait">
            {activeTab === 'timeline' ? (
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
            ) : (
              <motion.div key="graph-tab" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-start">
                
                <div className="w-full bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700 mb-4 flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400">NEO4J / KNOWLEDGE GRAPH CONNECTED</span>
                </div>

                <div className="w-full flex-1 min-h-[500px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl relative overflow-hidden flex items-center justify-center shadow-inner">
                  <ForceGraph2D
                    ref={graphRef}
                    width={400}
                    height={500}
                    graphData={graphDataScenarios[currentTopic]}
                    nodeLabel="desc"
                    nodeColor="color"
                    linkColor="color"
                    linkWidth={2}
                    linkDirectionalArrowLength={4}
                    linkDirectionalArrowRelPos={1}
                    linkCurvature={0.2}
                    d3AlphaDecay={0.02}
                    d3VelocityDecay={0.3}
                    cooldownTicks={100}
                    onEngineStop={() => {
                      if (graphRef.current) {
                        graphRef.current.zoomToFit(400, 50);
                      }
                    }}
                    nodeCanvasObject={(node, ctx, globalScale) => {
                      const label = node.name;
                      const fontSize = 14 / globalScale; 
                      ctx.font = `bold ${fontSize}px Sans-Serif`;
                      
                      const radius = Math.sqrt(node.val) * 2; 
                      
                      ctx.beginPath();
                      ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
                      ctx.fillStyle = node.color;
                      ctx.fill();
                      
                      ctx.textAlign = 'center';
                      ctx.textBaseline = 'middle';
                      ctx.fillStyle = '#ffffff';
                      ctx.fillText(label, node.x, node.y);
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
