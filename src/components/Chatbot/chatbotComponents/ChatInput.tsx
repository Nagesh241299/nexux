import { useState } from 'react';
import { Button, Input } from 'antd';
import { FaArrowUp } from 'react-icons/fa6';
import type { ChatInputProps} from '../../../shared/interface/Chatbot.interface'



const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    const trimmed = message.trim();
    if (trimmed) {
      onSend(trimmed);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className=" py-3 bg-white dark:bg-gray-800">
      <div className="relative mx-auto">
          <Input.TextArea
            autoSize={{ minRows: 1, maxRows: 6 }}
            size='large'
            placeholder="Ask anything"
            className="!bg-transparen dark:bg-gray-700 rounded-3xl p-5 !shadow-none  !resize-none !text-base dark:text-gray-300 !leading-6 focus:!ring-0 focus:outline-none focus-within:!border-primary dark:border-primary focus-within:!outline-0 placeholder:text-gray-400"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
          />
          
            <Button
              type="text"
              icon={<FaArrowUp />}
              onClick={handleSend}
              disabled={ message.trim() == '' || disabled }
              className="!absolute right-4 bottom-4 bg-primary disabled:bg-gray-300 rounded-full text-white "
            />
          
        </div>
      </div>
  );
};

export default ChatInput;
