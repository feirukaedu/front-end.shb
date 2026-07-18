import React, { useState } from 'react';
import { Send, BookOpen, ShieldAlert, GitBranch, History, Clock, FileText, Layers, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
      let aiResponseText = 'Hệ thống không tìm thấy kết quả. Vui lòng thử các từ khóa như: "cho vay", "an toan von".';
      let citations = [];
      let hasConflict = false;
      let conflictMsg = '';

      const query = userMessage.text.toLowerCase();
      if (query.includes('cho vay') || query.includes('mục đích') || query.includes('thông tư 39') || query.includes('thông tư 06')) {
        const qa = mockQA['cho vay'];
        aiResponseText = qa.text;
        citations = qa.citations;
        hasConflict = qa.hasConflict;
        conflictMsg = qa.conflictMsg;
      } else if (query.includes('an toàn vốn') || query.includes('car')) {
        const qa = mockQA['an toan von'];
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
      const docLabel = citId === 'cit-1' ? 'TT 39/2016' : citId === 'cit-2' ? 'TT 06/2023' : 'TT 10/2023';
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
        
        {/* Chat Header */}
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

        {/* Chat Messages */}
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

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center space-x-3">
          <input
            type="text"
            placeholder="Nhập yêu cầu tra cứu..."
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
                
                {/* Vertical Timeline component */}
                <div className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-700 space-y-8 py-2">
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-800 bg-slate-400"></div>
                    <div className="space-y-1">
                      <span className="text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded font-bold">15/03/2017</span>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">TT 39/2016/TT-NHNN</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Bản gốc Điều 8.</p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-800 bg-amber-500"></div>
                    <div className="space-y-1">
                      <span className="text-[10px] bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded font-bold">01/09/2023</span>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">TT 06/2023/TT-NHNN</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Sửa đổi bổ sung Khoản 8, 9, 10.</p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-800 bg-emerald-500"></div>
                    <div className="space-y-1">
                      <span className="text-[10px] bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded font-bold">01/09/2023</span>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">TT 10/2023/TT-NHNN</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Đình chỉ hiệu lực các khoản mới sửa.</p>
                    </div>
                  </div>
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
              <motion.div key="graph-tab" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center">
                <div className="w-full aspect-square bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl relative overflow-hidden flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 400 300">
                    <defs>
                      <marker id="arrow" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
                      </marker>
                      <marker id="arrow-active" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#F36F21" />
                      </marker>
                    </defs>

                    <line x1="200" y1="210" x2="100" y2="110" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow)" />
                    <text x="130" y="150" fill="#64748b" className="text-[9px] font-bold" textAnchor="middle" stroke="transparent" strokeWidth="3" paintOrder="stroke">Sửa đổi</text>

                    <line x1="100" y1="110" x2="300" y2="110" stroke="#F36F21" strokeWidth="2" markerEnd="url(#arrow-active)" />
                    <text x="200" y="100" fill="#F36F21" className="text-[9px] font-bold" textAnchor="middle" stroke="transparent" strokeWidth="3" paintOrder="stroke">Ngưng hiệu lực</text>

                    <circle cx="200" cy="210" r="24" fill="#002654" />
                    <text x="200" y="213" fill="white" className="text-[9px] font-bold" textAnchor="middle">TT 39</text>

                    <circle cx="100" cy="110" r="24" fill="#002654" />
                    <text x="100" y="113" fill="white" className="text-[9px] font-bold" textAnchor="middle">TT 06</text>

                    <circle cx="300" cy="110" r="26" fill="#F36F21" />
                    <text x="300" y="113" fill="white" className="text-[9px] font-bold" textAnchor="middle">TT 10</text>
                  </svg>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
