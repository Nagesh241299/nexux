import classNames from '@/utils/classNames'
import ScrollBar from '@/components/common/ScrollBar'
import Logo from '@/components/common/Logo'
import VerticalMenuContent from '@/components/common/VerticalMenuContent'
import { useThemeStore } from '@/store/themeStore'
import { useRouteKeyStore } from '@/store/routeKeyStore'
import SideMenuRoutes from '@/routes/SideMenuRoutes'
import appConfig from '@/configs/app.config'
import { Link } from 'react-router-dom'
import {
    SIDE_NAV_WIDTH,
    SIDE_NAV_COLLAPSED_WIDTH,
    SIDE_NAV_CONTENT_GUTTER,
    HEADER_HEIGHT,
    LOGO_X_GUTTER,
} from '@/constants/theme.constant'
import type { Mode } from '@/shared/types/theme'
import { Button } from 'antd'
import { HiPlus } from 'react-icons/hi'
import { Menu } from 'lucide-react'
import { useMainApp } from '../App/index.hook'

type SideNavProps = {
    translationSetup?: boolean
    background?: boolean
    className?: string
    contentClass?: string
    mode?: Mode
}

const sideNavStyle = {
    width: SIDE_NAV_WIDTH,
    minWidth: SIDE_NAV_WIDTH,
}

const sideNavCollapseStyle = {
    width: SIDE_NAV_COLLAPSED_WIDTH,
    minWidth: SIDE_NAV_COLLAPSED_WIDTH,
}

const SideNav = ({
    translationSetup = true,
    background = true,
    className,
    contentClass,
    mode,
}: SideNavProps) => {
    const defaultMode = useThemeStore((state) => state.mode)
    const direction = useThemeStore((state) => state.direction)
    const { layout, setSideNavCollapse } = useThemeStore((state) => state)

    const sideNavCollapse = layout.sideNavCollapse

    const currentRouteKey = useRouteKeyStore((state) => state.currentRouteKey)

    const onCollapse = () => {
        setSideNavCollapse(!sideNavCollapse)
    }

     const { branding } = useMainApp()

  const logo = branding?.logo_url || 'Customer List'
//   const footerText = branding?.footer_text || ''

    return (
        <div
            style={sideNavCollapse ? sideNavCollapseStyle : sideNavStyle}
            className={classNames(
                'side-nav overflow-hidden',
                background && 'side-nav-bg',
                !sideNavCollapse && 'side-nav-expand',
                className,
            )}
        >
            <div
                className="side-nav-header flex flex-col justify-center cursor-pointer"
                style={{ height: HEADER_HEIGHT }}
            >
                {/* <Link
                to={appConfig.authenticatedEntryPath}
                className="side-nav-header flex flex-col justify-center"
                
            > */}
                {/* <Logo
                    imgClass="max-h-10"
                    mode={mode || defaultMode}
                    type={sideNavCollapse ? 'streamline' : 'full'}
                    className={classNames(
                        sideNavCollapse && 'ltr:ml-[11.5px] ltr:mr-[11.5px]',
                        sideNavCollapse
                            ? SIDE_NAV_CONTENT_GUTTER
                            : LOGO_X_GUTTER,
                    )}
                /> */}

                <div
                    className={classNames(
                        'logo',
                        classNames(
                            sideNavCollapse &&
                                'ltr:ml-[11.5px] ltr:mr-[11.5px]',
                            sideNavCollapse
                                ? SIDE_NAV_CONTENT_GUTTER
                                : LOGO_X_GUTTER,
                        ),
                        'flex  items-center',
                    )}
                    style={{ width: 'logoWidth' }}
                >
                    <div  
                        onClick={onCollapse}
                        ><Menu/></div>
                   
                    <img  className={`max-h-10 pl-6 ${classNames(
                            sideNavCollapse &&
                                'ltr:ml-[12px] ltr:mr-[12px]',
                            sideNavCollapse
                                ? SIDE_NAV_CONTENT_GUTTER
                                : LOGO_X_GUTTER,
                        )}`}
                    src={logo}/>
                </div>
            </div>

            {/* </Link> */}
            <div className={classNames('side-nav-content', contentClass)}>
                <ScrollBar style={{ height: '100%' }} direction={direction}>
                    <VerticalMenuContent
                        collapsed={sideNavCollapse}
                        navigationTree={SideMenuRoutes}
                        routeKey={currentRouteKey}
                        direction={direction}
                        translationSetup={translationSetup}
                        userAuthority={[]}
                    />
                </ScrollBar>
            </div>
        </div>
    )
}

export default SideNav
