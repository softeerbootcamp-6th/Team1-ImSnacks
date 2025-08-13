import { DAMAGE_GRAPHIC } from '@/constants/damageGraphic';
import type { PestDamagesType, WeatherDamagesType } from '@/types/damage.type';
import S from './DamageCard.style';

interface DamageCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  description: string;
  damageType: WeatherDamagesType | PestDamagesType;
  selectedName?: string | null;
}

const DamageCard = ({
  name,
  description,
  damageType,
  selectedName = null,
  ...props
}: DamageCardProps) => {
  const DamageGraphicComponent = DAMAGE_GRAPHIC[damageType];
  const opacity = selectedName === name ? 0.9 : 0.6;

  return (
    <div css={S.DamageCard(selectedName, name)} {...props}>
      <DamageGraphicComponent
        width={342}
        height={218}
        style={
          {
            '--fill-opacity': opacity,
          } as React.CSSProperties & { '--fill-opacity': number }
        }
      />
      <div style={{ position: 'absolute', top: 110, left: 24 }}>
        <div css={S.DamageCardTitle}>{name}</div>

        <div css={S.DamageCardDescription}>{description}</div>
      </div>
    </div>
  );
};

export default DamageCard;
