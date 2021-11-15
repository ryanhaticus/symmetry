import { createContext, useContext, useEffect, useState } from 'react';
import LoadingComponent from '../component/misc/LoadingComponent';

import { Auth, getAuth } from 'firebase/auth';

const AuthContext = createContext<Auth>(null);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState<Auth>(null);
  useEffect(() => {
    const auth = getAuth();
    setAuth(auth);
  }, []);
  if (auth == null) {
    return <LoadingComponent fullscreen={true} />;
  }
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuthProvider = () => useContext<Auth>(AuthContext);
