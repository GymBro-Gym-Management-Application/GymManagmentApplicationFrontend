export const T = {
  bg:            '#09090B',
  bgPanel:       '#111113',
  bgInput:       '#18181B',
  bgInputActive: '#1F1F23',

  line:          '#27272A',
  lineSubtle:    '#1C1C1F',
  lineBright:    '#3F3F46',

  text:          '#FAFAFA',
  textSub:       '#A1A1AA',
  textFaint:     '#52525B',
  textDisabled:  '#3F3F46',

  brand:         '#F97316',
  brandDim:      'rgba(249,115,22,0.15)',
  brandBorder:   'rgba(249,115,22,0.35)',
  brandText:     '#FFFFFF',

  accent:        '#FACC15',
  accentDim:     'rgba(250,204,21,0.12)',
  accentText:    '#09090B',

  ok:            '#22C55E',
  okDim:         'rgba(34,197,94,0.12)',
  err:           '#EF4444',
  errDim:        'rgba(239,68,68,0.10)',

  // legacy aliases so old imports don't break
  background:      '#09090B',
  surface:         '#111113',
  surfaceRaised:   '#18181B',
  surfaceOverlay:  '#1F1F23',
  surfaceElevated: '#18181B',
  foreground:      '#FAFAFA',
  foregroundMuted: '#A1A1AA',
  foregroundFaint: '#52525B',
  primary:         '#F97316',
  primaryLight:    '#FB923C',
  primaryFg:       '#FFFFFF',
  primaryBg:       'rgba(249,115,22,0.12)',
  primaryBorder:   'rgba(249,115,22,0.32)',
  primaryGlow:     'rgba(249,115,22,0.18)',
  accent2:         '#FACC15',
  accentFg:        '#09090B',
  accentBg:        'rgba(250,204,21,0.10)',
  accentBorder:    'rgba(250,204,21,0.28)',
  success:         '#22C55E',
  successBg:       'rgba(34,197,94,0.10)',
  successBorder:   'rgba(34,197,94,0.26)',
  destructive:     '#EF4444',
  destructiveBg:   'rgba(239,68,68,0.10)',
  border:          '#27272A',
  borderSubtle:    '#1C1C1F',
  divider:         'rgba(255,255,255,0.05)',
  mutedFg:         '#A1A1AA',
  input:           '#18181B',
  ring:            '#F97316',
  neonGlow:        'rgba(249,115,22,0.30)',
  neonGlowFaint:   'rgba(249,115,22,0.12)',
  neonBorder:      'rgba(249,115,22,0.32)',
  amberGlow:       'rgba(250,204,21,0.25)',
  glassBg:         'rgba(255,255,255,0.04)',
  glassElevated:   'rgba(255,255,255,0.07)',
  glassHighlight:  'rgba(255,255,255,0.09)',
  glassHoverBg:    'rgba(255,255,255,0.08)',
  glassBorder:     'rgba(255,255,255,0.07)',
  glassShadow:     'rgba(0,0,0,0.55)',
  shadowCard:      '#000000',
  shadowNeon:      '#F97316',
  shadowAmber:     '#FACC15',
};

export const Shadow = {
  card:  { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 14, elevation: 7 },
  neon:  { shadowColor: '#F97316', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.40, shadowRadius: 12, elevation: 9 },
  amber: { shadowColor: '#FACC15', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 12, elevation: 9 },
  sm:    { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.22, shadowRadius: 5, elevation: 3 },
};

export const TY = {
  xs:    { fontSize: 11, lineHeight: 15 },
  sm:    { fontSize: 13, lineHeight: 18 },
  base:  { fontSize: 15, lineHeight: 22 },
  lg:    { fontSize: 17, lineHeight: 24 },
  xl:    { fontSize: 20, lineHeight: 28 },
  xxl:   { fontSize: 26, lineHeight: 34 },
  label: { fontSize: 11, fontWeight: '600' as const, letterSpacing: 0.5, textTransform: 'uppercase' as const },
};

export const SP = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28 };
export const R  = { sm: 6, md: 10, lg: 14, xl: 18, full: 999 };
