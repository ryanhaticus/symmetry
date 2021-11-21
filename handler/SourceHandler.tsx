import { createContext, useContext } from 'react';

const SourceContext = createContext(null);

export interface SourceType {
  label: string;
  description: string;
  href: string;
}

const SourceHandler = ({ children }) => {
  return (
    <SourceContext.Provider value={null}>{children}</SourceContext.Provider>
  );
};

export default SourceHandler;

export const useSourceProvider = () => useContext(SourceContext);
