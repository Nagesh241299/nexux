import { Filter } from './home'

export interface OCRResult {
    results: {
        filename: string
        text: string
    }[]
}

export interface ProductData {
    key: number
    productName: string
    rawProductData: string
    rawProductsdetails: any
    imageUrls: string[]
    processedData?: any
    ocrData?: string
    product_quantity: number
    measurement_unit: string
}

export interface ProcessProductRequest {
    product_name: string
    product_info: string
    images: File[]
}

export interface ProcessProductResponse {
    data: any
}

export interface Product {
    id: string
    name: string
    description?: string
    images: string[]
}

export interface ProductSearchProps {
    initialSearchQuery?: string
    initialFilters?: Filter[]
    onFilterChange?: (key: string, value: string) => void
    HandleViewMore: void
}

export interface AddProductRequest {
    product_name: string
    product_info: string
    images: File[]
}

export interface AddProductResponse {
    status: string
    message: string
    data: Product
}

export interface ProductCard {
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

export interface IngredientDetails {
    ingredient_name: string
    image_url: string | null
}

export interface Brand {
    brand_logo: string
    brand_name: string
    id: number
}

export interface NutritionAnalysis {
    serving_size: string | null
    saturated_fats: string | null
    nutrients_text: string
    cholesterol: string | null
    structured_nutrition_facts: any | null
    energy_kcal: string | null
    sodium: string | null
    nutri_score_negative_points: string | null
    proteins: string | null
    product_id: string
    salt: string | null
    nutri_score_positive_points: string | null
    carbohydrates: string | null
    fiber: string | null
    nutri_score_value: string | null
    sugars: string | null
    iron: string | null
    total_fats: string | null
    vitamins: string[]
    trans_fats: string | null
    minerals: string[]
}

export interface ProductImage {
    id: number
    image_type_id: number
    image_url: string
}

export interface Ingredient {
    name: string
    reason?: string
    nova_group?: string
}

export interface Additive {
    name: string
    reason?: string
    ins_code?: string
    ins_name?: string
    nova_group?: string
}

export interface AllergenInfo {
    contains: string[]
    mayContain: string[]
}

export interface IngredientAnalysis {
    product_id: string
    contains_palm_oil: boolean
    ingredients: Ingredient[]
    additives: Additive[]
    ingredients_text: string
    allergen_info: AllergenInfo
}

export interface ProductDetails {
    price: string
    ingredient_name: string
    image_url: string | null
    quantity: string
    hsn_code: string | null
    packaging: string
    emb_code: string | null
    top_category: string
    typical_shelf_life: string | null
    ean_code: string
    sub_category: string[]
    nutrition_grade: string
    labels: string[]
    nova_group: string | null
    bettrlabs_product_code: string
    product_name: string
    countries_sold: string[]
    bettrlabs_score: string | null
    product_description: string
    brand_id: number
    is_active: boolean
    data_source_id: number
    key_ingredients: IngredientDetails[]
    brand: Brand
    product_ingredient_analysis: IngredientAnalysis
    product_nutrition_analysis: NutritionAnalysis
    product_images: ProductImage[]
    novelty_score: number | null
    my_preferences_score: number | null
    liking_score: number | null
    purchase_intent: number | null
}
;[]

export interface GetProductsResponse {
    message: string
    length: number
    products: ProductCard[]
}

export interface GetProductDetailsResponse {
    message: string
    length: number
    product_details: ProductDetails | null
}

export interface FilterOption {
    value: string
    label: string
    selected: boolean
}

export interface FilterState {
    key: string
    placeholder: string
    options: FilterOption[]
    offset: number
}

export interface CompareProductProps {
    selectedProducts: ProductDetails[]
    removeProduct: (productCode: string) => void
    mainProduct: ProductDetails
}

export interface selectedProductProps {
    product: ProductDetails
    selectedProducts: ProductDetails[]
}

//

export interface SubCategoryInterface {
    id: number
    sub_category_name: string
    sub_category_image_url: string | null
}

export interface SearchResultInterface {
    raw_products: SubCategoryInterface[]
    processed_products: SubCategoryInterface[]
}

export interface HomepageSubCategorySearchResponse {
    message: string
    results: SearchResultInterface
}

export interface MarketIntelligenceReport {
    message: string
    sub_category_id: number
    report_data: Record<string, any>
}
