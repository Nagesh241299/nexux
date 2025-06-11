import { FaCircleChevronRight } from 'react-icons/fa6'
import { Button } from 'antd'

interface SignUpStep1Props {
    handleStep: () => void
}

const SignUpStep1 = ({ handleStep }: SignUpStep1Props) => {
    return (
        <div>
            <div className="bg-gray-100 rounded-xl text-center p-4 px-6">
                <h4 className="text-blue-600">70M+ Products and 25K brands </h4>
                <p>database already with bettrlabs</p>
                <div className="bg-gray-200 text-center rounded-xl border p-3 my-4">
                    <h2>"</h2>
                    <p className="text-gray-800 font-normal">
                        Wiser is a bite-sized learning app for those who strive
                        to grow.
                    </p>
                    <p className="text-gray-800 font-normal pt-3">Brand logo</p>
                </div>
                <p>Trusted by 1000s of Brands</p>
                <div className="bg-white mt-4">
                    
                </div>
            </div>

            <div>
                <div className="grid grid-cols-2 gap-4 my-6">
                    <div className="bg-gray-100 rounded-xl">
                        
                        <Button
                            className="w-full flex items-center justify-between px-5"
                            onClick={handleStep}
                        >
                            Existing Brand
                            <FaCircleChevronRight
                                size={20}
                                className="text-primary"
                            />
                        </Button>
                    </div>
                    <div className="bg-gray-100 rounded-xl">
                       
                        <Button
                            className="w-full flex items-center justify-between px-5"
                            onClick={handleStep}
                        >
                            Building a Brand
                            <FaCircleChevronRight
                                size={20}
                                className="text-primary"
                            />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpStep1
