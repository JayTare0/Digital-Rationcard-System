
import React, { useState, useRef, useEffect } from 'react';
import { aiService } from '../services/aiService';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

interface ChatAssistantProps {
    isOpen: boolean;
    onClose: () => void;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hello! I'm your digital assistant. How can I help you with your ration card application today?",
            sender: 'ai',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: input,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const responseText = await aiService.generateResponse(userMessage.text);

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: responseText,
                sender: 'ai',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Chat Error:", error);
        } finally {
            setIsTyping(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-gray-200" style={{ height: '500px' }}>
            {/* Header */}
            <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 mr-3">
                        <i className="fas fa-robot"></i>
                    </div>
                    <div>
                        <h3 className="font-bold">Ration Card Assistant</h3>
                        <span className="text-xs text-blue-100 flex items-center">
                            <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span> Online
                        </span>
                    </div>
                </div>
                <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
                    <i className="fas fa-times"></i>
                </button>
            </div>

            {/* Messages */}
            <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user'
                                    ? 'bg-blue-600 text-white rounded-br-none'
                                    : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-none'
                                }`}>
                                <p className="text-sm">{msg.text}</p>
                                <span className={`text-[10px] mt-1 block ${msg.sender === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100">
                <form onSubmit={handleSend} className="flex space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your question..."
                        className="flex-grow px-4 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isTyping}
                        className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatAssistant;
