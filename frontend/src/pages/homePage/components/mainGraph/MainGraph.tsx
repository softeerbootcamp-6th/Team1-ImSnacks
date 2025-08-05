import { useState } from 'react';
import GraphMenu from '../graphMenu/GraphMenu';
import S from './MainGraph.style';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const MainGraph = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div css={S.MainGraph}>
      <GraphMenu tabIndex={tabIndex} setTabIndex={setTabIndex} />
    </div>
  );
};
export default MainGraph;
