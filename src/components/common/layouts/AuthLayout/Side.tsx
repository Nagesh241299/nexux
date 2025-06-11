import { cloneElement } from 'react'
import type { CommonProps } from '@/shared/types/common'

type SideProps = CommonProps

const Side = ({ children, ...rest }: SideProps) => {
    return (
        <div className="flex  p-6 bg-white dark:bg-gray-800">
            <div className=" flex flex-col justify-center items-center flex-1">
                <div className="w-full xl:max-w-[450px] px-8 max-w-[380px]">
                    {children
                        ? cloneElement(children as React.ReactElement, {
                              ...rest,
                          })
                        : null}
                </div>
            </div>
            <div className="py-6 px-10 lg:flex items-center flex-1 justify-center hidden h-full rounded-3xl relative xl:max-w-[520px] 2xl:max-w-[720px]">
                {/* <img
                    src="/img/others/auth-side-bg.png"
                    className="absolute h-full w-full top-0 left-0 rounded-3xl"
                /> */}
                <h1>Nexus</h1>
            </div>
        </div>
    )
}

export default Side
