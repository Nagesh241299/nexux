import { RouterProvider } from 'react-router-dom'

import './locales'
import Theme from '@/components/common/Theme'
import { Suspense } from 'react'
import Loading from './components/common/Loading'
import AppRoutes from './routes'

function App() {
    return (
        <>
            <Theme>
                <Suspense
                    fallback={
                        <div className="flex flex-auto flex-col h-[100vh]">
                            <Loading loading={true} />
                        </div>
                    }
                >
                    <RouterProvider router={AppRoutes} />
                </Suspense>
            </Theme>

        </>
    )
}

export default App
