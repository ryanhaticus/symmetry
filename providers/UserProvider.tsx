import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth';
import { useAuthProvider } from './AuthProvider';
import { useRedirectProvider } from './RedirectProvider';
import LoadingComponent from '../components/misc/LoadingComponent';

interface UserContextType {
  createUser: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  signInUser: (email: string, password: string) => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  user: User;
}

const UserContext = createContext<UserContextType>(null);

const UserProvider = ({ children }) => {
  const authProvider = useAuthProvider();
  const { redirect, route, reload } = useRedirectProvider();

  const createUser = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(authProvider, email, password);
  };
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(authProvider, provider);
  };
  const sendPasswordReset = async (email: string) => {
    await sendPasswordResetEmail(authProvider, email);
  };
  const _signOut = async () => {
    await signOut(authProvider);
    redirect('/');
  };
  const signInUser = async (email: string, password: string) => {
    await signInWithEmailAndPassword(authProvider, email, password);
  };
  const [user, setUser] = useState<User>(null);
  const [awaitingUser, setAwaitingUser] = useState(true);
  useEffect(() => {
    authProvider.onAuthStateChanged((_user) => {
      setUser(_user);
      setAwaitingUser(false);
    });
  }, []);
  if (awaitingUser) {
    return <LoadingComponent fullscreen={true} />;
  }
  return (
    <UserContext.Provider
      value={{
        createUser,
        signInWithGoogle,
        signOut: _signOut,
        signInUser,
        sendPasswordReset,
        user
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUserProvider = () => useContext<UserContextType>(UserContext);
