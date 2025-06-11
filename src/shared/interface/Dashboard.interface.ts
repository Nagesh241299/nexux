export interface DashboardDataInterface {
    total_users: number
    total_customers: number
    total_departments: number
}

export interface DashboardDataAPIResponse {
    message: string
    data: DashboardDataInterface
}
