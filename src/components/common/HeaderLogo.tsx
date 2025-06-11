import Logo from '@/components/common/Logo'
import { useThemeStore } from '@/store/themeStore'
import appConfig from '@/configs/app.config'
import { Link } from 'react-router-dom'
import type { Mode } from '@/shared/types/theme'

const HeaderLogo = ({ mode }: { mode?: Mode }) => {
    const defaultMode = useThemeStore((state) => state.mode)

    return (
        <Link to={appConfig.authenticatedEntryPath}>
            <Logo imgClass="max-h-10" mode={mode || defaultMode} className="hidden lg:block" />
        </Link>
    )
}

export default HeaderLogo
