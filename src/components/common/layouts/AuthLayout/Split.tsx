import { cloneElement } from 'react'
import type { ReactNode } from 'react'
import type { CommonProps } from '@/shared/types/common'

interface SplitProps extends CommonProps {
    content?: ReactNode
}

const Split = ({ children, content, ...rest }: SplitProps) => {
    return (
        <div className='h-auto min-h-full bg-gray-100 items-center'>
        <div className="grid lg:grid-cols-1 bg-gray-100 dark:bg-gray-800">
            
            <div className="flex flex-col justify-center ">
                <div className="w-full px-8 ">
                    <div className="">{content}</div>
                    {children
                        ? cloneElement(children as React.ReactElement, {
                              ...rest,
                          })
                        : null}
                        
                </div>
            </div>
            {/* <Footer pageContainerType="contained" /> */}

        </div>

        </div>
    )
}

export default Split
