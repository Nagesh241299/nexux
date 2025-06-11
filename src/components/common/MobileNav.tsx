import { useState, Suspense, lazy, useEffect } from 'react'
import classNames from 'classnames'
import Drawer from './Drawer'
import NavToggle from './NavToggle'
import { DIR_RTL } from '@/constants/theme.constant'
import withHeaderItem, { WithHeaderItemProps } from '@/utils/hoc/withHeaderItem'
import SideMenuRoutes from '@/routes/SideMenuRoutes'
import { useThemeStore } from '@/store/themeStore'
import { useRouteKeyStore } from '@/store/routeKeyStore'

const VerticalMenuContent = lazy(
    () => import('@/components/common/VerticalMenuContent'),
)

type MobileNavToggleProps = {
    toggled?: boolean
}

const MobileNavToggle = withHeaderItem<
    MobileNavToggleProps & WithHeaderItemProps
>(NavToggle)

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false)

    const { setSideNavCollapse } = useThemeStore((state) => state)

    const handleOpenDrawer = () => {
        setIsOpen(true)
    }

    const handleDrawerClose = () => {
        setIsOpen(false)
    }

    const direction = useThemeStore((state) => state.direction)
    const sideNavCollapse = useThemeStore(
        (state) => state.layout.sideNavCollapse,
    )
    const currentRouteKey = useRouteKeyStore((state) => state.currentRouteKey)

    useEffect(() => {
        setSideNavCollapse(false)
    }, [])

    return (
        <>
            <div className="text-2xl" onClick={handleOpenDrawer}>
                <MobileNavToggle toggled={isOpen} />
            </div>
            <Drawer
                title="Navigation"
                isOpen={isOpen}
                bodyClass={classNames('p-0')}
                width={260}
                placement={direction === DIR_RTL ? 'right' : 'left'}
                onClose={handleDrawerClose}
                onRequestClose={handleDrawerClose}
            >
                <Suspense fallback={<></>}>
                    {isOpen && (
                        <VerticalMenuContent
                            collapsed={sideNavCollapse}
                            navigationTree={SideMenuRoutes}
                            routeKey={currentRouteKey}
                            direction={direction}
                            onMenuItemClick={handleDrawerClose}
                            userAuthority={[]}
                        />
                    )}
                </Suspense>
            </Drawer>
        </>
    )
}

export default MobileNav
