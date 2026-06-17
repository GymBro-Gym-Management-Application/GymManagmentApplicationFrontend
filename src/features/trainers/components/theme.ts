export const T = {
  // Core surfaces
  background:      '#121212',
  surface:         '#1A1A1A',
  surfaceElevated: '#1E1E1E',
  foreground:      '#FFFFFF',
  mutedFg:         '#888888',
  border:          '#2A2A2A',
  input:           '#1E1E1E',

  // Accent
  primary:         '#FF6B00',   // energetic orange
  primaryFg:       '#FFFFFF',
  accent:          '#FFD54F',   // warm yellow
  accentFg:        '#121212',
  destructive:     '#FF4444',
  ring:            '#FF6B00',

  // Glow / glass helpers
  neonGlow:        'rgba(255,107,0,0.35)',
  neonGlowFaint:   'rgba(255,107,0,0.12)',
  neonBorder:      'rgba(255,107,0,0.30)',
  amberGlow:       'rgba(255,213,79,0.30)',
  // iOS frosted glass layers
  glassBg:         'rgba(255,255,255,0.07)',   // base frosted layer
  glassElevated:   'rgba(255,255,255,0.11)',   // lifted card layer
  glassHighlight:  'rgba(255,255,255,0.14)',   // top specular edge
  glassHoverBg:    'rgba(255,255,255,0.13)',
  glassBorder:     'rgba(255,255,255,0.10)',   // subtle specular rim
  glassShadow:     'rgba(0,0,0,0.45)',

  // Shadows
  shadowCard:      '#000000',
  shadowNeon:      '#FF6B00',
  shadowAmber:     '#FFD54F',
};

export const Shadow = {
  card: {
    shadowColor:   '#000',
    shadowOffset:  { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius:  20,
    elevation:     12,
  },
  neon: {
    shadowColor:   '#FF6B00',
    shadowOffset:  { width: 0, height: 4 },
    shadowOpacity: 0.50,
    shadowRadius:  14,
    elevation:     10,
  },
  amber: {
    shadowColor:   '#FFD54F',
    shadowOffset:  { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius:  14,
    elevation:     10,
  },
};
