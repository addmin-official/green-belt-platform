import React from 'react';
import { Send, RefreshCw, Shield, Landmark } from 'lucide-react';
import { PageHeader, Badge } from '../../ui';
import { useGovernment } from '../../providers/GovernmentProvider';

export interface PolicyAdvisorPanelProps {
  lang: 'en' | 'ar' | 'ku';
  d: any;
  chatInput: string;
  setChatInput: React.Dispatch<React.SetStateAction<string>>;
  chatHistory: { sender: string; text: string; isDemo?: boolean }[];
  isChatLoading: boolean;
  handleSendChat: (overrideText?: string) => void;
}

export const PolicyAdvisorPanel: React.FC<PolicyAdvisorPanelProps> = ({
  lang,
  d,
  chatInput,
  setChatInput,
  chatHistory,
  isChatLoading,
  handleSendChat,
}) => {
  const { activeContext } = useGovernment();

  return (
    <div className="max-w-4xl mx-auto bg-[#111e2e]/95 rounded-xl border border-slate-800/80 shadow-lg p-5 lg:p-6 flex flex-col gap-4 animate-fade-in text-start">
      
      <PageHeader
        icon={<Landmark />}
        title={d.policyAdvisorTitle}
        description={lang === 'en' ? 'Query the sovereign policy core on trade treaties, custom regulations, KRG tariffs agreements, and anti-fraud protocols.' : lang === 'ar' ? 'البحث في لوائح وسياسات الجمارك الموحدة والمعاهدات الجمركية لجمهورية العراق فدرالياً.' : 'گەڕان لە یاساکان و ڕێسا گومرگییەکان و ڕێککەوتنەکانی نێوان بەغدا و هەولێر.'}
        status={
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="gold">{lang === 'en' ? 'Authorized Official' : lang === 'ar' ? 'مسؤول مخول' : 'بەرپرسی ڕێپێدراو'}</Badge>
            <Badge variant="teal">{activeContext}</Badge>
          </div>
        }
      />

      {/* Quick suggested queries list buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-400 font-mono">Suggested Questions:</span>
        <button 
          onClick={() => {
            setChatInput('Explain the Baghdad-Erbil customs agreements and KRG checkpoint revenue model.');
            handleSendChat('Explain the Baghdad-Erbil customs agreements and KRG checkpoint revenue model.');
          }}
          className="bg-[#1a2c42] hover:bg-[#112032] border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white px-2.5 py-1 rounded text-[11px] font-mono transition-all cursor-pointer"
        >
          Erbil-Baghdad Custom Treaty
        </button>
        <button 
          onClick={() => {
            setChatInput('What are the Central Bank of Iraq wire regulations for under-invoicing and currency arbitrage prevention?');
            handleSendChat('What are the Central Bank of Iraq wire regulations for under-invoicing and currency arbitrage prevention?');
          }}
          className="bg-[#1a2c42] hover:bg-[#112032] border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white px-2.5 py-1 rounded text-[11px] font-mono transition-all cursor-pointer"
        >
          CBI Anti-Money Laundering
        </button>
        <button 
          onClick={() => {
            setChatInput('Clarify the tariff rate structure for imported machinery under Chapter 84 of Iraqi Customs Law No. 23.');
            handleSendChat('Clarify the tariff rate structure for imported machinery under Chapter 84 of Iraqi Customs Law No. 23.');
          }}
          className="bg-[#1a2c42] hover:bg-[#112032] border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white px-2.5 py-1 rounded text-[11px] font-mono transition-all cursor-pointer"
        >
          Custom Law Tariff Brackets
        </button>
      </div>

      {/* Chat message display window */}
      <div className="bg-slate-950/80 rounded-xl border border-slate-800 shadow-inner p-4 min-h-[350px] max-h-[500px] overflow-y-auto flex flex-col gap-4">
        {chatHistory.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex flex-col gap-1 max-w-[85%] ${
              msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
            }`}
          >
            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
              {msg.sender === 'user' ? 'Authorized Officer' : 'Sovereign Knowledge Base'} 
              {msg.isDemo && ' (Cache Vault)'}
            </span>
            
            <div className={`p-3.5 rounded-lg text-slate-200 leading-relaxed text-xs font-mono whitespace-pre-line ${
              msg.sender === 'user' 
                ? 'bg-[#1a2c42]/80 border border-slate-700 text-right rounded-br-none' 
                : 'bg-[#122033]/90 border border-[#cca553]/20 rounded-bl-none prose prose-invert max-w-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}

        {isChatLoading && (
          <div className="self-start flex items-center gap-2.5 bg-[#122033]/50 border border-slate-800 p-3 rounded-lg text-xs text-slate-400 font-mono animate-pulse">
            <RefreshCw className="animate-spin w-4 h-4 text-[#cca553]" />
            Consulting Sovereign trade intelligence matrices...
          </div>
        )}
      </div>

      {/* Input submission box */}
      <div className="flex gap-2">
        <input 
          type="text" 
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendChat();
          }}
          disabled={isChatLoading}
          placeholder="Ask instructions about Iraq Customs Law 23, KRG treaty parameters, Al-Faw development hubs..."
          className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-200 focus:outline-none focus:border-[#cca553] text-xs font-mono"
        />
        <button 
          onClick={() => handleSendChat()}
          disabled={isChatLoading || !chatInput.trim()}
          className="bg-[#cca553] text-[#111e2e] hover:bg-[#b08e48] transition-all px-5 py-3 rounded-lg font-semibold flex items-center gap-2 shrink-0 disabled:bg-slate-800 disabled:text-slate-500 uppercase text-xs cursor-pointer"
        >
          <Send className="w-4 h-4" />
          {d.sendButton}
        </button>
      </div>

      <div className="text-[10px] text-slate-500 text-center font-mono pt-1">
        DECISION INTEGRITY SECURED DIRECTLY VIA THE IRAQI CENTRAL STATE DATABASES
      </div>

    </div>
  );
};

export default PolicyAdvisorPanel;
