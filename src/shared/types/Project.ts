export interface CreateProjectRequest {
    project_title: string
    project_description: string
    product_category: string
    brand_id: number
    user_id: number
    packaging_format: string
    allergen_requirements: string[]
    certification_requirements: string[]
    additional_info: string
    hide_from_current_manufacturer: boolean
    current_manufacturer_list: string[]
    anonymous_project: boolean
    introduction_approval: boolean
    expected_annual_volume_range: number
    expected_launch_date: string
    have_project_formulation: boolean
    type_of_support: string[]
    differentiation_strategies: string[]
    units: string
}

export interface CreateProjectResponse {
    success: boolean
    message: string
    project_id?: number
}

export interface Project {
    project_id: string
    project_title: string
    product_category: string
    brand_id: number
    user_id: number
    packaging_format: string
    expected_annual_volume_range: number
    expected_launch_date: string | null
    type_of_support: any[]
    overall_status: string | null
    current_status: {
        status: string
        status_description: string
        status_date: string | null
    }
}

export interface GetProjectListResponse {
    message: string
    projects: Project[]
}

export interface GetProjectDetailsResponse {
    message: string
    project: {
        project_id: string
        project_title: string
        project_description: string
        product_category: string
        brand_id: number
        user_id: number
        packaging_format: string
        expected_annual_volume_range: number
        expected_launch_date?: string | null
        type_of_support?: string[]
        certification_requirements: string[]
        differentiation_strategies: string[]
        current_status: {
            status: string
            status_description: string
            status_date: string | null
        }
    }
}

export interface UpdateProjectRequest {
    project_title: string
    project_description: string
    packaging_format: string
    expected_annual_volume_range: number
    expected_launch_date?: string | null
    type_of_support?: string[] | undefined
    certification_requirements: string[] | undefined | null
    differentiation_strategies: string[]
    [key: string]: unknown
}

export interface ProjectStatus {
    status: string
    status_description: string
    status_date: string | null
}

export interface GetProjectStatusResponse {
    message: string
    project_id: string
    status_updates: {
        completed: ProjectStatus[]
        ongoing: ProjectStatus[]
        upcoming: ProjectStatus[]
    }
}

export type FormData = {
    product: string
    estimatedAnnualVolume: string
    description: string
    packaging: string
    certificationRequirements: string
    differentiationStrategies: string
}

export interface Step {
    type: string
    placeholder: string
    options?: string[] | undefined
    question: string
    field: string
    rules?: any[] | undefined
    desc?: string | null
    description?: string | null
}

export interface MultiStepFormProps {
    isVisibleCreateProject?: boolean
    handleProjectModalClose: () => void
}
