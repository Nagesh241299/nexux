import { PanelLeftClose, PanelLeftOpen, ChevronDown, Check } from 'lucide-react'
import { Button, Dropdown, Menu, Tooltip } from 'antd'
import { FaPenToSquare } from 'react-icons/fa6'
import type { ChatHeaderProps } from '../../../shared/interface/Chatbot.interface'

function ChatHeader({
    toggleSidebar,
    startNewChat,
    sidebarOpen,
    departments,
    selectedDepartment,
    onSelectDepartment,
}: ChatHeaderProps) {
    const menu = (
        <Menu>
            {departments.map((dept) => (
                <Menu.Item
                    key={dept.id}
                    onClick={() => {
                        startNewChat()
                        onSelectDepartment(dept)
                    }}
                    className="flex-row items-center justify-between"
                >
                    <span className=" flex gap-1">
                        {dept.name}
                        {selectedDepartment?.id === dept.id && (
                            <Check
                                size={16}
                                className="text-green-500 justify-center align-middle"
                            />
                        )}
                    </span>
                </Menu.Item>
            ))}
        </Menu>
    )

    return (
        <header className="p-3 flex items-center  dark:bg-gray-800  backdrop-blur-sm justify-between md:justify-start ">
            <div className="flex items-center">
                <Button
                    type="text"
                    size="large"
                    onClick={toggleSidebar}
                    className="mr-2 text-primary items-center pb-0 mb-0 dark:bg-gray-800 hover:text-black "
                    icon={
                        sidebarOpen ? (
                            <Tooltip title="Close Sidebar">
                                <PanelLeftClose
                                    size={26}
                                    className="pb-0 mb-0 pt-1"
                                />
                            </Tooltip>
                        ) : (
                            <Tooltip title="Open Sidebar">
                                <PanelLeftOpen
                                    size={26}
                                    className="mb-0 pb-0 pt-1"
                                />
                            </Tooltip>
                        )
                    }
                />
            </div>
            <Dropdown overlay={menu} trigger={['click']}>
                <Button
                    size="large"
                    type="default"
                    className="shadow-none flex items-center font-medium border !border-none gap-2 text-lg  hover:!text-black dark:bg-gray-800 dark:text-gray-200 hover:!bg-gray-100 dark:hover:!bg-gray-700 dark:hover:!text-white"
                >
                    {selectedDepartment
                        ? selectedDepartment.name
                        : 'Select Knowledge Base'}
                    <ChevronDown size={16} />
                </Button>
            </Dropdown>

            <Tooltip title="Start New Chat" placement="bottom">
                <Button
                    className="mr-2 text-primary hover:text-black hover:bg-zinc-100"
                    type="link"
                    onClick={startNewChat}
                >
                    <FaPenToSquare
                        className="w-[20px] h-[20px] text-primary md:hidden lg:hidden"
                        style={{ cursor: 'pointer' }}
                    />
                </Button>
            </Tooltip>
        </header>
    )
}

export default ChatHeader;
