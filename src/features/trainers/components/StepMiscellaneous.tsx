import React from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet } from 'react-native';
import { TrainerPayload } from '../types/trainer.types';
import { Field, SwitchRow, RowGrid, GridCell } from './FormFields';
import { T, R } from './theme';

interface Props {
  data: Partial<TrainerPayload>;
  onChange: (fields: Partial<TrainerPayload>) => void;
}

function Block({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <View style={b.wrap}>
      <View style={b.header}>
        <View style={b.numBadge}><Text style={b.num}>{num}</Text></View>
        <Text style={b.title}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

export default function StepMiscellaneous({ data, onChange }: Props) {
  const ec  = data.emergencyContact   ?? {} as any;
  const sl  = data.socialLinks        ?? {} as any;
  const att = data.attendanceSettings ?? {} as any;
  const updateEc  = (f: object) => onChange({ emergencyContact:   { ...ec,  ...f } });
  const updateSl  = (f: object) => onChange({ socialLinks:        { ...sl,  ...f } });
  const updateAtt = (f: object) => onChange({ attendanceSettings: { ...att, ...f } });

  return (
    <ScrollView style={s.root} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>

      <Block num="01" title="Emergency Contact">
        <RowGrid>
          <GridCell><Field label="Name"     value={ec.name ?? ''}     onChangeText={(v) => updateEc({ name: v })} /></GridCell>
          <GridCell><Field label="Relation" value={ec.relation ?? ''} onChangeText={(v) => updateEc({ relation: v })} /></GridCell>
        </RowGrid>
        <Field label="Phone"   value={ec.phone ?? ''}   onChangeText={(v) => updateEc({ phone: v })}   keyboardType="phone-pad" />
        <Field label="Address" value={ec.address ?? ''} onChangeText={(v) => updateEc({ address: v })} />
      </Block>

      <View style={s.divider} />

      <Block num="02" title="Social Links">
        <RowGrid>
          <GridCell><Field label="Instagram" value={sl.instagram ?? ''} onChangeText={(v) => updateSl({ instagram: v })} /></GridCell>
          <GridCell><Field label="Facebook"  value={sl.facebook ?? ''}  onChangeText={(v) => updateSl({ facebook: v })} /></GridCell>
        </RowGrid>
        <RowGrid>
          <GridCell><Field label="YouTube" value={sl.youtube ?? ''} onChangeText={(v) => updateSl({ youtube: v })} /></GridCell>
          <GridCell><Field label="Website" value={sl.website ?? ''} onChangeText={(v) => updateSl({ website: v })} keyboardType="url" /></GridCell>
        </RowGrid>
      </Block>

      <View style={s.divider} />

      <Block num="03" title="Attendance">
        <SwitchRow label="Attendance Required" value={att.attendanceRequired ?? false} onValueChange={(v) => updateAtt({ attendanceRequired: v })} />
        <RowGrid>
          <GridCell><Field label="Late Mark (mins)" value={String(att.lateMarkAfterMinutes ?? '')} onChangeText={(v) => updateAtt({ lateMarkAfterMinutes: Number(v) })} keyboardType="numeric" /></GridCell>
          <GridCell><Field label="Half Day (mins)"  value={String(att.halfDayAfterMinutes ?? '')}  onChangeText={(v) => updateAtt({ halfDayAfterMinutes: Number(v) })}  keyboardType="numeric" /></GridCell>
        </RowGrid>
        <Field label="Min Working Hours" value={String(att.minimumWorkingHours ?? '')} onChangeText={(v) => updateAtt({ minimumWorkingHours: Number(v) })} keyboardType="numeric" />
        <Field label="Weekly Off Days"   value={(att.weeklyOffDays ?? []).join(', ')}  onChangeText={(v) => updateAtt({ weeklyOffDays: v.split(',').map((x: string) => x.trim()).filter(Boolean) })} placeholder="e.g. Saturday, Sunday" />
      </Block>

      <View style={s.divider} />

      <Block num="04" title="Notes">
        <TextInput
          style={s.notes}
          value={data.notes ?? ''}
          onChangeText={(v) => onChange({ notes: v })}
          placeholder="Additional notes about the trainer..."
          placeholderTextColor={T.textFaint}
          multiline
          textAlignVertical="top"
        />
      </Block>

    </ScrollView>
  );
}

const s = StyleSheet.create({
  root:    { flex: 1, backgroundColor: T.bg },
  content: { paddingBottom: 48 },
  divider: { height: 1, backgroundColor: T.lineSubtle, marginHorizontal: 20 },
  notes: {
    backgroundColor: T.bgInput,
    borderWidth: 1, borderColor: T.line,
    borderRadius: R.md, paddingHorizontal: 12, paddingVertical: 11,
    fontSize: 14, color: T.text,
    height: 110, marginTop: 4,
    textAlignVertical: 'top',
  },
});
const b = StyleSheet.create({
  wrap:     { paddingHorizontal: 20, paddingTop: 22, paddingBottom: 10 },
  header:   { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  numBadge: { width: 28, height: 28, borderRadius: 8, backgroundColor: T.brandDim, borderWidth: 1, borderColor: T.brandBorder, alignItems: 'center', justifyContent: 'center' },
  num:      { fontSize: 11, fontWeight: '800', color: T.brand, letterSpacing: 0.5 },
  title:    { fontSize: 16, fontWeight: '700', color: T.text },
});
