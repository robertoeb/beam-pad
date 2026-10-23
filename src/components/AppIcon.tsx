import { Image, View } from 'react-native';
import { BRAND_LOGOS } from '@/shortcuts/brandLogos';
import { BRAND_ICONS, initialsFallback } from '@/shortcuts/icons';
import { Label } from '@/theme/typography';
import {radius, tokens} from '@/theme/tokens';

interface AppIconProps {
  appId: string;
  name: string;
  color: string;
  size?: number;
  rounded?: boolean;
}

export function AppIcon({ appId, name, color, size = 64, rounded = true }: AppIconProps) {
  const icon = BRAND_LOGOS[appId];

  const glyph = () => {
    const BrandIcon = BRAND_ICONS[appId];
    if (BrandIcon) return <BrandIcon size={Math.round(size * 0.42)} color={tokens.colors.text.primary} />;
    return (
      <Label style={{ color: tokens.colors.text.primary, fontSize: Math.round(size * 0.24) }}>
        {initialsFallback(name)}
      </Label>
    );
  };

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: rounded ? radius.lg : 0,
        overflow: 'hidden',
        backgroundColor: icon ? icon.background : `${color}24`,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {icon ? (
        <Image source={icon.source} style={{ width: size, height: size }} resizeMode="contain" />
      ) : (
        glyph()
      )}
    </View>
  );
}
