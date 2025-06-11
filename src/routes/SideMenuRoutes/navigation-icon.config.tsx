import { PiMagnifyingGlassDuotone } from 'react-icons/pi'
import { TbHomeSearch } from 'react-icons/tb'
import { AiOutlineAppstore } from 'react-icons/ai'
import { BsBox2 } from 'react-icons/bs'
import { IoBookmarkOutline } from 'react-icons/io5'
import { IoFlaskOutline } from 'react-icons/io5'
import { FaBuildingUser, FaRegHourglassHalf, FaUser } from 'react-icons/fa6'
import { FaArrowUpWideShort } from 'react-icons/fa6'
import { MdManageAccounts, MdOutlineManageAccounts } from 'react-icons/md'
import { MdDashboard } from 'react-icons/md'
import { TbBrandDatabricks } from 'react-icons/tb'
import { VscServerProcess } from 'react-icons/vsc'
import { HiSearch } from 'react-icons/hi'
import { IoMdOpen } from "react-icons/io";
import { GrUserManager } from "react-icons/gr";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { FiSettings } from 'react-icons/fi'


export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <TbHomeSearch />,
    chatbot:<HiMiniChatBubbleLeftRight />,
    dashboard: <MdDashboard />,
    myProducts: <AiOutlineAppstore />,
    myProductsHub: <FaArrowUpWideShort />,
    formulationHub: <IoFlaskOutline />,
    bookmark: <IoBookmarkOutline />,
    pending: <FaRegHourglassHalf />,
    b2bStore: <BsBox2 />,
    allProductSearch: <PiMagnifyingGlassDuotone />,
    myProductList: <AiOutlineAppstore />,
    userManagement: <FaUser />,
    brandManagement: <TbBrandDatabricks />,
    projectManagement: <VscServerProcess />,
    exploreProduct: <HiSearch/>,
    exploreBrand: <IoMdOpen/>,
    customerMaster:<MdManageAccounts/>,
    departmentManagement: <FaBuildingUser />,
    settings:<FiSettings/>
}

export default navigationIcon
