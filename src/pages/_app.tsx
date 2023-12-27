import '@/styles/globals.css'
import '@/styles/table.css'
import '@/styles/log.css'
import '@/styles/login.css'


import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
