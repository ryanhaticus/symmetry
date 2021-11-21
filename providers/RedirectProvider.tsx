import { useRouter } from 'next/dist/client/router';
import { createContext, useContext, useEffect, useState } from 'react';

interface RedirectContextType {
  redirect: (path: string) => void;
  route: string;
  projectId: string;
}

const RedirectContext = createContext<RedirectContextType>(null);

const RedirectProvider = ({ children }) => {
  const router = useRouter();
  const [route, setRoute] = useState('');
  const [projectId, setProjectId] = useState<string>(null);
  const redirect = (path: string) => {
    router.push(path);
  };
  useEffect(() => {
    setRoute(router.asPath);
  }, [router.asPath]);
  useEffect(() => {
    const { id } = router.query;
    setProjectId(id as string);
  }, [router.query]);
  return (
    <RedirectContext.Provider value={{ redirect, route, projectId }}>
      {children}
    </RedirectContext.Provider>
  );
};

export default RedirectProvider;

export const useRedirectProvider = () =>
  useContext<RedirectContextType>(RedirectContext);
