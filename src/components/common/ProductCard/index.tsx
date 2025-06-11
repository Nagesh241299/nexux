import { Button, Checkbox } from 'antd'
import { FaAngleDown } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { CardProductProps } from '@/shared/types/home'
import placeHolderImage from '@/assets/pictures/placeholderImage.webp'

const ProductCard = ({ product }: CardProductProps) => {
    const navigate = useNavigate()

    const handleViewBrandClick = (product_id: string) => {
        navigate(`/product-details?product_id=${product_id}`)
    }

    return (
        <div className="rounded-none relative overflow-hidden m-0 border hover:shadow-lg">
            <div className="relative">
                <img
                    src={product?.product_image_url ?? placeHolderImage}
                    className="w-full h-48 object-contain "
                />
                <div className="absolute left-4  -bottom-7 bg-white w-14 h-14 p-1 shadow-lg rounded">
                    <img
                        src={product?.brand_logo ?? placeHolderImage}
                        alt={product?.brand_name}
                        className="w-full object-contain "
                    />
                </div>
                <div className="absolute right-4 -bottom-8 flex gap-1">
                    <Checkbox />
                    <p className="font-normal"> Compare</p>
                </div>
            </div>
            <div className=" border m-1 p-3">
                <p className=" pt-10 pb-2">{product.product_name}</p>
                <p className="text-gray-600 text-xs font-normal pb-2">
                    {product.brand_name}
                </p>
                <p className="text-xs font-normal pb-2">
                    Ingredient Name: {product.key_ingredients.join(', ')}
                </p>
                <p className="text-xs text-gray-500 font-normal pb-2">
                    Top Categories: {product.top_category}
                </p>
                <p className="text-xs text-gray-500 font-normal pb-16">
                    Manufacturer: {product.manufacturer_name}
                </p>
            </div>
            <div className="absolute  bottom-1 right-1 left-1">
                <Button
                    className="w-full rounded-none flex items-center justify-center gap-2 "
                    onClick={() => handleViewBrandClick(product.product_id)}
                >
                    <FaAngleDown size={20} /> View Product
                </Button>
            </div>
        </div>
    )
}

export default ProductCard
