import ProjectHandler from './ProjectHandler';
import SourceHandler from './SourceHandler';

const MasterHandler = ({ children }) => {
  return (
    <ProjectHandler>
      <SourceHandler>{children}</SourceHandler>
    </ProjectHandler>
  );
};

export default MasterHandler;
