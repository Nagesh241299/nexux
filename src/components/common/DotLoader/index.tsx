const DotLoader = () => {
    return (
        <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-900 rounded-full animate-bounce"></span>
            <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce [animation-delay:200ms]"></span>
            <span className="w-2 h-2 bg-green-300 rounded-full animate-bounce [animation-delay:400ms]"></span>
        </div>
    )
}

export default DotLoader
