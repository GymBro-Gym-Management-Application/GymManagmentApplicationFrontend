import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { TrainerPayload } from '../types/trainer.types';
import { Field, SwitchRow, SectionTitle, RowGrid, GridCell } from './FormFields';
import GlassCard from './GlassCard';
import { T } from './theme';

interface Props {
  data: Partial<TrainerPayload>;
  onChange: (fields: Partial<TrainerPayload>) => void;
}

export default function StepMiscellaneous({ data, onChange }: Props) {
  const ec = data.emergencyContact ?? {} as any;
  const sl = data.socialLinks ?? {} as any;
  const att = data.attendanceSettings ?? {} as any;
  const updateEc = (f: object) => onChange({ emergencyContact: { ...ec, ...f } });
  const updateSl = (f: object) => onChange({ socialLinks: { ...sl, ...f } });
  const updateAtt = (f: object) => onChange({ attendanceSettings: { ...att, ...f } });

  return (
    <ScrollView style={s.container} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>

      <GlassCard style={s.card}>
        <SectionTitle icon="🚨">Emergency Contact</SectionTitle>
        <RowGrid>
          <GridCell><Field label="Name" value={ec.name ?? ''} onChangeText={(v) => updateEc({ name: v })} /></GridCell>
          <GridCell><Field label="Relation" value={ec.relation ?? ''} onChangeText={(v) => updateEc({ relation: v })} /></GridCell>
        </RowGrid>
        <Field label="Phone" value={ec.phone ?? ''} onChangeText={(v) => updateEc({ phone: v })} keyboardType="phone-pad" />
        <Field label="Address" value={ec.address ?? ''} onChangeText={(v) => updateEc({ address: v })} />
      </GlassCard>

      <GlassCard style={s.card}>
        <SectionTitle icon="🔗">Social Links</SectionTitle>
        <RowGrid>
          <GridCell><Field label="Instagram" value={sl.instagram ?? ''} onChangeText={(v) => updateSl({ instagram: v })} /></GridCell>
          <GridCell><Field label="Facebook" value={sl.facebook ?? ''} onChangeText={(v) => updateSl({ facebook: v })} /></GridCell>
        </RowGrid>
        <RowGrid>
          <GridCell><Field label="YouTube" value={sl.youtube ?? ''} onChangeText={(v) => updateSl({ youtube: v })} /></GridCell>
          <GridCell><Field label="Website" value={sl.website ?? ''} onChangeText={(v) => updateSl({ website: v })} keyboardType="url" /></GridCell>
        </RowGrid>
      </GlassCard>

      <GlassCard style={s.card}>
        <SectionTitle icon="🕐">Attendance</SectionTitle>
        <SwitchRow icon="✅" label="Attendance Required" value={att.attendanceRequired ?? false} onValueChange={(v) => updateAtt({ attendanceRequired: v })} />
        <RowGrid>
          <GridCell><Field label="Late Mark (mins)" value={String(att.lateMarkAfterMinutes ?? '')} onChangeText={(v) => updateAtt({ lateMarkAfterMinutes: Number(v) })} keyboardType="numeric" /></GridCell>
          <GridCell><Field label="Half Day (mins)" value={String(att.halfDayAfterMinutes ?? '')} onChangeText={(v) => updateAtt({ halfDayAfterMinutes: Number(v) })} keyboardType="numeric" /></GridCell>
        </RowGrid>
        <Field label="Min Working Hours" value={String(att.minimumWorkingHours ?? '')} onChangeText={(v) => updateAtt({ minimumWorkingHours: Number(v) })} keyboardType="numeric" />
        <Field label="Weekly Off Days (comma separated)" value={(att.weeklyOffDays ?? []).join(', ')} onChangeText={(v) => updateAtt({ weeklyOffDays: v.split(',').map((x: string) => x.trim()).filter(Boolean) })} placeholder="e.g. Saturday, Sunday" />
      </GlassCard>

      <GlassCard style={s.card}>
        <SectionTitle icon="📝">Notes</SectionTitle>
        <TextInput
          style={s.notes}
          value={data.notes ?? ''}
          onChangeText={(v) => onChange({ notes: v })}
          placeholder="Additional notes about the trainer..."
          placeholderTextColor={T.mutedFg}
          multiline
          textAlignVertical="top"
        />
      </GlassCard>

    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: T.background },
  content: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40, gap: 14 },
  card: { padding: 18 },
  notes: {
    backgroundColor: T.input, borderWidth: 1, borderColor: T.border,
    borderRadius: 10, padding: 14, fontSize: 14, color: T.foreground, height: 110,
  },
});
