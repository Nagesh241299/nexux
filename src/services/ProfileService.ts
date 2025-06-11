import ApiService from './ApiService'
import endpointConfig from '@/configs/endpoint.config'
import type {
    UserProfile,
    UpdateProfile,
    VerifyOtpCredential,
    SendMobileNumberSchema,
    SubmitSurveyRequest,
    SubmitSurveyResponse,
} from '@/shared/types/profile'
import { RSAEncryption } from '@/utils/Cryptography'

// Get User Profile API
export const apiGetUserProfile = async (): Promise<UserProfile> => {
    return ApiService.fetchDataWithAxios<UserProfile>({
        url: endpointConfig.getProfile,
        method: 'get',
    })
}

// Update User Profile API
export const Profile = async (
    data: UpdateProfile,
): Promise<UserProfile> => {
    const encryptedMobileNumber = data.mobile_number
        ? RSAEncryption.encrypt(`+91${data.mobile_number}`)
        : null

    const updatedData = {
        ...data,
        mobile_number: encryptedMobileNumber,
    }

    return ApiService.fetchDataWithAxios<UserProfile>({
        url: endpointConfig.updateProfile,
        method: 'put',
        data: updatedData,
    })
}

// Send OTP API
export const apiSendOtp = async (
    data: SendMobileNumberSchema,
): Promise<{ message: string; otp: string }> => {
    const encryptedMobileNumber = RSAEncryption.encrypt(
        `+91${data.mobile_number}`,
    )

    return ApiService.fetchDataWithAxios<{ message: string; otp: string }>({
        url: endpointConfig.profileSendOtp,
        method: 'post',
        data: {
            mobile_number: encryptedMobileNumber,
        },
    })
}

// Verify OTP API
export const apiVerifyOtp = async (
    data: VerifyOtpCredential,
): Promise<{ status: string; message: string }> => {
    const encryptedOtp = RSAEncryption.encrypt(data.otp)

    return ApiService.fetchDataWithAxios<{ status: string; message: string }>({
        url: endpointConfig.profileVefiyOtp,
        method: 'post',
        data: {
            otp: encryptedOtp,
        },
    })
}

export const apiSubmitSurvey = async (
    data: SubmitSurveyRequest,
): Promise<SubmitSurveyResponse> => {
    return ApiService.fetchDataWithAxios<SubmitSurveyResponse>({
        url: endpointConfig.serveyQuestions,
        method: 'POST',
        data: { ...data },
    })
}
