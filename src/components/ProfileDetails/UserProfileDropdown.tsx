import Avatar from '@/components/common/Avatar'
import Dropdown from '@/components/common/Dropdown'
import { Link } from 'react-router-dom'
import { PiUserDuotone, PiSignOutDuotone } from 'react-icons/pi'
import LocalStorageUtil from '@/utils/LocalStorageUtil'
import { LocalStorageConstants } from '@/constants/Application/LocalStorageConstants'
import * as authServices from '@/services/AuthService'
import { RouteConstants } from '@/constants/RouteConstants'
import { Tooltip } from 'antd'
import { General } from '@/utils/General'
import { useMainApp } from '../App/index.hook'

type DropdownList = {
    label: string
    path: string
    icon: JSX.Element
}

const dropdownItemList: DropdownList[] = [
    // {
    //     label: 'Profile',
    //     path: '/profile',
    //     icon: <PiUserDuotone />,
    // },
]

const UserDropdown = () => {
    const User = LocalStorageUtil.localStorageGetItem(
        LocalStorageConstants.USER_DATA,
    )

    const handleSignOut = async () => {
        try {
            await authServices.apiSignOut()
            console.log("sign out")
            localStorage.clear()
            window.location.assign(RouteConstants.SIGN_IN)
        } catch (error) {
            console.log(error)
        }
    }

    const avatarProps = {
        ...{ icon: <PiUserDuotone /> },
    }

    return (
        <Dropdown
            className="flex"
            toggleClassName="flex items-center"
            renderTitle={
                <div className="cursor-pointer font-semibold flex justify-center items-center bg-primary rounded-full  text-white w-10 h-10">
                    {(User?.first_name?.[0]?.toUpperCase() || '') + (User?.last_name?.[0]?.toUpperCase() || '')}

                </div>
            }
            placement="bottom-end"
        >
            <Dropdown.Item variant="header">
                <div className="py-2 px-3 flex items-center gap-3">
                    <Avatar {...avatarProps} />
                    <div>
                        <Tooltip title={User?.full_name}>
                            <div className="font-bold text-gray-900 dark:text-gray-100">
                                {General.truncateText(User?.full_name || '')}
                            </div>
                        </Tooltip>
                        <Tooltip title={User?.first_name + ' ' + User?.last_name}>
                            <div className="text-xs">
                                {General.truncateText(
                                User?.first_name + ' ' + User?.last_name || '',
                                )}
                            </div>
                        </Tooltip>
                    </div>
                </div>
            </Dropdown.Item>
            <Dropdown.Item variant="divider" />
            {dropdownItemList.map((item) => (
                <Dropdown.Item
                    key={item.label}
                    eventKey={item.label}
                    className="px-1"
                >
                    <Link className="flex h-full w-full px-2" to={item.path}>
                        <span className="flex gap-2 items-center w-full">
                            <span className="text-xl">{item.icon}</span>
                            <span>{item.label}</span>
                        </span>
                    </Link>
                </Dropdown.Item>
            ))}
            <Dropdown.Item
                eventKey="Sign Out"
                className="gap-2"
                onClick={handleSignOut}
            >
                <span className="text-xl">
                    <PiSignOutDuotone />
                </span>
                <span>Sign Out</span>
            </Dropdown.Item>
        </Dropdown>
    )
}

export default UserDropdown
