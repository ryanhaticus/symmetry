import { useRouter } from 'next/dist/client/router';
import { createContext, useContext } from 'react';

interface RedirectContextType {
  redirect: (path: string) => void;
}

const RedirectContext = createContext<RedirectContextType>(null);

const RedirectProvider = ({ children }) => {
  const router = useRouter();
  const redirect = (path: string) => {
    router.push(path);
  };
  return (
    <RedirectContext.Provider value={{ redirect }}>
      {children}
    </RedirectContext.Provider>
  );
};

export default RedirectProvider;

export const useRedirectProvider = () =>
  useContext<RedirectContextType>(RedirectContext);
