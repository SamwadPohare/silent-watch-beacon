import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, SendIcon, Phone, Heart, Book, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  resources?: Resource[];
};

type Resource = {
  title: string;
  description: string;
  type: "helpline" | "article" | "tip";
  icon: "phone" | "book" | "heart" | "info";
};

const mentalHealthResources: Resource[] = [
  {
    title: "24/7 Crisis Helpline",
    description: "Call 1-800-273-8255 - Available 24 hours a day",
    type: "helpline",
    icon: "phone"
  },
  {
    title: "Crisis Text Line",
    description: "Text HOME to 741741 to connect with a Crisis Counselor",
    type: "helpline",
    icon: "phone"
  },
  {
    title: "Student Counseling Services",
    description: "Call (555) 123-4567 to schedule an appointment with a counselor",
    type: "helpline",
    icon: "phone"
  }
];

const selfCareTips: Resource[] = [
  {
    title: "Deep Breathing Exercise",
    description: "Practice 4-7-8 breathing: Inhale for 4 seconds, hold for 7, exhale for 8",
    type: "tip",
    icon: "heart"
  },
  {
    title: "Mindful Walking",
    description: "Take a 10-minute walk while focusing on your surroundings",
    type: "tip",
    icon: "heart"
  },
  {
    title: "Stress Management Guide",
    description: "Learn evidence-based techniques for managing academic stress",
    type: "article",
    icon: "book"
  }
];

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hello! I'm here to help you manage stress and support your mental wellness. How are you feeling today?",
    sender: "bot",
    timestamp: new Date(),
  },
];

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

const generateResourceResponse = (userInput: string): Resource[] => {
  const input = userInput.toLowerCase();
  const resources: Resource[] = [];
  
  if (input.includes("suicide") || input.includes("kill myself") || input.includes("end it all")) {
    resources.push(...mentalHealthResources.filter(r => r.type === "helpline"));
  }
  
  if (input.includes("stress") || input.includes("anxiety") || input.includes("overwhelm")) {
    resources.push(...selfCareTips.slice(0, 2));
  }
  
  if (input.includes("help") || input.includes("resources") || input.includes("learn")) {
    resources.push(...selfCareTips.filter(r => r.type === "article"));
  }
  
  return resources;
};

const ResourceList = ({ resources }: { resources: Resource[] }) => {
  if (!resources || resources.length === 0) return null;
  
  return (
    <Accordion type="single" collapsible className="mt-4">
      <AccordionItem value="resources">
        <AccordionTrigger className="text-sm">
          <Info className="w-4 h-4 mr-2" /> Available Resources
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3">
            {resources.map((resource, index) => {
              const Icon = {
                phone: Phone,
                book: Book,
                heart: Heart,
                info: Info
              }[resource.icon];
              
              return (
                <div key={index} className="flex items-start gap-2 p-2 rounded-md bg-muted/50">
                  <Icon className="w-4 h-4 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm">{resource.title}</h4>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const WellnessChatbot = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const resources = generateResourceResponse(inputValue);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    setTimeout(() => {
      const botResponse = generateResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
        resources: resources
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    for (const category of wellnessResponses) {
      for (const keyword of category.keywords) {
        if (input.includes(keyword)) {
          return category.responses[Math.floor(Math.random() * category.responses.length)];
        }
      }
    }
    
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
                    {message.resources && <ResourceList resources={message.resources} />}
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
