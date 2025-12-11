import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles, ChevronRight, Briefcase, User, Info, Terminal } from 'lucide-react';
import { SERVICES, LEADERSHIP, MOCK_EMPLOYEES, ABOUT_CONTENT } from '../data';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

type ChatContext = 'general' | 'services' | 'leadership' | 'about' | 'bio-gen';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [context, setContext] = useState<ChatContext>('general');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hello! I'm AK-AI, your virtual assistant. Ask me about our services, leadership, or company vision!", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  // --- Dynamic Suggestions ---
  const getSuggestions = () => {
    switch (context) {
      case 'services':
        return [
          ...SERVICES.slice(0, 3).map(s => s.title),
          "View All Services",
          "Back to Main Menu"
        ];
      case 'leadership':
        return [
          "Who is the CEO?",
          "Who is the CTO?",
          "Leadership Vision",
          "Back to Main Menu"
        ];
      case 'about':
        return [
          "Company History",
          "Core Values",
          "Location",
          "Back to Main Menu"
        ];
      case 'bio-gen':
        return [
          "Cancel Bio Generation"
        ];
      default:
        return [
          "What services do you offer?",
          "Tell me about leadership",
          "About the company",
          "Generate Bio (Admin)"
        ];
    }
  };

  const handleSuggestionClick = (text: string) => {
    if (text === "Back to Main Menu") {
      setContext('general');
      setMessages(prev => [...prev, { id: Date.now().toString(), text: "Back to main menu. How can I help?", sender: 'bot' }]);
      return;
    }
    if (text === "Cancel Bio Generation") {
      setContext('general');
      setMessages(prev => [...prev, { id: Date.now().toString(), text: "Bio generation cancelled.", sender: 'bot' }]);
      return;
    }
    handleSend(text);
  };

  const generateResponse = (text: string): string => {
    const lower = text.toLowerCase();

    // --- BIO GENERATION MODE ---
    if (context === 'bio-gen') {
      setContext('general'); // Reset after generation
      return `Here is a professional bio draft based on your input:\n\n"${text} is a dedicated professional at AK Tech Hub. Leveraging their expertise, they drive innovation and excellence within their team, contributing significantly to our mission of technological advancement."\n\n(Tip: For a more specific bio, include Name, Role, Department, and Key Projects in your prompt next time!)`;
    }

    // --- CONTEXT SWITCHING ---
    if (lower.includes('service') || lower.includes('offer')) {
      setContext('services');
      return `We offer a wide range of services including ${SERVICES.map(s => s.title).join(', ')}. Select a service below or ask about one to learn more.`;
    }
    if (lower.includes('leadership') || lower.includes('founder') || lower.includes('ceo') || lower.includes('cto')) {
      setContext('leadership');
      return `Our company is led by industry veterans like ${LEADERSHIP[0].name} and ${LEADERSHIP[1].name}. What would you like to know about them?`;
    }
    if (lower.includes('about') || lower.includes('history') || lower.includes('values') || lower.includes('vision')) {
      setContext('about');
      return "AK Tech Hub is built on strong values and a clear vision. I can tell you about our History, Core Values, or Mission.";
    }
    if (lower.includes('generate bio') || lower.includes('write bio') || lower.includes('draft bio')) {
      setContext('bio-gen');
      return "Entering Bio Generation Mode 🤖.\n\nPlease type the employee's details (Name, Role, Department, Skills, Key Projects) and I will craft a professional biography for you.";
    }

    // --- SPECIFIC KNOWLEDGE ---

    // 1. Leadership
    const foundLeader = LEADERSHIP.find(l => lower.includes(l.name.toLowerCase()) || lower.includes(l.role.toLowerCase()));
    if (foundLeader) {
       return `${foundLeader.name} serves as our ${foundLeader.role}. ${foundLeader.bio}`;
    }

    // 2. Services
    const foundService = SERVICES.find(s => lower.includes(s.title.toLowerCase()));
    if (foundService) {
      return `**${foundService.title}**: ${foundService.description}`;
    }

    // 3. About / History / Values
    if (lower.includes('history') || lower.includes('founded')) {
      return ABOUT_CONTENT.history;
    }
    if (lower.includes('value')) {
      return `Our core values are: ${ABOUT_CONTENT.values.map(v => v.title).join(', ')}. We believe in ${ABOUT_CONTENT.values[0].desc.toLowerCase()}`;
    }
    if (lower.includes('location') || lower.includes('address')) {
      return "We are located at 123 Tech Park Avenue, Silicon Valley. Come visit us!";
    }

    // Fallback
    return "I'm not sure about that specific detail, but I can help you navigate our Services, Leadership, or Company Info. Try using the suggestions below!";
  };

  const handleSend = (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), text: textToSend, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate delay
    setTimeout(() => {
      const responseText = generateResponse(textToSend);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: responseText, sender: 'bot' }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-[0_0_20px_var(--color-accent)] transition-all group ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 bg-accent text-white'}`}
      >
        <MessageSquare size={24} />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse border border-primary"></span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-96 h-[600px] max-h-[80vh] bg-primary-light border border-ui-border rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="bg-ui-panel p-4 flex justify-between items-center border-b border-ui-border relative overflow-hidden">
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent to-purple-500 flex items-center justify-center text-white shadow-lg">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-text-main text-sm font-display tracking-wide">AK-AI Assistant</h3>
                  <div className="flex items-center gap-1.5 text-[10px] text-accent">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span> 
                    {context === 'general' ? 'Online' : context === 'bio-gen' ? 'Bio Generator Mode' : `${context.charAt(0).toUpperCase() + context.slice(1)} Context`}
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-text-muted hover:text-text-main p-1 hover:bg-white/10 rounded-full transition-colors relative z-10">
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-primary/20" ref={scrollRef}>
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-ui-panel border border-ui-border flex items-center justify-center mr-2 mt-1 shrink-0">
                      <Sparkles size={12} className="text-accent" />
                    </div>
                  )}
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-accent text-white rounded-br-none' 
                      : 'bg-ui-panel text-text-main border border-ui-border rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                 <div className="flex justify-start">
                   <div className="bg-ui-panel p-4 rounded-2xl rounded-bl-none flex gap-1.5 items-center border border-ui-border ml-8">
                     <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce"></span>
                     <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                     <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                   </div>
                 </div>
              )}
            </div>

            {/* Dynamic Suggestion Chips */}
            <div className="px-4 pb-2 bg-primary/20 overflow-x-auto whitespace-nowrap custom-scrollbar flex gap-2">
                {getSuggestions().map((s, i) => (
                    <button 
                        key={i} 
                        onClick={() => handleSuggestionClick(s)}
                        className={`text-[10px] px-3 py-1.5 rounded-full transition-all flex items-center gap-1 mb-2 border ${
                          context === 'bio-gen' 
                            ? 'bg-purple-500/10 border-purple-500/30 text-purple-400 hover:bg-purple-500/20' 
                            : 'bg-ui-panel border-ui-border hover:border-accent text-text-muted hover:text-accent'
                        }`}
                    >
                        {context === 'bio-gen' && <Terminal size={10} />}
                        {context === 'services' && <Briefcase size={10} />}
                        {context === 'leadership' && <User size={10} />}
                        {context === 'about' && <Info size={10} />}
                        {s} <ChevronRight size={10} />
                    </button>
                ))}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-ui-panel border-t border-ui-border">
              <div className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={context === 'bio-gen' ? "Paste details here..." : "Type your message..."}
                  className="w-full bg-ui-input border border-ui-border rounded-xl pl-4 pr-12 py-3.5 text-sm text-text-main outline-none focus:border-accent transition-all placeholder:text-text-muted/50"
                  autoFocus
                />
                <button 
                  onClick={() => handleSend()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors shadow-lg shadow-accent/20"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;