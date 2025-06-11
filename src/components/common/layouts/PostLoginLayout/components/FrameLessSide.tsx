import SideNav from '@/components/common/SideNav'
import Header from '@/components/common/Header'
import FrameLessGap from '@/components/common/FrameLessGap'
import SideNavToggle from '@/components/common/SideNavToggle'
import MobileNav from '@/components/common/MobileNav'
import UserProfileDropdown from '@/components/ProfileDetails/UserProfileDropdown'
import LayoutBase from '@/components/common/LayoutBase'
import classNames from '@/utils/classNames'
import useScrollTop from '@/hooks/useScrollTop'
import useResponsive from '@/hooks/useResponsive'
import { LAYOUT_FRAMELESS_SIDE } from '@/constants/theme.constant'
import type { CommonProps } from '@/shared/types/common'
import type { FooterPageContainerType } from '@/components/common/Footer'

const FrameLessSide = ({ children }: CommonProps) => {
    const { isSticky } = useScrollTop()

    const { larger, smaller } = useResponsive()

    return (
        <LayoutBase
            adaptiveCardActive
            type={LAYOUT_FRAMELESS_SIDE}
            className="app-layout-frameless-side flex flex-auto flex-col bg-gray-950"
            pageContainerReassemble={({
                pageContainerType,
                pageBackgroundType,
                pageContainerGutterClass,
                children,
                footer,
                header,
                defaultClass,
                pageContainerDefaultClass,
                PageContainerBody,
                PageContainerFooter,
                PageContainerHeader,
            }) => (
                <div
                    className={classNames(
                        defaultClass,
                        'rounded-2xl',
                        pageBackgroundType === 'plain' &&
                            'bg-white dark:bg-gray-900',
                    )}
                >
                    <main className="h-full">
                        <div
                            className={classNames(
                                pageContainerDefaultClass,
                                pageContainerType !== 'gutterless' &&
                                    pageContainerGutterClass,
                                pageContainerType === 'contained' &&
                                    'container mx-auto',
                                !footer && 'pb-0 sm:pb-0 md:pb-0',
                            )}
                        >
                            <PageContainerHeader
                                {...header}
                                gutterLess={pageContainerType === 'gutterless'}
                            />
                            <PageContainerBody
                                pageContainerType={pageContainerType}
                            >
                                {children}
                            </PageContainerBody>
                        </div>
                    </main>
                    <PageContainerFooter
                        footer={footer}
                        pageContainerType={
                            pageContainerType as FooterPageContainerType
                        }
                    />
                </div>
            )}
        >
            <div className="flex flex-auto min-w-0">
                {larger.lg && (
                    <SideNav
                        background={false}
                        className={classNames('dark pt-6')}
                        contentClass="h-[calc(100vh-8rem)]"
                        mode="dark"
                    />
                )}
                <FrameLessGap className="min-h-screen min-w-0 relative w-full">
                    <div className="bg-white min-h-screen dark:bg-gray-900 flex flex-col flex-1 h-full rounded-2xl">
                        <Header
                            className={classNames(
                                'rounded-t-2xl dark:bg-gray-900',
                                isSticky && 'shadow !rounded-none',
                            )}
                            headerStart={
                                <>
                                    {smaller.lg && <MobileNav />}
                                    {larger.lg && <SideNavToggle />}
                                </>
                            }
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
                </FrameLessGap>
            </div>
        </LayoutBase>
    )
}

export default FrameLessSide
