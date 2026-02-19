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

const LANGUAGES = [
    { code: 'en-IN', label: 'English', name: 'English' },
    { code: 'hi-IN', label: 'हिंदी', name: 'Hindi' },
    { code: 'mr-IN', label: 'मराठी', name: 'Marathi' },
];

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
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<any>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    // Text to Speech
    const speakText = (text: string) => {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = selectedLang.code;
        utterance.rate = 0.9;
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
    };

    const stopSpeaking = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    // Speech to Text
    const startListening = () => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert('Speech recognition is not supported in your browser. Please use Chrome.');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = selectedLang.code;
        recognition.interimResults = false;
        recognition.continuous = false;

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
        };

        recognition.onerror = () => setIsListening(false);

        recognitionRef.current = recognition;
        recognition.start();
    };

    const stopListening = () => {
        recognitionRef.current?.stop();
        setIsListening(false);
    };

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
            const responseText = await aiService.generateResponse(
                `Please respond in ${selectedLang.name}. User question: ${userMessage.text}`
            );

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: responseText,
                sender: 'ai',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMessage]);
            speakText(responseText);
        } catch (error) {
            console.error("Chat Error:", error);
        } finally {
            setIsTyping(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-gray-200" style={{ height: '540px' }}>
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

            {/* Language Selector */}
            <div className="flex bg-blue-50 border-b border-blue-100 px-3 py-2 gap-2">
                {LANGUAGES.map(lang => (
                    <button
                        key={lang.code}
                        onClick={() => setSelectedLang(lang)}
                        className={`flex-1 py-1 rounded-lg text-xs font-semibold transition-colors ${selectedLang.code === lang.code
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-blue-600 border border-blue-200'
                            }`}
                    >
                        {lang.label}
                    </button>
                ))}
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
                                <div className="flex items-center justify-between mt-1">
                                    <span className={`text-[10px] ${msg.sender === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                    {msg.sender === 'ai' && (
                                        <button
                                            onClick={() => isSpeaking ? stopSpeaking() : speakText(msg.text)}
                                            className="ml-2 text-gray-400 hover:text-blue-500 transition-colors"
                                            title="Read aloud"
                                        >
                                            <i className={`fas ${isSpeaking ? 'fa-stop-circle' : 'fa-volume-up'} text-xs`}></i>
                                        </button>
                                    )}
                                </div>
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
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleSend(e as any); }}
                        placeholder={`Type in ${selectedLang.name}...`}
                        className="flex-grow px-4 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    {/* Mic Button */}
                    <button
                        type="button"
                        onClick={isListening ? stopListening : startListening}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isListening
                                ? 'bg-red-500 text-white animate-pulse'
                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                            }`}
                        title={isListening ? 'Stop listening' : 'Speak'}
                    >
                        <i className={`fas ${isListening ? 'fa-stop' : 'fa-microphone'} text-sm`}></i>
                    </button>
                    {/* Send Button */}
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isTyping}
                        className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
                {isListening && (
                    <p className="text-xs text-red-500 mt-1 text-center animate-pulse">
                        🎤 Listening in {selectedLang.name}... Speak now
                    </p>
                )}
                {isSpeaking && (
                    <p className="text-xs text-blue-500 mt-1 text-center">
                        🔊 Speaking in {selectedLang.name}...
                    </p>
                )}
            </div>
        </div>
    );
};

export default ChatAssistant;