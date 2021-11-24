import 'tailwindcss/tailwind.css';
import FirebaseProvider from '../providers/FirebaseProvider';
import RedirectProvider from '../providers/RedirectProvider';

import Head from 'next/head';

import { DefaultSeo } from 'next-seo';
import AuthProvider from '../providers/AuthProvider';
import UserProvider from '../providers/UserProvider';
import SharedStateProvider from '../providers/SharedStateProvider';
import FirestoreProvider from '../providers/FirestoreProvider';
import { useRouter } from 'next/dist/client/router';
import MasterHandler from '../handlers/MasterHandler';

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <link rel='icon' type='image/svg+xml' href='/symmetry.svg' />
      </Head>
      <DefaultSeo titleTemplate='%s - Symmetry' />
      <RedirectProvider>
        <FirebaseProvider>
          <AuthProvider>
            <FirestoreProvider>
              <UserProvider>
                <SharedStateProvider>
                  <MasterHandler>
                    <Component {...pageProps} />
                  </MasterHandler>
                </SharedStateProvider>
              </UserProvider>
            </FirestoreProvider>
          </AuthProvider>
        </FirebaseProvider>
      </RedirectProvider>
    </>
  );
};

export default App;
