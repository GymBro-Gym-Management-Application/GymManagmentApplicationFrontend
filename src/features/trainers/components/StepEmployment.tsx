import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { TrainerPayload } from '../types/trainer.types';
import { Field, SectionTitle, RowGrid, GridCell } from './FormFields';
import GlassCard from './GlassCard';
import { T } from './theme';

interface Props {
  data: Partial<TrainerPayload>;
  onChange: (fields: Partial<TrainerPayload>) => void;
}

export default function StepEmployment({ data, onChange }: Props) {
  const emp = data.employment ?? {} as any;
  const update = (fields: object) => onChange({ employment: { ...emp, ...fields } });

  return (
    <ScrollView style={s.container} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>

      <GlassCard style={s.card}>
        <SectionTitle icon="▣">Role</SectionTitle>
        <RowGrid>
          <GridCell>
            <Field label="Employment Type" value={emp.employmentType ?? ''} onChangeText={(v) => update({ employmentType: v })} />
          </GridCell>
          <GridCell>
            <Field label="Status" value={emp.status ?? ''} onChangeText={(v) => update({ status: v })} />
          </GridCell>
        </RowGrid>
        <Field label="Designation" value={emp.designation ?? ''} onChangeText={(v) => update({ designation: v })} />
        <Field label="Department" value={emp.department ?? ''} onChangeText={(v) => update({ department: v })} />
      </GlassCard>

      <GlassCard style={s.card}>
        <SectionTitle icon="◷">Dates</SectionTitle>
        <Field label="Joining Date (YYYY-MM-DD)" value={emp.joiningDate ?? ''} onChangeText={(v) => update({ joiningDate: v })} />
        <RowGrid>
          <GridCell>
            <Field label="Contract Start" value={emp.contractStartDate ?? ''} onChangeText={(v) => update({ contractStartDate: v })} />
          </GridCell>
          <GridCell>
            <Field label="Contract End" value={emp.contractEndDate ?? ''} onChangeText={(v) => update({ contractEndDate: v })} />
          </GridCell>
        </RowGrid>
      </GlassCard>

    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: T.background },
  content: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40, gap: 14 },
  card: { padding: 18 },
});
