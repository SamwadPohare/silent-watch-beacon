
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, SendIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hello! I'm here to help you manage stress and support your mental wellness. How are you feeling today?",
    sender: "bot",
    timestamp: new Date(),
  },
];

// Simple responses based on keywords
const wellnessResponses = [
  {
    keywords: ["stress", "stressed", "overwhelm", "overwhelmed", "pressure"],
    responses: [
      "I understand feeling stressed can be difficult. Consider taking a few deep breaths right now. Breathing slowly can help your nervous system calm down.",
      "Stress often comes from having too much on your plate. Would it help to talk about what's causing you stress right now?",
      "When you're feeling overwhelmed, breaking tasks into smaller steps can make things feel more manageable. What's one small thing you could focus on right now?"
    ]
  },
  {
    keywords: ["anxious", "anxiety", "worry", "worried", "nervous"],
    responses: [
      "Anxiety can feel overwhelming. Try the 5-4-3-2-1 technique: notice 5 things you see, 4 things you can touch, 3 things you hear, 2 things you smell, and 1 thing you taste.",
      "When anxious thoughts come up, it can help to ask yourself: 'Is this thought helpful right now? Is there another way to look at this situation?'",
      "Deep breathing can really help with anxiety. Try breathing in for 4 counts, holding for 2, and exhaling for 6. This helps activate your parasympathetic nervous system."
    ]
  },
  {
    keywords: ["sad", "down", "depressed", "unhappy", "blue"],
    responses: [
      "I'm sorry you're feeling down. Remember that emotions come and go like weather - this feeling won't last forever.",
      "Sometimes small actions can shift our mood. Could you step outside for a few minutes or connect with someone you care about?",
      "It's okay to feel sad sometimes. Being gentle with yourself during difficult times is important. What's one kind thing you could do for yourself today?"
    ]
  },
  {
    keywords: ["tired", "exhausted", "fatigue", "sleep", "rest"],
    responses: [
      "Rest is essential for mental wellness. If possible, could you take a short break or schedule some downtime soon?",
      "Sleep quality greatly affects how we feel. Consider establishing a calming bedtime routine without screens to help improve your rest.",
      "Sometimes tiredness is our body's way of telling us to slow down. Are there any commitments you could postpone to give yourself some breathing room?"
    ]
  },
  {
    keywords: ["help", "support", "resources", "professional", "counselor"],
    responses: [
      "If you're looking for professional support, speaking with one of the counselors available in the app can be very helpful. Would you like me to direct you to the counselor contact page?",
      "Remember that seeking help is a sign of strength. The counselors listed in this app are here to support you.",
      "Professional support can make a big difference. You can access our counselor directory through the 'Available Counselors' section."
    ]
  }
];

// Default responses when no keywords match
const defaultResponses = [
  "Tell me more about how you're feeling.",
  "What has been on your mind lately?",
  "I'm here to listen. What would help you feel better right now?",
  "Sometimes just expressing our thoughts can help. What else would you like to share?",
  "That's important to acknowledge. How has this been affecting your day-to-day life?",
  "I appreciate you sharing that with me. Would you like to talk more about it?"
];

const WellnessChatbot = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Generate bot response after a short delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Check for keyword matches
    for (const category of wellnessResponses) {
      for (const keyword of category.keywords) {
        if (input.includes(keyword)) {
          // Return a random response from the matching category
          return category.responses[Math.floor(Math.random() * category.responses.length)];
        }
      }
    }
    
    // If no keywords match, return a default response
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      toast({
        title: "Wellness Chat",
        description: "Chat with your wellness assistant to help manage stress",
      });
    }
  };

  return (
    <>
      {!isExpanded ? (
        <Button
          onClick={toggleExpanded}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      ) : (
        <Card className="fixed bottom-6 right-6 w-80 md:w-96 shadow-lg z-50 flex flex-col">
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-medium">Wellness Chat</CardTitle>
              <Button variant="ghost" size="sm" onClick={toggleExpanded}>
                ✕
              </Button>
            </div>
          </CardHeader>
          <ScrollArea className="flex-1 p-4 max-h-80" ref={scrollAreaRef}>
            <CardContent className="p-0 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </ScrollArea>
          <CardFooter className="p-3 pt-2">
            <div className="flex w-full items-center space-x-2">
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 min-h-[40px] resize-none"
                rows={1}
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                disabled={inputValue.trim() === ""}
              >
                <SendIcon className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default WellnessChatbot;
