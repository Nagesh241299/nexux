import { CommonProps } from '@/shared/types/common'
import LayoutBase from '@/components/common/LayoutBase'
import { LAYOUT_BLANK } from '@/constants/theme.constant'

const Blank = ({ children }: CommonProps) => {
    return (
        <LayoutBase
            type={LAYOUT_BLANK}
            className="app-layout-blank flex flex-auto flex-col h-[100vh]"
        >
            <div className="flex min-w-0 w-full flex-1">
                {children}
            </div>
        </LayoutBase>
    )
}

export default Blank
