import { Card } from 'antd'
import { useDashboard } from './index.hook'
import classNames from '@/utils/classNames'
import { FaUserFriends } from 'react-icons/fa'
import AbbreviateNumber from '../common/AbbreviateNumber'
import Loading from '../common/Loading'
import { RiCustomerService2Fill } from "react-icons/ri";
import { FaBookOpen } from 'react-icons/fa6'

interface Statistic {
    title: string
    value?: number
    icon: JSX.Element
    iconClass: string
    route?: string
}

import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const config = useDashboard()
  const navigate = useNavigate()

  const statistics: Statistic[] = [
    
    {
      title: 'Total Customers',
      value: config.dashboardData?.total_customers,
      icon: <RiCustomerService2Fill />,
      iconClass: 'bg-purple-200',
      route: '/customer-management',
    },
    {
      title: 'Total Knowledge Bases',
      value: config.dashboardData?.total_departments,
      icon: <FaBookOpen />,
      iconClass: 'bg-emerald-200',
      route: '/department-management',
    },
    {
      title: 'Total Users',
      value: config.dashboardData?.total_users,
      icon: <FaUserFriends />,
      iconClass: 'bg-sky-200',
      route: '/user-management',
    },
  ]

  return (
    <div className=" bg-gray-50 dark:bg-black min-h-full px-10 py-8">
      <Card className=' dark:bg-gray-800 dark:border-gray-800'>
        <h3 className="mb-4 text-primary">Dashboard</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-2xl p-3 dark:bg-gray-700 ">
          {statistics.map(({ title, value, icon, iconClass, route }, index) => (
            <div
              key={index}
              onClick={() => navigate(route)}
              className={classNames(
                'p-4 rounded-2xl cursor-pointer transition duration-150 outline-none',
                'bg-gray-100 dark:bg-black shadow-sm hover:bg-white hover:border',
              )}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate(route)
                }
              }}
            >
              <div className="flex justify-between  items-center">
                <div>
                  <div className="mb-2 text-gray-900 dark:text-gray-200 font-semibold">{title}</div>
                  {config?.loading ? (
                    <Loading loading={true} />
                  ) : (
                    <h2 className="text-gray-900">
                      <AbbreviateNumber value={Number(value)} />
                    </h2>
                  )}
                </div>
                <div
                  className={classNames(
                    'flex items-center justify-center w-12 h-12 text-black rounded-full text-2xl',
                    iconClass,
                  )}
                >
                  {icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default Dashboard    


