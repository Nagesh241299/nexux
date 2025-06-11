import { LayoutContext } from '@/hooks/useLayout'
import type { LayoutContextProps } from '@/hooks/useLayout'
import type { CommonProps } from '@/shared/types/common'

type LayoutBaseProps = CommonProps & LayoutContextProps

const LayoutBase = (props: LayoutBaseProps) => {
    const {
        children,
        className,
        adaptiveCardActive,
        type,
        pageContainerReassemble,
    } = props

    return (
        <LayoutContext.Provider
            value={{ adaptiveCardActive, pageContainerReassemble, type }}
        >
            <div className={className}>{children}</div>
        </LayoutContext.Provider>
    )
}

export default LayoutBase
