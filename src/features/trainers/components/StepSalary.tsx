import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { TrainerPayload } from '../types/trainer.types';
import { Field, SwitchRow, SectionTitle, RowGrid, GridCell } from './FormFields';
import GlassCard from './GlassCard';
import { T } from './theme';

interface Props {
  data: Partial<TrainerPayload>;
  onChange: (fields: Partial<TrainerPayload>) => void;
}

export default function StepSalary({ data, onChange }: Props) {
  const sal = data.salary ?? {} as any;
  const update = (fields: object) => onChange({ salary: { ...sal, ...fields } });

  return (
    <ScrollView style={s.container} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>

      <GlassCard style={s.card}>
        <SectionTitle icon="◈">Base Pay</SectionTitle>
        <RowGrid>
          <GridCell><Field label="Salary Type" value={sal.salaryType ?? ''} onChangeText={(v) => update({ salaryType: v })} /></GridCell>
          <GridCell><Field label="Payment Cycle" value={sal.paymentCycle ?? ''} onChangeText={(v) => update({ paymentCycle: v })} /></GridCell>
        </RowGrid>
        <RowGrid>
          <GridCell><Field label="Currency" value={sal.currency ?? ''} onChangeText={(v) => update({ currency: v })} /></GridCell>
          <GridCell><Field label="Basic Salary" value={String(sal.basicSalary ?? '')} onChangeText={(v) => update({ basicSalary: Number(v) })} keyboardType="numeric" /></GridCell>
        </RowGrid>
      </GlassCard>

      <GlassCard style={s.card}>
        <SectionTitle icon="◫">Rates</SectionTitle>
        <RowGrid>
          <GridCell><Field label="Hourly Rate" value={String(sal.hourlyRate ?? '')} onChangeText={(v) => update({ hourlyRate: Number(v) })} keyboardType="numeric" /></GridCell>
          <GridCell><Field label="Per Session" value={String(sal.perSessionRate ?? '')} onChangeText={(v) => update({ perSessionRate: Number(v) })} keyboardType="numeric" /></GridCell>
        </RowGrid>
        <RowGrid>
          <GridCell><Field label="Per Client" value={String(sal.perClientRate ?? '')} onChangeText={(v) => update({ perClientRate: Number(v) })} keyboardType="numeric" /></GridCell>
          <GridCell><Field label="Per Class" value={String(sal.perClassRate ?? '')} onChangeText={(v) => update({ perClassRate: Number(v) })} keyboardType="numeric" /></GridCell>
        </RowGrid>
      </GlassCard>

      <GlassCard style={s.card}>
        <SectionTitle icon="◎">Commission</SectionTitle>
        <RowGrid>
          <GridCell><Field label="Commission Type" value={sal.commissionType ?? ''} onChangeText={(v) => update({ commissionType: v })} /></GridCell>
          <GridCell><Field label="Commission Value" value={String(sal.commissionValue ?? '')} onChangeText={(v) => update({ commissionValue: Number(v) })} keyboardType="numeric" /></GridCell>
        </RowGrid>
        <Field label="Commission Based On" value={sal.commissionBasedOn ?? ''} onChangeText={(v) => update({ commissionBasedOn: v })} />
        <Field label="Min Guaranteed Amount" value={String(sal.minimumGuaranteedAmount ?? '')} onChangeText={(v) => update({ minimumGuaranteedAmount: Number(v) })} keyboardType="numeric" />
      </GlassCard>

      <GlassCard style={s.card}>
        <SectionTitle icon="◆">Overtime</SectionTitle>
        <SwitchRow icon="◷" label="Overtime Applicable" value={sal.overtimeApplicable ?? false} onValueChange={(v) => update({ overtimeApplicable: v })} />
        <Field label="Overtime Hourly Rate" value={String(sal.overtimeHourlyRate ?? '')} onChangeText={(v) => update({ overtimeHourlyRate: Number(v) })} keyboardType="numeric" />
      </GlassCard>

    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: T.background },
  content: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40, gap: 14 },
  card: { padding: 18 },
});
