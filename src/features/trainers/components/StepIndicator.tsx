import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { T } from './theme';

interface Props {
  current: number;
  total: number;
  labels: string[];
  onStepPress?: (i: number) => void;
}

const STEP_ICONS: Array<keyof typeof Ionicons.glyphMap> = [
  'person-outline',
  'briefcase-outline',
  'cash-outline',
  'card-outline',
  'calendar-outline',
  'settings-outline',
  'ribbon-outline',
  'ellipsis-horizontal-circle-outline',
];

export default function StepIndicator({ current, total, labels, onStepPress }: Props) {
  return (
    <View style={s.wrapper}>
      {/* Scrollable chip tab row */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.tabRow}>
        {labels.map((label, i) => {
          const isActive = i === current;
          const isDone = i < current;
          return (
            <TouchableOpacity
              key={i}
              onPress={() => onStepPress?.(i)}
              activeOpacity={0.7}
              style={[s.chip, isActive && s.chipActive, isDone && s.chipDone]}
            >
              <Ionicons
                name={isDone ? 'checkmark-circle' : STEP_ICONS[i]}
                size={14}
                color={isDone ? T.primary : isActive ? T.primary : T.mutedFg}
              />
              <Text style={[s.chipText, isActive && s.chipTextActive, isDone && s.chipTextDone]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Segmented progress bar */}
      <View style={s.bar}>
        {Array.from({ length: total }).map((_, i) => (
          <View key={i} style={[s.seg, i < current && s.segDone, i === current && s.segActive, i > current && s.segInactive]} />
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.07)',
  },
  tabRow: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 12, paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)',
  },
  chipActive: {
    backgroundColor: T.neonGlowFaint,
    borderColor: T.neonBorder,
    shadowColor: T.primary, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, shadowRadius: 6, elevation: 4,
  },
  chipDone: { opacity: 0.55, backgroundColor: 'transparent' },
  chipText: { fontSize: 12, fontWeight: '600', color: T.mutedFg },
  chipTextActive: { color: T.primary, fontWeight: '700' },
  chipTextDone: { color: T.mutedFg },
  bar: { flexDirection: 'row', height: 3 },
  seg: { flex: 1 },
  segDone: { backgroundColor: T.primary, opacity: 0.45 },
  segActive: { backgroundColor: T.primary },
  segInactive: { backgroundColor: T.border },
});
