import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { TrainerPayload } from '../types/trainer.types';
import { Field, RowGrid, GridCell } from './FormFields';

const StyledScroll    = ScrollView;
const StyledView      = View;
const StyledText      = Text;
const StyledInput     = TextInput;
const StyledTouchable = TouchableOpacity;

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

function GenderPills({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <StyledView className="mb-2">
      <StyledText className="text-xs font-semibold uppercase tracking-wide text-sub mb-1.5">Gender</StyledText>
      <StyledView className="flex-row gap-2">
        {['Male', 'Female', 'Other'].map((o) => (
          <StyledTouchable
            key={o}
            className={`flex-1 py-2.5 items-center rounded-xl border ${
              value === o ? 'border-brand/35 bg-brand/15' : 'border-line bg-input'
            }`}
            onPress={() => onChange(o)}
            activeOpacity={0.75}
          >
            <StyledText className={`text-sm font-semibold ${value === o ? 'text-brand' : 'text-sub'}`}>
              {o}
            </StyledText>
          </StyledTouchable>
        ))}
      </StyledView>
    </StyledView>
  );
}

function TagInput({ label, value, onChange, placeholder }: {
  label: string; value: string[]; onChange: (a: string[]) => void; placeholder?: string;
}) {
  const [txt, setTxt] = useState('');
  const add = () => {
    const t = txt.trim();
    if (t && !value.includes(t)) onChange([...value, t]);
    setTxt('');
  };
  return (
    <StyledView className="mb-2">
      <StyledText className="text-xs font-semibold uppercase tracking-wide text-sub mb-1.5">{label}</StyledText>
      <StyledView className="flex-row flex-wrap gap-1.5 mb-1.5">
        {value.map((v) => (
          <StyledTouchable
            key={v}
            className="flex-row items-center gap-1.5 bg-brand/15 border border-brand/35 rounded-full px-2.5 py-1"
            onPress={() => onChange(value.filter((x) => x !== v))}
          >
            <StyledText className="text-xs font-semibold text-brand">{v}</StyledText>
            <StyledText className="text-brand text-sm leading-4">×</StyledText>
          </StyledTouchable>
        ))}
      </StyledView>
      <StyledView className="flex-row items-center gap-2">
        <StyledInput
          className="flex-1 bg-input border border-line rounded-xl px-3 py-2.5 text-sm text-white"
          value={txt}
          onChangeText={setTxt}
          onSubmitEditing={add}
          placeholder={placeholder ?? 'Add…'}
          placeholderTextColor="#52525B"
          returnKeyType="done"
        />
        <StyledTouchable className="px-3.5 py-2.5 rounded-xl bg-brand" onPress={add}>
          <StyledText className="text-sm font-bold text-white">Add</StyledText>
        </StyledTouchable>
      </StyledView>
    </StyledView>
  );
}

export default function StepBasicInfo({ data, onChange }: Props) {
  return (
    <StyledScroll className="flex-1 bg-bg" contentContainerStyle={{ paddingBottom: 48 }} showsVerticalScrollIndicator={false}>
      <Block num="01" title="Identity">
        <Field label="Display Name"  value={data.displayName ?? ''} onChangeText={(v) => onChange({ displayName: v })} />
        <Field label="Trainer Code"  value={data.trainerCode ?? ''} onChangeText={(v) => onChange({ trainerCode: v })} />
        <GenderPills value={data.gender ?? ''} onChange={(v) => onChange({ gender: v })} />
        <RowGrid>
          <GridCell><Field label="Date of Birth" value={data.dateOfBirth ?? ''} onChangeText={(v) => onChange({ dateOfBirth: v })} placeholder="YYYY-MM-DD" /></GridCell>
          <GridCell><Field label="Exp. Years" value={String(data.experienceYears ?? '')} onChangeText={(v) => onChange({ experienceYears: Number(v) })} keyboardType="numeric" /></GridCell>
        </RowGrid>
      </Block>

      <StyledView className="h-px bg-lineSubtle mx-5" />

      <Block num="02" title="Contact">
        <Field label="Email"   value={data.email ?? ''}   onChangeText={(v) => onChange({ email: v })}   keyboardType="email-address" />
        <Field label="Phone"   value={data.phone ?? ''}   onChangeText={(v) => onChange({ phone: v })}   keyboardType="phone-pad" />
        <Field label="Address" value={data.address ?? ''} onChangeText={(v) => onChange({ address: v })} />
      </Block>

      <StyledView className="h-px bg-lineSubtle mx-5" />

      <Block num="03" title="Profile">
        <Field label="Bio" value={data.bio ?? ''} onChangeText={(v) => onChange({ bio: v })} multiline />
        <TagInput label="Specializations" value={data.specializations ?? []} onChange={(arr) => onChange({ specializations: arr })} placeholder="e.g. Yoga, CrossFit…" />
        <TagInput label="Languages Known"  value={data.languagesKnown ?? []}  onChange={(arr) => onChange({ languagesKnown: arr })}  placeholder="e.g. English, Hindi…" />
      </Block>
    </StyledScroll>
  );
}
