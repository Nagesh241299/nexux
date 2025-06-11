import { Suspense } from 'react'
import Loading from '@/components/common/Loading'
import type { CommonProps } from '@/shared/types/common'
import { useThemeStore } from '@/store/themeStore'
import PostLoginLayout from './PostLoginLayout'
import PreLoginLayout from './PreLoginLayout'

const Layout = ({ children }: CommonProps) => {
    const layoutType = useThemeStore((state) => state.layout.type)

    return (
        <Suspense
            fallback={
                <div className="flex flex-auto flex-col h-[100vh]">
                    <Loading loading={true} />
                </div>
            }
        >
            {/* {authenticated ? ( */}
            {/* <PostLoginLayout layoutType={layoutType}>
                    {children}
                </PostLoginLayout> */}
            {/* ) : ( */}
            <PreLoginLayout>{children}</PreLoginLayout>
            {/* )} */}
        </Suspense>
    )
}

export default Layout
