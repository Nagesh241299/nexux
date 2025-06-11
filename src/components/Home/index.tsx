import LocalStorageUtil from '@/utils/LocalStorageUtil'
import { LocalStorageConstants } from '@/constants/Application/LocalStorageConstants'
import { UserInterface } from '@/shared/interface/User.interface'
import { useMainApp } from '../App/index.hook'

const Home = () => {
    const user = LocalStorageUtil.localStorageGetItem(
        LocalStorageConstants.USER_DATA,
    ) as UserInterface
    


    return (
        <div className="bg-white dark:bg-black h-full p-4">
            <div className="bg-gray-100 dark:bg-gray-800 text-center p-4">
                            <h3 className='text-center text-primary pb-4'>Welcome {user.first_name}</h3 >

                <p className="text-xl text-secondary pt-2">
                    Let's start something Awesome!
                </p>
                <div className="px-5 pt-4">
                </div>
            </div>
        </div>
    )
}

export default Home
