import React, { useState } from 'react';
import { View, Text, TextInput, Switch, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { T } from './theme';

interface FieldProps {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
}

export function Field({ label, value, onChangeText, placeholder, keyboardType, multiline }: FieldProps) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={s.field}>
      {label !== '' && <Text style={s.label}>{label}</Text>}
      <TextInput
        style={[s.input, focused && s.inputFocused, multiline && s.multiline]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder ?? label}
        placeholderTextColor={T.mutedFg}
        keyboardType={keyboardType ?? 'default'}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
}

interface SwitchRowProps {
  label: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
  icon?: string;
}

export function SwitchRow({ label, value, onValueChange, icon }: SwitchRowProps) {
  return (
    <View style={s.switchRow}>
      <View style={s.switchLeft}>
        {icon && (
          <View style={[s.iconBox, value && s.iconBoxActive]}>
            <Text style={[s.iconSym, value && s.iconSymActive]}>{icon}</Text>
          </View>
        )}
        <Text style={[s.switchLabel, value && s.switchLabelActive]}>{label}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: T.border, true: T.neonGlow }}
        thumbColor={value ? T.primary : T.mutedFg}
      />
    </View>
  );
}

interface SectionTitleProps {
  children: string;
  icon?: string;
}

export function SectionTitle({ children, icon }: SectionTitleProps) {
  return (
    <View style={s.sectionHeader}>
      {icon && (
        <View style={s.sectionIconBox}>
          <Text style={s.sectionIconSym}>{icon}</Text>
        </View>
      )}
      <Text style={s.sectionTitle}>{children}</Text>
      <View style={s.sectionLine} />
    </View>
  );
}

export function RowGrid({ children }: { children: React.ReactNode }) {
  return <View style={s.rowGrid}>{children}</View>;
}

export function GridCell({ children }: { children: React.ReactNode }) {
  return <View style={s.gridCell}>{children}</View>;
}

const s = StyleSheet.create({
  field: { marginBottom: 14 },
  label: {
    fontSize: 11, fontWeight: '700', color: T.mutedFg,
    marginBottom: 6, letterSpacing: 0.8, textTransform: 'uppercase',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 13,
    fontSize: 14, color: T.foreground,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.09)',
  },
  inputFocused: {
    backgroundColor: 'rgba(255,255,255,0.11)',
    borderColor: T.primary,
    shadowColor: T.primary, shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25, shadowRadius: 8, elevation: 4,
  },
  multiline: { height: 90, textAlignVertical: 'top' },

  switchRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingVertical: 12,
  },
  switchLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 12 },
  iconBox: {
    width: 30, height: 30, borderRadius: 9,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)',
    alignItems: 'center', justifyContent: 'center', marginRight: 10,
  },
  iconBoxActive: { backgroundColor: T.neonGlowFaint, borderColor: T.neonBorder },
  iconSym: { fontSize: 13, color: T.mutedFg },
  iconSymActive: { color: T.primary },
  switchLabel: { fontSize: 14, color: T.mutedFg, flex: 1 },
  switchLabelActive: { color: T.foreground },

  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 14, marginTop: 6 },
  sectionIconBox: {
    width: 24, height: 24, borderRadius: 7,
    backgroundColor: T.neonGlowFaint,
    borderWidth: 1, borderColor: T.neonBorder,
    alignItems: 'center', justifyContent: 'center', marginRight: 8,
  },
  sectionIconSym: { fontSize: 11, color: T.primary, fontWeight: '700' },
  sectionTitle: {
    fontSize: 11, fontWeight: '800', color: T.primary,
    letterSpacing: 1.5, textTransform: 'uppercase', marginRight: 10,
  },
  sectionLine: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.06)' },

  rowGrid: { flexDirection: 'row', gap: 10 },
  gridCell: { flex: 1 },
});
