import { useState } from 'react';
import GraphMenu from '../graphMenu/GraphMenu';
import S from './MainPageGraph.style';

const MainPageGraph = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div css={S.MainPageGraph}>
      <GraphMenu tabIndex={tabIndex} setTabIndex={setTabIndex} />
      Main Page Graph
    </div>
  );
};
export default MainPageGraph;
