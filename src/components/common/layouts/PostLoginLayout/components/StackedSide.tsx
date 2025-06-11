import StackedSideNav from '@/components/common/StackedSideNav'
import Header from '@/components/common/Header'
import MobileNav from '@/components/common/MobileNav'
import UserProfileDropdown from '@/components/ProfileDetails/UserProfileDropdown'
import LayoutBase from '@/components/common/LayoutBase'
import useResponsive from '@/hooks/useResponsive'
import { LAYOUT_STACKED_SIDE } from '@/constants/theme.constant'
import type { CommonProps } from '@/shared/types/common'

const StackedSide = ({ children }: CommonProps) => {
    const { larger, smaller } = useResponsive()

    return (
        <LayoutBase
            type={LAYOUT_STACKED_SIDE}
            className="app-layout-stacked-side flex flex-auto flex-col"
        >
            <div className="flex flex-auto min-w-0">
                {larger.lg && <StackedSideNav />}
                <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full">
                    <Header
                        className="shadow dark:shadow-2xl"
                        headerStart={<>{smaller.lg && <MobileNav />}</>}
                        headerEnd={
                            <>
                                <UserProfileDropdown />
                            </>
                        }
                    />
                    <div className="h-full flex flex-auto flex-col">
                        {children}
                    </div>
                </div>
            </div>
        </LayoutBase>
    )
}

export default StackedSide
