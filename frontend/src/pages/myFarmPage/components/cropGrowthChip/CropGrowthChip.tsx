import S from './CropGrowthChip.style';

const CropGrowthChip = ({
  lifeCycleName,
  lifeCycleStep,
}: {
  lifeCycleName: string;
  lifeCycleStep: number;
}) => {
  return (
    <div css={[S.CropGrowthChip, S.CropGrowthChipColorByStep(lifeCycleStep)]}>
      {lifeCycleName}
    </div>
  );
};

export default CropGrowthChip;
