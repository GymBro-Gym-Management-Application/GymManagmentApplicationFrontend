import React, { useRef, useState } from 'react';
import {
  View, Text, ScrollView, Pressable, TextInput,
  StatusBar, Platform, Animated, ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useMembers } from '../api/memberQueries';
import { Member } from '../types/member.types';

type FeatherIconName = React.ComponentProps<typeof Feather>['name'];

const TINTS = ['#AAFF00', '#22D3EE', '#A78BFA', '#FACC15', '#F87171'];
const tint  = (id: number) => TINTS[id % TINTS.length];

function StatusBadge({ status }: { status: string }) {
  const s = status.toLowerCase();
  const active  = s === 'active';
  const pending = s === 'pending';
  const color  = active ? '#AAFF00' : pending ? '#FACC15' : '#AAAAAA';
  const bg     = active ? 'rgba(170,255,0,0.12)' : pending ? 'rgba(250,204,21,0.12)' : 'rgba(255,255,255,0.07)';
  const border = active ? 'rgba(170,255,0,0.28)' : pending ? 'rgba(250,204,21,0.28)' : 'rgba(255,255,255,0.12)';
  return (
    <View style={{ backgroundColor: bg, borderWidth: 1, borderColor: border, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 3 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        <View style={{ width: 5, height: 5, borderRadius: 3, backgroundColor: color }} />
        <Text style={{ color, fontSize: 10, fontWeight: '700', textTransform: 'capitalize' }}>{status}</Text>
      </View>
    </View>
  );
}

function MemberCard({ member, onPress }: { member: Member; onPress: () => void }) {
  const accent   = tint(member.id);
  const initials = `${member.firstName[0] ?? ''}${member.lastName[0] ?? ''}`.toUpperCase();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: pressed ? '#222222' : '#1A1A1A',
        borderRadius: 18, padding: 14, marginBottom: 10,
        borderWidth: 1, borderColor: pressed ? 'rgba(170,255,0,0.20)' : '#222222',
      })}
    >
      {/* Avatar */}
      <View style={{
        width: 46, height: 46, borderRadius: 23,
        backgroundColor: accent + '18',
        borderWidth: 1.5, borderColor: accent + '50',
        alignItems: 'center', justifyContent: 'center',
        marginRight: 14,
      }}>
        <Text style={{ color: accent, fontSize: 16, fontWeight: '800' }}>{initials}</Text>
      </View>

      {/* Info */}
      <View style={{ flex: 1 }}>
        <Text className="text-white font-bold text-[15px]" numberOfLines={1}>
          {member.firstName} {member.lastName}
        </Text>
        <Text className="text-sub text-[12px] mt-0.5" numberOfLines={1}>{member.email}</Text>
        {!!member.phone && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 }}>
            <Feather name="phone" size={11} color="#777777" />
            <Text className="text-faint text-[11px]">{member.phone}</Text>
          </View>
        )}
      </View>

      {/* Right */}
      <View style={{ alignItems: 'flex-end', gap: 6 }}>
        <StatusBadge status={member.status} />
        {/* Show trainer badge if assigned */}
        {!!member.trainerId && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(34,211,238,0.10)', borderWidth: 1, borderColor: 'rgba(34,211,238,0.25)', borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2 }}>
            <Feather name="award" size={10} color="#22D3EE" />
            <Text style={{ color: '#22D3EE', fontSize: 10, fontWeight: '700' }}>T#{member.trainerId}</Text>
          </View>
        )}
        <Text className="text-faint text-[10px]">
          {new Date(member.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
        </Text>
      </View>
    </Pressable>
  );
}

function Skeleton() {
  const opacity = useRef(new Animated.Value(0.25)).current;
  React.useEffect(() => {
    const loop = Animated.loop(Animated.sequence([
      Animated.timing(opacity, { toValue: 0.7, duration: 700, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 0.25, duration: 700, useNativeDriver: true }),
    ]));
    loop.start();
    return () => loop.stop();
  }, []);
  return (
    <>
      {[0,1,2,3,4].map((k) => (
        <Animated.View key={k} style={{ height: 74, borderRadius: 18, backgroundColor: '#222222', marginBottom: 10, opacity }} />
      ))}
    </>
  );
}

function PaginationBar({ page, total, onPrev, onNext }: { page: number; total: number; onPrev: () => void; onNext: () => void }) {
  if (total <= 1) return null;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, marginVertical: 20 }}>
      <Pressable onPress={onPrev} disabled={page <= 1}
        style={{ paddingHorizontal: 18, paddingVertical: 10, borderRadius: 999, backgroundColor: page <= 1 ? '#1A1A1A' : 'rgba(170,255,0,0.12)', borderWidth: 1, borderColor: page <= 1 ? '#333' : 'rgba(170,255,0,0.30)', opacity: page <= 1 ? 0.4 : 1, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        <Feather name="chevron-left" size={15} color={page <= 1 ? '#444' : '#AAFF00'} />
        <Text style={{ color: page <= 1 ? '#444' : '#AAFF00', fontSize: 13, fontWeight: '700' }}>Prev</Text>
      </Pressable>
      <View style={{ paddingHorizontal: 16, paddingVertical: 10, borderRadius: 999, backgroundColor: '#AAFF00' }}>
        <Text style={{ color: '#000', fontSize: 13, fontWeight: '900' }}>{page} / {total}</Text>
      </View>
      <Pressable onPress={onNext} disabled={page >= total}
        style={{ paddingHorizontal: 18, paddingVertical: 10, borderRadius: 999, backgroundColor: page >= total ? '#1A1A1A' : 'rgba(170,255,0,0.12)', borderWidth: 1, borderColor: page >= total ? '#333' : 'rgba(170,255,0,0.30)', opacity: page >= total ? 0.4 : 1, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        <Text style={{ color: page >= total ? '#444' : '#AAFF00', fontSize: 13, fontWeight: '700' }}>Next</Text>
        <Feather name="chevron-right" size={15} color={page >= total ? '#444' : '#AAFF00'} />
      </Pressable>
    </View>
  );
}

interface Props { onBack?: () => void; onAddMember?: () => void; }

export default function ViewMembersPage({ onBack, onAddMember }: Props) {
  const [search, setSearch] = useState('');
  const [page, setPage]     = useState(1);

  const { data: paged, isLoading, isError, isFetching, refetch } = useMembers(search, page, 20);
  const items      = paged?.items        ?? [];
  const totalPages = paged?.totalPages   ?? 1;
  const totalRecs  = paged?.totalRecords ?? 0;

  return (
    <View className="flex-1 bg-bg" style={{ paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : 0 }}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D0D" />

      {/* Header */}
      <View className="px-5 pt-5 pb-4">
        <View className="flex-row items-center justify-between mb-5">
          {onBack && (
            <Pressable onPress={onBack} hitSlop={12}
              className="w-[38px] h-[38px] rounded-full bg-surface border border-line items-center justify-center mr-3">
              <Feather name="arrow-left" size={18} color="#FFFFFF" />
            </Pressable>
          )}
          <View style={{ flex: 1 }}>
            <Text className="text-sub text-[11px] font-semibold uppercase tracking-widest mb-0.5">Members</Text>
            <Text className="text-white text-[26px] font-extrabold tracking-tight">All Members</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            {isFetching && !isLoading && <ActivityIndicator size="small" color="#AAFF00" />}
            {onAddMember && (
              <Pressable onPress={onAddMember}
                className="flex-row items-center gap-2 bg-brand rounded-full px-4 py-2.5">
                <Feather name="plus" size={15} color="#000" />
                <Text className="text-black text-[13px] font-bold">Add</Text>
              </Pressable>
            )}
          </View>
        </View>

        {/* Stats row */}
        {!isLoading && !isError && (
          <View className="flex-row gap-3 mb-4">
            {[
              { label: 'Total', value: String(totalRecs), icon: 'users' as FeatherIconName },
              { label: 'Active', value: String(items.filter(m => m.status.toLowerCase() === 'active').length), icon: 'check-circle' as FeatherIconName },
              { label: 'Shown', value: String(items.length), icon: 'eye' as FeatherIconName },
            ].map((s) => (
              <View key={s.label} className="flex-1 bg-surface border border-line rounded-2xl p-3 items-center gap-1">
                <Feather name={s.icon} size={16} color="#AAFF00" />
                <Text className="text-white text-[18px] font-extrabold">{s.value}</Text>
                <Text className="text-sub text-[10px] font-semibold">{s.label}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Search */}
        <View className="flex-row items-center bg-surface border border-line rounded-2xl px-4 h-[48px]">
          <Feather name="search" size={16} color="#777777" style={{ marginRight: 10 }} />
          <TextInput
            className="flex-1 text-white text-[14px] h-full"
            placeholder="Search by name or email…"
            placeholderTextColor="#555"
            value={search}
            onChangeText={(v) => { setSearch(v); setPage(1); }}
            autoCorrect={false} autoCapitalize="none"
          />
          {search.length > 0 && (
            <Pressable onPress={() => { setSearch(''); setPage(1); }} hitSlop={8}>
              <Feather name="x" size={15} color="#555" />
            </Pressable>
          )}
        </View>
      </View>

      {/* List */}
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 48 }}>
        {isLoading && <Skeleton />}

        {isError && (
          <View className="items-center pt-16">
            <View className="w-[68px] h-[68px] rounded-full bg-red-500/10 border border-red-500/20 items-center justify-center mb-4">
              <Feather name="wifi-off" size={28} color="#EF4444" />
            </View>
            <Text className="text-white text-[16px] font-bold mb-2">Failed to load</Text>
            <Text className="text-sub text-[13px] text-center mb-6">Check your connection and try again.</Text>
            <Pressable onPress={() => refetch()} className="bg-brand rounded-full px-7 py-3">
              <Text className="text-black text-[14px] font-bold">Retry</Text>
            </Pressable>
          </View>
        )}

        {!isLoading && !isError && items.length === 0 && (
          <View className="items-center pt-16">
            <View className="w-[68px] h-[68px] rounded-full bg-surface border border-line items-center justify-center mb-4">
              <Feather name="users" size={28} color="#AAAAAA" />
            </View>
            <Text className="text-white text-[16px] font-bold mb-2">{search ? 'No results' : 'No members yet'}</Text>
            <Text className="text-sub text-[13px] text-center">
              {search ? `Nothing matches "${search}"` : 'Add your first member to get started.'}
            </Text>
          </View>
        )}

        {!isLoading && !isError && items.map((m) => (
          <MemberCard key={m.id} member={m} onPress={() => {}} />
        ))}

        {!isLoading && !isError && (
          <PaginationBar page={page} total={totalPages} onPrev={() => setPage(p => Math.max(1, p - 1))} onNext={() => setPage(p => Math.min(totalPages, p + 1))} />
        )}
      </ScrollView>
    </View>
  );
}
