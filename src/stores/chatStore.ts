import { create } from 'zustand';
import type { Conversation, ChatMessage } from '@/types';

interface ChatState {
  conversations: Conversation[];
  activeConversationId: string | null;
  messages: ChatMessage[];
  isStreaming: boolean;
  setActiveConversation: (id: string) => void;
  setConversations: (convs: Conversation[]) => void;
  addMessage: (msg: ChatMessage) => void;
  setMessages: (msgs: ChatMessage[]) => void;
  setStreaming: (s: boolean) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  conversations: [],
  activeConversationId: null,
  messages: [],
  isStreaming: false,
  setActiveConversation: (id) => set({ activeConversationId: id }),
  setConversations: (conversations) => set({ conversations }),
  addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
  setMessages: (messages) => set({ messages }),
  setStreaming: (isStreaming) => set({ isStreaming }),
}));
