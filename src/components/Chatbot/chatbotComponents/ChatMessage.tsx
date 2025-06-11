import { Avatar } from 'antd'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline'
import type { ChatMessageProps } from '../../../shared/interface/Chatbot.interface'
import { useState } from 'react'

const CodeBlock = ({
    language,
    value,
}: {
    language: string
    value: string
}) => {
    const [copied, setCopied] = useState(false)

    const copyToClipboard = () => {
        navigator.clipboard.writeText(value)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="relative my-4 rounded-lg overflow-hidden">
            <div className="flex justify-between items-center bg-gray-800 px-4 py-2">
                <span className="  text-gray-300">{language}</span>
                <button
                    onClick={copyToClipboard}
                    className="text-gray-400 hover:text-white transition-colors"
                >
                    {copied ? (
                        <CheckIcon className="h-5 w-5 text-green-500" />
                    ) : (
                        <ClipboardDocumentIcon className="h-5 w-5" />
                    )}
                </button>
            </div>
            <SyntaxHighlighter
                language={language}
                style={vscDarkPlus}
                showLineNumbers
                lineNumberStyle={{ color: '#666', minWidth: '2.5em' }}
                customStyle={{
                    margin: 0,
                    borderRadius: 0,
                    padding: '1rem',
                    fontSize: '0.875rem',
                }}
            >
                {value}
            </SyntaxHighlighter>
        </div>
    )
}

const ChatMessage = ({ sender, text }: ChatMessageProps) => {
    const isUser = sender === 'user'

    return (
        <div
            className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full`}
        >
            {!isUser && <Avatar className="mr-2" icon="✨" />}
            <div
                className={`rounded-3xl px-4 py-2 leading-relaxed max-w-[90%] ${isUser ? 'bg-primary text-white' : ' text-black bg-gray-100 dark:bg-black'}`}
            >
                <ReactMarkdown
                    components={{
                        // Text formatting
                        strong: ({ node, ...props }) => (
                            <strong className="font-semibold" {...props} />
                        ),
                        em: ({ node, ...props }) => (
                            <em className="italic" {...props} />
                        ),
                        del: ({ node, ...props }) => (
                            <del className="line-through" {...props} />
                        ),

                        // Headers
                        h1: ({ node, ...props }) => (
                            <h1 className=" font-bold my-4" {...props} />
                        ),
                        h2: ({ node, ...props }) => (
                            <h2 className=" font-bold my-3" {...props} />
                        ),
                        h3: ({ node, ...props }) => (
                            <h3 className=" font-bold my-2" {...props} />
                        ),

                        // Lists
                        ul: ({ node, ...props }) => (
                            <ul
                                className="list-disc list-inside my-2 pl-4"
                                {...props}
                            />
                        ),
                        ol: ({ node, ...props }) => (
                            <ol
                                className="list-decimal list-inside my-2 pl-4"
                                {...props}
                            />
                        ),
                        li: ({ node, ...props }) => (
                            <li className="mb-1.5" {...props} />
                        ),

                        // Code blocks
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '')
                            return !inline && match ? (
                                <CodeBlock
                                    language={match[1]}
                                    value={String(children).replace(/\n$/, '')}
                                />
                            ) : (
                                <code className="bg-gray-200 dark:bg-gray-500 dark:text-gray-200 px-1.5 py-0.5 rounded text-sm font-mono">
                                    {children}
                                </code>
                            )
                        },

                        // Blockquotes
                        blockquote: ({ node, ...props }) => (
                            <blockquote
                                className="border-l-4 border-gray-400 pl-4 my-3 text-gray-600"
                                {...props}
                            />
                        ),

                        // Tables
                        table: ({ node, ...props }) => (
                            <table
                                className="border-collapse w-full my-4"
                                {...props}
                            />
                        ),
                        thead: ({ node, ...props }) => (
                            <thead className="bg-gray-50" {...props} />
                        ),
                        th: ({ node, ...props }) => (
                            <th
                                className="border p-2 text-left font-semibold"
                                {...props}
                            />
                        ),
                        td: ({ node, ...props }) => (
                            <td className="border p-2" {...props} />
                        ),

                        // Links
                        a: ({ node, ...props }) => (
                            <a
                                className="text-blue-600 hover:text-blue-800 underline break-all"
                                target="_blank"
                                rel="noopener noreferrer"
                                {...props}
                            />
                        ),

                        // Images
                        img: ({ node, ...props }) => (
                            <img
                                className="my-2 max-w-full h-auto rounded-lg"
                                loading="lazy"
                                {...props}
                            />
                        ),

                        // Horizontal rules
                        hr: ({ node, ...props }) => (
                            <hr
                                className="my-4 border-t border-gray-300"
                                {...props}
                            />
                        ),

                        // Paragraphs
                        p: ({ node, ...props }) => (
                            <p
                                className={` leading-relaxed ${isUser ? 'text-white' : 'text-black'} `}
                                {...props}
                            />
                        ),
                    }}
                >
                    {text.replace(/\n\s*\n/g, '\n\n')}
                </ReactMarkdown>
            </div>
        </div>
    )
}

export default ChatMessage
