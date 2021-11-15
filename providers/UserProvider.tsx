import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { useAuthProvider } from './AuthProvider';

interface UserContextType {
  createUser: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  signInUser: (email: string, password: string) => Promise<void>;
}

const UserContext = createContext<UserContextType>(null);

const UserProvider = ({ children }) => {
  const authProvider = useAuthProvider();
  const createUser = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(authProvider, email, password);
  };
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(authProvider, provider);
  };
  const signOut = async () => {
    await signOut();
  };
  const signInUser = async (email: string, password: string) => {
    await signInWithEmailAndPassword(authProvider, email, password);
  };
  const [user, setUser] = useState<User>(null);
  useEffect(() => {
    authProvider.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);
  return (
    <UserContext.Provider
      value={{ createUser, signInWithGoogle, signOut, signInUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUserProvider = () => useContext<UserContextType>(UserContext);
