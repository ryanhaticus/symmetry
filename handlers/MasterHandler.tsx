import { useRouter } from 'next/dist/client/router';
import CommentHandler from './CommentHandler';
import ProjectHandler from './ProjectHandler';
import SearchHandler from './SearchHandler';
import SourceHandler from './SourceHandler';

const MasterHandler = ({ children }) => {
  const { pathname } = useRouter();
  if (pathname !== '/app' && !pathname.includes('/app/project')) {
    return <>{children}</>;
  }
  return (
    <ProjectHandler>
      <SourceHandler>
        <CommentHandler>
          <SearchHandler>{children}</SearchHandler>
        </CommentHandler>
      </SourceHandler>
    </ProjectHandler>
  );
};

export default MasterHandler;
