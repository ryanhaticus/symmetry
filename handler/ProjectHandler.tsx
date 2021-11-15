import { createContext, useContext } from 'react';
import { useFirestoreProvider } from '../providers/FirestoreProvider';
import { setDoc, doc } from 'firebase/firestore';
import { useRedirectProvider } from '../providers/RedirectProvider';
import { useUserProvider } from '../providers/UserProvider';

interface ProjectHandlerContextType {
  newProject: (name: string) => Promise<void>;
}

const ProjectHandlerContext = createContext<ProjectHandlerContextType>(null);

const generateId = (): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < 12; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
};

const ProjectHandler = ({ children }) => {
  const firestoreProvider = useFirestoreProvider();
  const { redirect } = useRedirectProvider();
  const { user } = useUserProvider();
  const newProject = async (name: string) => {
    const id = generateId();

    await setDoc(doc(firestoreProvider, 'projects', id), {
      owner: user.uid,
      name,
      sources: []
    });
    await redirect(`/app/project/${id}`);
  };
  return (
    <ProjectHandlerContext.Provider value={{ newProject }}>
      {children}
    </ProjectHandlerContext.Provider>
  );
};

export default ProjectHandler;

export const useProjectHandler = () =>
  useContext<ProjectHandlerContextType>(ProjectHandlerContext);
