import { useState } from 'react';
import { AIService } from '../services/aiService';

export function usePolicyAdvisor(welcomeMessage: string) {
  const [chatInput, setChatInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'system'; text: string; isDemo?: boolean }>>([
    { sender: 'system', text: welcomeMessage }
  ]);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);

  const handleSendChat = async (typedText?: string) => {
    const textToSend = typedText || chatInput;
    if (!textToSend.trim()) return;

    if (!typedText) {
      setChatInput('');
    }

    const newUserMsg = { sender: 'user' as const, text: textToSend };
    setChatHistory(prev => [...prev, newUserMsg]);
    setIsChatLoading(true);

    try {
      const data = await AIService.chatPolicy(textToSend);
      setChatHistory(prev => [...prev, { sender: 'system', text: data.text, isDemo: data.isDemoMode }]);
    } catch (err) {
      console.error(err);
      setChatHistory(prev => [...prev, { 
        sender: 'system', 
        text: 'The Federal Knowledge core experienced offline failover. Baghdad-Erbil unified treaty instructions and standard tariff guides remain loaded on-cache.' 
      }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return {
    chatInput,
    setChatInput,
    chatHistory,
    setChatHistory,
    isChatLoading,
    handleSendChat
  };
}
