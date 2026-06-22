// ─── Design Tokens ────────────────────────────────────────────────
// Dark mode. Electric-lime accent. Nike × premium gym aesthetic.

export const T = {
  bg:            '#0D0D0D',
  bgPanel:       '#0D0D0D',
  bgInput:       '#1A1A1A',
  bgInputActive: '#222222',

  line:       '#2A2A2A',
  lineSubtle: '#1A1A1A',
  lineBright: '#AAFF00',

  text:         '#FFFFFF',
  textSub:      '#AAAAAA',
  textFaint:    '#666666',
  textDisabled: '#444444',

  brand:       '#AAFF00',
  brandDark:   '#88CC00',
  brandDim:    'rgba(170,255,0,0.10)',
  brandBorder: 'rgba(170,255,0,0.25)',

  onBrand: '#000000',

  ok:    '#22C55E',
  okDim: 'rgba(34,197,94,0.12)',
  err:   '#EF4444',
  errDim:'rgba(239,68,68,0.10)',

  // Legacy aliases
  accent:          '#AAFF00',
  accentDim:       'rgba(170,255,0,0.10)',
  accentText:      '#000000',
  background:      '#0D0D0D',
  surface:         '#1A1A1A',
  surfaceRaised:   '#222222',
  surfaceOverlay:  '#222222',
  surfaceElevated: '#222222',
  foreground:      '#FFFFFF',
  foregroundMuted: '#AAAAAA',
  foregroundFaint: '#666666',
  primary:         '#AAFF00',
  primaryLight:    '#CCFF55',
  primaryFg:       '#000000',
  primaryBg:       'rgba(170,255,0,0.10)',
  primaryBorder:   'rgba(170,255,0,0.25)',
  primaryGlow:     'rgba(170,255,0,0.15)',
  accent2:         '#AAFF00',
  accentFg:        '#000000',
  accentBg:        'rgba(170,255,0,0.10)',
  accentBorder:    'rgba(170,255,0,0.25)',
  success:         '#22C55E',
  successBg:       'rgba(34,197,94,0.10)',
  successBorder:   'rgba(34,197,94,0.26)',
  destructive:     '#EF4444',
  destructiveBg:   'rgba(239,68,68,0.10)',
  border:          '#2A2A2A',
  borderSubtle:    '#1A1A1A',
  divider:         'rgba(255,255,255,0.06)',
  mutedFg:         '#AAAAAA',
  input:           '#1A1A1A',
  ring:            '#AAFF00',
  neonGlow:        'rgba(170,255,0,0.25)',
  neonGlowFaint:   'rgba(170,255,0,0.08)',
  neonBorder:      'rgba(170,255,0,0.25)',
  glassBg:         'rgba(255,255,255,0.03)',
  glassElevated:   'rgba(255,255,255,0.05)',
  glassHighlight:  'rgba(255,255,255,0.07)',
  glassBorder:     'rgba(255,255,255,0.06)',
  glassShadow:     'rgba(0,0,0,0.55)',
  shadowCard:      '#000000',
  shadowNeon:      '#AAFF00',
};

export const Shadow = {
  card:  { shadowColor: '#000',    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.40, shadowRadius: 14, elevation: 7 },
  neon:  { shadowColor: '#AAFF00', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.28, shadowRadius: 12, elevation: 9 },
  sm:    { shadowColor: '#000',    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 5,  elevation: 3 },
};

export const TY = {
  xs:    { fontSize: 11, lineHeight: 15 },
  sm:    { fontSize: 13, lineHeight: 18 },
  base:  { fontSize: 15, lineHeight: 22 },
  lg:    { fontSize: 17, lineHeight: 24 },
  xl:    { fontSize: 20, lineHeight: 28 },
  xxl:   { fontSize: 28, lineHeight: 36 },
  label: { fontSize: 11, fontWeight: '600' as const, letterSpacing: 0.4, textTransform: 'uppercase' as const },
};

export const SP = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28 };
export const R  = { sm: 6, md: 12, lg: 16, xl: 20, pill: 999, full: 999 };
