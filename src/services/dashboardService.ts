import { DashboardDataAPIResponse } from '@/shared/interface/Dashboard.interface'
import ApiService from './ApiService'
import endpointConfig from '@/configs/endpoint.config'

export const getDashboardDataAPI =
    async (): Promise<DashboardDataAPIResponse> => {
        return ApiService.fetchDataWithAxios<DashboardDataAPIResponse>({
            url: `${endpointConfig.dashboard}`,
            method: 'get',
        })
    }
