import { Text, TextProps } from 'react-native';
import { type } from '@/theme/tokens';

type TypeStep = keyof typeof type;

interface TypographyProps extends TextProps {
  step: TypeStep;
}

function createTypography(step: TypeStep) {
  return function TypographyComponent({ style, ...rest }: Omit<TypographyProps, 'step'>) {
    return <Text style={[type[step], style]} {...rest} />;
  };
}

export const Display = createTypography('display');
export const Title = createTypography('title');
export const Heading = createTypography('heading');
export const Label = createTypography('label');
export const Status = createTypography('status');
export const Micro = createTypography('micro');

export { type };
export type { TypeStep };
