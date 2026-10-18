'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
    MicrophoneIcon,
    StopIcon,
    SparklesIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SpeechRecognitionAPI = any;

interface ParsedVoiceTransaction {
    amount: number;
    description: string;
    category: string;
    confidence: number;
}

interface VoiceInputProps {
    onTransactionParsed: (transaction: ParsedVoiceTransaction) => void;
    className?: string;
}

// Simple natural language parser for Filipino/English expense phrases
function parseExpensePhrase(text: string): ParsedVoiceTransaction | null {
    const lowerText = text.toLowerCase();

    // Amount patterns
    const amountPatterns = [
        /(\d+(?:,\d{3})*(?:\.\d{2})?)\s*(?:pesos?|php|₱)?/i,
        /(?:pesos?|php|₱)\s*(\d+(?:,\d{3})*(?:\.\d{2})?)/i,
    ];

    let amount = 0;
    for (const pattern of amountPatterns) {
        const match = text.match(pattern);
        if (match) {
            amount = parseFloat(match[1].replace(/,/g, ''));
            break;
        }
    }

    if (!amount) return null;

    // Category detection
    const categoryKeywords: Record<string, string[]> = {
        food: ['kain', 'lunch', 'dinner', 'breakfast', 'merienda', 'food', 'jollibee', 'mcdo', 'mcdonald', 'coffee', 'starbucks', 'resto', 'restaurant', 'shawarma', 'pizza', 'burger', 'eat', 'eating'],
        transport: ['grab', 'angkas', 'taxi', 'uber', 'gas', 'petrol', 'pamasahe', 'jeep', 'jeepney', 'fare', 'mrt', 'lrt', 'bus', 'tricycle', 'transpo', 'transport'],
        shopping: ['shopee', 'lazada', 'zalora', 'shop', 'shopping', 'bili', 'bought', 'purchase', 'mall'],
        groceries: ['grocery', 'palengke', 'supermarket', 'puregold', 'sm', 'vegetables', 'gulay'],
        bills: ['meralco', 'electric', 'water', 'internet', 'pldt', 'globe', 'smart', 'bill', 'bayad'],
        entertainment: ['netflix', 'spotify', 'movie', 'cinema', 'games', 'gaming', 'concert', 'libangan'],
        health: ['medicine', 'gamot', 'doctor', 'hospital', 'clinic', 'checkup', 'pharmacy', 'mercury', 'watsons'],
        load: ['load', 'prepaid', 'data', 'mobile'],
    };

    let category = 'other';
    for (const [cat, keywords] of Object.entries(categoryKeywords)) {
        if (keywords.some(keyword => lowerText.includes(keyword))) {
            category = cat;
            break;
        }
    }

    // Extract description (remove amount and common words)
    let description = text
        .replace(/\d+(?:,\d{3})*(?:\.\d{2})?\s*(?:pesos?|php|₱)?/gi, '')
        .replace(/(?:pesos?|php|₱)\s*\d+(?:,\d{3})*(?:\.\d{2})?/gi, '')
        .replace(/\b(for|sa|ng|ang|yung|para|kanina|kahapon|earlier|today)\b/gi, '')
        .trim();

    // Clean up description
    description = description.charAt(0).toUpperCase() + description.slice(1);
    if (!description) description = category.charAt(0).toUpperCase() + category.slice(1);

    return {
        amount,
        description,
        category,
        confidence: 0.85,
    };
}

export function VoiceInput({
    onTransactionParsed,
    className,
}: VoiceInputProps) {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [parsedResult, setParsedResult] = useState<ParsedVoiceTransaction | null>(null);
    const [error, setError] = useState<string | null>(null);
    const recognitionRef = useRef<SpeechRecognitionAPI>(null);

    // Check if browser supports speech recognition
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isSupported = typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

    useEffect(() => {
        if (!isSupported) return;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const SpeechRecognitionCtor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognitionCtor();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-PH'; // English (Philippines) - also picks up some Filipino

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognitionRef.current.onresult = (event: any) => {
            const current = event.resultIndex;
            const result = event.results[current];
            const text = result[0].transcript;

            setTranscript(text);

            if (result.isFinal) {
                const parsed = parseExpensePhrase(text);
                if (parsed) {
                    setParsedResult(parsed);
                } else {
                    setError('Hindi ma-parse. Try: "500 pesos for Jollibee"');
                }
            }
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognitionRef.current.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error);
            setError(`Error: ${event.error}`);
            setIsListening(false);
        };

        recognitionRef.current.onend = () => {
            setIsListening(false);
        };

        return () => {
            recognitionRef.current?.stop();
        };
    }, [isSupported]);

    const startListening = () => {
        if (!recognitionRef.current) return;

        setError(null);
        setTranscript('');
        setParsedResult(null);
        setIsListening(true);
        recognitionRef.current.start();
    };

    const stopListening = () => {
        if (!recognitionRef.current) return;
        recognitionRef.current.stop();
        setIsListening(false);
    };

    const confirmTransaction = () => {
        if (parsedResult) {
            onTransactionParsed(parsedResult);
            setTranscript('');
            setParsedResult(null);
        }
    };

    const categoryEmojis: Record<string, string> = {
        food: '🍔',
        transport: '🚗',
        shopping: '🛍️',
        groceries: '🛒',
        bills: '📄',
        entertainment: '🎬',
        health: '💊',
        load: '📱',
        other: '📦',
    };

    return (
        <div className={cn(
            'bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden',
            className
        )}>
            {/* Header */}
            <div className="p-4 border-b border-gray-100 dark:border-slate-700">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <MicrophoneIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Voice Input</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Speak to add transactions</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-4 space-y-4">
                {!isSupported ? (
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-center">
                        <ExclamationCircleIcon className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                        <p className="text-sm text-yellow-700 dark:text-yellow-400">
                            Your browser doesn't support voice input
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Microphone Button */}
                        <div className="flex justify-center">
                            <button
                                onClick={isListening ? stopListening : startListening}
                                className={cn(
                                    'w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg',
                                    isListening
                                        ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                                        : 'bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
                                )}
                            >
                                {isListening ? (
                                    <StopIcon className="w-8 h-8 text-white" />
                                ) : (
                                    <MicrophoneIcon className="w-8 h-8 text-white" />
                                )}
                            </button>
                        </div>

                        {/* Status */}
                        <div className="text-center">
                            {isListening && (
                                <p className="text-sm text-purple-600 dark:text-purple-400 animate-pulse">
                                    🎤 Listening... Speak now
                                </p>
                            )}
                            {!isListening && !transcript && !error && (
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Tap to start. Say: "500 pesos for Grab kanina"
                                </p>
                            )}
                        </div>

                        {/* Transcript */}
                        {transcript && (
                            <div className="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">You said:</p>
                                <p className="text-sm text-gray-900 dark:text-white">"{transcript}"</p>
                            </div>
                        )}

                        {/* Error */}
                        {error && (
                            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
                                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                            </div>
                        )}

                        {/* Parsed Result */}
                        {parsedResult && (
                            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg animate-fade-in">
                                <div className="flex items-center gap-2 mb-3">
                                    <SparklesIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                                    <span className="text-sm font-medium text-green-700 dark:text-green-400">Detected Transaction</span>
                                </div>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">{categoryEmojis[parsedResult.category]}</span>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">{parsedResult.description}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{parsedResult.category}</p>
                                        </div>
                                    </div>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                                        ₱{parsedResult.amount.toLocaleString()}
                                    </p>
                                </div>
                                <button
                                    onClick={confirmTransaction}
                                    className="w-full py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
                                >
                                    <CheckCircleIcon className="w-5 h-5" />
                                    Confirm & Save
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Examples */}
            <div className="p-4 bg-gray-50 dark:bg-slate-700/50 border-t border-gray-100 dark:border-slate-700">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Try saying:</p>
                <div className="flex flex-wrap gap-2">
                    {[
                        '500 pesos for lunch',
                        '150 grab fare',
                        'Jollibee 350',
                        '2000 pesos sa Meralco',
                    ].map((example) => (
                        <span
                            key={example}
                            className="px-2 py-1 text-xs bg-white dark:bg-slate-800 rounded-lg text-gray-600 dark:text-gray-400"
                        >
                            "{example}"
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}


