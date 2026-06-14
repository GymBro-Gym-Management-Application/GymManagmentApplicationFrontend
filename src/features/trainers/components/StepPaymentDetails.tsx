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

export default function StepPaymentDetails({ data, onChange }: Props) {
  const pd = data.paymentDetails ?? {} as any;
  const update = (fields: object) => onChange({ paymentDetails: { ...pd, ...fields } });

  return (
    <ScrollView style={s.container} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>

      <GlassCard style={s.card}>
        <SectionTitle icon="▨">Bank Details</SectionTitle>
        <Field label="Payment Mode" value={pd.paymentMode ?? ''} onChangeText={(v) => update({ paymentMode: v })} />
        <Field label="Bank Name" value={pd.bankName ?? ''} onChangeText={(v) => update({ bankName: v })} />
        <Field label="Account Holder Name" value={pd.accountHolderName ?? ''} onChangeText={(v) => update({ accountHolderName: v })} />
        <RowGrid>
          <GridCell><Field label="Account Number" value={pd.accountNumber ?? ''} onChangeText={(v) => update({ accountNumber: v })} keyboardType="numeric" /></GridCell>
          <GridCell><Field label="IFSC Code" value={pd.ifscCode ?? ''} onChangeText={(v) => update({ ifscCode: v })} /></GridCell>
        </RowGrid>
      </GlassCard>

      <GlassCard style={s.card}>
        <SectionTitle icon="◈">Digital & Tax</SectionTitle>
        <Field label="UPI ID" value={pd.upiId ?? ''} onChangeText={(v) => update({ upiId: v })} />
        <Field label="Tax Number" value={pd.taxNumber ?? ''} onChangeText={(v) => update({ taxNumber: v })} />
      </GlassCard>

    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: T.background },
  content: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40, gap: 14 },
  card: { padding: 18 },
});
