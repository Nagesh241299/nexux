import React from "react";

const ChatLoadingDots = () => (
  <div className="flex items-center gap-2 space-x-1 px-3 py-2">
    <span className="w-2 h-2 bg-gray-500 rounded-full animate-ping [animation-delay:0s]" />
    <span className="w-2 h-2 bg-gray-500 rounded-full animate-ping [animation-delay:0.2s]" />
    <span className="w-2 h-2 bg-gray-500 rounded-full animate-ping [animation-delay:0.4s]" />
  </div>
);
export default React.memo(ChatLoadingDots);