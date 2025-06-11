import { useState } from 'react'
import { FaAngleLeft } from 'react-icons/fa6'

import useOnboarding from '@/components/Authentication/SignUp/index.hook'
import SignUpStep1 from '@/components/Authentication/SignUp/SignUpStep1'
import SignUpStep3 from '@/components/Authentication/SignUp/SignUpStep3'
import SignUpForm from '@/components/Authentication/SignUp/SignUpForm/index'
import { motionCardsData } from '@/components/Authentication/SignUp/mockData'

const OnboardingProcess = () => {
    const [email, setEmail] = useState<string>('')
    const config = useOnboarding()

    return (
        <div className=" ">
            <h3 className="text-center pt-5 mb-6">Bettrlabs</h3>
            {config.step === 0 && (
                <div className="grid grid-cols-2 gap-24 max-md:grid-cols-1 mx-[5%] ">
                    <div className="flex justify-center max-md:hidden">
                        <div className="">
                            <div className="">
                                <h3>
                                    Unlock the Future of Food Join the MVP Beta
                                    Now!
                                </h3>
                                <p>
                                    No contracts. No long-term commitment.
                                    Nothing to lose. There’s a reason why
                                    leading brands, manufacturers, and
                                    marketplaces trust Nexus.
                                </p>
                                <p className="text-black my-3">
                                    Login, access your dashboard instantly, and
                                    start building products in no time!
                                </p>

                                <div className="overflow-hidden relative">
                                    <div className="grid grid-cols-2 gap-4">
                                        {motionCardsData?.map((card, index) => (
                                            <div
                                                key={card.id + index}
                                                className="bg-gray-200 p-4 rounded-md flex flex-col"
                                            >
                                                <div className="w-9 h-9 rounded-full flex justify-center items-center bg-gray-400">
                                                    <card.icon
                                                        className="text-white"
                                                        size={20}
                                                    />
                                                </div>
                                                <p className="text-black text-lg py-2">
                                                    {card.title}
                                                </p>
                                                <p className="">
                                                    {card.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex bg-gray-200 my-4 p-4 items-center gap-4">
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbWUFGfIKH8fKPPnIKgaUnNfU0xFk7YXS1pw&s"
                                        alt="image"
                                        className="object-contain w-20 h-20"
                                    />
                                    <div>
                                        <p className="text-black pb-2">
                                            Anita Gupta, NovaNova
                                        </p>
                                        <p>
                                            "Nexus streamlined our entire
                                            product development process,
                                            reducing validation time and
                                            boosting market success!"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center  rounded-xl items-center">
                        <div>
                            <div className="w-full border py-4 max-md:px-4 px-10 bg-white">
                                <p className="text-xl text-center pb-4">
                                    Sign Up
                                </p>

                                {config.step === 0 && (
                                    <SignUpStep1
                                        handleStep={config.handleStep}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {config.step === 1 && (
                <div className="pt-2 flex items-center">
                    <div className="grid grid-cols-2 w-full max-md:grid-cols-1 rounded-lg shadow-lg mx-[10%] max-md:mx-4 mb-0">
                        <div className="w-full pt-4 max-md:px-4 px-20 bg-white flex justify-center rounded-r-0 rounded-l-lg">
                            <div className="w-full">
                                <div className="flex items-center gap-4">
                                    {config.step > 0 && (
                                        <FaAngleLeft
                                            color="black"
                                            size={16}
                                            onClick={config.handleBackStep}
                                            className="cursor-pointer"
                                        />
                                    )}
                                    <p className="py-2 font-semibold text-lg text-black">
                                        Let's get to know you.
                                    </p>
                                </div>
                                {config.step === 1 && (
                                    <SignUpForm
                                        handleStep={config.handleStep}
                                        setEmail={setEmail}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {config.step === 2 && <SignUpStep3 email={email} />}
        </div>
    )
}

export default OnboardingProcess
