import SideNav from '@/components/common/SideNav'
import Header from '@/components/common/Header'
import MobileNav from '@/components/common/MobileNav'
import UserProfileDropdown from '@/components/ProfileDetails/UserProfileDropdown'
import LayoutBase from '@/components/common/LayoutBase'
import useResponsive from '@/hooks/useResponsive'
import { LAYOUT_COLLAPSIBLE_SIDE } from '@/constants/theme.constant'
import type { CommonProps } from '@/shared/types/common'
import { HiPlus } from 'react-icons/hi'
import Notification from '@/components/common/Notification'
import { useThemeStore } from '@/store/themeStore'
import { useLocation, useNavigate } from 'react-router-dom'
import { allowedRoutes } from '@/routes/SideMenuRoutes'
import { Button, Modal } from 'antd'
import { useState } from 'react'
import { General } from '@/utils/General'
import LocalStorageUtil from '@/utils/LocalStorageUtil'
import { LocalStorageConstants } from '@/constants/Application/LocalStorageConstants'
import { UserInterface } from '@/shared/interface/User.interface'
import { useMainApp } from '@/components/App/index.hook'
import ModeSwitcher from './ModeSwitcher'

const CollapsibleSide = ({ children }: CommonProps) => {
    const userData = LocalStorageUtil.localStorageGetItem(
        LocalStorageConstants.USER_DATA,
    ) as UserInterface | null
    

    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const { larger, smaller } = useResponsive()
    const { layout } = useThemeStore((state) => state)
    const location = useLocation()
    const {branding} = useMainApp()
    const footer = branding?.footer_text 
    const headerText = branding?.header_text

    const handleClose = () => {
        setIsOpen(false)
    }

    const rightSideNavCollapse = smaller.lg
        ? false
        : layout.rightSideNavCollapse
    const sideNavCollapse = layout.sideNavCollapse
    const showRightSideNav = allowedRoutes.includes(location.pathname)

    return (
        <LayoutBase
            type={LAYOUT_COLLAPSIBLE_SIDE}
            className="app-layout-collapsible-side flex flex-auto flex-col mb-0"
        >
            <div className="flex flex-auto min-w-0">
                {larger.lg && <SideNav />}
                <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full">
                    <Header
                        className="shadow dark:shadow-2xl"
                        headerStart={
                            <>
                                {smaller.lg && <MobileNav />}
                                <div className='text-center text-primary font-semibold text-2xl'>
                                {headerText}
                                </div>
                            </>
                        }
                       
                        headerEnd={
                            <>
                                {General.isStaticContentView() && (
                                    <Notification className="" />
                                )}
                                {userData ? (
                                    <>
                                       <ModeSwitcher/>
                                       
                                        <UserProfileDropdown />
                                        
                                    </>
                                ) : (
                                    <div className="flex gap-5">
                                        <Button
                                            onClick={() => navigate('/sign-up')}
                                        >
                                            Sign Up
                                        </Button>
                                        <Button
                                            onClick={() => navigate('/sign-in')}
                                            className="bg-success "
                                        >
                                            Log In
                                        </Button>
                                    </div>
                                )}
                            </>
                        }
                    />
                    <div
                        className={`h-full flex relative ${showRightSideNav && !sideNavCollapse && rightSideNavCollapse ? 'mr-[3.7%]' : ''}`}
                    >
                        {/* Main Content Area */}
                        <div
                            className={`transition-all duration-300 ${showRightSideNav && rightSideNavCollapse ? 'w-[84%] mr-[19%]' : 'w-full'}`}
                            style={{
                                overflowY: 'auto',
                                marginTop: 0,
                            }}
                        >
                            {children}
                        </div>

                        {/* Right Side Navigation - Only show if route matches */}
                        
                    </div>
                            
                        <div className='text-secondary flex justify-end pe-5'>{footer}</div>
                    
                </div>
                <Modal
                    centered
                    open={isOpen}
                    footer={false}
                    className="max-w-[1300px]"
                    width={'80%'}
                    onCancel={handleClose}
                >
                </Modal>
            </div>
        </LayoutBase>
    )
}

export default CollapsibleSide
