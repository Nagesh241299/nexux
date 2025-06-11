import Sidebar from './chatbotComponents/Sidebar'
import ChatWindow from './chatbotComponents/ChatWindow'
import ChatHeader from './chatbotComponents/ChatHeader'
import { useChatbot } from './index.hook'
import { useEffect } from 'react'
import useResponsive from '@/hooks/useResponsive'
import { useMainApp } from '../App/index.hook'
import LocalStorageUtil from '@/utils/LocalStorageUtil'
import { LocalStorageConstants } from '@/constants/Application/LocalStorageConstants'
import { UserInterface } from '@/shared/interface/User.interface'

const Chatbot = () => {
    const chatbot = useChatbot()
    const responsive = useResponsive()
    const isSmallScreen = responsive?.smaller?.sm === true

    useEffect(() => {
        chatbot.fetchDepartments()
    }, [])
    const userData = LocalStorageUtil.localStorageGetItem(
        LocalStorageConstants.USER_DATA,
    ) as UserInterface | null
    const { branding } = useMainApp()
    const footer = branding?.footer_text

    return (
        <div className="flex" style={{ height: 'calc(100vh - 86px)' }}>
            {/* Sidebar for md+ screens (persistent, resizes chat window) */}
            {!isSmallScreen && chatbot.sidebarOpen && (
                <div className="relative w-80 border-r h-full bg-gray-100 transition-all duration-300">
                    <Sidebar
                        chatHistory={chatbot.chatHistory}
                        startNewChat={chatbot.startNewChat}
                        loadChatFromHistory={chatbot.loadChatFromHistory}
                        deleteChat={chatbot.deleteChat}
                        updateChatTitle={chatbot.updateChatTitle}
                        currentSessionId={chatbot.currentSessionId || ''}
                        departments={chatbot.departments}
                    />
                </div>
            )}

            {/* Floating toggle and drawer for small screens (sidebar overlays, does not resize chat window) */}
            {isSmallScreen && (
                <>
                    {/* Sidebar as drawer */}
                    {chatbot.sidebarOpen && (
                        <div className="fixed inset-0 z-50 flex">
                            {/* Overlay */}
                            <div
                                className="absolute inset-0 bg-black bg-opacity-40"
                                onClick={chatbot.toggleSidebar}
                            />
                            {/* Drawer */}
                            <div className="relative w-80 max-w-full h-full  shadow-xl animate-slideInLeft flex flex-col">
                                <div className="flex items-center bg-white dark:bg-black justify-between px-4 py-2 border-b border-gray-200 sticky top-0 z-10">
                                    <span className="font-semibold text-lg">History</span>
                                    <button
                                        className="text-gray-500 hover:text-primary text-2xl ml-2"
                                        onClick={chatbot.toggleSidebar}
                                        aria-label="Close sidebar"
                                    >
                                        ×
                                    </button>
                                </div>
                                <div className="flex-1 overflow-y-auto bg-gray-300">
                                    <Sidebar
                                        chatHistory={chatbot.chatHistory}
                                        startNewChat={chatbot.startNewChat}
                                        loadChatFromHistory={
                                            chatbot.loadChatFromHistory
                                        }
                                        deleteChat={chatbot.deleteChat}
                                        updateChatTitle={chatbot.updateChatTitle}
                                        currentSessionId={chatbot.currentSessionId || ''}
                                        departments={chatbot.departments}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* Chat Window (always full width on small screens, resizes with sidebar on md+ screens) */}
            <div
                className={`flex-1 flex flex-col overflow-hidden bg-white transition-all duration-300 ${!isSmallScreen && chatbot.sidebarOpen ? '' : 'w-full'}`}
            >
                {/* Chat Header */}
                <div className="sticky top-0 z-10 bg-white ">
                    <ChatHeader
                        toggleSidebar={chatbot.toggleSidebar}
                        sidebarOpen={chatbot.sidebarOpen}
                        departments={chatbot.departments}
                        selectedDepartment={
                            chatbot.departments.find(
                                (d) => d.id === chatbot.selectedDepartment,
                            ) || null
                        }
                        onSelectDepartment={(dept) =>
                            chatbot.selectDepartment(dept.id)
                        }
                        startNewChat={chatbot.startNewChat}
                    />
                </div>

                <ChatWindow
                    key={chatbot.chatSessionKey}
                    messages={chatbot.messages}
                    loading={chatbot.loading}
                    showDepartmentPrompt={
                        !chatbot.selectedDepartment &&
                        chatbot.messages.length === 1 &&
                        chatbot.messages[0].id === 'select-department'
                    }
                    departments={chatbot.departments}
                    onSelectDepartment={chatbot.selectDepartment}
                    onSend={chatbot.sendMessage}
                />
                {userData?.role_name === 'User' && (
                    <div className="text-secondary flex justify-center dark:bg-black pt-2">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Chatbot
