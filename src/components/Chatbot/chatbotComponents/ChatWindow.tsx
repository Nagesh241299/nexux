import React, { useEffect } from 'react'
import { Avatar, Button, Modal } from 'antd'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import ChatLoadingDots from './ui/ChatLoadingDots'
import { useChatbot } from '../index.hook'
import { FaFileAlt } from 'react-icons/fa'
import type { ChatWindowProps } from '../../../shared/interface/Chatbot.interface'

const ChatWindow = ({
    messages,
    loading,
    showDepartmentPrompt,
    departments,
    onSelectDepartment,
    onSend,
}: ChatWindowProps) => {
    const chatbot = useChatbot()
    useEffect(() => {
        if (chatbot.messagesEndRef.current) {
            chatbot.messagesEndRef.current.scrollIntoView({
                behavior: 'smooth',
            })
        }
    }, [messages, loading])

    if (showDepartmentPrompt) {
        return (
            <div className="flex flex-col h-full bg-white dark:bg-gray-800">
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center space-y-6">
                        <h1 className=" font-bold">
                            How can I help you today?
                        </h1>
                        {departments.length > 0 && (
                            <div className="space-y-3 flex flex-col justify-center items-center">
                                <p className="text-zinc-400 dark:text-gray-500">
                                    Select a Knowledge base to get started
                                </p>
                                <div className="flex flex-wrap w-[70%] gap-3 justify-center items-center">
                                    {departments.map((dep) => (
                                        <Button
                                            key={dep.id}
                                            className="rounded-full px-6 py-2 transition-all border dark:bg-gray-600 border-primary dark:border-gray-600 dark:text-gray-100 hover:!bg-primary hover:!text-white"
                                            onClick={() =>
                                                onSelectDepartment(dep.id)
                                            }
                                        >
                                            {dep.name}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    return (
    <div className="flex justify-center w-full h-full bg-white dark:bg-gray-800">
        <div className="flex flex-col h-full w-full max-w-7xl px-4 sm:px-6 md:px-8 xl:px-8">
            <div className="flex-1 overflow-y-auto no-scrollbar py-6 space-y-4">
                {messages.map((msg, i) => (
                    <div key={msg.id || i} className="relative py-4">
                        <ChatMessage
                            sender={msg.role || msg.sender || 'bot'}
                            text={msg.content || msg.text || ''}
                        />
                        {msg.role === 'chatbot' && msg.source && msg.source.length > 0 && (
                            <div className="mt-5 ml-14 ">
                                <h3 className='text-xl font-semibold py-4'>References</h3>
                              {(() => {
  const groupedSources = msg.source.reduce((acc: Record<string, { url: string; pages: Set<number> }>, source) => {
    if (source.page_number > 0) {
      if (!acc[source.source_filename]) {
        acc[source.source_filename] = {
          url: source.source_file_url,
          pages: new Set()
        };
      }
      acc[source.source_filename].pages.add(source.page_number);
    }
    return acc;
  }, {});

  return Object.entries(groupedSources).map(([filename, data], index) => (
    <div
      key={index}
      className="flex flex-col pb-4 ml-2"
    >
      <div className="flex items-center gap-3">
        <span className="bg-gray-100 p-2 rounded-lg dark:bg-black dark:text-white"><FaFileAlt /></span>
        <span className="font-semibold">{filename}</span>
      </div>
      <div className="flex flex-wrap gap-2 mt-2 ml-10">
        Page No
        {Array.from(data.pages).sort((a, b) => a - b).map((page, i) => (
          <span
            key={i}
            className=" flex justify-center items-center cursor-pointer bg-gray-100 hover:bg-primary dark:hover:bg-primary hover:text-white dark:bg-black rounded-full w-6 h-6"
            onClick={() => chatbot.handleOpenPdf(data.url, page)}
          >
             {page}
          </span>
        ))}
      </div>
    </div>
  ));
})()}

                            </div>
                        )}
                    </div>
                ))}
                {loading && (
                    <div className='flex items-center space-x-2 mt-4'>
                        <Avatar className="mr-2" icon="✨" />
                        <ChatLoadingDots />
                    </div>
                )}
                <div ref={chatbot.messagesEndRef} />
            </div>
            <div className="sticky bottom-0 bg-gray-800 w-full">
                <ChatInput onSend={onSend} disabled={loading} />
            </div>
            
            <Modal
                open={chatbot.pdfModalVisible}
                onCancel={chatbot.handleCloseModal}
                footer={null}
                width="90vw"
                style={{ top: 10, padding: 0, maxWidth: 'none' }}
                bodyStyle={{ padding: 0, height: '80vh', overflow: 'hidden' }}
                centered
                title="Document Source"
                modalRender={(modal) => (
                    <div className="bg-white rounded-lg" style={{ height: '90vh', padding: 0 }}>
                        {modal}
                    </div>
                )}
            >
               
                {chatbot.pdfUrl && (
<div>
                    <iframe
                        key={chatbot.pdfUrl}
                        src={chatbot.pdfUrl}
                        width="100%"
                        height="100%"
                        style={{
                            border: 'none',
                            minHeight: '80vh',
                            maxHeight: '90vh',
                            display: 'block',
                        }}
                        title={`Document Viewer${chatbot.pdfPage ? ' - Page ' + chatbot.pdfPage : ''}`}
                    />
                    </div>
                )}
            </Modal>
        </div>
    </div>
    );
};

export default React.memo(ChatWindow)
