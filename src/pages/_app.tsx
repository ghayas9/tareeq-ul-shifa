import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Poppins, Roboto_Slab } from 'next/font/google';
import 'swiper/css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { Provider } from 'react-redux';
import CartSidebar from '@/components/common/CartSidebar';
import { store } from '@/redux/store/store';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import { SearchProvider } from '@/components/context/SearchContext';

import { Libre_Baskerville } from 'next/font/google';


const libre = Libre_Baskerville({
  subsets: ['latin'],
  weight: [ '700'],
  variable: '--font-libre',
});
const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-roboto-slab',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <main className={`${libre.variable} ${robotoSlab.className} ${poppins.variable}`}>
      <Provider store={store}>
      <SearchProvider>
      <ProtectedRoute>
        <CartSidebar />
        <Component {...pageProps} />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
              fontFamily: 'var(--font-poppins), sans-serif',
            },
            success: {
              style: {
                background: '#128E7C', // Using your theme color
                color: '#fff',
              },
            },
            error: {
              style: {
                background: '#ff5252',
                color: '#fff',
              },
            },
          }}
        />
        </ProtectedRoute>
        </SearchProvider>
      </Provider>
    </main>
  );
}
