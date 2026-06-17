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

export default function StepPaymentDetails({ data, onChange }: Props) {
  const pd     = data.paymentDetails ?? {} as any;
  const update = (f: object) => onChange({ paymentDetails: { ...pd, ...f } });

  return (
    <StyledScroll className="flex-1 bg-bg" contentContainerStyle={{ paddingBottom: 48 }} showsVerticalScrollIndicator={false}>
      <Block num="01" title="Bank Details">
        <Field label="Payment Mode"        value={pd.paymentMode ?? ''}       onChangeText={(v) => update({ paymentMode: v })} />
        <Field label="Bank Name"           value={pd.bankName ?? ''}          onChangeText={(v) => update({ bankName: v })} />
        <Field label="Account Holder Name" value={pd.accountHolderName ?? ''} onChangeText={(v) => update({ accountHolderName: v })} />
        <RowGrid>
          <GridCell><Field label="Account Number" value={pd.accountNumber ?? ''} onChangeText={(v) => update({ accountNumber: v })} keyboardType="numeric" /></GridCell>
          <GridCell><Field label="IFSC Code"      value={pd.ifscCode ?? ''}      onChangeText={(v) => update({ ifscCode: v })} /></GridCell>
        </RowGrid>
      </Block>

      <StyledView className="h-px bg-lineSubtle mx-5" />

      <Block num="02" title="Digital & Tax">
        <Field label="UPI ID"     value={pd.upiId ?? ''}     onChangeText={(v) => update({ upiId: v })} />
        <Field label="Tax Number" value={pd.taxNumber ?? ''} onChangeText={(v) => update({ taxNumber: v })} />
      </Block>
    </StyledScroll>
  );
}
