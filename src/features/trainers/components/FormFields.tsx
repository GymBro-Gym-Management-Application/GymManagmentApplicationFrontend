import React, { useState } from 'react';
import {
  View, Text, TextInput, Switch, TouchableOpacity,
  KeyboardTypeOptions,
} from 'react-native';

const StyledView      = View;
const StyledText      = Text;
const StyledInput     = TextInput;
const StyledTouchable = TouchableOpacity;

/* ─── Field ─────────────────────────────────────────────────────── */
interface FieldProps {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  secureTextEntry?: boolean;
  /** Optional element rendered at the trailing edge of the input (e.g. show/hide button) */
  rightElement?: React.ReactNode;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
}

export function Field({
  label, value, onChangeText, placeholder, keyboardType,
  multiline, secureTextEntry, rightElement, autoCapitalize, autoCorrect,
}: FieldProps) {
  const [focused, setFocused] = useState(false);

  const inputEl = (
    <StyledInput
      className={`flex-1 bg-input border rounded-xl px-3 text-sm text-white ${
        focused ? 'border-lineBright bg-inputActive' : 'border-line'
      } ${multiline ? 'h-20 pt-2.5' : 'py-2.5'}${rightElement ? ' rounded-r-none border-r-0' : ''}`}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder ?? ''}
      placeholderTextColor="#666666"
      keyboardType={keyboardType ?? 'default'}
      multiline={multiline}
      secureTextEntry={secureTextEntry}
      textAlignVertical={multiline ? 'top' : 'center'}
      autoCapitalize={autoCapitalize ?? 'sentences'}
      autoCorrect={autoCorrect ?? true}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );

  return (
    <StyledView className="mb-2">
      <StyledText className="text-xs font-semibold uppercase tracking-wide text-sub mb-1.5">
        {label}
      </StyledText>
      {rightElement ? (
        <StyledView
          className={`flex-row items-center border rounded-xl overflow-hidden ${
            focused ? 'border-lineBright bg-inputActive' : 'border-line bg-input'
          }`}
        >
          <StyledInput
            className="flex-1 px-3 text-sm text-white py-2.5 bg-transparent"
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder ?? ''}
            placeholderTextColor="#666666"
            keyboardType={keyboardType ?? 'default'}
            secureTextEntry={secureTextEntry}
            autoCapitalize={autoCapitalize ?? 'sentences'}
            autoCorrect={autoCorrect ?? true}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          {rightElement}
        </StyledView>
      ) : inputEl}
    </StyledView>
  );
}

/* ─── SwitchRow ─────────────────────────────────────────────────── */
export function SwitchRow({
  label, value, onValueChange, description,
}: {
  label: string; value: boolean; onValueChange: (v: boolean) => void;
  description?: string;
}) {
  return (
    <StyledTouchable
      className={`flex-row items-center justify-between px-3.5 py-3 mb-2 rounded-xl border ${
        value ? 'border-brand/35 bg-brand/15' : 'border-line bg-input'
      }`}
      onPress={() => onValueChange(!value)}
      activeOpacity={0.7}
    >
      <StyledView className="flex-1 mr-4">
        <StyledText className={`text-sm font-medium ${value ? 'text-white' : 'text-sub'}`}>
          {label}
        </StyledText>
        {description && (
          <StyledText className="text-xs text-faint mt-0.5">{description}</StyledText>
        )}
      </StyledView>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#27272A', true: '#AAFF00' }}
        thumbColor="#FFFFFF"
        ios_backgroundColor="#27272A"
      />
    </StyledTouchable>
  );
}

/* ─── SectionTitle ──────────────────────────────────────────────── */
export function SectionTitle({ children, icon }: { children: string; icon?: string }) {
  return (
    <StyledView className="flex-row items-center gap-2 mb-3 mt-1">
      {icon && <StyledText className="text-sm">{icon}</StyledText>}
      <StyledText className="text-xs font-bold uppercase tracking-widest text-brand">
        {children}
      </StyledText>
      <StyledView className="flex-1 h-px bg-lineSubtle" />
    </StyledView>
  );
}

/* ─── RowGrid / GridCell ────────────────────────────────────────── */
export function RowGrid({ children }: { children: React.ReactNode }) {
  return <StyledView className="flex-row gap-2">{children}</StyledView>;
}
export function GridCell({ children }: { children: React.ReactNode }) {
  return <StyledView className="flex-1">{children}</StyledView>;
}