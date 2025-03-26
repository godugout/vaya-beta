
import React from "react";

export interface HanumanMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface HanumanPromptItem {
  id: string;
  content: string;
  category: 'personal' | 'family' | 'wisdom' | 'history' | 'sacred';
}

export interface HanumanSidebarCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
}

export interface HanumanResource {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  link?: string;
}

export interface HanumanChatHook {
  messages: HanumanMessage[];
  input: string;
  setInput: (input: string) => void;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  handlePromptSelect: (prompt: string) => void;
  handleMorePrompts: () => void;
}

