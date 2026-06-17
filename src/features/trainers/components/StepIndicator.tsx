import React from 'react';
import { View, styled } from 'nativewind';

interface Props {
  current: number;
  total: number;
  labels: string[];
  onStepPress?: (i: number) => void;
}

const StyledView = styled(View);

export default function StepIndicator({ current, total }: Props) {
  return (
    <StyledView className="flex-row px-5 py-2.5 bg-panel border-b border-line gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <StyledView
          key={i}
          className={`flex-1 h-0.5 rounded-sm ${
            i < current  ? 'bg-brand' :
            i === current ? 'bg-brand opacity-50' :
            'bg-line'
          }`}
        />
      ))}
    </StyledView>
  );
}
