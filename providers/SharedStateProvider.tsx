import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react';

interface SharedStateContextType {
  newProjectModalOpen: boolean;
  setNewProjectModalOpen: Dispatch<SetStateAction<boolean>>;
}

const SharedStateContext = createContext<SharedStateContextType>(null);

const SharedStateProvider = ({ children }) => {
  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false);
  return (
    <SharedStateContext.Provider
      value={{ newProjectModalOpen, setNewProjectModalOpen }}
    >
      {children}
    </SharedStateContext.Provider>
  );
};

export default SharedStateProvider;

export const useSharedStateProvider = () =>
  useContext<SharedStateContextType>(SharedStateContext);
