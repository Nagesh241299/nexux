import Header from '@/components/common/Header'
import UserProfileDropdown from '@/components/ProfileDetails/UserProfileDropdown'
import HeaderLogo from '@/components/common/HeaderLogo'
import MobileNav from '@/components/common/MobileNav'
import HorizontalNav from '@/components/common/HorizontalNav'
import LayoutBase from '@/components/common/LayoutBase'
import useResponsive from '@/hooks/useResponsive'
import { LAYOUT_TOP_BAR_CLASSIC } from '@/constants/theme.constant'
import type { CommonProps } from '@/shared/types/common'
import LocalStorageUtil from '@/utils/LocalStorageUtil'
import { LocalStorageConstants } from '@/constants/Application/LocalStorageConstants'
import { UserInterface } from '@/shared/interface/User.interface'
import { useMainApp } from '@/components/App/index.hook'
import ModeSwitcher from './ModeSwitcher'

const TopBarClassic = ({ children }: CommonProps) => {
    const { larger, smaller } = useResponsive()
     const userData = LocalStorageUtil.localStorageGetItem(
        LocalStorageConstants.USER_DATA,
    ) as UserInterface | null

    const { branding } = useMainApp()

  const logo = branding?.logo_url || 'Customer List'
  const header = branding?.header_text

    return (
        <LayoutBase
            type={LAYOUT_TOP_BAR_CLASSIC}
            className="app-layout-top-bar-classic flex flex-auto flex-col min-h-screen"
        >
            <div className="flex flex-auto min-w-0">
                <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full">
                    <Header
                        container
                        className="shadow dark:shadow-2xl"
                        headerStart={
                            <>
                            {userData?.role_name != "User" &&
                            <>
                                {smaller.lg && <MobileNav />}
                                </> 
                        }
                                {/* <HeaderLogo /> */}
                                 <img  className="max-h-10 "
                                                    src={logo}/>
                            </>
                        }
                        headerMiddle={<>{larger.lg && <HorizontalNav />}
                       
                        </>}
                        headerEnd={
                            <>
                            <ModeSwitcher/>
                                <UserProfileDropdown />
                            </>
                        }
                    />
                    {children}
                </div>
            </div>
        </LayoutBase>
    )
}

export default TopBarClassic
