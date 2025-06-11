import { Progress } from 'antd'
import { HiHeart, HiStar } from 'react-icons/hi'
import { FiShoppingCart } from 'react-icons/fi'
import { BsTools } from 'react-icons/bs'
import { ProductDetails } from '@/shared/types/product'
import { useLocation } from 'react-router-dom'
import { RouteConstants } from '@/constants/RouteConstants'
import LocalStorageUtil from '@/utils/LocalStorageUtil'
import { LocalStorageConstants } from '@/constants/Application/LocalStorageConstants'

interface ScoreCardProps {
    label: string
    value: number | null | string
    color: string
    icon: React.ReactNode
    stroke: string
}

const ScoreCard = ({ product }: { product: ProductDetails }) => {
    const location = useLocation()
    const user = LocalStorageUtil.localStorageGetItem(
        LocalStorageConstants.USER_DATA,
    )
    const isBlurred =
        location.pathname === RouteConstants.LANDING_PAGE_PRODUCT_DETAILS &&
        !user

    const data = [
        {
            label: 'Liking Score',
            value: product?.liking_score ?? '-',
            color: 'blue-600',
            stroke: 'blue',
            icon: <HiHeart className="text-blue-600" />,
        },
        {
            label: 'Purchase Intent',
            value: product?.purchase_intent ?? '-',
            color: 'yellow-600',
            stroke: 'Gold',
            icon: <FiShoppingCart className="text-yellow-600" />,
        },
        {
            label: 'My Preferences',
            value: product?.my_preferences_score ?? '-',
            color: 'purple-600',
            stroke: 'blueviolet',
            icon: <BsTools className="text-purple-600" />,
        },
        {
            label: 'Novelty',
            value: product?.novelty_score,
            color: 'blue-600',
            stroke: 'blue',
            icon: <HiStar className="text-blue-600" />,
        },
    ]

    return (
        <div className="flex space-x-4 py-4">
            {data.map(
                ({ label, value, color, icon, stroke }: ScoreCardProps) => (
                    <div
                        className={`flex flex-col items-center p-4 bg-${color} bg-opacity-15  shadow-lg `}
                    >
                        <div className="flex items-center space-x-2">
                            <div>
                                <p className="text-gray-600 font-semibold">
                                    {label}
                                </p>

                                <p
                                    className={`mt-2 text-lg font-semibold text-${color} ${isBlurred ? 'opacity-40 blur-[2px]' : ''}`}
                                >
                                    {typeof value === 'number' && !isNaN(value)
                                        ? `${value} %`
                                        : '-'}
                                </p>
                            </div>
                            <div
                                className={`relative ${isBlurred ? 'opacity-40 blur-[2px]' : ''} `}
                            >
                                <Progress
                                    type="circle"
                                    percent={value as any}
                                    size={60}
                                    strokeColor={stroke}
                                    format={() => ''}
                                />
                                <div className="absolute inset-0 flex items-center justify-center text-2xl">
                                    <span className="text-2xl">{icon}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ),
            )}
        </div>
    )
}

export default ScoreCard
