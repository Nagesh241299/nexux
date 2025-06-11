import type { ChatSession } from '@/hooks/useChatbot'
export interface Department {
    id: string;
    name: string;
}

export interface ChatSource {
    source_filename: string;
    page_number: number;
    source_file_url: string;
}

export interface ChatMessageType {
    id?: string;
    sender?: 'user' | 'bot';
    role?: 'user' | 'chatbot';
    text?: string;
    content?: string;
    timestamp?: string;
    source?: ChatSource[];
}

export interface ChatWindowProps {
    messages: ChatMessageType[]
    loading: boolean
    showDepartmentPrompt: boolean
    departments: Department[]
    onSelectDepartment: (id: string) => void
    onSend: (msg: string) => void
}

export interface SidebarProps {
    chatHistory: ChatSession[]
    startNewChat: () => void
    loadChatFromHistory: (sessionId: string) => void
    currentSessionId: string
    deleteChat: (sessionId: string) => void
    updateChatTitle: (sessionId: string, newTitle: string) => void
    toggleSidebar?: () => void
    departments: { id: string; name: string }[]
}

export interface ChatMessageProps {
    sender: string
    text: string
}

export interface ChatInputProps {
  onSend: (msg: string) => void;
  disabled?: boolean;
}

type NewType = boolean
export interface ChatHeaderProps {
    toggleSidebar: () => void
    sidebarOpen: NewType
    departments: Department[]
    selectedDepartment: Department | null
    onSelectDepartment: (department: Department) => void
    startNewChat: () => void
}
