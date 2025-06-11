import endpointConfig from '@/configs/endpoint.config'
import ApiService from './ApiService'

export interface ChatMessageRequest {
    message: string
    department_id: string
}

export const sendChatMessage = async (data: ChatMessageRequest) => {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.chat,
        method: 'post',
        data,
    })
}
