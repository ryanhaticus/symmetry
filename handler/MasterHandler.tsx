import ProjectHandler from './ProjectHandler';
import SearchHandler from './SearchHandler';
import SourceHandler from './SourceHandler';

const MasterHandler = ({ children }) => {
  return (
    <ProjectHandler>
      <SourceHandler>
        <SearchHandler>{children}</SearchHandler>
      </SourceHandler>
    </ProjectHandler>
  );
};

export default MasterHandler;
