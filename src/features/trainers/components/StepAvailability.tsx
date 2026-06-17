import React from 'react';
import { View, Text, TextInput, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TrainerPayload, Availability } from '../types/trainer.types';

const StyledView      = View;
const StyledText      = Text;
const StyledInput     = TextInput;
const StyledScroll    = ScrollView;
const StyledTouchable = TouchableOpacity;

interface Props {
  data: Partial<TrainerPayload>;
  onChange: (fields: Partial<TrainerPayload>) => void;
}

const DAY_SHORT: Record<string, string> = {
  Monday: 'M', Tuesday: 'T', Wednesday: 'W',
  Thursday: 'T', Friday: 'F', Saturday: 'S', Sunday: 'S',
};

export default function StepAvailability({ data, onChange }: Props) {
  const availability: Availability[] = data.availability ?? [];
  const activeDays = availability.filter((a) => a.isAvailable).length;

  const updateDay = (index: number, fields: Partial<Availability>) =>
    onChange({ availability: availability.map((a, i) => (i === index ? { ...a, ...fields } : a)) });

  return (
    <StyledScroll className="flex-1 bg-bg" contentContainerStyle={{ padding: 20, paddingBottom: 48, gap: 10 }} showsVerticalScrollIndicator={false}>

      {/* Hero */}
      <StyledView className="flex-row items-center gap-3 bg-brand/15 border border-brand/35 rounded-2xl p-4">
        <StyledView className="w-12 h-12 rounded-full bg-panel border border-brand/35 items-center justify-center">
          <Ionicons name="calendar-outline" size={24} color="#F97316" />
        </StyledView>
        <StyledView className="flex-1">
          <StyledText className="text-base font-bold text-white">Availability</StyledText>
          <StyledText className="text-xs text-sub mt-0.5">Set weekly working schedule</StyledText>
        </StyledView>
      </StyledView>

      {/* Summary */}
      <StyledView className="bg-panel border border-line rounded-2xl p-4">
        <StyledView className="flex-row items-center justify-between">
          <StyledView>
            <StyledText className="text-3xl font-extrabold text-brand">
              {activeDays}<StyledText className="text-lg font-medium text-faint">/7</StyledText>
            </StyledText>
            <StyledText className="text-xs text-sub mt-0.5">Days active</StyledText>
          </StyledView>
          <StyledView className="flex-row gap-1.5">
            {availability.map((item) => (
              <StyledTouchable
                key={item.day}
                className={`w-8 h-8 rounded-full items-center justify-center border ${
                  item.isAvailable ? 'bg-brand border-brand' : 'bg-input border-line'
                }`}
                onPress={() => {
                  const i = availability.indexOf(item);
                  updateDay(i, { isAvailable: !item.isAvailable });
                }}
                activeOpacity={0.75}
              >
                <StyledText className={`text-xs font-bold ${item.isAvailable ? 'text-white' : 'text-faint'}`}>
                  {DAY_SHORT[item.day]}
                </StyledText>
              </StyledTouchable>
            ))}
          </StyledView>
        </StyledView>
      </StyledView>

      {/* Day cards */}
      {availability.map((item, index) => (
        <StyledView
          key={item.day}
          className={`rounded-2xl border p-3 ${item.isAvailable ? 'border-brand/35 bg-brand/15' : 'border-line bg-panel'}`}
        >
          <StyledView className="flex-row items-center gap-3">
            <StyledView className={`w-10 h-10 rounded-lg items-center justify-center border ${item.isAvailable ? 'bg-brand/15 border-brand/35' : 'bg-inputActive border-line'}`}>
              <StyledText className={`text-xs font-extrabold tracking-wide ${item.isAvailable ? 'text-brand' : 'text-faint'}`}>
                {item.day.substring(0, 3).toUpperCase()}
              </StyledText>
            </StyledView>
            <StyledView className="flex-1">
              <StyledText className={`text-sm font-semibold ${item.isAvailable ? 'text-white' : 'text-sub'}`}>{item.day}</StyledText>
              {item.isAvailable && item.startTime && item.endTime
                ? <StyledText className="text-xs text-brand mt-0.5">{item.startTime} – {item.endTime}</StyledText>
                : <StyledText className="text-xs text-faint mt-0.5">{item.isAvailable ? 'Set hours below' : 'Day off'}</StyledText>
              }
            </StyledView>
            <Switch
              value={item.isAvailable}
              onValueChange={(v) => updateDay(index, { isAvailable: v })}
              trackColor={{ false: '#27272A', true: '#F97316' }}
              thumbColor={item.isAvailable ? '#F97316' : '#A1A1AA'}
            />
          </StyledView>

          {item.isAvailable && (
            <StyledView className="flex-row items-center gap-2 mt-3">
              <StyledView className="flex-1">
                <StyledText className="text-xs font-bold text-faint uppercase tracking-wider mb-1">Start</StyledText>
                <StyledInput
                  className="bg-input border border-line rounded-xl py-2.5 text-sm text-white text-center"
                  value={item.startTime}
                  onChangeText={(v) => updateDay(index, { startTime: v })}
                  placeholder="09:00"
                  placeholderTextColor="#52525B"
                />
              </StyledView>
              <StyledView className="pb-1">
                <Ionicons name="arrow-forward" size={14} color="#52525B" />
              </StyledView>
              <StyledView className="flex-1">
                <StyledText className="text-xs font-bold text-faint uppercase tracking-wider mb-1">End</StyledText>
                <StyledInput
                  className="bg-input border border-line rounded-xl py-2.5 text-sm text-white text-center"
                  value={item.endTime}
                  onChangeText={(v) => updateDay(index, { endTime: v })}
                  placeholder="17:00"
                  placeholderTextColor="#52525B"
                />
              </StyledView>
            </StyledView>
          )}
        </StyledView>
      ))}
    </StyledScroll>
  );
}
