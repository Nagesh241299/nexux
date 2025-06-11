// import HorizontalMenuContent from './HorizontalMenuContent'
import { useRouteKeyStore } from '@/store/routeKeyStore'

const HorizontalNav = ({
    translationSetup = true,
}: {
    translationSetup?: boolean
}) => {
    const currentRouteKey = useRouteKeyStore((state) => state.currentRouteKey)


    return (
        <></>
        // <HorizontalMenuContent
        //     navigationTree={navigationConfig}
        //     routeKey={currentRouteKey}
        //     userAuthority={userAuthority || []}
        //     translationSetup={translationSetup}
        // />
    )
}

export default HorizontalNav
