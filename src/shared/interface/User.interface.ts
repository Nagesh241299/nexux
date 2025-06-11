export interface ModuleOperation {
    module: string
    operations: string[]
}

export interface UserInterface {
    first_name: string
    last_name:string
    email_address: string
    role_name: string 
    modules: ModuleOperation[]
    customer_id: number
}

export interface AuthUserAPIResponse {
    message: string
    token: string
    refreshToken: string
    user: UserInterface
}

export interface UserRole {
    id: number
    role_name: string
}

export interface BrandInterface {
    id: number
    brand_name: string
    is_verified: boolean
}

export interface UserListInterface {
    sr_no: number
    user_progress_step: number
    is_email_verified: boolean
    role: string
    how_did_you_hear_about_us: string
    id: number
    subscribe_to_product_update_email: boolean
    mobile_number: string | null
    user_survey: any | null
    full_name: string
    email_address: string
    masked_email_address: string
    is_active: boolean
    brand_id: number
    is_mobile_verified: boolean
    roles: UserRole[]
    brand: BrandInterface
    is_brand_verified: boolean
}

export interface PaginationResponse {
    limit: number
    offset: number
    total_filters: number
}

export interface UserListApiResponse {
    message: string
    users: UserListInterface[]
    pagination: PaginationResponse
}

export type UpdateUserRoleResponse = {
    message: string
}

export type UpdateUserRoleData = {
    user_id: number
    role_id: number
}

export interface RoleListResponse {
    id: number
    is_active: boolean
    created_on: string
    updated_on: string | null
    role_name: string
    description: string
    created_by: number
    updated_by: number | null
}

export interface UserRoleListAPIResponse {
    message: string
    roles: RoleListResponse[]
}

export interface UserRoleListAPIResponse {
    message: string
    roles: RoleListResponse[]
}

export interface UserDetailInterface {
    how_did_you_hear_about_us: string | null
    updated_on: string | null
    full_name: string
    subscribe_to_product_update_email: boolean
    is_email_verified: boolean
    is_brand_verified: boolean
    role: string
    user_survey: string | null
    created_by: number | null
    mobile_number: string
    email_address: string
    otp: string | null
    updated_by: number | null
    id: number
    masked_email_address: string
    otp_expiry: string | null
    brand_id: number
    is_active: boolean
    user_progress_step: number
    is_mobile_verified: boolean
    created_on: string
    roles: UserRole[]
    role_id: number
    role_name: string
    brand: BrandInterface
}

export interface UserResponseInterface {
    message: string
    user: UserDetailInterface
}

export interface UpdateUserDetailsFormData {
    [key: string]: unknown
    full_name: string
    is_brand_verified: boolean
}

export interface UpdateUserDetailsApiResponse {
    message: string
}
