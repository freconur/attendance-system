import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import { GlobalContextProvider } from '@/features/context/GlobalContext'
import LayoutMenu from '@/components/layouts/LayoutMenu'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalContextProvider>
      <LayoutMenu>
      <Component {...pageProps} />
      </LayoutMenu>
    </GlobalContextProvider>
  ) 
  
}
