import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { T } from '../../trainers/components/theme';
import { RecentMember } from '../types/dashboard';

const STATUS: Record<RecentMember['status'], { label: string; bg: string; border: string; color: string }> = {
  active:  { label: 'Active',  bg: 'rgba(170,255,0,0.10)',  border: 'rgba(170,255,0,0.25)',  color: T.brand    },
  pending: { label: 'Pending', bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.12)', color: T.textSub },
  overdue: { label: 'Overdue', bg: 'rgba(255,77,77,0.10)',   border: 'rgba(255,77,77,0.25)',   color: '#FF4D4D'  },
};

interface RecentMemberRowProps {
  member: RecentMember;
  onPress?: () => void;
}

const glass = {
  backgroundColor: 'rgba(255,255,255,0.05)',
  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.09)',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.28,
  shadowRadius: 10,
  elevation: 5,
};

export default function RecentMemberRow({ member, onPress }: RecentMemberRowProps) {
  const s = STATUS[member.status];

  return (
    <Pressable
      onPress={onPress}
      style={[glass, {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 18,
        padding: 12,
        marginBottom: 10,
      }]}
    >
      {/* Avatar */}
      {member.avatarUrl ? (
        <Image source={{ uri: member.avatarUrl }} style={{ width: 52, height: 52, borderRadius: 14 }} />
      ) : (
        <View style={{
          width: 52, height: 52, borderRadius: 14,
          backgroundColor: 'rgba(255,255,255,0.07)',
          borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <Text style={{ color: T.text, fontSize: 18, fontWeight: '700' }}>{member.name.charAt(0)}</Text>
        </View>
      )}

      {/* Info */}
      <View style={{ flex: 1, marginLeft: 12, paddingRight: 8 }}>
        <Text style={{ color: T.text, fontSize: 15, fontWeight: '700' }} numberOfLines={1}>
          {member.name}
        </Text>
        <Text style={{ color: T.textSub, fontSize: 12, marginTop: 2 }} numberOfLines={1}>
          {member.branchName} · {member.joinedAgo}
        </Text>
        <View style={{
          alignSelf: 'flex-start', marginTop: 6,
          borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2,
          backgroundColor: s.bg, borderWidth: 1, borderColor: s.border,
        }}>
          <Text style={{ fontSize: 10, fontWeight: '700', color: s.color }}>{s.label}</Text>
        </View>
      </View>

      {/* Chevron */}
      <View style={{
        width: 32, height: 32, borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.07)',
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <Feather name="chevron-right" size={16} color={T.textSub} />
      </View>
    </Pressable>
  );
}
