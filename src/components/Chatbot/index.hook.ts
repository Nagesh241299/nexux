import { useState, useEffect, useRef } from 'react'
import { sendChatMessage } from '@/services/ChatbotService'
import { set } from 'lodash'

export interface Department {
    id: string
    name: string
}

export interface ChatSource {
    source_filename: string
    page_number: number
    source_file_url: string
}

export interface ChatMessage {
    id?: string
    role?: 'user' | 'chatbot'
    sender?: 'user' | 'bot'
    content?: string
    text?: string
    timestamp?: string
    department_id?: string
    source?: ChatSource[]
}

export interface ChatSession {
    id: string
    title: string
    messages: ChatMessage[]
    departmentId: string | null
    createdAt: string
}

// If you want user-specific history, pass userId as a parameter to useChatbot and use this key:
function getChatHistoryKey(userId?: string) {
    return userId ? `chatbot-history-${userId}` : 'chatbot-history'
}

export const groupChatSessionsByDate = (chatHistory: ChatSession[]) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    const oneWeekAgo = new Date(today)
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    return chatHistory.reduce(
        (groups, chat) => {
            const chatDate = new Date(chat.createdAt)
            chatDate.setHours(0, 0, 0, 0)

            if (chatDate.getTime() === today.getTime()) {
                groups.today.push(chat)
            } else if (chatDate.getTime() === yesterday.getTime()) {
                groups.yesterday.push(chat)
            } else if (chatDate.getTime() > oneWeekAgo.getTime()) {
                groups.older.push(chat)
            } else {
                groups.older.push(chat)
            }

            return groups
        },
        {
            today: [] as ChatSession[],
            yesterday: [] as ChatSession[],
            previousWeek: [] as ChatSession[],
            older: [] as ChatSession[],
        },
    )
}

export const useChatbot = (userId?: string) => {
    const CHAT_HISTORY_KEY = getChatHistoryKey(userId)

    // Helper to update chat history in both state and localStorage
    const updateChatHistory = (
        updater: (prev: ChatSession[]) => ChatSession[],
    ) => {
        setChatHistory((prev) => {
            const updated = updater(prev)
            localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(updated))
            return updated
        })
    }

    const [departments, setDepartments] = useState<Department[]>([])
    const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
        null,
    )
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [loading, setLoading] = useState(false)
    const [chatHistory, setChatHistory] = useState<ChatSession[]>([])
    const [chatSessionKey, setChatSessionKey] = useState(0)
    const [currentSessionId, setCurrentSessionId] = useState<string | null>(
        null,
    )
    const [sidebarOpen, setSidebarOpen] = useState(true)
    // sidebar state variables
    const [editingSessionId, setEditingSessionId] = useState<string | null>(
        null,
    )
    const [editTitle, setEditTitle] = useState('')
    const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null)

    //chat window component state variables
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const prevMessageLength = useRef(messages.length)
    const [pdfModalVisible, setPdfModalVisible] = useState(false)
    const [pdfUrl, setPdfUrl] = useState<string | null>(null)
    const [pdfPage, setPdfPage] = useState<number | null>(null)

    const toggleSidebar = () => setSidebarOpen((open) => !open)

    // Load chat history from localStorage (user-specific if userId is provided)
    useEffect(() => {
        const saved = localStorage.getItem(CHAT_HISTORY_KEY)
        if (saved) {
            try {
                setChatHistory(JSON.parse(saved))
            } catch {
                setChatHistory([])
            }
        }
    }, [CHAT_HISTORY_KEY])

    // Save current chat before page unload (refresh/close)
    useEffect(() => {
        const handleBeforeUnload = () => {
            saveCurrentChatToHistory()
        }
        window.addEventListener('beforeunload', handleBeforeUnload)
        return () =>
            window.removeEventListener('beforeunload', handleBeforeUnload)
        // eslint-disable-next-line
    }, [messages, selectedDepartment, currentSessionId, chatHistory])

    // sidebar functions
    useEffect(() => {
        const handleClickOutside = () => setActionMenuOpen(null)
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [])

    // chat window functions

    useEffect(() => {
        if (messages.length > prevMessageLength.current) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
            prevMessageLength.current = messages.length
        }
    }, [messages])

    useEffect(() => {
        const handleClickOutside = () => setActionMenuOpen(null)
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [])

    //chat window functions

    // Only open the first source in the list
    const handleOpenSources = (source: ChatSource[]) => {
        if (source && source.length > 0) {
            setPdfUrl(
                `${source[0].source_file_url}#page=${source[0].page_number}`,
            )
            setPdfPage(source[0].page_number)
            setPdfModalVisible(true)
        }
    }

     function getViewerUrl(fileUrl: string): string {
        const extension = fileUrl.split('.').pop()?.toLowerCase()
        const decodedUrl = decodeURIComponent(fileUrl)
        const encodedUrl = encodeURIComponent(decodedUrl)
        switch (extension) {
            case 'pdf':
            case 'txt':
                return decodedUrl
            case 'doc':
            case 'docx':
            case 'ppt':
            case 'pptx':
            case 'xls':
            case 'xlsx':
                return `https://docs.google.com/gview?url=${encodedUrl}&embedded=true`
            default:
                return decodedUrl
        }
    }
const handleOpenPdf = (url: string, page?: number) => {
    const viewerUrl = getViewerUrl(url);
    const finalUrl = viewerUrl.includes('gview')
        ? viewerUrl  // Don't add #page for Google Docs Viewer
        : `${viewerUrl}#page=${page || 1}`;

    setPdfUrl(finalUrl);
    setPdfPage(page || 1);
    setPdfModalVisible(true);
};



    const handleCloseModal = () => {
        setPdfModalVisible(false)
        setPdfUrl(null)
        setPdfPage(null)
    }

    const groupedChats = groupChatSessionsByDate(chatHistory)

    const startEditing = (sessionId: string, currentTitle: string) => {
        setEditingSessionId(sessionId)
        setEditTitle(currentTitle)
    }

    const saveTitle = (sessionId: string) => {
        if (editTitle.trim()) {
            updateChatTitle(sessionId, editTitle.trim())
        }
        setEditingSessionId(null)
    }

    const cancelEditing = () => setEditingSessionId(null)

    const toggleActionMenu = (e: React.MouseEvent, sessionId: string) => {
        e.stopPropagation()
        setActionMenuOpen(actionMenuOpen === sessionId ? null : sessionId)
    }

    const fetchDepartments = async () => {
        setLoading(true)
        try {
            const res = await sendChatMessage({
                message: ' ',
                department_id: '0',
            })
            const departments = (res as any)?.data?.departments || []
            setDepartments(departments)

            const promptMessage: ChatMessage = {
                id: 'select-department',
                role: 'chatbot',
                sender: 'bot',
                text: 'Please select a Knowledge Base to start conversation',
                timestamp: new Date().toISOString(),
            }

            setMessages([promptMessage])
            setSelectedDepartment(null)
        } finally {
            setLoading(false)
        }
    }

    const selectDepartment = async (departmentId: string) => {
        const selected = departments.find((dep) => dep.id === departmentId)
        const departmentName = selected?.name || 'your selected department'

        setSelectedDepartment(departmentId)
        setLoading(true)

        try {
            const userMessage: ChatMessage = {
                id: `user-selected-dept-${Date.now()}`,
                role: 'user',
                sender: 'user',
                text: departmentName,
                timestamp: new Date().toISOString(),
                department_id: departmentId,
            }

            setMessages((prev) => [...prev, userMessage])

            setTimeout(() => {
                const greeting: ChatMessage = {
                    id: `greeting-${Date.now()}`,
                    role: 'chatbot',
                    sender: 'bot',
                    text: `You have chosen ${departmentName}, how can I help you?`,
                    timestamp: new Date().toISOString(),
                    department_id: departmentId,
                }
                setMessages((prev) => [...prev, greeting])
                setLoading(false)
            }, 500)
        } catch {
            setLoading(false)
        }
    }

    // Helper to determine if the first user message after greeting (not department selection)
    function isFirstRealUserMessage(messages: ChatMessage[]) {
        // Find all user messages
        const userMsgs = messages.filter((m) => m.role === 'user')
        if (userMsgs.length === 1) {
            return false
        }
        if (userMsgs.length === 2) {
            return true
        }
        return false
    }

    const sendMessage = async (message: string) => {
        if (!selectedDepartment) return

        const userMsg: ChatMessage = {
            id: `user-${Date.now()}`,
            role: 'user',
            sender: 'user',
            text: message,
            timestamp: new Date().toISOString(),
            department_id: selectedDepartment,
        }

        setMessages((prev) => {
            const updated = [...prev, userMsg]
            // If this is the first real user message , create chat history entry
            if (isFirstRealUserMessage(updated)) {
                setTimeout(() => {
                    saveCurrentChatToHistory(updated)
                }, 0)
            }
            return updated
        })
        setLoading(true)

        try {
            const res = await sendChatMessage({
                message,
                department_id: selectedDepartment,
            })

            const chatBot = (res as any)?.data?.chatBot
            const botResponse = chatBot?.response
            const botTimestamp = chatBot?.timestamp ?? new Date().toISOString()
            const botSource = chatBot?.source ?? []

            const botMsg: ChatMessage = {
                id: `bot-${Date.now()}`,
                role: 'chatbot',
                sender: 'bot',
                text: botResponse || 'Sorry, I did not understand that.',
                timestamp: botTimestamp,
                department_id: selectedDepartment,
                source: botSource,
            }

            setMessages((prev) => [...prev, botMsg])
        } catch (error) {
            console.error('Error sending message:', error)

            const botMsg: ChatMessage = {
                id: `bot-${Date.now()}`,
                role: 'chatbot',
                sender: 'bot',
                text: 'Oops! Something went wrong. Please try again later.',
                timestamp: new Date().toISOString(),
                department_id: selectedDepartment,
            }

            setMessages((prev) => [...prev, botMsg])
        } finally {
            setLoading(false)
        }
    }

    // Save current chat to history, but only if it has at least two user messages (department selection + real question)
    const saveCurrentChatToHistory = (customMessages?: ChatMessage[]) => {
        const msgs = customMessages || messages
        const userMessages = msgs.filter((m) => m.role === 'user')
        if (userMessages.length < 2) return // Only save after first real question

        // Compose title: first real user message (second user message) + department name
        const messageForTitle = userMessages[1]
        const departmentObj = departments.find(
            (dep) => dep.id === selectedDepartment,
        )
        const departmentName = departmentObj ? ` [${departmentObj.name}]` : ''
        let title = messageForTitle?.text?.slice(0, 30) || 'New Chat'

        if (currentSessionId) {
            updateChatHistory((prev) =>
                prev.map((session) =>
                    session.id === currentSessionId
                        ? {
                              ...session,
                              messages: [...msgs],
                              departmentId: selectedDepartment,
                              title,
                          }
                        : session,
                ),
            )
        } else {
            // Only add if not already present
            if (
                chatHistory.some(
                    (session) =>
                        session.messages.length === msgs.length &&
                        session.messages.every(
                            (msg, idx) => msg.id === msgs[idx]?.id,
                        ),
                )
            ) {
                return
            }
            const newSession: ChatSession = {
                id: `chat-${Date.now()}`,
                title,
                messages: [...msgs],
                departmentId: selectedDepartment,
                createdAt: new Date().toISOString(),
            }
            updateChatHistory((prev) => [newSession, ...prev])
            setCurrentSessionId(newSession.id)
        }
    }

    // Always start a new chat, saving the current one if needed
    const startNewChat = () => {
        saveCurrentChatToHistory()
        // Reset messages to department prompt using already loaded departments
        const promptMessage: ChatMessage = {
            id: 'select-department',
            role: 'chatbot',
            sender: 'bot',
            text: 'Please select a Knowledge Base to start conversation.',
            timestamp: new Date().toISOString(),
        }
        setMessages([promptMessage])
        setSelectedDepartment(null)
        setChatSessionKey((k) => k + 1)
        setCurrentSessionId(null)
    }

    // Load chat from history by id
    const loadChatFromHistory = (sessionId: string) => {
        saveCurrentChatToHistory() // Save current chat before switching
        const session = chatHistory.find((s) => s.id === sessionId)
        if (!session) return

        setMessages([...session.messages])
        setSelectedDepartment(session.departmentId)
        setCurrentSessionId(sessionId)
    }

    // Update chat title in history
    const updateChatTitle = (sessionId: string, newTitle: string) => {
        updateChatHistory((prev) =>
            prev.map((session) =>
                session.id === sessionId
                    ? { ...session, title: newTitle }
                    : session,
            ),
        )
    }

    // Delete chat session from history
    const deleteChat = (sessionId: string) => {
        updateChatHistory((prev) =>
            prev.filter((session) => session.id !== sessionId),
        )
        if (currentSessionId === sessionId) {
            startNewChat()
        }
    }

  return {
    departments,
    selectedDepartment,
    messages,
    loading,
    fetchDepartments,
    selectDepartment,
    sendMessage,
    startNewChat,
    chatHistory,
    loadChatFromHistory,
    updateChatTitle,
    deleteChat,
    chatSessionKey,
    saveCurrentChatToHistory,
    currentSessionId,
    setSidebarOpen,
    sidebarOpen,
    toggleSidebar,
    setActionMenuOpen,
    actionMenuOpen,
    setEditTitle,
    editTitle,
    setEditingSessionId,
    editingSessionId,
    toggleActionMenu,
    cancelEditing,
    saveTitle,
    startEditing,
    groupedChats,
    handleCloseModal,
    handleOpenSources,
    pdfPage,
    pdfUrl,
    pdfModalVisible,
    messagesEndRef,
    prevMessageLength,
    handleOpenPdf,
    getViewerUrl
  }
}
