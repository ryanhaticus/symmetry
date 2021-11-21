import { createContext, useContext, useEffect, useState } from 'react';
import {
  getFirestore,
  setDoc,
  doc,
  query,
  collection,
  where,
  getDocs,
  WhereFilterOp,
  QuerySnapshot,
  DocumentData,
  deleteDoc
} from 'firebase/firestore';
import { useFirebaseProvider } from './FirebaseProvider';
import LoadingComponent from '../component/misc/LoadingComponent';

interface FirestoreContextType {
  setDoc: (path: string, data: any) => Promise<void>;
  getDocs: (
    path: string,
    property: string,
    comparator: WhereFilterOp,
    desired: any
  ) => Promise<QuerySnapshot<DocumentData>>;
  deleteDoc: (path: string) => Promise<void>;
}

const FirestoreContext = createContext<FirestoreContextType>(null);

const FirestoreProvider = ({ children }) => {
  const [firestore, setFirestore] = useState(null);
  const firebaseProvider = useFirebaseProvider();
  useEffect(() => {
    const firestore = getFirestore(firebaseProvider);
    setFirestore(firestore);
  });
  const _setDoc = async (path: string, data: any) => {
    return await setDoc(doc(firestore, ...path.split('/')), data);
  };
  const _deleteDoc = async (path: string) => {
    return await deleteDoc(doc(firestore, ...path.split('/')));
  };
  const _getDocs = async (
    path: string,
    property: string,
    comparator: WhereFilterOp,
    desired: any
  ) => {
    return await getDocs(
      query(collection(firestore, path), where(property, comparator, desired))
    );
  };
  if (firestore == null) {
    return <LoadingComponent fullscreen={true} />;
  }
  return (
    <FirestoreContext.Provider
      value={{ setDoc: _setDoc, getDocs: _getDocs, deleteDoc: _deleteDoc }}
    >
      {children}
    </FirestoreContext.Provider>
  );
};

export default FirestoreProvider;

export const useFirestoreProvider = () =>
  useContext<FirestoreContextType>(FirestoreContext);
