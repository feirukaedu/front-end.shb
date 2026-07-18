import React from 'react';
import { Send, BookOpen, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ChatArea({ 
  messages, 
  isLoading, 
  inputText, 
  setInputText, 
  handleSend, 
  selectedCitation, 
  setSelectedCitation 
}) {

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
          key={citId + matchIndex}
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
    <div className="flex-1 min-h-[500px] lg:min-h-0 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col overflow-hidden transition-colors duration-300">
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] md:max-w-[80%] rounded-2xl p-3 md:p-4 shadow-sm relative space-y-3 ${
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

      <div className="p-3 md:p-4 border-t border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center space-x-2 md:space-x-3">
        <input
          type="text"
          placeholder="Nhập yêu cầu tra cứu (VD: 'cho vay', 'an toàn vốn', 'phân loại nợ')..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 px-3 md:px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:border-shb-orange dark:focus:border-shb-orange bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm font-medium"
        />
        <button
          onClick={handleSend}
          className="p-3 bg-shb-orange text-white rounded-xl hover:bg-shb-orange-hover transition-colors shadow-md shadow-shb-orange/20 active:scale-95 shrink-0"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
