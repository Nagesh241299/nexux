import { ProductCard, ProductDetails } from './product'

export interface PlatformStatsResponse {
    message: string
    statistics: {
        total_products: number
        total_manufacturers?: number
        total_categories: number
        total_ingredients?: number
    }
}

export interface SubCategoriesResponse {
    message: string
    sub_categories: Array<{
        sub_category: string
        product_count: number
    }>
    pagination: {
        limit: number
        offset: number
        total_filters: number
    }
}

export interface IngredientsResponse {
    message: string
    ingredients: {
        ingredient: string
        product_count: number
    }[]
    pagination: {
        limit: number
        offset: number
        total_filters: number
    }
}

export interface BrandsFilterResponse {
    message: string
    brands: {
        brand_name: string
        product_count: number
    }[]
    pagination: {
        limit: number
        offset: number
        total_filters: number
    }
}

export interface ManufacturerFilterResponse {
    message: string
    manufacturers: {
        manufacturer_name: string
        product_count: number
    }[]
    pagination: {
        limit: number
        offset: number
        total_filters: number
    }
}

export interface BrowseBrandCard {
    brand_id: number
    brand_name: string
    brand_fssai: string | null
    brand_logo: string
    brand_description: string | null
    core_product_categories: string[]
    brand_email: string | null
    contact_spoc: string | null
    spoc_contact_number: string | null
    spoc_email: string | null
    brand_positioning: string | null
    manufacturing_type: string[]
    total_products: number
}

export interface GetBrowseBrandsResponse {
    message: string
    brands: BrowseBrandCard[]
    pagination: {
        limit: number
        offset: number
        total_brands: number
    }
}

export interface BrandCard {
    brand_id: number
    brand_name: string
    brand_fssai: string | null
    brand_logo: string
    brand_description: string | null
    core_product_categories: {
        sub_category_name: string
        sub_category_image: string
    }[]
    brand_email: string | null
    contact_spoc: string | null
    spoc_contact_number: string | null
    spoc_email: string | null
    brand_positioning: string | null
    manufacturing_type: string[]
    total_products: number
}

export interface GetBrandsResponse {
    message: string
    brand_details: BrandCard
}

export interface NovaScoresResponse {
    message: string
    nova_scores: {
        nova_group: string | null
        product_count: number
    }[]
}

export interface NutriScoresResponse {
    message: string
    nutri_scores: {
        nutrition_grade: string | null
        product_count: number
    }[]
}
export interface FilterOption {
    label: string | null
    value: string | null
    selected?: boolean
}

export interface Filter {
    key: string
    placeholder?: string | undefined
    options: FilterOption[]
    offset?: number
}

export type FilterParams = {
    top_category?: string
    sub_category?: string
    nutri_score?: string
    nova_score?: string
    ingredient?: string
    manufacturer_name?: string
    brand_name?: string
}

export interface AllProductsProps {
    brands: BrandCard | null
    products: ProductCard[]
    filters?: Filter[]
    onFilterChange?: (key: string, value: string) => void
    productsToShow?: Record<number, number>
}

export interface Product {
    product_id: string
    product_name: string
    brand_name: string
    top_category: string
    sub_categories: string[]
    key_ingredients: string[]
    nutri_score: string | null
    nova_score: string | null
    manufacturer_name: string
    product_image_url: string
    brand_logo?: string
}

export interface HomeAllProductsProps {
    filters?: Filter[]
    onFilterChange?: (key: string, value: string) => void
    loadMoreOptions?: any
    isLoadingMore?: boolean
}

export interface FilterProduct {
    brand_name?: string
    topCategory?: string
    subCategory?: string
    nutri_score?: string
    nova_score?: string
    ingredient?: string
    manufacturer_name?: string
    offset: string
    limit: string
}

export interface GetBrowseProductResponse {
    message: string
    filters: FilterProduct
    products: Product[]
    pagination: {
        limit: number
        offset: number
        total_products: number
    }
}

export interface CardProductProps {
    product: Product
    handleViewProduct?: any
}
