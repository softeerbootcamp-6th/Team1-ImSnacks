import { useState } from 'react';
import GraphMenu from '../graphMenu/GraphMenu';
import S from './MainGraph.style';

const MainGraph = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div css={S.MainGraph}>
      <GraphMenu tabIndex={tabIndex} setTabIndex={setTabIndex} />
      Main Page Graph
    </div>
  );
};
export default MainGraph;
