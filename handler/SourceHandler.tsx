import { createContext, useContext } from 'react';

const SourceContext = createContext(null);

const SourceHandler = ({ children }) => {
  return (
    <SourceContext.Provider value={null}>{children}</SourceContext.Provider>
  );
};

export default SourceHandler;

export const useSourceProvider = () => useContext(SourceContext);
