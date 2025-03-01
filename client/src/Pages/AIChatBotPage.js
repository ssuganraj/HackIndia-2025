import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Send, User, Bot, X } from 'lucide-react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;
if (recognition) {
    recognition.continuous = false;
    recognition.lang = 'en-US';
}

const synth = window.speechSynthesis;

const AIChatBotPage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (!recognition) return;

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
            setIsListening(false);
            processMessage(transcript);
        };

        recognition.onend = () => setIsListening(false);
        recognition.onerror = () => setIsListening(false);

        return () => {
            if (isListening) recognition.stop();
        };
    }, [isListening]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const toggleListening = () => {
        if (!recognition) {
            alert('Speech recognition is not supported in this browser.');
            return;
        }
        isListening ? recognition.stop() : recognition.start();
        setIsListening(!isListening);
    };

    const speakResponse = (text) => {
        if (!synth) return;
        synth.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);

        synth.speak(utterance);
    };

    const stopSpeaking = () => {
        synth.cancel();
        setIsSpeaking(false);
    };

    const processMessage = async (userMessage) => {
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await axios.post(`http://localhost:8800/query?query="${userMessage}"`);
            const botMessage = { role: 'bot', content: response.data.response };
            setMessages(prev => [...prev, botMessage]);
            speakResponse(response.data.response);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, { role: 'bot', content: 'Error processing request.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        processMessage(input);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-md p-4 border-b border-gray-300 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Latzz AI</h1>
                <button className="text-2xl font-semibold text-primary hover:text-secondary transition-colors" onClick={() => navigate('/')}>Home</button>
            </header>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                    {messages.map((message, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.3 }}
                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex items-start max-w-3/4 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                {/* Avatar */}
                                <div className={`rounded-full p-2 mr-2 ${message.role === 'user' ? 'bg-blue-200 ml-2' : 'bg-gray-200'}`}>
                                    {message.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                                </div>
                                {/* Message Box */}
                                <div className={`p-3 rounded-lg ${message.role === 'user' ? 'bg-blue-500 text-white rounded-tr-none' : 'bg-white shadow-md border border-gray-300 rounded-tl-none'}`}>
                                    {message.content}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {isLoading && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                            <div className="p-4 bg-white border border-gray-300 rounded-lg">Typing...</div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <motion.div className="bg-white border-t border-gray-300 p-4" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
                <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                    {/* Microphone Button */}
                    <button
                        type="button"
                        onClick={toggleListening}
                        className={`p-2 rounded-full ${isListening ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700'} hover:opacity-80 transition-opacity`}
                    >
                        {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                    </button>

                    {/* Input Field */}
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 p-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Send Button */}
                    <motion.button whileTap={{ scale: 0.95 }} type="submit" disabled={!input.trim()} className="p-3 rounded-full bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors">
                        <Send size={20} />
                    </motion.button>
                </form>

                {/* Stop Speaking Button */}
                {isSpeaking && (
                    <button
                        onClick={stopSpeaking}
                        className="p-2 mt-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center"
                    >
                        <X size={18} className="mr-1" /> Stop Speaking
                    </button>
                )}
            </motion.div>
        </div>
    );
};

export default AIChatBotPage;
