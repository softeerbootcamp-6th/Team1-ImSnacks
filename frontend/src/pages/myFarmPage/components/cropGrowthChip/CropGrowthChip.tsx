import S from './CropGrowthChip.style';

const CropGrowthChip = ({
  lifeCycle,
  lifeCycleStep,
}: {
  lifeCycle: string;
  lifeCycleStep: number;
}) => {
  return (
    <div css={[S.CropGrowthChip, S.CropGrowthChipColorByStep(lifeCycleStep)]}>
      {lifeCycle}
    </div>
  );
};

export default CropGrowthChip;
