import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  Send, 
  Bot, 
  User, 
  Phone, 
  MapPin, 
  Clock,
  Heart,
  Users,
  MessageCircle,
  AlertCircle
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  suggestions?: string[];
}

interface AIChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIChatbot = ({ isOpen, onClose }: AIChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Initial welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        text: "Hi! I'm your virtual mental health support assistant. I'm here to help you find the right resources and support. How can I assist you today?",
        isBot: true,
        timestamp: new Date(),
        suggestions: [
          "I need immediate crisis support",
          "Find counseling services near me",
          "Looking for support groups",
          "Mental health resources for newcomers"
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const generateBotResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    let response = "";
    let suggestions: string[] = [];

    if (lowerMessage.includes('crisis') || lowerMessage.includes('emergency') || lowerMessage.includes('immediate')) {
      response = "I understand you need immediate help. Here are crisis resources available 24/7:\n\n🚨 **Newcomer Women's Crisis Center**\n📞 416-555-0123 (24/7)\n📍 245 Main St, Toronto\n🗣️ English, Somali, Arabic, French\n\n🚨 **Crisis Text Line**: Text HOME to 741741\n\nIf you're in immediate danger, please call 911. Would you like me to help you find other support services?";
      suggestions = ["Find nearby counseling", "Support groups", "How to prepare for counseling"];
    } else if (lowerMessage.includes('counseling') || lowerMessage.includes('therapy') || lowerMessage.includes('therapist')) {
      response = "I can help you find counseling services. Here are some options:\n\n🏥 **Multicultural Family Counseling**\n📞 416-555-0789\n📍 789 Queen St E, Toronto\n⏰ Mon-Sat 9 AM-6 PM\n💰 Sliding scale fees\n🗣️ English, Arabic, French, Spanish\n\n**What to expect:**\n✓ Individual or family sessions\n✓ Cultural-sensitive care\n✓ Flexible payment options\n\nWould you like help preparing for your first appointment?";
      suggestions = ["Book an appointment", "What to expect in counseling", "Support groups"];
    } else if (lowerMessage.includes('group') || lowerMessage.includes('support group')) {
      response = "Support groups can be really helpful! Here's what's available:\n\n👥 **Somali Women's Mental Health Circle**\n📞 416-555-0456\n📍 156 Dundas St W, Toronto\n⏰ Mon-Fri 6-9 PM\n💰 Free\n🗣️ Somali, English\n✓ Childcare available\n\n**Benefits of group support:**\n• Share experiences with others\n• Learn coping strategies\n• Build community connections\n• Cultural understanding\n\nGroups typically meet weekly. Would you like help joining?";
      suggestions = ["How to join a group", "Individual counseling", "Peer support"];
    } else if (lowerMessage.includes('newcomer') || lowerMessage.includes('immigrant') || lowerMessage.includes('refugee')) {
      response = "Welcome! There are specialized services for newcomers:\n\n🤝 **New Canadians Peer Support**\n📞 416-555-0321\n📍 321 College St, Toronto\n⏰ Daily 2-8 PM\n💰 Free\n🗣️ Multiple languages\n✓ Walk-in center\n✓ Resource navigation\n\n**Services include:**\n• Peer mentorship\n• Settlement support\n• Mental health resources\n• Community connections\n\nWhat specific support are you looking for?";
      suggestions = ["Crisis support", "Counseling services", "Support groups"];
    } else if (lowerMessage.includes('cost') || lowerMessage.includes('free') || lowerMessage.includes('payment')) {
      response = "Many mental health services are available at low or no cost:\n\n**Free Services:**\n• Crisis support (24/7)\n• Support groups\n• Peer support programs\n• Walk-in centers\n\n**Sliding Scale:**\n• Individual counseling\n• Family therapy\n• Specialized programs\n\n**Insurance:**\n• Many services covered by OHIP\n• Extended health benefits may apply\n\nDon't let cost prevent you from getting help. What type of support interests you?";
      suggestions = ["Find free counseling", "Crisis support", "Support groups"];
    } else {
      response = "I understand you're looking for support. I can help you find:\n\n🆘 **Crisis Support** - Immediate 24/7 help\n🏥 **Counseling** - Individual and family therapy\n👥 **Support Groups** - Connect with others\n🤝 **Peer Support** - Community connections\n\nAll services are available in multiple languages including Somali, Arabic, and French. What would be most helpful for you right now?";
      suggestions = ["Crisis support", "Find counseling", "Support groups", "Peer support"];
    }

    return {
      id: Date.now().toString(),
      text: response,
      isBot: true,
      timestamp: new Date(),
      suggestions
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-wellness/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-wellness" />
            </div>
            <div>
              <h3 className="font-semibold">MindBridge AI Support</h3>
              <p className="text-xs text-muted-foreground">Mental health support assistant</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.isBot ? '' : 'justify-end'}`}>
                {message.isBot && (
                  <div className="w-8 h-8 rounded-full bg-wellness/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-wellness" />
                  </div>
                )}
                
                <div className={`max-w-[80%] space-y-2 ${message.isBot ? '' : 'order-first'}`}>
                  <div className={`p-3 rounded-lg ${
                    message.isBot 
                      ? 'bg-muted text-foreground' 
                      : 'bg-primary text-primary-foreground ml-auto'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>
                  
                  {message.suggestions && (
                    <div className="flex flex-wrap gap-1">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs h-7"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>

                {!message.isBot && (
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-wellness/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-wellness" />
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about mental health resources..."
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            💡 I can help you find crisis support, counseling, support groups, and other mental health resources
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AIChatbot;