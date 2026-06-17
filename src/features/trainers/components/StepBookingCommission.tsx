import React, { useRef, useCallback, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput, Switch,
  PanResponder, LayoutChangeEvent,
} from 'react-native';
import { styled } from 'nativewind';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TrainerPayload } from '../types/trainer.types';

const StyledView      = styled(View);
const StyledText      = styled(Text);
const StyledScroll    = styled(ScrollView);
const StyledTouchable = styled(TouchableOpacity);
const StyledInput     = styled(TextInput);

interface Props {
  data: Partial<TrainerPayload>;
  onChange: (fields: Partial<TrainerPayload>) => void;
}

type MCIcon = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

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

function PermissionCard({ icon, label, sub, value, onValueChange }: {
  icon: MCIcon; label: string; sub: string;
  value: boolean; onValueChange: (v: boolean) => void;
}) {
  return (
    <StyledTouchable
      className={`flex-row items-center gap-3 px-3.5 py-3 rounded-xl border mb-2 ${value ? 'border-brand/35 bg-brand/15' : 'border-line bg-input'}`}
      onPress={() => onValueChange(!value)}
      activeOpacity={0.75}
    >
      <StyledView className={`w-10 h-10 rounded-xl items-center justify-center ${value ? 'bg-brand/15' : 'bg-panel'}`}>
        <MaterialCommunityIcons name={icon} size={20} color={value ? '#F97316' : '#52525B'} />
      </StyledView>
      <StyledView className="flex-1">
        <StyledText className={`text-sm font-semibold ${value ? 'text-white' : 'text-sub'}`}>{label}</StyledText>
        <StyledText className="text-xs text-faint mt-0.5">{sub}</StyledText>
      </StyledView>
      <StyledView className={`w-2 h-2 rounded-full ${value ? 'bg-brand' : 'bg-line'}`} />
    </StyledTouchable>
  );
}

function StatTile({ icon, label, value, onChange }: {
  icon: MCIcon; label: string; value: string; onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <StyledView className={`flex-1 items-center py-3.5 px-2.5 rounded-xl border gap-1 min-w-[45%] ${focused ? 'border-brand/35 bg-brand/15' : 'border-line bg-input'}`}>
      <MaterialCommunityIcons name={icon} size={18} color={focused ? '#F97316' : '#52525B'} />
      <StyledInput
        className="text-2xl font-extrabold text-white text-center min-w-[50px] p-0"
        value={value}
        onChangeText={onChange}
        keyboardType="numeric"
        placeholder="—"
        placeholderTextColor="#52525B"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <StyledText className="text-xs font-semibold text-faint uppercase tracking-wide">{label}</StyledText>
    </StyledView>
  );
}

function Slider({ icon, label, value, onChange }: {
  icon: MCIcon; label: string; value: number; onChange: (n: number) => void;
}) {
  const pct     = Math.min(Math.max(value, 0), 100);
  const trackW  = useRef(0);
  const [drag, setDrag] = useState(false);
  const fillColor = pct > 70 ? '#FACC15' : pct > 40 ? '#FB923C' : '#F97316';

  const clamp = useCallback((x: number) => {
    const raw = Math.round((x / trackW.current) * 100);
    return Math.min(Math.max(raw, 0), 100);
  }, []);

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder:  () => true,
      onPanResponderGrant:   (e) => { setDrag(true);  if (trackW.current > 0) onChange(clamp(e.nativeEvent.locationX)); },
      onPanResponderMove:    (e) => { if (trackW.current > 0) onChange(clamp(e.nativeEvent.locationX)); },
      onPanResponderRelease: ()  => setDrag(false),
      onPanResponderTerminate: () => setDrag(false),
    })
  ).current;

  return (
    <StyledView className="mb-6">
      <StyledView className="flex-row justify-between items-center mb-3">
        <StyledView className="flex-row items-center gap-2">
          <MaterialCommunityIcons name={icon} size={16} color="#A1A1AA" />
          <StyledText className="text-sm font-semibold text-white">{label}</StyledText>
        </StyledView>
        <StyledView className="flex-row items-baseline gap-0.5 px-2.5 py-1 rounded-full" style={{ backgroundColor: `${fillColor}22` }}>
          <StyledText className="text-base font-extrabold" style={{ color: fillColor }}>{pct}</StyledText>
          <StyledText className="text-xs font-bold" style={{ color: fillColor }}>%</StyledText>
        </StyledView>
      </StyledView>

      <StyledView
        className="h-9 justify-center relative"
        onLayout={(e: LayoutChangeEvent) => { trackW.current = e.nativeEvent.layout.width; }}
        {...pan.panHandlers}
      >
        <StyledView className="absolute left-0 right-0 h-1.5 rounded-full bg-line" />
        <StyledView className="absolute left-0 top-1/2 -mt-0.5 h-1.5 rounded-full" style={{ width: `${pct}%`, backgroundColor: fillColor }} />
        <StyledView
          className="absolute top-1/2 -mt-2.5 -ml-2.5 w-5 h-5 rounded-full bg-bg border-2 items-center justify-center"
          style={{ left: `${pct}%` as any, borderColor: fillColor, transform: drag ? [{ scale: 1.25 }] : [] }}
        >
          <StyledView className="w-2 h-2 rounded-full" style={{ backgroundColor: fillColor }} />
        </StyledView>
      </StyledView>

      <StyledView className="flex-row justify-between mt-1">
        {['0%', '50%', '100%'].map((l) => (
          <StyledText key={l} className="text-xs text-faint">{l}</StyledText>
        ))}
      </StyledView>
    </StyledView>
  );
}

export default function StepBookingCommission({ data, onChange }: Props) {
  const bs = data.bookingSettings    ?? {} as any;
  const cs = data.commissionSettings ?? {} as any;
  const updateBs = (f: object) => onChange({ bookingSettings:    { ...bs, ...f } });
  const updateCs = (f: object) => onChange({ commissionSettings: { ...cs, ...f } });

  return (
    <StyledScroll className="flex-1 bg-bg" contentContainerStyle={{ paddingBottom: 48 }} showsVerticalScrollIndicator={false}>

      <Block num="01" title="Booking Permissions">
        <PermissionCard icon="weight-lifter"       label="Personal Training" sub="1-on-1 sessions"  value={bs.canTakePersonalTraining ?? false} onValueChange={(v) => updateBs({ canTakePersonalTraining: v })} />
        <PermissionCard icon="account-group"       label="Group Classes"     sub="Multi-client"      value={bs.canTakeGroupClasses ?? false}      onValueChange={(v) => updateBs({ canTakeGroupClasses: v })} />
        <PermissionCard icon="monitor-account"     label="Online Sessions"   sub="Remote coaching"   value={bs.canTakeOnlineSessions ?? false}    onValueChange={(v) => updateBs({ canTakeOnlineSessions: v })} />
        <PermissionCard icon="star-circle-outline" label="Trial Sessions"    sub="Free intro"        value={bs.canTakeTrialSessions ?? false}     onValueChange={(v) => updateBs({ canTakeTrialSessions: v })} />

        <StyledTouchable
          className={`flex-row items-center gap-3 mt-2 pt-3 border-t ${bs.requiresApprovalForBooking ? 'border-lineSubtle' : 'border-lineSubtle'}`}
          onPress={() => updateBs({ requiresApprovalForBooking: !bs.requiresApprovalForBooking })}
          activeOpacity={0.75}
        >
          <MaterialCommunityIcons name="shield-check-outline" size={20} color={bs.requiresApprovalForBooking ? '#F97316' : '#52525B'} />
          <StyledView className="flex-1">
            <StyledText className={`text-sm font-semibold ${bs.requiresApprovalForBooking ? 'text-white' : 'text-sub'}`}>Requires Approval</StyledText>
            <StyledText className="text-xs text-faint mt-0.5">All bookings need manual confirmation</StyledText>
          </StyledView>
          <Switch
            value={bs.requiresApprovalForBooking ?? false}
            onValueChange={(v) => updateBs({ requiresApprovalForBooking: v })}
            trackColor={{ false: '#27272A', true: '#F97316' }}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#27272A"
          />
        </StyledTouchable>
      </Block>

      <StyledView className="h-px bg-lineSubtle mx-5" />

      <Block num="02" title="Session Limits">
        <StyledView className="flex-row flex-wrap gap-2.5 mb-2">
          <StatTile icon="account-multiple-outline" label="Max Clients"    value={String(bs.maxClients ?? '')}             onChange={(v) => updateBs({ maxClients: Number(v) })} />
          <StatTile icon="weather-sunny"            label="Daily Max"      value={String(bs.maxDailySessions ?? '')}        onChange={(v) => updateBs({ maxDailySessions: Number(v) })} />
          <StatTile icon="calendar-week"            label="Weekly Max"     value={String(bs.maxWeeklySessions ?? '')}       onChange={(v) => updateBs({ maxWeeklySessions: Number(v) })} />
          <StatTile icon="clock-time-four-outline"  label="Duration (min)" value={String(bs.sessionDurationMinutes ?? '')} onChange={(v) => updateBs({ sessionDurationMinutes: Number(v) })} />
        </StyledView>
        <StatTile icon="timer-pause-outline" label="Buffer Time (min)" value={String(bs.bufferTimeMinutes ?? '')} onChange={(v) => updateBs({ bufferTimeMinutes: Number(v) })} />
      </Block>

      <StyledView className="h-px bg-lineSubtle mx-5" />

      <Block num="03" title="Commission Eligibility">
        <PermissionCard icon="card-account-details-outline" label="Membership"    sub="Membership sales" value={cs.eligibleForMembershipCommission ?? false}       onValueChange={(v) => updateCs({ eligibleForMembershipCommission: v })} />
        <PermissionCard icon="dumbbell"                     label="Personal Trng" sub="PT sessions"       value={cs.eligibleForPersonalTrainingCommission ?? false} onValueChange={(v) => updateCs({ eligibleForPersonalTrainingCommission: v })} />
        <PermissionCard icon="pill"                         label="Supplements"   sub="Product sales"     value={cs.eligibleForSupplementCommission ?? false}       onValueChange={(v) => updateCs({ eligibleForSupplementCommission: v })} />
      </Block>

      <StyledView className="h-px bg-lineSubtle mx-5" />

      <Block num="04" title="Commission Rates">
        <Slider icon="card-account-details" label="Membership"       value={cs.membershipCommissionPercentage ?? 0} onChange={(v) => updateCs({ membershipCommissionPercentage: v })} />
        <Slider icon="dumbbell"             label="Personal Training" value={cs.ptCommissionPercentage ?? 0}         onChange={(v) => updateCs({ ptCommissionPercentage: v })} />
        <Slider icon="pill"                 label="Supplements"       value={cs.supplementCommissionPercentage ?? 0} onChange={(v) => updateCs({ supplementCommissionPercentage: v })} />
      </Block>

    </StyledScroll>
  );
}
