import GrapeIcon from '@/assets/icons/crop/IcCropGrape.svg?react';
import AppleIcon from '@/assets/icons/crop/IcCropApple.svg?react';
import PeachIcon from '@/assets/icons/crop/IcCropPeach.svg?react';
import PearIcon from '@/assets/icons/crop/IcCropPear.svg?react';
import MandarinIcon from '@/assets/icons/crop/IcCropMandarin.svg?react';
import PersimmonIcon from '@/assets/icons/crop/IcCropPersimmon.svg?react';

export const CropIcon: Record<
  string,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  포도: GrapeIcon,
  사과: AppleIcon,
  복숭아: PeachIcon,
  배: PearIcon,
  감귤: MandarinIcon,
  단감: PersimmonIcon,
};
