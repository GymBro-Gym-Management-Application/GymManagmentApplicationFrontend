import React, { useRef, useCallback, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  PanResponder, LayoutChangeEvent, TouchableOpacity, TextInput, Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TrainerPayload } from '../types/trainer.types';
import { SectionTitle } from './FormFields';
import GlassCard from './GlassCard';
import { T, Shadow } from './theme';

interface Props {
  data: Partial<TrainerPayload>;
  onChange: (fields: Partial<TrainerPayload>) => void;
}

/* ─── Slider ─────────────────────────────────────────────────────────────── */
function Slider({
  label, value, onChange, icon,
}: { label: string; value: number; onChange: (n: number) => void; icon: string }) {
  const pct = Math.min(Math.max(value, 0), 100);
  const trackWidth = useRef(0);
  const [dragging, setDragging] = useState(false);

  const clamp = useCallback((x: number) => {
    const raw = Math.round((x / trackWidth.current) * 100);
    return Math.min(Math.max(raw, 0), 100);
  }, []);

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => {
        setDragging(true);
        if (trackWidth.current > 0) onChange(clamp(e.nativeEvent.locationX));
      },
      onPanResponderMove: (e) => {
        if (trackWidth.current > 0) onChange(clamp(e.nativeEvent.locationX));
      },
      onPanResponderRelease: () => setDragging(false),
      onPanResponderTerminate: () => setDragging(false),
    })
  ).current;

  const onLayout = (e: LayoutChangeEvent) => {
    trackWidth.current = e.nativeEvent.layout.width;
  };

  // colour transitions: 0–40 orange, 41–70 amber, 71–100 accent
  const fillColor = pct > 70 ? T.accent : pct > 40 ? '#FF9A3C' : T.primary;

  return (
    <View style={sl.wrap}>
      {/* Label row */}
      <View style={sl.labelRow}>
        <View style={sl.labelLeft}>
          <Text style={sl.iconTxt}>{icon}</Text>
          <Text style={sl.label}>{label}</Text>
        </View>
        {/* Live badge */}
        <View style={[sl.badge, { backgroundColor: `${fillColor}22` }]}>
          <Text style={[sl.badgeVal, { color: fillColor }]}>{pct}</Text>
          <Text style={[sl.badgePct, { color: fillColor }]}>%</Text>
        </View>
      </View>

      {/* Track area */}
      <View style={sl.trackArea} onLayout={onLayout} {...pan.panHandlers}>
        {/* Background track */}
        <View style={sl.trackBg} />
        {/* Filled range with glow */}
        <View
          style={[
            sl.range,
            { width: `${pct}%` as any, backgroundColor: fillColor },
            dragging && { shadowColor: fillColor, shadowOpacity: 0.6, shadowRadius: 8, elevation: 6 },
          ]}
        />
        {/* Tick marks */}
        {[25, 50, 75].map((tick) => (
          <View
            key={tick}
            style={[
              sl.tick,
              { left: `${tick}%` as any },
              pct >= tick && { backgroundColor: fillColor, opacity: 0.4 },
            ]}
          />
        ))}
        {/* Thumb */}
        <View
          style={[
            sl.thumb,
            { left: `${pct}%` as any },
            dragging && sl.thumbActive,
            { borderColor: fillColor, shadowColor: fillColor },
          ]}
        >
          <View style={[sl.thumbCore, { backgroundColor: fillColor }]} />
        </View>
      </View>

      {/* Min / Max labels */}
      <View style={sl.minMax}>
        <Text style={sl.minMaxTxt}>0%</Text>
        <Text style={sl.minMaxTxt}>50%</Text>
        <Text style={sl.minMaxTxt}>100%</Text>
      </View>
    </View>
  );
}

/* ─── Permission Toggle Card ─────────────────────────────────────────────── */
function PermissionCard({
  icon, label, sub, value, onValueChange,
}: { icon: keyof typeof Ionicons.glyphMap; label: string; sub: string; value: boolean; onValueChange: (v: boolean) => void }) {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => onValueChange(!value)}
      style={[pc.card, value && pc.cardActive]}
    >
      <View style={[pc.iconBox, value && pc.iconBoxActive]}>
        <Ionicons name={icon} size={20} color={value ? T.primary : T.mutedFg} />
      </View>
      <View style={pc.text}>
        <Text style={[pc.label, value && pc.labelActive]}>{label}</Text>
        <Text style={pc.sub}>{sub}</Text>
      </View>
      <View style={[pc.dot, value && pc.dotActive]} />
    </TouchableOpacity>
  );
}

/* ─── Stat Input ─────────────────────────────────────────────────────────── */
function StatInput({ label, value, onChange, icon }: {
  label: string; value: string; onChange: (v: string) => void; icon: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={[si.wrap, focused && si.wrapFocused]}>
      <Text style={si.icon}>{icon}</Text>
      <TextInput
        style={si.input}
        value={value}
        onChangeText={onChange}
        keyboardType="numeric"
        placeholderTextColor={T.mutedFg}
        placeholder="—"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <Text style={si.label}>{label}</Text>
    </View>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function StepBookingCommission({ data, onChange }: Props) {
  const bs = data.bookingSettings ?? {} as any;
  const cs = data.commissionSettings ?? {} as any;
  const updateBs = (f: object) => onChange({ bookingSettings: { ...bs, ...f } });
  const updateCs = (f: object) => onChange({ commissionSettings: { ...cs, ...f } });

  return (
    <ScrollView style={s.container} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>

      {/* ── Booking Permissions ── */}
      <GlassCard style={s.card}>
        <SectionTitle icon="⚡">Booking Permissions</SectionTitle>
        <View style={s.permGrid}>
          <PermissionCard icon="barbell-outline"     label="Personal Training" sub="1-on-1 sessions"     value={bs.canTakePersonalTraining ?? false}    onValueChange={(v) => updateBs({ canTakePersonalTraining: v })} />
          <PermissionCard icon="people-outline"      label="Group Classes"     sub="Multi-client"        value={bs.canTakeGroupClasses ?? false}         onValueChange={(v) => updateBs({ canTakeGroupClasses: v })} />
          <PermissionCard icon="laptop-outline"      label="Online Sessions"   sub="Remote coaching"     value={bs.canTakeOnlineSessions ?? false}       onValueChange={(v) => updateBs({ canTakeOnlineSessions: v })} />
          <PermissionCard icon="star-outline"        label="Trial Sessions"    sub="Free intro"          value={bs.canTakeTrialSessions ?? false}        onValueChange={(v) => updateBs({ canTakeTrialSessions: v })} />
        </View>
        {/* Requires Approval as a full-width toggle */}
        <View style={s.approvalRow}>
          <View style={s.approvalLeft}>
            <Ionicons name="shield-checkmark-outline" size={18} color={bs.requiresApprovalForBooking ? T.primary : T.mutedFg} />
            <View>
              <Text style={[s.approvalLabel, bs.requiresApprovalForBooking && s.approvalLabelActive]}>Requires Approval</Text>
              <Text style={s.approvalSub}>All bookings need manual confirmation</Text>
            </View>
          </View>
          <Switch
            value={bs.requiresApprovalForBooking ?? false}
            onValueChange={(v) => updateBs({ requiresApprovalForBooking: v })}
            trackColor={{ false: 'rgba(255,255,255,0.10)', true: T.neonGlow }}
            thumbColor={bs.requiresApprovalForBooking ? T.primary : '#555'}
          />
        </View>
      </GlassCard>

      {/* ── Session Limits ── */}
      <GlassCard style={s.card}>
        <SectionTitle icon="📊">Session Limits</SectionTitle>
        <View style={s.statGrid}>
          <StatInput icon="👥" label="Max Clients"    value={String(bs.maxClients ?? '')}           onChange={(v) => updateBs({ maxClients: Number(v) })} />
          <StatInput icon="☀️" label="Daily Max"      value={String(bs.maxDailySessions ?? '')}     onChange={(v) => updateBs({ maxDailySessions: Number(v) })} />
          <StatInput icon="📅" label="Weekly Max"     value={String(bs.maxWeeklySessions ?? '')}    onChange={(v) => updateBs({ maxWeeklySessions: Number(v) })} />
          <StatInput icon="⏱" label="Duration (min)" value={String(bs.sessionDurationMinutes ?? '')} onChange={(v) => updateBs({ sessionDurationMinutes: Number(v) })} />
        </View>
        <StatInput icon="⏸" label="Buffer Time (min)" value={String(bs.bufferTimeMinutes ?? '')} onChange={(v) => updateBs({ bufferTimeMinutes: Number(v) })} />
      </GlassCard>

      {/* ── Commission Eligibility ── */}
      <GlassCard style={s.card}>
        <SectionTitle icon="🎖">Commission Eligibility</SectionTitle>
        <View style={s.permGrid}>
          <PermissionCard icon="card-outline"       label="Membership"    sub="Membership sales"   value={cs.eligibleForMembershipCommission ?? false}        onValueChange={(v) => updateCs({ eligibleForMembershipCommission: v })} />
          <PermissionCard icon="fitness-outline"    label="Personal Trng" sub="PT sessions"        value={cs.eligibleForPersonalTrainingCommission ?? false}  onValueChange={(v) => updateCs({ eligibleForPersonalTrainingCommission: v })} />
          <PermissionCard icon="medkit-outline"     label="Supplements"   sub="Product sales"      value={cs.eligibleForSupplementCommission ?? false}        onValueChange={(v) => updateCs({ eligibleForSupplementCommission: v })} />
        </View>
      </GlassCard>

      {/* ── Commission Rates ── */}
      <GlassCard style={s.card}>
        <SectionTitle icon="📈">Commission Rates</SectionTitle>
        <Slider icon="💳" label="Membership Commission" value={cs.membershipCommissionPercentage ?? 0} onChange={(v) => updateCs({ membershipCommissionPercentage: v })} />
        <Slider icon="🏋️" label="Personal Training"     value={cs.ptCommissionPercentage ?? 0}         onChange={(v) => updateCs({ ptCommissionPercentage: v })} />
        <Slider icon="💊" label="Supplements"           value={cs.supplementCommissionPercentage ?? 0} onChange={(v) => updateCs({ supplementCommissionPercentage: v })} />
      </GlassCard>

    </ScrollView>
  );
}

/* ─── Styles ─────────────────────────────────────────────────────────────── */
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: T.background },
  content: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 48, gap: 14 },
  card: { padding: 18 },
  permGrid: { gap: 8, marginBottom: 4 },
  statGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 10 },
  approvalRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginTop: 10, paddingTop: 14,
    borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.07)',
    gap: 12,
  },
  approvalLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  approvalLabel: { fontSize: 14, fontWeight: '600', color: T.mutedFg },
  approvalLabelActive: { color: T.foreground },
  approvalSub: { fontSize: 11, color: T.mutedFg, marginTop: 1 },
});

/* Permission card */
const pc = StyleSheet.create({
  card: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    padding: 14, borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
  },
  cardActive: {
    backgroundColor: 'rgba(255,107,0,0.08)',
    borderColor: 'rgba(255,107,0,0.25)',
    ...Shadow.neon,
    shadowOpacity: 0.15,
  },
  iconBox: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.07)',
    alignItems: 'center', justifyContent: 'center',
  },
  iconBoxActive: { backgroundColor: 'rgba(255,107,0,0.15)' },
  text: { flex: 1 },
  label: { fontSize: 13, fontWeight: '600', color: T.mutedFg },
  labelActive: { color: T.foreground },
  sub: { fontSize: 11, color: T.mutedFg, marginTop: 1, opacity: 0.7 },
  dot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  dotActive: { backgroundColor: T.primary, ...Shadow.neon, shadowRadius: 6, shadowOpacity: 0.8 },
});

/* Stat input */
const si = StyleSheet.create({
  wrap: {
    flex: 1, minWidth: '45%',
    alignItems: 'center', justifyContent: 'center',
    paddingVertical: 14, paddingHorizontal: 10,
    borderRadius: 14, gap: 4,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
  },
  wrapFocused: {
    backgroundColor: 'rgba(255,107,0,0.08)',
    borderColor: 'rgba(255,107,0,0.30)',
  },
  icon: { fontSize: 20 },
  input: {
    fontSize: 26, fontWeight: '800', color: T.foreground,
    textAlign: 'center', minWidth: 60, padding: 0,
  },
  label: { fontSize: 10, fontWeight: '600', color: T.mutedFg, textTransform: 'uppercase', letterSpacing: 0.8 },
});

/* Slider */
const sl = StyleSheet.create({
  wrap: { marginBottom: 28 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  labelLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconTxt: { fontSize: 16 },
  label: { fontSize: 13, fontWeight: '600', color: T.foreground },
  badge: {
    flexDirection: 'row', alignItems: 'baseline', gap: 1,
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20,
  },
  badgeVal: { fontSize: 16, fontWeight: '800' },
  badgePct: { fontSize: 11, fontWeight: '700' },
  trackArea: {
    height: 36, justifyContent: 'center',
    position: 'relative',
  },
  trackBg: {
    position: 'absolute', left: 0, right: 0,
    height: 6, borderRadius: 99,
    backgroundColor: 'rgba(255,255,255,0.10)',
  },
  range: {
    position: 'absolute', left: 0, top: '50%', marginTop: -3,
    height: 6, borderRadius: 99,
    shadowOffset: { width: 0, height: 0 }, shadowRadius: 8,
  },
  tick: {
    position: 'absolute', top: '50%', marginTop: -5,
    width: 2, height: 10, borderRadius: 1, marginLeft: -1,
    backgroundColor: 'rgba(255,255,255,0.20)',
  },
  thumb: {
    position: 'absolute', top: '50%', marginTop: -11, marginLeft: -11,
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: T.background,
    borderWidth: 2,
    alignItems: 'center', justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 6, elevation: 8,
  },
  thumbActive: { transform: [{ scale: 1.2 }] },
  thumbCore: { width: 8, height: 8, borderRadius: 4 },
  minMax: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  minMaxTxt: { fontSize: 10, color: T.mutedFg, opacity: 0.6 },
});
