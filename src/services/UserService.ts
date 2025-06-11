import {
    AddCustomerSchema,
    CustomerListResponse,
    GetCustomerByIdResponse,
    UpdateCustomerRequest,
} from '@/shared/types/customer'
import ApiService from './ApiService'
import endpointConfig from '@/configs/endpoint.config'
import { AddUserSchema, UpdateUserRequest, UserDetailResponse, UserResponse } from '@/shared/types/user'

export const apiGetUserList = async (): Promise<UserResponse> => {
    return ApiService.fetchDataWithAxios<UserResponse>({
        url: endpointConfig.usersList,
        method: 'get',
    })
}
export const apiGetUserById = async (
    userId: number,
): Promise<UserDetailResponse> => {
    return ApiService.fetchDataWithAxios<UserDetailResponse>({
        url: `${endpointConfig.userData}/${userId}`,
        method: 'get',
    })
}
export const apiCreateUser = async (data: AddUserSchema) => {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.createUser, 
        method: 'post',
        data,
    })
}

export const apiUpdateUser = async (
    userId: number,
    data: UpdateUserRequest,
): Promise<GetCustomerByIdResponse> => {
    return ApiService.fetchDataWithAxios<GetCustomerByIdResponse>({
        url: `${endpointConfig.userUpdate}/${userId}`,
        method: 'put',
        data,
    })
}

export const apiDeactivateUser = async (userId: number) => {
    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.userDelete}/${userId}`,
        method: 'put',
    });
};
