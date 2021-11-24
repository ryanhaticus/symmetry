import { createContext, useContext } from 'react';
import { uuidv4 } from '../helpers/TS';
import { useFirestoreProvider } from '../providers/FirestoreProvider';
import { useProjectHandler } from './ProjectHandler';

export interface CommentType {
  title: string;
  description: string;
  id: string;
}

interface CommentHandlerContextType {
  addComment: (sourceHref: string, title: string, description: string) => void;
  removeComment: (id: string) => void;
}

const CommentHandlerContext = createContext<CommentHandlerContextType>(null);

const CommentHandler = ({ children }) => {
  const { setDummyActiveProject, activeProject } = useProjectHandler();
  const { setDoc } = useFirestoreProvider();
  const addComment = async (
    sourceHref: string,
    title: string,
    description: string
  ) => {
    const id = uuidv4();
    const comment = {
      title,
      description,
      id
    };
    const modifiedProject = { ...activeProject };
    modifiedProject.sources
      .find((s) => s.href === sourceHref)
      .comments.push(comment);
    setDummyActiveProject(modifiedProject);
    await setDoc(`projects/${activeProject.id}`, modifiedProject);
  };
  const removeComment = async (id: string) => {
    const modifiedProject = { ...activeProject };
    modifiedProject.sources.forEach((source) => {
      source.comments = source.comments.filter((comment) => comment.id !== id);
    });
    setDummyActiveProject(modifiedProject);
    await setDoc(`projects/${activeProject.id}`, modifiedProject);
  };
  return (
    <CommentHandlerContext.Provider value={{ addComment, removeComment }}>
      {children}
    </CommentHandlerContext.Provider>
  );
};

export default CommentHandler;

export const useCommentHandler = () =>
  useContext<CommentHandlerContextType>(CommentHandlerContext);
