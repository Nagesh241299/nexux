export interface TopCategoriesResponse {
    message: string
    top_categories: Array<{
        top_category: string
        product_count: number
    }>
    pagination: {
        limit: number
        offset: number
        total_filters: number
    }
}

export interface CategoryAnalysisResponse {
    message: string
    category_analysis: CategoryDetails
}

interface CategoryDetails {
    product_category: string
    consumption_pattern: ConsumptionPattern
    differentiation_strategies: string[]
    consumer_personas: ConsumerPersona[]
    sub_category_info: SubCategoryInfo
}

interface ConsumptionPattern {
    Male: string
    Female: string
}

export interface ConsumerPersona {
    Persona: string
    image_url: string
    Description: string
}

export interface SubCategoryInfo {
    sub_category_name: string
    sub_category_image: string
}

export interface SubCategory {
    sub_category_image_url: string
    sub_category_name: string
    top_category_name: string
    sub_category_id: number
}

export interface TopCategoryWithSubCategoryResponse {
    message: string
    sub_categories: SubCategory[]
}

export interface Category {
    top_category: string
    product_count: number
}

