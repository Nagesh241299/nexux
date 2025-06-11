import ApiService from './ApiService'
import endpointConfig from '@/configs/endpoint.config'
import { RSAEncryption } from '@/utils/Cryptography'

import type {
    SignUpCredential,
    SignUpSendOtpSchema,
    SignInResponse,
    SignUpResponse,
    VerifyOtpSchema,
    SignInVerifyCredential,
    BrandResponse,
    SignInVerifyLinkResponse,
    ProductCategoryAPIResponse,
    ContactUsResponse,
    ContactUsRequest,
    SignInCredential,
    ResetPasswordRequest,
    ResetPasswordResponse
} from '@/shared/types/auth'
import {
    UpdateUserDetailsApiResponse,
    UpdateUserDetailsFormData,
    UpdateUserRoleData,
    UpdateUserRoleResponse,
    UserListApiResponse,
    UserResponseInterface,
    UserRoleListAPIResponse,
} from '@/shared/interface/User.interface'
import { MarketIntelligenceReport } from '@/shared/types/report'

// export async function apiSignIn(data: { email_address: string }) {
//     return ApiService.fetchDataWithAxios<SignInResponse>({
//         url: endpointConfig.signIn,
//         method: 'post',
//         data: {
//             ...data,
//             email_address: RSAEncryption.encrypt(data.email_address),
//         },
//     })
// }

export async function apiVerifySignIn(data: SignInVerifyCredential) {
    return ApiService.fetchDataWithAxios<SignInVerifyLinkResponse>({
        url: endpointConfig.verifySignIn,
        method: 'post',
        data,
    })
}

export async function apiVerifySignUp(data: SignInVerifyCredential) {
    return ApiService.fetchDataWithAxios<SignInVerifyLinkResponse>({
        url: endpointConfig.verifySignUp,
        method: 'post',
        data,
    })
}

export const apiSendLink = async (data: SignUpSendOtpSchema) => {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.sendOtp,
        method: 'post',
        data: {
            ...data,
            email_address: RSAEncryption.encrypt(data.email_address),
        },
    })
}

export const apiVerifyOtp = async (data: VerifyOtpSchema) => {
    const encryptedOtp = RSAEncryption.encrypt(data.otp)

    return ApiService.fetchDataWithAxios({
        url: endpointConfig.verifyOtp,
        method: 'post',
        data: {
            otp: encryptedOtp,
        },
    })
}

export async function apiSignOut() {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.signOut,
        method: 'post',
    })
}

export async function refreshTokenAPI<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: endpointConfig.refreshToken,
        method: 'post',
    })
}

export async function apiSignUp(data: SignUpCredential) {
    return ApiService.fetchDataWithAxios<SignUpResponse>({
        url: endpointConfig.signUp,
        method: 'post',
        data: {
            ...data,
            email_address: RSAEncryption.encrypt(data.email_address),
        },
    })
}

export const apiFetchBrandList = async (
    searchTerm: string,
): Promise<BrandResponse> => {
    return ApiService.fetchDataWithAxios<BrandResponse>({
        url: endpointConfig.BrandList,
        method: 'get',
        params: {
            search_query: searchTerm,
        },
    })
}

export const apiGetUserList = async (
    limit: number,
    offset: number,
    searchQuery: string,
): Promise<UserListApiResponse> => {
    return ApiService.fetchDataWithAxios<UserListApiResponse>({
        url: `${endpointConfig.getUserList}${searchQuery ? `?search_query=${searchQuery}` : ''}`,
        method: 'get',
        params: {
            limit,
            offset,
        },
    })
}

export const apiGetUserById = async (
    userId: number,
): Promise<UserResponseInterface> => {
    return ApiService.fetchDataWithAxios<UserResponseInterface>({
        url: `${endpointConfig.getUser}/${userId}`,
        method: 'get',
    })
}

export async function apiUpdateUserById(
    data: UpdateUserDetailsFormData,
    userId: number,
) {
    return ApiService.fetchDataWithAxios<UpdateUserDetailsApiResponse>({
        url: `${endpointConfig.getUser}/${userId}`,
        method: 'post',
        data,
    })
}

export const apiGetRoleList = async (): Promise<UserRoleListAPIResponse> => {
    return ApiService.fetchDataWithAxios<UserRoleListAPIResponse>({
        url: endpointConfig.getUserRoleList,
        method: 'get',
    })
}

export async function apiUpdateUserRole(data: UpdateUserRoleData) {
    return ApiService.fetchDataWithAxios<UpdateUserRoleResponse>({
        url: endpointConfig.updateUserRole,
        method: 'post',
        data: data,
    })
}

export async function generatePDFAndSendEmail(data: any) {
    return ApiService.fetchDataWithAxios<UpdateUserRoleResponse>({
        url: endpointConfig.sendReportPdfToUser,
        method: 'post',
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

export const apiGetProductCategories =
    async (): Promise<ProductCategoryAPIResponse> => {
        return ApiService.fetchDataWithAxios<ProductCategoryAPIResponse>({
            url: endpointConfig.productCategories,
            method: 'get',
        })
    }

export const apiContactUsRequest = async (
    data: ContactUsRequest,
): Promise<ContactUsResponse> => {
    return ApiService.fetchDataWithAxios<ContactUsResponse>({
        url: endpointConfig.contactUs,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            ...data,
        },
    })
}

export const apiSignIn = async (
    data: SignInCredential,
): Promise<SignInResponse> => {
    const result = await ApiService.fetchDataWithAxios<SignInResponse>({
        url: endpointConfig.signIn,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: { 
            ...data,
         },
    });

    return result;
};

export const apiResetPassword = async (
    data: ResetPasswordRequest,
): Promise<ResetPasswordResponse> => {
    return ApiService.fetchDataWithAxios<ResetPasswordResponse>({
        url: endpointConfig.resetPassword,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        data: { ...data },
    })
}
