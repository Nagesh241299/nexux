interface SurveyQuestion {
    question: string
    answer: string[]
}

export type UserProfile = {
    message: string
    user: {
        brand_id: number
        is_mobile_verified: boolean
        user_progress_step: number
        is_email_verified: boolean
        role: string
        how_did_you_hear_about_us: string
        id: number
        subscribe_to_product_update_email: boolean
        mobile_number: string
        user_survey: SurveyQuestion[]
        full_name: string
        email_address: string
        masked_email_address: string
    }
}

export type UpdateProfile = {
    full_name: string
    mobile_number: string
}

export type UpdateProfileResponse = {
    status: string
    message: string
    data: UserProfile
}

export type VerifyOtpSchema = {
    otp: string
    mobile_number?: string
}

export type VerifyOtpResponse = {
    status: string
    message: string
    isVerified: boolean
}

export type VerifyOtpCredential = {
    otp: string
}
export type SendMobileNumberSchema = {
    mobile_number: string
}

export interface SearchProductRequest {
    search_query: string 
}

// types/search.ts

export interface SubmitSurveyRequest {
    user_progress_step: number
    user_survey: {
        question: string
        answer: string[]
    }[]
}

export interface SubmitSurveyResponse {
    success: boolean
    message: string
    data: any
}

export interface UserProfileResponse {
    full_name: string
    email: string
    mobileNumber: string
    otp: string
    originalMobileNumber: string
    staticContent: boolean
}