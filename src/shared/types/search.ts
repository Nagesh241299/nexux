export interface Product {
    id: string
    product_name: string
    product_info: string
    images: string[]
    price?: number
}

export interface SearchProductResponse {
    success: boolean
    data: Product[]
}

export interface SuggestionResponse {
    success: boolean
    data: Product[]
}

export interface SearchProductRequest {
    search_query: string
}

export interface GlobalSearchResponse {
    message: string
    results: {
        left_side: {
            top_categories: {
                top_category_id: number
                top_category_name: string
            }[]
            sub_categories: {
                sub_category_id: number
                sub_category_name:string
            }[]
            ingredients: {
                ingredient_id:number
                ingredient_name:string
            }[]
        }
        right_side: {
            manufacturers: {
                manufacturer_id: number
                manufacturer_name: string
            }[]
            brands: {
                brand_id: number
                brand_name: string
            }[]
            products: {
                bettrlabs_product_code: string
                product_name: string
            }[]
        }
    }
}

export interface UseSearchProps {
    initialQuery?: string
    onSearchResult?: (result: GlobalSearchResponse | null) => void
}

export interface searchProps {
    initialSearchTerm?: string
    onSearchResult: (result: GlobalSearchResponse | null) => void
}
