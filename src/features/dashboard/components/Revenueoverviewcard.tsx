import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { T } from '../../trainers/components/theme';
import RevenueSparkline from './Revenuesparkline';
import { RevenueTrendPoint } from '../types/dashboard';

interface RevenueOverviewCardProps {
  totalRevenue: number;
  growthPct: number;
  trend: RevenueTrendPoint[];
  periodLabel?: string;
}

function formatCurrency(value: number): string {
  return `₹${value.toLocaleString('en-IN')}`;
}

// Shared glass card style
const glass = {
  backgroundColor: 'rgba(255,255,255,0.05)',
  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.10)',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.40,
  shadowRadius: 20,
  elevation: 10,
};

export default function RevenueOverviewCard({
  totalRevenue,
  growthPct,
  trend,
  periodLabel = 'This month',
}: RevenueOverviewCardProps) {
  const isPositive = growthPct >= 0;

  return (
    <View style={[glass, { borderRadius: 24, padding: 20 }]}>
      {/* Top row */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <Text style={{ color: T.textSub, fontSize: 11, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1 }}>
          Total Revenue
        </Text>
        <View style={{
          backgroundColor: 'rgba(255,255,255,0.08)',
          borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)',
          borderRadius: 999, paddingHorizontal: 12, paddingVertical: 4,
        }}>
          <Text style={{ color: T.textSub, fontSize: 11, fontWeight: '600' }}>{periodLabel}</Text>
        </View>
      </View>

      {/* Amount + sparkline */}
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 4 }}>
        <View style={{ flexShrink: 1, paddingRight: 12 }}>
          <Text
            style={{ color: T.text, fontWeight: '800', fontSize: 34, letterSpacing: -1 }}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {formatCurrency(totalRevenue)}
          </Text>

          {/* Badge */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <View style={{
              flexDirection: 'row', alignItems: 'center',
              borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4, marginRight: 10,
              backgroundColor: isPositive ? 'rgba(170,255,0,0.12)' : 'rgba(255,77,77,0.12)',
              borderWidth: 1,
              borderColor: isPositive ? 'rgba(170,255,0,0.25)' : 'rgba(255,77,77,0.25)',
            }}>
              <Feather
                name={isPositive ? 'trending-up' : 'trending-down'}
                size={13}
                color={isPositive ? T.brand : T.err}
              />
              <Text style={{ fontSize: 12, fontWeight: '700', marginLeft: 5, color: isPositive ? T.brand : T.err }}>
                {isPositive ? '+' : ''}{growthPct}%
              </Text>
            </View>
            <Text style={{ color: T.textSub, fontSize: 12 }}>vs last month</Text>
          </View>
        </View>

        <RevenueSparkline data={trend} />
      </View>
    </View>
  );
}
