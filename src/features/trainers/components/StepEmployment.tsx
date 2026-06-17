import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { TrainerPayload } from '../types/trainer.types';
import { Field, RowGrid, GridCell } from './FormFields';

const StyledScroll = ScrollView;
const StyledView   = View;
const StyledText   = Text;

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

export default function StepEmployment({ data, onChange }: Props) {
  const emp    = data.employment ?? {} as any;
  const update = (f: object) => onChange({ employment: { ...emp, ...f } });

  return (
    <StyledScroll className="flex-1 bg-bg" contentContainerStyle={{ paddingBottom: 48 }} showsVerticalScrollIndicator={false}>
      <Block num="01" title="Role">
        <RowGrid>
          <GridCell><Field label="Employment Type" value={emp.employmentType ?? ''} onChangeText={(v) => update({ employmentType: v })} /></GridCell>
          <GridCell><Field label="Status"          value={emp.status ?? ''}         onChangeText={(v) => update({ status: v })} /></GridCell>
        </RowGrid>
        <Field label="Designation" value={emp.designation ?? ''} onChangeText={(v) => update({ designation: v })} />
        <Field label="Department"  value={emp.department ?? ''}  onChangeText={(v) => update({ department: v })} />
      </Block>

      <StyledView className="h-px bg-lineSubtle mx-5" />

      <Block num="02" title="Dates">
        <Field label="Joining Date" value={emp.joiningDate ?? ''} onChangeText={(v) => update({ joiningDate: v })} placeholder="YYYY-MM-DD" />
        <RowGrid>
          <GridCell><Field label="Contract Start" value={emp.contractStartDate ?? ''} onChangeText={(v) => update({ contractStartDate: v })} placeholder="YYYY-MM-DD" /></GridCell>
          <GridCell><Field label="Contract End"   value={emp.contractEndDate ?? ''}   onChangeText={(v) => update({ contractEndDate: v })}   placeholder="YYYY-MM-DD" /></GridCell>
        </RowGrid>
      </Block>
    </StyledScroll>
  );
}
