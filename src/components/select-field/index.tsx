import React from 'react';

import { Select, SelectContentProps } from 'heroui-native';

export type SelectFieldOption = {
  label: string;
  value: string;
};

export type SelectFieldProps = {
  options: SelectFieldOption[];
  value?: SelectFieldOption;
  onChange: (value?: SelectFieldOption) => void;
  disabled?: boolean;
  trigger: React.ReactNode;
  presentation?: SelectContentProps['presentation'];
};

export function SelectField({
  options,
  value,
  onChange,
  disabled = false,
  trigger,
  presentation = 'popover',
}: SelectFieldProps): React.JSX.Element {
  return (
    <Select onValueChange={onChange} isDisabled={disabled} value={value}>
      <Select.Trigger asChild>{trigger}</Select.Trigger>
      <Select.Portal>
        <Select.Overlay className="bg-default/70" />
        <Select.Content
          width="full"
          placement="bottom"
          presentation={presentation}
        >
          {options.map((option) => (
            <Select.Item
              key={option.value}
              value={option.value}
              label={option.label}
            />
          ))}
        </Select.Content>
      </Select.Portal>
    </Select>
  );
}
