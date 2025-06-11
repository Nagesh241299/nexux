
import SignInModal from '../Authentication/SignInModal'
import LocalStorageUtil from '@/utils/LocalStorageUtil'
import {
    LocalStorageConstants,
} from '@/constants/Application/LocalStorageConstants'
import SignIn from '../Authentication/SignIn'

const LandingPage = () => {
    const isLogin = LocalStorageUtil.localStorageGetItem(
        LocalStorageConstants.IS_LOGIN,
    )?.isLogin

    return (
        <>
           
            <div className="h-full justify-center items-center">
                <SignIn/>
            </div>

            {isLogin === 'true' && <SignInModal />}
        </>
    )
}

export default LandingPage
