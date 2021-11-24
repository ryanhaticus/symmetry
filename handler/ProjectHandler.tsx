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
import { SourceType } from './SourceHandler';

interface ProjectType {
  id: string;
  owner: string;
  name: string;
  sources: SourceType[];
}

interface ProjectHandlerContextType {
  newProject: (name: string) => Promise<void>;
  projects: ProjectType[];
  setActiveProject: Dispatch<SetStateAction<string>>;
  setDummyActiveProject: Dispatch<SetStateAction<ProjectType>>;
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
  }, []);
  useEffect(() => {
    setDummyActiveProject(
      projects.find((project) => project.id === dummyActiveProject)
    );
  }, [dummyActiveProject, projects]);
  const newProject = async (name: string) => {
    const id = generateId();
    const newProjectData = {
      id,
      owner: user.uid,
      name,
      sources: []
    };
    await setDoc(`projects/${id}`, newProjectData);
    await setProjects([...projects, newProjectData]);
    await redirect(`/app/project/${id}`);
  };
  const deleteProject = async (id: string) => {
    await deleteDoc(`projects/${id}`);
    redirect('/app');
    await setProjects(projects.filter((project) => project.id !== id));
  };
  return (
    <ProjectHandlerContext.Provider
      value={{
        newProject,
        projects,
        setDummyActiveProject,
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
