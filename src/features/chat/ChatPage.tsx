import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Pin, MessageSquare, Send, Mic, Image, Paperclip, Plus,
  BarChart3, Users, FileText, Lightbulb, Sparkles, Bot, User, Clock,
  ChevronLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { MOCK_CONVERSATIONS, MOCK_MESSAGES, SUGGESTED_PROMPTS } from '@/lib/constants';
import { getRelativeTime } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import type { Conversation, ChatMessage } from '@/types';

const promptIcons: Record<string, React.ReactNode> = {
  BarChart3: <BarChart3 className="w-4 h-4" />,
  Users: <Users className="w-4 h-4" />,
  FileText: <FileText className="w-4 h-4" />,
  Lightbulb: <Lightbulb className="w-4 h-4" />,
};

const ChatPage: React.FC = () => {
  const [activeConv, setActiveConv] = useState<string>('1');
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!message.trim()) return;
    const newMsg: ChatMessage = {
      id: String(messages.length + 1),
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newMsg]);
    setMessage('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: String(prev.length + 1),
          role: 'assistant',
          content: `I've processed your request. Based on the context from your **business memory** and **knowledge base**, here's what I found:\n\n- Your query has been analyzed across 12 relevant documents\n- I found 3 related conversations from the past week\n- 2 action items were identified\n\nWould you like me to elaborate on any of these points?`,
          timestamp: new Date().toISOString(),
          model: 'GPT-4',
          tokens: 847,
        },
      ]);
    }, 2000);
  };

  const filteredConvs = MOCK_CONVERSATIONS.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Chat Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="hidden md:flex flex-col border-r border-white/[0.06] bg-surface-dark-2/50 overflow-hidden light:bg-gray-50 light:border-gray-200"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/[0.06] light:border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-white light:text-gray-900">Chats</h2>
                <button className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 light:hover:bg-gray-100">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-600/50 light:bg-white light:border-gray-200 light:text-gray-900"
                />
              </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
              {/* Pinned */}
              {filteredConvs.some((c) => c.pinned) && (
                <div className="px-4 pt-3 pb-1">
                  <p className="text-[10px] uppercase tracking-wider text-gray-600 font-medium flex items-center gap-1">
                    <Pin className="w-3 h-3" /> Pinned
                  </p>
                </div>
              )}
              {filteredConvs.filter((c) => c.pinned).map((conv) => (
                <ConversationItem
                  key={conv.id}
                  conv={conv}
                  active={activeConv === conv.id}
                  onClick={() => setActiveConv(conv.id)}
                />
              ))}

              {/* Recent */}
              <div className="px-4 pt-4 pb-1">
                <p className="text-[10px] uppercase tracking-wider text-gray-600 font-medium">Recent</p>
              </div>
              {filteredConvs.filter((c) => !c.pinned).map((conv) => (
                <ConversationItem
                  key={conv.id}
                  conv={conv}
                  active={activeConv === conv.id}
                  onClick={() => setActiveConv(conv.id)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="flex items-center gap-3 px-4 md:px-6 py-3 border-b border-white/[0.06] light:border-gray-200">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="hidden md:block p-1.5 rounded-lg hover:bg-white/5 text-gray-400 light:hover:bg-gray-100"
          >
            <ChevronLeft className={cn('w-4 h-4 transition-transform', !showSidebar && 'rotate-180')} />
          </button>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-white truncate light:text-gray-900">
              {MOCK_CONVERSATIONS.find((c) => c.id === activeConv)?.title}
            </h3>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              GPT-4 · Ready
            </p>
          </div>
          <Badge variant="info" size="sm">
            <Clock className="w-3 h-3 mr-1" />
            Memory Active
          </Badge>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-6">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 light:text-gray-900">Start a conversation</h3>
              <p className="text-sm text-gray-500 max-w-md mb-8">
                Ask me anything about your business. I have access to your documents, conversations, and memory.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg w-full">
                {SUGGESTED_PROMPTS.map((prompt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setMessage(prompt.text)}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-left text-sm text-gray-300 hover:bg-white/[0.06] transition-colors light:bg-gray-50 light:border-gray-200 light:text-gray-700 light:hover:bg-gray-100"
                  >
                    <span className="text-primary-400">{promptIcons[prompt.icon]}</span>
                    {prompt.text}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn('flex gap-3', msg.role === 'user' && 'flex-row-reverse')}
            >
              {msg.role === 'assistant' ? (
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              ) : (
                <Avatar name="Sarah Chen" size="sm" />
              )}
              <div className={cn(
                'max-w-[75%] rounded-2xl px-4 py-3',
                msg.role === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white/[0.03] border border-white/[0.06] text-gray-200 light:bg-gray-100 light:border-gray-200 light:text-gray-800'
              )}>
                <div className="chat-markdown text-sm leading-relaxed">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
                {msg.model && (
                  <div className="mt-2 pt-2 border-t border-white/[0.06] flex items-center gap-2 text-[10px] text-gray-500 light:border-gray-200">
                    <span>{msg.model}</span>
                    {msg.tokens && <span>· {msg.tokens} tokens</span>}
                    <span>· {getRelativeTime(msg.timestamp)}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl px-4 py-3 light:bg-gray-100 light:border-gray-200">
                <div className="flex gap-1 animate-typing">
                  <span className="w-2 h-2 bg-gray-500 rounded-full" />
                  <span className="w-2 h-2 bg-gray-500 rounded-full" />
                  <span className="w-2 h-2 bg-gray-500 rounded-full" />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-4 md:px-6 py-4 border-t border-white/[0.06] light:border-gray-200">
          <div className="flex items-end gap-2 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask anything about your business..."
                rows={1}
                className="w-full px-4 py-3 pr-24 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-primary-600/50 light:bg-white light:border-gray-200 light:text-gray-900"
              />
              <div className="absolute right-2 bottom-2 flex items-center gap-1">
                <button className="p-1.5 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-white/5">
                  <Paperclip className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-white/5">
                  <Image className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-white/5">
                  <Mic className="w-4 h-4" />
                </button>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              disabled={!message.trim()}
              className="p-3 rounded-xl gradient-primary text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Conversation sidebar item
const ConversationItem: React.FC<{
  conv: Conversation;
  active: boolean;
  onClick: () => void;
}> = ({ conv, active, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      'w-full px-4 py-3 flex items-start gap-3 text-left transition-colors',
      active
        ? 'bg-white/[0.06] light:bg-primary-50'
        : 'hover:bg-white/[0.03] light:hover:bg-gray-100'
    )}
  >
    <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0 light:bg-gray-100">
      <MessageSquare className="w-4 h-4 text-gray-400" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between gap-2">
        <p className={cn('text-sm font-medium truncate', active ? 'text-white light:text-primary-700' : 'text-gray-300 light:text-gray-700')}>
          {conv.title}
        </p>
        {conv.unread && <span className="w-2 h-2 rounded-full bg-primary-500 shrink-0" />}
      </div>
      <p className="text-xs text-gray-500 truncate mt-0.5">{conv.lastMessage}</p>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-[10px] text-gray-600">{getRelativeTime(conv.timestamp)}</span>
        <Badge variant="info" size="sm">{conv.model}</Badge>
      </div>
    </div>
  </button>
);

export default ChatPage;
