import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { T } from './theme';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  neonBorder?: boolean;
  elevated?: boolean;
}

export default function GlassCard({ children, style, neonBorder = false, elevated = false }: Props) {
  return (
    <View style={[styles.outer, elevated && styles.outerElevated, neonBorder && styles.outerNeon]}>
      {/* Specular top-edge highlight — iOS "glass rim" */}
      <View style={styles.highlight} pointerEvents="none" />
      <View style={[styles.inner, style]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    borderRadius: 20,
    backgroundColor: T.glassBg,
    // soft white-tinted border (specular rim)
    borderWidth: 1,
    borderColor: T.glassBorder,
    // deep shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.55,
    shadowRadius: 24,
    elevation: 14,
    overflow: 'hidden',
  },
  outerElevated: {
    backgroundColor: T.glassElevated,
  },
  outerNeon: {
    borderColor: T.neonBorder,
    shadowColor: T.shadowNeon,
    shadowOpacity: 0.45,
    shadowRadius: 18,
    elevation: 16,
    backgroundColor: T.neonGlowFaint,
  },
  // top specular gradient line (simulated with a thin View)
  highlight: {
    position: 'absolute',
    top: 0, left: 16, right: 16,
    height: 1,
    backgroundColor: T.glassHighlight,
    borderRadius: 1,
    zIndex: 1,
  },
  inner: {
    borderRadius: 20,
  },
});
