import { Gradient, Glow, SCREEN_GRADIENT } from '@/theme/gradient';
import { tokens } from '@/theme/tokens';

/**
 * Shared aurora backdrop (spec §3.1). Every screen gets identical gradient +
 * glow positions from here instead of re-implementing them per screen.
 */
export function AuroraBackground() {
  return (
    <>
      <Gradient colors={SCREEN_GRADIENT} />
      <Glow color={tokens.colors.accent.violet} size={420} x={-160} y={-140} opacity={0.16} />
      <Glow color={tokens.colors.accent.cyan} size={380} x={-120} y={520} opacity={0.1} />
    </>
  );
}
