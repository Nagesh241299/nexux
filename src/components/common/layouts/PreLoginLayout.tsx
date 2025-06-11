import type { CommonProps } from '@/shared/types/common'

const PreLoginLayout = ({ children }: CommonProps) => {
    return <div className="flex flex-auto flex-col h-[100vh]">{children}</div>
}

export default PreLoginLayout
