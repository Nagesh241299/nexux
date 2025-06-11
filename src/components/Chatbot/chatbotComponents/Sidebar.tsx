import { Button, Input } from 'antd'
import { MessageCirclePlus } from 'lucide-react'
import {
    PlusCircleOutlined,
    EditOutlined,
    DeleteOutlined,
    CheckOutlined,
    CloseOutlined,
} from '@ant-design/icons'
import { MoreHorizontal } from 'lucide-react'
import type { SidebarProps } from '../../../shared/interface/Chatbot.interface'
import { ChatSession, useChatbot } from '../index.hook'
import { groupChatSessionsByDate } from '../index.hook'

function Sidebar({
    chatHistory,
    startNewChat,
    loadChatFromHistory,
    currentSessionId,
    deleteChat,
    updateChatTitle,
    departments,
}: SidebarProps) {
    const chatbot = useChatbot()
    const groupedChats = groupChatSessionsByDate(chatHistory)

    const getDepartmentName = (departmentId: string | null) => {
        if (!departmentId) return ''
        const dep = departments.find((d) => d.id === departmentId)
        return dep ? dep.name : departmentId
    }

    const renderChatGroup = (label: string, chats: ChatSession[]) => {
        if (chats.length === 0) return null
        return (
            <div className="mb-4  ">
                <div className="text-xs font-semibold text-gray-500 px-2 mb-2">
                    {label}
                </div>
                <ul className="space-y-1">
                    {chats.map(({ id, title, createdAt, departmentId }) => (
                        <li
                            key={id}
                            className={`relative group p-2 rounded-lg cursor-pointer transition-colors ${
                                currentSessionId === id
                                    ? 'bg-gray-200 dark:bg-gray-700 border dark:border-gray-700'
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                            onClick={() => loadChatFromHistory(id)}
                        >
                            {chatbot.editingSessionId === id ? (
                                <div className="flex items-center space-x-2">
                                    <Input
                                        size="small"
                                        value={chatbot.editTitle}
                                        onChange={(e) =>
                                            chatbot.setEditTitle(e.target.value)
                                        }
                                        onClick={(e) => e.stopPropagation()}
                                        onPressEnter={() =>
                                            chatbot.saveTitle(id)
                                        }
                                        onBlur={() => chatbot.saveTitle(id)}
                                        autoFocus
                                        className="w-full"
                                    />
                                    <Button
                                        size="small"
                                        icon={<CheckOutlined />}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            chatbot.saveTitle(id)
                                        }}
                                    />
                                    <Button
                                        size="small"
                                        icon={<CloseOutlined />}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            chatbot.cancelEditing()
                                        }}
                                    />
                                </div>
                            ) : (
                                <div className="flex items-center justify-between">
                                    <div
                                        className="truncate"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            loadChatFromHistory(id)
                                        }}
                                    >
                                        <div className="truncate font-medium text-gray-800 dark:text-gray-200">
                                            {title}
                                        </div>

                                        <div className="w-full flex justify-between">
                                            {departmentId && (
                                                <span className="text-xs text- font-normal">
                                                    {getDepartmentName(
                                                        departmentId,
                                                    )}
                                                </span>
                                            )}
                                            {/* {new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} */}
                                        </div>

                                        <div className="text-xs text-gray-400 mt-0.5"></div>
                                    </div>
                                    <div className="relative">
                                        <Button
                                            icon={<MoreHorizontal size={16} />}
                                            size="small"
                                            type="text"
                                            className="chat-action-button opacity-0 group-hover:opacity-100 dark:text-gray-200 transition"
                                            onClick={(e) =>
                                                chatbot.toggleActionMenu(e, id)
                                            }
                                        />
                                        {chatbot.actionMenuOpen === id && (
                                            <div
                                                className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg z-10"
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                            >
                                                <Button
                                                    type="text"
                                                    icon={<EditOutlined />}
                                                    className="w-full text-left text-gray-700 dark:text-gray-200 dark:hover:text-gray-200 hover:bg-gray-100 px-3 py-2"
                                                    onClick={() =>
                                                        chatbot.startEditing(
                                                            id,
                                                            title,
                                                        )
                                                    }
                                                >
                                                    Rename
                                                </Button>
                                                <Button
                                                    type="text"
                                                    icon={<DeleteOutlined />}
                                                    className="w-full text-left text-red-500 hover:bg-red-50 px-3 py-2"
                                                    onClick={() =>
                                                        deleteChat(id)
                                                    }
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    return (
        <div
            className="w-80 h-full pt-6 border-r border-gray-50 dark:border-gray-700 bg-gray-50 dark:bg-black p-4 overflow-y-hidden hover:overflow-y-auto focus:overflow-y-auto
            [&::-webkit-scrollbar]:w-2
              [&::-webkit-scrollbar-track]:rounded-full
              [&::-webkit-scrollbar-track]:bg-gray-100
              [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar-thumb]:bg-gray-300
              [&::-webkit-scrollbar-thumb]:transition-opacity
              [&::-webkit-scrollbar-thumb]:opacity-0
              hover:[&::-webkit-scrollbar-thumb]:opacity-100
              focus:[&::-webkit-scrollbar-thumb]:opacity-100
              dark:[&::-webkit-scrollbar-track]:bg-neutral-700
              dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 shadow-sm"
        >
            <Button
                icon={<PlusCircleOutlined />}
                onClick={startNewChat}
                className="mb-4 w-full bg-white dark:bg-gray-600 dark:hover:bg-gray-600 hover:bg-primary border-none text-black dark:text-gray-200 hover:text-white"
            >
                New Chat
            </Button>

            {chatHistory.length === 0 ? (
                <div
                    className="flex flex-1 flex-col items-center justify-center text-center text-gray-500 px-4"
                    style={{ minHeight: '60vh' }}
                >
                    <MessageCirclePlus className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm font-medium">No chats yet</p>
                    <p className="text-xs mt-1">
                        Click <strong>"New Chat"</strong> to start a
                        conversation.
                    </p>
                </div>
            ) : (
                <>
                    {renderChatGroup('Today', groupedChats.today)}
                    {renderChatGroup('Yesterday', groupedChats.yesterday)}
                    {renderChatGroup(
                        'Previous 7 Days',
                        groupedChats.previousWeek,
                    )}
                    {renderChatGroup('Older', groupedChats.older)}
                </>
            )}
        </div>
    )
}

export default Sidebar
