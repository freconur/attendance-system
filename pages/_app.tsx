import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import { GlobalContextProvider } from '@/features/context/GlobalContext'
import LayoutMenu from '@/components/layouts/LayoutMenu'
import PrivateRoutes from '@/components/layouts/PrivateRoutes'

interface Props {
  children: JSX.Element | JSX.Element[]
}

const Noop = ({ children }: Props) => <>{children}</>;
export default function App({ Component, pageProps }: any) {
  
  const Auth = Component.Auth || Noop;
  return (
    <GlobalContextProvider>
      <Auth>
        <LayoutMenu>
          <Component {...pageProps} />
        </LayoutMenu>
      </Auth>
    </GlobalContextProvider>
  )

}
