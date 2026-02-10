import type { AppProps } from 'next/app';
import { AuthProvider } from '@a2home/ui';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
