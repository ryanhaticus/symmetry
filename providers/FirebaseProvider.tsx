import { createContext, useContext, useEffect, useState } from 'react';
import { FirebaseApp, initializeApp } from 'firebase/app';
import LoadingComponent from '../component/misc/LoadingComponent';

const FirebaseContext = createContext<FirebaseApp>(null);

const FirebaseProvider = ({ children }) => {
  const [app, setApp] = useState<FirebaseApp>(null);
  useEffect(() => {
    const app = initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
    });
    setApp(app);
  }, []);
  if (app == null) {
    return <LoadingComponent fullscreen={true} />;
  }
  return (
    <FirebaseContext.Provider value={app}>{children}</FirebaseContext.Provider>
  );
};

export default FirebaseProvider;

export const useFirebaseProvider = () =>
  useContext<FirebaseApp>(FirebaseContext);
