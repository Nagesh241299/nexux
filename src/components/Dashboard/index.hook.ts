import { CustomNotification } from '@/utils/CustomNotification'
import { useEffect, useState } from 'react'
import * as dashboardServices from '@/services/dashboardService'
import useValue from '@/hooks/useValue'

export const useDashboard = () => {
    /* STATE */
    const [dashboardData, setDashboardData] = useState<any>()

    /* HOOK */
    const {
        value: loading,
        handleEnableValue: handleEnableLoading,
        handleDisableValue: handleDisableLoading,
    } = useValue(true)

    /* EFFECT */
    useEffect(() => {
        const fetchData = async () => {
            try {
                handleEnableLoading()
                const response = await dashboardServices.getDashboardDataAPI()
                setDashboardData(response?.data)
            } catch (error) {
                CustomNotification.showErrorMessage(error)
            } finally {
                handleDisableLoading()
            }
        }

        fetchData()
    }, [])

    return {
        loading,
        dashboardData,
    }
}
