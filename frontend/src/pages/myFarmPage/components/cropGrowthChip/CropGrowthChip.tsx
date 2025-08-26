import S from './CropGrowthChip.style';

const CropGrowthChip = ({
  lifeCycle,
  step,
}: {
  lifeCycle: string;
  step: number;
}) => {
  return (
    <div css={[S.CropGrowthChip, S.CropGrowthChipColorByStep(step)]}>
      {lifeCycle}
    </div>
  );
};

export default CropGrowthChip;
