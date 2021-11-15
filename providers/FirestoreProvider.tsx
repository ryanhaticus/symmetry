import { createContext, useContext, useEffect, useState } from 'react';
import { getFirestore, Firestore } from 'firebase/firestore';
import { useFirebaseProvider } from './FirebaseProvider';
import LoadingComponent from '../component/misc/LoadingComponent';

const FirestoreContext = createContext<Firestore>(null);

const FirestoreProvider = ({ children }) => {
  const [firestore, setFirestore] = useState(null);
  const firebaseProvider = useFirebaseProvider();
  useEffect(() => {
    const firestore = getFirestore(firebaseProvider);
    setFirestore(firestore);
  });
  if (firestore === null) {
    return <LoadingComponent fullscreen={true} />;
  }
  return (
    <FirestoreContext.Provider value={firestore}>
      {children}
    </FirestoreContext.Provider>
  );
};

export default FirestoreProvider;

export const useFirestoreProvider = () =>
  useContext<Firestore>(FirestoreContext);
