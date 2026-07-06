import React, { useRef, useState } from 'react';
import {
  View, Text, ScrollView, Pressable,
  StatusBar, Platform, Animated,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { usePlans } from '../api/workoutQueries';
import { WorkoutPlan } from '../types/workout.types';

const GOAL_COLOR: Record<string, string> = {
  general: '#AAAAAA', weightloss: '#22D3EE', musclegain: '#AAFF00', endurance: '#FACC15',
};

function PlanCard({ plan, onPress }: { plan: WorkoutPlan; onPress: () => void }) {
  const goal  = plan.goal?.toLowerCase() ?? 'general';
  const diff  = plan.difficulty?.toLowerCase() ?? 'beginner';
  const gc    = GOAL_COLOR[goal] ?? '#AAAAAA';
  const dc    = diff === 'advanced' ? '#EF4444' : diff === 'intermediate' ? '#FACC15' : '#22C55E';

  return (
    <Pressable onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: pressed ? '#222' : '#1A1A1A',
        borderRadius: 20, padding: 16, marginBottom: 12,
        borderWidth: 1, borderColor: pressed ? 'rgba(170,255,0,0.20)' : '#222',
      })}>
      {/* Accent bar */}
      <View style={{ height: 3, backgroundColor: gc, borderRadius: 2, marginBottom: 14, width: 40 }} />

      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
        <View style={{ flex: 1, paddingRight: 10 }}>
          <Text className="text-white text-[16px] font-bold" numberOfLines={1}>{plan.name}</Text>
          {!!plan.description && <Text className="text-sub text-[12px] mt-1" numberOfLines={2}>{plan.description}</Text>}
        </View>
        {/* Duration badge */}
        <View style={{ backgroundColor: 'rgba(170,255,0,0.10)', borderWidth: 1, borderColor: 'rgba(170,255,0,0.25)', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 6, alignItems: 'center' }}>
          <Text style={{ color: '#AAFF00', fontSize: 18, fontWeight: '900' }}>{plan.durationWeeks}</Text>
          <Text style={{ color: '#AAAAAA', fontSize: 9, fontWeight: '600' }}>WKS</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
        {plan.goal && (
          <View style={{ backgroundColor: gc + '15', borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2, borderWidth: 1, borderColor: gc + '35' }}>
            <Text style={{ color: gc, fontSize: 10, fontWeight: '700' }}>{plan.goal}</Text>
          </View>
        )}
        {plan.difficulty && (
          <View style={{ backgroundColor: dc + '15', borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2, borderWidth: 1, borderColor: dc + '35' }}>
            <Text style={{ color: dc, fontSize: 10, fontWeight: '700' }}>{plan.difficulty}</Text>
          </View>
        )}
        <View style={{ backgroundColor: plan.isActive ? 'rgba(170,255,0,0.10)' : '#222', borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2, borderWidth: 1, borderColor: plan.isActive ? 'rgba(170,255,0,0.25)' : '#333' }}>
          <Text style={{ color: plan.isActive ? '#AAFF00' : '#555', fontSize: 10, fontWeight: '600' }}>
            {plan.isActive ? 'Active' : 'Inactive'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

function Skeleton() {
  const op = useRef(new Animated.Value(0.25)).current;
  React.useEffect(() => {
    const l = Animated.loop(Animated.sequence([
      Animated.timing(op, { toValue: 0.7,  duration: 700, useNativeDriver: true }),
      Animated.timing(op, { toValue: 0.25, duration: 700, useNativeDriver: true }),
    ]));
    l.start(); return () => l.stop();
  }, []);
  return <>{[0,1,2,3].map(k => <Animated.View key={k} style={{ height: 110, borderRadius: 20, backgroundColor: '#222', marginBottom: 12, opacity: op }} />)}</>;
}

interface Props { onBack?: () => void; onAddPlan?: () => void; }

export default function ViewPlansPage({ onBack, onAddPlan }: Props) {
  const [page, setPage] = useState(1);
  const { data: paged, isLoading, isError, refetch } = usePlans(page, 20);
  const items      = paged?.items ?? [];
  const totalPages = paged?.totalPages ?? 1;
  const totalRecs  = paged?.totalRecords ?? 0;

  return (
    <View className="flex-1 bg-bg" style={{ paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : 0 }}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D0D" />

      <View className="px-5 pt-5 pb-4">
        <View className="flex-row items-center justify-between mb-5">
          {onBack && (
            <Pressable onPress={onBack} hitSlop={12}
              className="w-[38px] h-[38px] rounded-full bg-surface border border-line items-center justify-center mr-3">
              <Feather name="arrow-left" size={18} color="#FFF" />
            </Pressable>
          )}
          <View style={{ flex: 1 }}>
            <Text className="text-sub text-[11px] font-semibold uppercase tracking-widest mb-0.5">Programs</Text>
            <Text className="text-white text-[26px] font-extrabold tracking-tight">Workout Plans</Text>
          </View>
          {onAddPlan && (
            <Pressable onPress={onAddPlan} className="flex-row items-center gap-2 bg-brand rounded-full px-4 py-2.5">
              <Feather name="plus" size={15} color="#000" />
              <Text className="text-black text-[13px] font-bold">Add</Text>
            </Pressable>
          )}
        </View>

        {!isLoading && !isError && (
          <View className="flex-row gap-3 mb-2">
            {[{ l:'Total', v: totalRecs }, { l:'Active', v: items.filter(p => p.isActive).length }, { l:'Page', v: `${page}/${totalPages}` }].map(s => (
              <View key={s.l} className="flex-1 bg-surface border border-line rounded-2xl p-3 items-center gap-1">
                <Text className="text-brand text-[18px] font-extrabold">{s.v}</Text>
                <Text className="text-sub text-[10px] font-semibold">{s.l}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 48 }}>
        {isLoading && <Skeleton />}
        {isError && (
          <View className="items-center pt-16">
            <Feather name="wifi-off" size={28} color="#EF4444" />
            <Text className="text-white font-bold mt-4 mb-4">Failed to load</Text>
            <Pressable onPress={() => refetch()} className="bg-brand rounded-full px-7 py-3">
              <Text className="text-black font-bold">Retry</Text>
            </Pressable>
          </View>
        )}
        {!isLoading && !isError && items.length === 0 && (
          <View className="items-center pt-16">
            <View className="w-[68px] h-[68px] rounded-full bg-surface border border-line items-center justify-center mb-4">
              <Feather name="book-open" size={28} color="#AAA" />
            </View>
            <Text className="text-white text-[16px] font-bold">No plans yet</Text>
          </View>
        )}
        {!isLoading && !isError && items.map(p => <PlanCard key={p.id} plan={p} onPress={() => {}} />)}
        {!isLoading && !isError && totalPages > 1 && (
          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 12, marginVertical: 16 }}>
            <Pressable onPress={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1}
              style={{ paddingHorizontal: 16, paddingVertical: 9, borderRadius: 999, backgroundColor: '#1A1A1A', borderWidth: 1, borderColor: '#333', opacity: page <= 1 ? 0.4 : 1 }}>
              <Text style={{ color: '#AAFF00', fontWeight: '700' }}>Prev</Text>
            </Pressable>
            <View style={{ backgroundColor: '#AAFF00', borderRadius: 999, paddingHorizontal: 16, paddingVertical: 9 }}>
              <Text style={{ color: '#000', fontWeight: '900' }}>{page}/{totalPages}</Text>
            </View>
            <Pressable onPress={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages}
              style={{ paddingHorizontal: 16, paddingVertical: 9, borderRadius: 999, backgroundColor: '#1A1A1A', borderWidth: 1, borderColor: '#333', opacity: page >= totalPages ? 0.4 : 1 }}>
              <Text style={{ color: '#AAFF00', fontWeight: '700' }}>Next</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
