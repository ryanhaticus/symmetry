import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react';
import { useFirestoreProvider } from '../providers/FirestoreProvider';
import { useRedirectProvider } from '../providers/RedirectProvider';
import { useUserProvider } from '../providers/UserProvider';

interface ProjectType {
  id: string;
  owner: string;
  name: string;
  sources: any[];
}

interface ProjectHandlerContextType {
  newProject: (name: string) => Promise<void>;
  projects: ProjectType[];
  setActiveProject: Dispatch<SetStateAction<string>>;
  activeProject: ProjectType;
  deleteProject: (id: string) => Promise<void>;
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
  const { setDoc, getDocs, deleteDoc } = useFirestoreProvider();
  const { redirect } = useRedirectProvider();
  const { user } = useUserProvider();
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [dummyActiveProject, setActiveProject] = useState<string>(null);
  const [activeProject, setDummyActiveProject] = useState<ProjectType>(null);
  useEffect(() => {
    if (user == null) {
      return;
    }
    (async () => {
      const projectDocs = await getDocs('projects', 'owner', '==', user.uid);
      setProjects(
        projectDocs.docs.map((doc) => {
          const data = doc.data();
          return {
            ...data
          };
        }) as unknown as ProjectType[]
      );
    })();
  }, null);
  useEffect(() => {
    setDummyActiveProject(
      projects.find((project) => project.id === dummyActiveProject)
    );
  }, [dummyActiveProject]);
  const newProject = async (name: string) => {
    const id = generateId();
    await setDoc(`projects/${id}`, {
      id,
      owner: user.uid,
      name,
      sources: []
    });
    await redirect(`/app/project/${id}`);
  };
  const deleteProject = async (id: string) => {
    await deleteDoc(`projects/${id}`);
    await redirect('/app');
  };
  return (
    <ProjectHandlerContext.Provider
      value={{
        newProject,
        projects,
        setActiveProject,
        activeProject,
        deleteProject
      }}
    >
      {children}
    </ProjectHandlerContext.Provider>
  );
};

export default ProjectHandler;

export const useProjectHandler = () =>
  useContext<ProjectHandlerContextType>(ProjectHandlerContext);
