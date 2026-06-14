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

export default function StepBasicInfo({ data, onChange }: Props) {
  return (
    <ScrollView style={s.container} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>

      <GlassCard style={s.card}>
        <SectionTitle icon="◈">Identity</SectionTitle>
        <Field label="Display Name" value={data.displayName ?? ''} onChangeText={(v) => onChange({ displayName: v })} />
        <Field label="Trainer Code" value={data.trainerCode ?? ''} onChangeText={(v) => onChange({ trainerCode: v })} />
        <RowGrid>
          <GridCell>
            <Field label="Gender" value={data.gender ?? ''} onChangeText={(v) => onChange({ gender: v })} />
          </GridCell>
          <GridCell>
            <Field label="Exp. Years" value={String(data.experienceYears ?? '')} onChangeText={(v) => onChange({ experienceYears: Number(v) })} keyboardType="numeric" />
          </GridCell>
        </RowGrid>
        <Field label="Date of Birth (YYYY-MM-DD)" value={data.dateOfBirth ?? ''} onChangeText={(v) => onChange({ dateOfBirth: v })} />
      </GlassCard>

      <GlassCard style={s.card}>
        <SectionTitle icon="◉">Contact</SectionTitle>
        <Field label="Email" value={data.email ?? ''} onChangeText={(v) => onChange({ email: v })} keyboardType="email-address" />
        <Field label="Phone" value={data.phone ?? ''} onChangeText={(v) => onChange({ phone: v })} keyboardType="phone-pad" />
        <Field label="Address" value={data.address ?? ''} onChangeText={(v) => onChange({ address: v })} />
      </GlassCard>

      <GlassCard style={s.card}>
        <SectionTitle icon="◧">Profile</SectionTitle>
        <Field label="Bio" value={data.bio ?? ''} onChangeText={(v) => onChange({ bio: v })} multiline />
        <Field
          label="Specializations (comma separated)"
          value={(data.specializations ?? []).join(', ')}
          onChangeText={(v) => onChange({ specializations: v.split(',').map((x) => x.trim()).filter(Boolean) })}
          placeholder="e.g. Yoga, CrossFit"
        />
        <Field
          label="Languages Known (comma separated)"
          value={(data.languagesKnown ?? []).join(', ')}
          onChangeText={(v) => onChange({ languagesKnown: v.split(',').map((x) => x.trim()).filter(Boolean) })}
          placeholder="e.g. English, Hindi"
        />
      </GlassCard>

    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: T.background },
  content: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40, gap: 14 },
  card: { padding: 18 },
});
