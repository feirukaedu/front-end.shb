import React, { useState } from 'react';
import { History, GitBranch } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

import ChatArea from '../components/chat/ChatArea';
import TimelineTab from '../components/chat/TimelineTab';
import GraphTab from '../components/chat/GraphTab';
import { mockQA } from '../data/mockData';

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
  const [activeTab, setActiveTab] = useState('timeline');
  const [selectedCitation, setSelectedCitation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTopic, setCurrentTopic] = useState('cho vay');

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

  return (
    <div className="flex flex-col lg:flex-row h-full gap-4 lg:gap-6 animate-fadeIn">
      {/* Chat Area Component */}
      <ChatArea 
        messages={messages}
        isLoading={isLoading}
        inputText={inputText}
        setInputText={setInputText}
        handleSend={handleSend}
        selectedCitation={selectedCitation}
        setSelectedCitation={setSelectedCitation}
      />

      {/* Visual Workspace (Right Panel) */}
      <div className="h-[450px] lg:h-auto w-full lg:w-[350px] xl:w-[450px] shrink-0 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col overflow-hidden transition-colors duration-300">
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
              <TimelineTab currentTopic={currentTopic} selectedCitation={selectedCitation} />
            ) : (
              <GraphTab currentTopic={currentTopic} activeTab={activeTab} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
