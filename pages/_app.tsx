import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import { GlobalContextProvider } from '@/features/context/GlobalContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalContextProvider>
      <Component {...pageProps} />
    </GlobalContextProvider>
  ) 
  
}
