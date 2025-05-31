import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Navbar from "@/components/Navbar";
import { ArrowLeft, Send, User, Bot, MessageSquare } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { debounce } from "lodash";

// Initialize Google AI with safety settings
const genAI = new GoogleGenerativeAI("AIzaSyBV7QnzyT-FUsmCbg95OwDTIYUaBKnNG0w");

const safetySettings = [
  {
    category: "HARM_CATEGORY_HARASSMENT",
    threshold: "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    category: "HARM_CATEGORY_HATE_SPEECH",
    threshold: "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    threshold: "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    category: "HARM_CATEGORY_DANGEROUS_CONTENT",
    threshold: "BLOCK_MEDIUM_AND_ABOVE"
  }
];

const modelConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};

interface UserProfile {
  age: number | null;
  location: string | null;
  healthIssues: string[];
  dietaryPreferences: string[];
  name: string | null;
}

interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const NutritionChatbot = () => {
  const [messages, setMessages] = useState<Message[]>(
    [
      {
        id: 1,
        type: 'bot' as const,
        content: "Hello! I'm your AI nutrition assistant. I can help you create personalized meal plans, provide nutritional advice, and suggest healthy recipes based on locally grown produce. What would you like to know about nutrition today?",
        timestamp: new Date()
      }
    ]
  );
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    age: null,
    location: null,
    healthIssues: [],
    dietaryPreferences: [],
    name: null
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const extractUserInfo = (message: string) => {
    const messageLower = message.toLowerCase();

    // Extract age
    const ageMatch = messageLower.match(/\b(?:i am|i'm|my age is|age)\s*(\d{1,3})\b/);
    if (ageMatch) {
      const age = parseInt(ageMatch[1]);
      if (age >= 1 && age <= 120) {
        setUserProfile(prev => ({ ...prev, age }));
      }
    }

    // Extract location
    const locationMatch = messageLower.match(/\b(?:from|in|live in|located in|location)\s*([a-zA-Z\s,]+)\b/);
    if (locationMatch) {
      const location = locationMatch[1].trim();
      setUserProfile(prev => ({ ...prev, location }));
    }

    // Check for health issues
    const healthKeywords = ['diabetes', 'hypertension', 'high blood pressure', 'heart disease', 
                         'kidney disease', 'liver disease', 'thyroid', 'cholesterol'];
    
    healthKeywords.forEach(keyword => {
      if (messageLower.includes(keyword) && !userProfile.healthIssues.includes(keyword)) {
        setUserProfile(prev => ({
          ...prev,
          healthIssues: [...prev.healthIssues, keyword]
        }));
      }
    });
  };

  const generateSystemPrompt = () => {
    let profileInfo = "";
    
    if (userProfile.age) {
      profileInfo += `User age: ${userProfile.age} years old. `;
    }
    
    if (userProfile.location) {
      profileInfo += `User location: ${userProfile.location}. `;
    }
    
    if (userProfile.healthIssues.length > 0) {
      profileInfo += `Health considerations: ${userProfile.healthIssues.join(', ')}. `;
    }
    
    return `You are NutriBot, a friendly and knowledgeable nutritional diet planning assistant.
    ${profileInfo}
    Your personality:
    - Warm, encouraging, and supportive
    - Explain things in simple, easy-to-understand language
    - Use emojis occasionally to be friendly
    - Be conversational and avoid being too technical

    Guidelines:
    - Always ask for location preference if not provided for diet plans
    - Ask about age and health issues if relevant for better recommendations
    - Keep responses conversational and easy to understand
    - Provide practical, actionable advice
    - Be encouraging and positive`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user' as const,
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      extractUserInfo(inputMessage);

      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Updated model name
      const prompt = generateSystemPrompt() + "\n\nUser: " + inputMessage;

      const result = await model.generateContent(prompt);
      const { response } = result;
      const text = response.text();

      if (!text) throw new Error('Empty response from AI');

      const botResponse = {
        id: messages.length + 2,
        type: 'bot' as const,
        content: text,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);

    } catch (error) {
      console.error('AI Error:', error);
      let errorMessage = "I'm having trouble connecting. Please try again in a moment.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      const errorResponse = {
        id: messages.length + 2,
        type: 'bot' as const,
        content: errorMessage,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  // Add rate limiting protection
  const debouncedSendMessage = useCallback(
    debounce(() => handleSendMessage(), 1000, { leading: true, trailing: false }),
    [inputMessage]
  );

  // Add cleanup effect
  useEffect(() => {
    return () => {
      // Cleanup when component unmounts
      setMessages([]);
      setIsTyping(false);
    };
  }, []);

  const quickQuestions = [
    "Help me lose weight with local produce",
    "Create a diabetes-friendly meal plan",
    "What are good protein sources?",
    "Suggest healthy breakfast recipes",
    "Foods for better heart health",
    "Nutrition for muscle building"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-background to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" asChild className="mr-4 hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors">
            <Link to="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              AI Nutrition Assistant
            </h1>
            <p className="text-muted-foreground mt-2">Get personalized nutrition advice and meal planning</p>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="max-w-4xl mx-auto">
          <Card className="h-[70vh] flex flex-col border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-2xl">
            <CardHeader className="border-b bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <MessageSquare className="w-5 h-5 mr-2 text-green-600" />
                Nutrition AI Assistant
                <div className="ml-auto flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                  <span className="text-sm text-muted-foreground">Online</span>
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
              <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-4 shadow-lg ${
                          message.type === 'user'
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                            : 'bg-white dark:bg-gray-700 text-foreground border border-gray-200 dark:border-gray-600'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            message.type === 'user' 
                              ? 'bg-white/20' 
                              : 'bg-gradient-to-r from-green-400 to-green-500'
                          }`}>
                            {message.type === 'bot' ? (
                              <Bot className="w-4 h-4 text-white" />
                            ) : (
                              <User className="w-4 h-4 text-blue-600" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm leading-relaxed whitespace-pre-line break-words ${
                              message.type === 'user' ? 'text-white' : 'text-gray-900 dark:text-gray-100'
                            }`}>
                              {message.content}
                            </p>
                            <p className={`text-xs mt-2 opacity-70 ${
                              message.type === 'user' ? 'text-white' : 'text-muted-foreground'
                            }`}>
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start animate-fade-in">
                      <div className="max-w-[85%] rounded-2xl p-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              <div className="border-t p-4 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex space-x-3">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask about nutrition, meal planning, or healthy recipes..."
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                    className="flex-1 border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400"
                    disabled={isTyping}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    disabled={!inputMessage.trim() || isTyping}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Questions */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Quick Questions</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-left justify-start h-auto p-4 hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 transform hover:scale-105 border-gray-200 dark:border-gray-700"
                  onClick={() => setInputMessage(question)}
                >
                  <MessageSquare className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                  <span className="text-sm">{question}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>⚠ Disclaimer:</strong> This AI nutrition assistant provides general guidance and should not replace professional medical advice. 
              Always consult with healthcare providers for specific dietary requirements or health conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionChatbot;