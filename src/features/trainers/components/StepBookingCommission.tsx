import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { TrainerPayload } from '../types/trainer.types';
import { Field, SwitchRow, SectionTitle, RowGrid, GridCell } from './FormFields';
import GlassCard from './GlassCard';
import { T } from './theme';

interface Props {
  data: Partial<TrainerPayload>;
  onChange: (fields: Partial<TrainerPayload>) => void;
}

function CommissionBar({ label, value, onChange }: { label: string; value: number; onChange: (v: string) => void }) {
  const pct = Math.min(Math.max(value, 0), 100);
  return (
    <View style={cb.wrap}>
      <View style={cb.header}>
        <Text style={cb.label}>{label}</Text>
        <Text style={cb.val}>{pct}%</Text>
      </View>
      <View style={cb.track}>
        <View style={[cb.fill, { width: `${pct}%` as any }]} />
      </View>
      <Field label="" value={String(value)} onChangeText={onChange} keyboardType="numeric" />
    </View>
  );
}

export default function StepBookingCommission({ data, onChange }: Props) {
  const bs = data.bookingSettings ?? {} as any;
  const cs = data.commissionSettings ?? {} as any;
  const updateBs = (f: object) => onChange({ bookingSettings: { ...bs, ...f } });
  const updateCs = (f: object) => onChange({ commissionSettings: { ...cs, ...f } });

  return (
    <ScrollView style={s.container} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>

      <GlassCard style={s.card}>
        <SectionTitle icon="⚙️">Booking Permissions</SectionTitle>
        <SwitchRow icon="🏋️" label="Personal Training" value={bs.canTakePersonalTraining ?? false} onValueChange={(v) => updateBs({ canTakePersonalTraining: v })} />
        <SwitchRow icon="👥" label="Group Classes" value={bs.canTakeGroupClasses ?? false} onValueChange={(v) => updateBs({ canTakeGroupClasses: v })} />
        <SwitchRow icon="💻" label="Online Sessions" value={bs.canTakeOnlineSessions ?? false} onValueChange={(v) => updateBs({ canTakeOnlineSessions: v })} />
        <SwitchRow icon="⭐" label="Trial Sessions" value={bs.canTakeTrialSessions ?? false} onValueChange={(v) => updateBs({ canTakeTrialSessions: v })} />
        <SwitchRow icon="✅" label="Requires Approval" value={bs.requiresApprovalForBooking ?? false} onValueChange={(v) => updateBs({ requiresApprovalForBooking: v })} />
      </GlassCard>

      <GlassCard style={s.card}>
        <SectionTitle icon="📊">Session Limits</SectionTitle>
        <RowGrid>
          <GridCell><Field label="Max Clients" value={String(bs.maxClients ?? '')} onChangeText={(v) => updateBs({ maxClients: Number(v) })} keyboardType="numeric" /></GridCell>
          <GridCell><Field label="Max Daily" value={String(bs.maxDailySessions ?? '')} onChangeText={(v) => updateBs({ maxDailySessions: Number(v) })} keyboardType="numeric" /></GridCell>
        </RowGrid>
        <RowGrid>
          <GridCell><Field label="Max Weekly" value={String(bs.maxWeeklySessions ?? '')} onChangeText={(v) => updateBs({ maxWeeklySessions: Number(v) })} keyboardType="numeric" /></GridCell>
          <GridCell><Field label="Duration (mins)" value={String(bs.sessionDurationMinutes ?? '')} onChangeText={(v) => updateBs({ sessionDurationMinutes: Number(v) })} keyboardType="numeric" /></GridCell>
        </RowGrid>
        <Field label="Buffer Time (mins)" value={String(bs.bufferTimeMinutes ?? '')} onChangeText={(v) => updateBs({ bufferTimeMinutes: Number(v) })} keyboardType="numeric" />
      </GlassCard>

      <GlassCard style={s.card}>
        <SectionTitle icon="🎖">Commission Eligibility</SectionTitle>
        <SwitchRow icon="💳" label="Membership Commission" value={cs.eligibleForMembershipCommission ?? false} onValueChange={(v) => updateCs({ eligibleForMembershipCommission: v })} />
        <SwitchRow icon="🏃" label="PT Commission" value={cs.eligibleForPersonalTrainingCommission ?? false} onValueChange={(v) => updateCs({ eligibleForPersonalTrainingCommission: v })} />
        <SwitchRow icon="💊" label="Supplement Commission" value={cs.eligibleForSupplementCommission ?? false} onValueChange={(v) => updateCs({ eligibleForSupplementCommission: v })} />
      </GlassCard>

      <GlassCard style={s.card}>
        <SectionTitle icon="📈">Commission Rates</SectionTitle>
        <CommissionBar label="Membership %" value={cs.membershipCommissionPercentage ?? 0} onChange={(v) => updateCs({ membershipCommissionPercentage: Number(v) })} />
        <CommissionBar label="PT %" value={cs.ptCommissionPercentage ?? 0} onChange={(v) => updateCs({ ptCommissionPercentage: Number(v) })} />
        <CommissionBar label="Supplement %" value={cs.supplementCommissionPercentage ?? 0} onChange={(v) => updateCs({ supplementCommissionPercentage: Number(v) })} />
      </GlassCard>

    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: T.background },
  content: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40, gap: 14 },
  card: { padding: 18 },
});

const cb = StyleSheet.create({
  wrap: { marginBottom: 14 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  label: { fontSize: 11, fontWeight: '700', color: T.mutedFg, textTransform: 'uppercase', letterSpacing: 0.8 },
  val: { fontSize: 13, fontWeight: '800', color: T.primary },
  track: { height: 5, borderRadius: 3, backgroundColor: T.border, marginBottom: 8, overflow: 'hidden' },
  fill: { height: 5, borderRadius: 3, backgroundColor: T.primary },
});
