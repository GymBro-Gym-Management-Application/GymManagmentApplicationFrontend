import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { T } from './theme';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  neonBorder?: boolean;
  elevated?: boolean;
  variant?: 'default' | 'raised' | 'brand';
}

export default function GlassCard({ children, style, neonBorder, elevated, variant = 'default' }: Props) {
  const v = neonBorder ? 'brand' : elevated ? 'raised' : variant;
  return <View style={[s.base, s[v], style]}>{children}</View>;
}

const s = StyleSheet.create({
  base: { borderRadius: 14, borderWidth: 1, overflow: 'hidden' },
  default: { backgroundColor: T.bgPanel, borderColor: T.line },
  raised:  { backgroundColor: T.bgInput, borderColor: T.line },
  brand:   { backgroundColor: T.brandDim, borderColor: T.brandBorder },
});
