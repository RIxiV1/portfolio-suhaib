"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquareText, X, Send, Bot, User } from "lucide-react"

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{role: 'user'|'ai', content: string}[]>([
    { role: 'ai', content: "Hi! I'm Suhaib's AI Agent. Ask me about his tech stack, experience, or projects!" }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { role: 'user', content: input }])
    setInput("")
    setIsTyping(true)
    
    // Simulate AI response for the demo
    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: "That's a great question! I'm currently running in 'mock' mode utilizing hardcoded logic to ensure zero-latency. In a full production environment, I'd query Suhaib's internal knowledge base using RAG via a Next.js Server Action to answer that. Check out his 'Resume Agent' project to see this architecture deployed in the real world!" 
      }])
    }, 1500)
  }

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-xl shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:bg-cyan-500/30 transition-colors ${isOpen ? 'hidden' : 'block'}`}
      >
        <MessageSquareText className="w-6 h-6 text-cyan-400" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[80vh] rounded-[2.5rem] border border-foreground/10 border-t-foreground/20 bg-background/80 backdrop-blur-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-foreground/10 flex items-center justify-between bg-foreground/5">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                <span className="font-mono text-xs tracking-[0.2em] text-cyan-400 uppercase">Nexus AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-foreground/50 hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'ai' ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400' : 'bg-foreground/10 text-foreground'}`}>
                    {msg.role === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-foreground/10 text-foreground rounded-tr-sm' : 'bg-cyan-500/5 border border-cyan-500/10 text-foreground/90 rounded-tl-sm'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 text-cyan-400">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 rounded-tl-sm flex items-center gap-1">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4 }} className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-foreground/10 bg-foreground/5">
              <div className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Query my systems..." 
                  className="w-full bg-foreground/5 border border-foreground/10 rounded-full py-3.5 pl-5 pr-12 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors placeholder:text-foreground/30 font-light"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/30 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
