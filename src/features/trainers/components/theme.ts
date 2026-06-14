export const T = {
  // Core surfaces — stacked layers
  background:      '#161f1a',
  surface:         '#1b2620',
  surfaceElevated: '#202e27',
  foreground:      '#f8faf9',
  mutedFg:         '#7a9185',
  border:          '#2a3d33',
  input:           '#1e2d25',

  // Accent
  primary:         '#9ef53a',   // neon lime
  primaryFg:       '#161f1a',
  accent:          '#d4a53a',   // amber/gold
  accentFg:        '#161f1a',
  destructive:     '#d45a3a',
  ring:            '#9ef53a',

  // Glow / glass helpers
  neonGlow:        'rgba(158,245,58,0.35)',
  neonGlowFaint:   'rgba(158,245,58,0.10)',
  neonBorder:      'rgba(158,245,58,0.35)',
  amberGlow:       'rgba(212,165,58,0.35)',
  glassBg:         'rgba(32,46,39,0.60)',    // surface at 60% opacity
  glassHoverBg:    'rgba(38,55,46,0.70)',
  glassBorder:     'rgba(255,255,255,0.06)',

  // Shadows
  shadowCard:      '#000000',
  shadowNeon:      '#9ef53a',
  shadowAmber:     '#d4a53a',
};

// Reusable shadow presets
export const Shadow = {
  card: {
    shadowColor:   '#000',
    shadowOffset:  { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius:  20,
    elevation:     12,
  },
  neon: {
    shadowColor:   '#9ef53a',
    shadowOffset:  { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius:  14,
    elevation:     10,
  },
  amber: {
    shadowColor:   '#d4a53a',
    shadowOffset:  { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius:  14,
    elevation:     10,
  },
};
