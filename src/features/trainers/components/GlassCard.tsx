import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { T, Shadow } from './theme';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  neonBorder?: boolean;
  elevated?: boolean;
}

/**
 * Reusable glass card — translucent surface floating over the dark background.
 * Equivalent to the web .glass pattern: semi-opaque bg + border + shadow.
 * neonBorder=true activates the neon lime border glow variant.
 * elevated=true uses surfaceElevated bg for modals / hover states.
 */
export default function GlassCard({ children, style, neonBorder = false, elevated = false }: Props) {
  return (
    <View style={[
      styles.card,
      elevated && styles.elevated,
      neonBorder && styles.neonBorder,
      Shadow.card,
      style,
    ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: T.glassBg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: T.glassBorder,
    overflow: 'hidden',
  },
  elevated: {
    backgroundColor: T.surfaceElevated,
  },
  neonBorder: {
    borderColor: T.neonBorder,
    // inner + outer neon glow via shadow (outer only in RN; inner simulated via bg tint)
    shadowColor: T.shadowNeon,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.55,
    shadowRadius: 16,
    elevation: 14,
    backgroundColor: T.neonGlowFaint,
  },
});
