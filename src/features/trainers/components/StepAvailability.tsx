import React from 'react';
import { View, Text, TextInput, Switch, ScrollView, StyleSheet } from 'react-native';
import { TrainerPayload, Availability } from '../types/trainer.types';
import { SectionTitle } from './FormFields';
import GlassCard from './GlassCard';
import { T } from './theme';

interface Props {
  data: Partial<TrainerPayload>;
  onChange: (fields: Partial<TrainerPayload>) => void;
}

const DAY_ICONS: Record<string, string> = {
  Monday:    '☀️',
  Tuesday:   '🌤',
  Wednesday: '⛅',
  Thursday:  '🌦',
  Friday:    '⚡',
  Saturday:  '🌙',
  Sunday:    '🪐',
};

export default function StepAvailability({ data, onChange }: Props) {
  const availability: Availability[] = data.availability ?? [];
  const activeDays = availability.filter((a) => a.isAvailable).length;

  const updateDay = (index: number, fields: Partial<Availability>) =>
    onChange({ availability: availability.map((a, i) => (i === index ? { ...a, ...fields } : a)) });

  return (
    <ScrollView style={s.container} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>

      <GlassCard style={s.summaryCard}>
        <SectionTitle icon="📅">Weekly Schedule</SectionTitle>
        <View style={s.summaryRow}>
          <View style={s.summaryLeft}>
            <Text style={s.summaryNum}>{activeDays}</Text>
            <Text style={s.summaryLabel}>days active</Text>
          </View>
          <View style={s.dayBar}>
            {availability.map((item) => (
              <View key={item.day} style={[s.dayBarSeg, item.isAvailable && s.dayBarSegActive]} />
            ))}
          </View>
        </View>
      </GlassCard>

      {availability.map((item, index) => (
        <GlassCard key={item.day} style={s.dayCard} neonBorder={item.isAvailable}>
          <View style={s.dayRow}>
            <View style={s.dayLeft}>
              <View style={[s.dayIconBox, item.isAvailable && s.dayIconBoxActive]}>
                <Text style={s.dayEmoji}>{DAY_ICONS[item.day] ?? '📅'}</Text>
              </View>
              <View>
                <Text style={[s.dayLabel, item.isAvailable && s.dayLabelActive]}>{item.day}</Text>
                {item.isAvailable && item.startTime && item.endTime
                  ? <Text style={s.dayTime}>{item.startTime} – {item.endTime}</Text>
                  : <Text style={s.dayOff}>{item.isAvailable ? 'Set hours below' : 'Day off'}</Text>
                }
              </View>
            </View>
            <Switch
              value={item.isAvailable}
              onValueChange={(v) => updateDay(index, { isAvailable: v })}
              trackColor={{ false: T.border, true: T.neonGlow }}
              thumbColor={item.isAvailable ? T.primary : T.mutedFg}
            />
          </View>

          {item.isAvailable && (
            <View style={s.timeRow}>
              <View style={s.timeCell}>
                <View style={s.timeLabelRow}>
                  <View style={s.timeDot} />
                  <Text style={s.timeLabel}>START</Text>
                </View>
                <TextInput
                  style={s.timeInput}
                  value={item.startTime}
                  onChangeText={(v) => updateDay(index, { startTime: v })}
                  placeholder="09:00"
                  placeholderTextColor={T.mutedFg}
                />
              </View>
              <Text style={s.arrow}>→</Text>
              <View style={s.timeCell}>
                <View style={s.timeLabelRow}>
                  <View style={[s.timeDot, s.timeDotEnd]} />
                  <Text style={s.timeLabel}>END</Text>
                </View>
                <TextInput
                  style={s.timeInput}
                  value={item.endTime}
                  onChangeText={(v) => updateDay(index, { endTime: v })}
                  placeholder="17:00"
                  placeholderTextColor={T.mutedFg}
                />
              </View>
            </View>
          )}
        </GlassCard>
      ))}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: T.background },
  content: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40, gap: 10 },
  summaryCard: { padding: 18 },
  summaryRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  summaryLeft: { flexDirection: 'row', alignItems: 'baseline', gap: 6 },
  summaryNum: { fontSize: 32, fontWeight: '800', color: T.primary },
  summaryLabel: { fontSize: 13, color: T.mutedFg },
  dayBar: { flexDirection: 'row', gap: 4 },
  dayBarSeg: { width: 10, height: 28, borderRadius: 4, backgroundColor: T.border },
  dayBarSegActive: { backgroundColor: T.primary },
  dayCard: { padding: 16 },
  dayRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dayLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  dayIconBox: {
    width: 38, height: 38, borderRadius: 10,
    backgroundColor: T.input, borderWidth: 1, borderColor: T.border,
    alignItems: 'center', justifyContent: 'center',
  },
  dayIconBoxActive: { backgroundColor: T.neonGlowFaint, borderColor: T.neonBorder },
  dayEmoji: { fontSize: 18 },
  dayLabel: { fontSize: 15, fontWeight: '700', color: T.mutedFg },
  dayLabelActive: { color: T.foreground },
  dayTime: { fontSize: 12, color: T.primary, marginTop: 2 },
  dayOff: { fontSize: 11, color: T.mutedFg, marginTop: 2 },
  timeRow: { flexDirection: 'row', alignItems: 'flex-end', marginTop: 14, gap: 8 },
  timeCell: { flex: 1 },
  timeLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 5 },
  timeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: T.primary },
  timeDotEnd: { backgroundColor: T.destructive },
  timeLabel: { fontSize: 10, fontWeight: '800', color: T.mutedFg, letterSpacing: 1.2 },
  timeInput: {
    backgroundColor: T.input, borderWidth: 1, borderColor: T.border,
    borderRadius: 8, paddingVertical: 10, fontSize: 14,
    color: T.foreground, textAlign: 'center',
  },
  arrow: { fontSize: 18, color: T.mutedFg, paddingBottom: 10 },
});
