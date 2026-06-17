import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { styled } from 'nativewind';
import { TrainerPayload } from '../types/trainer.types';
import { Field, SwitchRow, RowGrid, GridCell } from './FormFields';

const StyledScroll = styled(ScrollView);
const StyledView   = styled(View);
const StyledText   = styled(Text);

interface Props {
  data: Partial<TrainerPayload>;
  onChange: (fields: Partial<TrainerPayload>) => void;
}

function Block({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <StyledView className="px-5 pt-5 pb-2">
      <StyledView className="flex-row items-center gap-2.5 mb-4">
        <StyledView className="w-7 h-7 rounded-lg bg-brand/15 border border-brand/35 items-center justify-center">
          <StyledText className="text-xs font-extrabold text-brand">{num}</StyledText>
        </StyledView>
        <StyledText className="text-base font-bold text-white">{title}</StyledText>
      </StyledView>
      {children}
    </StyledView>
  );
}

export default function StepSalary({ data, onChange }: Props) {
  const sal    = data.salary ?? {} as any;
  const update = (f: object) => onChange({ salary: { ...sal, ...f } });

  return (
    <StyledScroll className="flex-1 bg-bg" contentContainerStyle={{ paddingBottom: 48 }} showsVerticalScrollIndicator={false}>
      <Block num="01" title="Base Pay">
        <RowGrid>
          <GridCell><Field label="Salary Type"   value={sal.salaryType ?? ''}   onChangeText={(v) => update({ salaryType: v })} /></GridCell>
          <GridCell><Field label="Payment Cycle" value={sal.paymentCycle ?? ''} onChangeText={(v) => update({ paymentCycle: v })} /></GridCell>
        </RowGrid>
        <RowGrid>
          <GridCell><Field label="Currency"     value={sal.currency ?? ''}            onChangeText={(v) => update({ currency: v })} /></GridCell>
          <GridCell><Field label="Basic Salary" value={String(sal.basicSalary ?? '')} onChangeText={(v) => update({ basicSalary: Number(v) })} keyboardType="numeric" /></GridCell>
        </RowGrid>
      </Block>

      <StyledView className="h-px bg-lineSubtle mx-5" />

      <Block num="02" title="Rates">
        <RowGrid>
          <GridCell><Field label="Hourly Rate" value={String(sal.hourlyRate ?? '')}     onChangeText={(v) => update({ hourlyRate: Number(v) })}     keyboardType="numeric" /></GridCell>
          <GridCell><Field label="Per Session" value={String(sal.perSessionRate ?? '')} onChangeText={(v) => update({ perSessionRate: Number(v) })} keyboardType="numeric" /></GridCell>
        </RowGrid>
        <RowGrid>
          <GridCell><Field label="Per Client" value={String(sal.perClientRate ?? '')} onChangeText={(v) => update({ perClientRate: Number(v) })} keyboardType="numeric" /></GridCell>
          <GridCell><Field label="Per Class"  value={String(sal.perClassRate ?? '')}  onChangeText={(v) => update({ perClassRate: Number(v) })}  keyboardType="numeric" /></GridCell>
        </RowGrid>
      </Block>

      <StyledView className="h-px bg-lineSubtle mx-5" />

      <Block num="03" title="Commission">
        <RowGrid>
          <GridCell><Field label="Commission Type"  value={sal.commissionType ?? ''}          onChangeText={(v) => update({ commissionType: v })} /></GridCell>
          <GridCell><Field label="Value"            value={String(sal.commissionValue ?? '')} onChangeText={(v) => update({ commissionValue: Number(v) })} keyboardType="numeric" /></GridCell>
        </RowGrid>
        <Field label="Based On"              value={sal.commissionBasedOn ?? ''}               onChangeText={(v) => update({ commissionBasedOn: v })} />
        <Field label="Min Guaranteed Amount" value={String(sal.minimumGuaranteedAmount ?? '')} onChangeText={(v) => update({ minimumGuaranteedAmount: Number(v) })} keyboardType="numeric" />
      </Block>

      <StyledView className="h-px bg-lineSubtle mx-5" />

      <Block num="04" title="Overtime">
        <SwitchRow label="Overtime Applicable" description="Enable overtime pay calculation" value={sal.overtimeApplicable ?? false} onValueChange={(v) => update({ overtimeApplicable: v })} />
        <Field label="Overtime Hourly Rate" value={String(sal.overtimeHourlyRate ?? '')} onChangeText={(v) => update({ overtimeHourlyRate: Number(v) })} keyboardType="numeric" />
      </Block>
    </StyledScroll>
  );
}
