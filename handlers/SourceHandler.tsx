import { createContext, useContext } from 'react';
import { useFirestoreProvider } from '../providers/FirestoreProvider';
import { CommentType } from './CommentHandler';
import { useProjectHandler } from './ProjectHandler';

interface SourceHandlerContextType {
  addSource: (source: SourceType) => void;
  removeSource: (href: string) => void;
}

const SourceContext = createContext<SourceHandlerContextType>(null);

export interface SourceType {
  label: string;
  description: string;
  href: string;
  comments?: CommentType[];
}

const SourceHandler = ({ children }) => {
  const { activeProject, setDummyActiveProject } = useProjectHandler();
  const { setDoc } = useFirestoreProvider();
  const addSource = async (source: SourceType) => {
    const sourceExists = activeProject.sources.find(
      (s) => s.href === source.href
    );
    if (sourceExists) {
      return;
    }
    const modifiedSource = {
      ...source,
      comments: []
    };
    const modifiedProject = { ...activeProject };
    modifiedProject.sources.push(modifiedSource);
    setDummyActiveProject(modifiedProject);
    await setDoc(`projects/${activeProject.id}`, modifiedProject);
  };
  const removeSource = async (href: string) => {
    const modifiedProject = { ...activeProject };
    modifiedProject.sources = modifiedProject.sources.filter(
      (s) => s.href !== href
    );
    setDummyActiveProject(modifiedProject);
    await setDoc(`projects/${activeProject.id}`, modifiedProject);
  };
  return (
    <SourceContext.Provider value={{ addSource, removeSource }}>
      {children}
    </SourceContext.Provider>
  );
};

export default SourceHandler;

export const useSourceHandler = () =>
  useContext<SourceHandlerContextType>(SourceContext);
