export type SignInCredential = {
    email_address: string
    password: string
}

export type SignInVerifyCredential = {
    verification_link: string
}

export type SignInFormSchema = {
    email_address: string
}

export type SignInResponse = {
    message: string
    user:{
        first_name: string,
        last_name: string,
        email_address: string,
        role_name: string
        customer_id: number
    },
    is_first_time_login: string
}

export type SignInVerifyLinkResponse = {
    message: string
    user: {
        full_name: string
        email_address: string
        user_progress_step: number
        brand_id: number
    }
}

export type SignUpFormSchema = {
    email_address: string
    name: string
    role: string
    brand_name: string
    how_did_you_hear_about_us: string
    subscribe_to_product_update_email: boolean
    // otp : string
}

export type SignUpSendOtpSchema = {
    email_address: string
}
export type VerifyOtpSchema = {
    //  email_address: string
    otp: string
}

// export type VerifyOtpResponse = VerifyOtpSchema

export type VerifyOtpCredential = {
    //  email_address: string
    otp: string
}

export type SignUpResponse = SignInResponse

export interface SignUpCredential {
    email_address: string
    full_name: string
    role: string
    brand_name: string
    how_did_you_hear_about_us: string
    subscribe_to_product_update_email: boolean
}

export type ForgotPassword = {
    email_address: string
}

export type ForgotPasswordSchema = {
    otp: string
    password: string
}

export type ResetPasswordRequest = {
    email_address:string
    new_password:string
    current_password: string
}

export type ResetPasswordResponse ={
     message:string
}

export type AuthRequestStatus = 'success' | 'failed' | ''

export type AuthResult = Promise<{
    status: AuthRequestStatus
    token?: string
    message: string
}>

export type Results = Promise<{
    message: string
}>

export type User = {
    userId?: string | null
    avatar?: string | null
    username?: string | null
    email_address?: string | null
    authority?: string[]
    user_progress_step?: Number
    brand_id?: number | null
}

export type Token = {
    accessToken: string
    refereshToken?: string
}

export type OauthSignInCallbackPayload = {
    onSignIn: (user?: User) => void
    redirect: () => void
}

export interface sendOtpResponseAPIInterface {
    message: string
}

// BrandAPI.ts

export interface BrandResponse {
    brands: {
        brand_name: string
    }[]
}

export interface BrandResponse {
    success: boolean
    data: []
}

export interface UserDataInterface {
    message: string
    user: {
        first_name: string
        last_name:string
        email_address: string
        role_name:string
        customer_id:number
    }
    is_first_time_login:String
}
export interface ProductCategory {
    id: number
    generic_product_category: string
}

export interface ProductCategoryAPIResponse {
    message: string
    categories: ProductCategory[]
}

export interface ContactUsRequest {
    full_name: string
    email: string
    mobile_number?: string
    message: string
    preferred_contact_method: string
}

export interface ContactUsResponse {
    success: boolean
    message: string
    contact?: string
}
