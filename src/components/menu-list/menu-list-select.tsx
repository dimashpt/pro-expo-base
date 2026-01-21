import React from 'react';

import Entypo from '@expo/vector-icons/Entypo';
import { Accordion, PressableFeedback } from 'heroui-native';
import { useCSSVariable } from 'uniwind';

import { BaseMenuListDataItem, Option } from '@/@types/component';
import { AppText } from '../app-text';
import { SelectField } from '../select-field';

export type SelectMenuItem = BaseMenuListDataItem & {
  action: 'select';
  onSelect: (value?: Option) => void;
  options: Array<Option>;
  value?: string;
};

export function MenuListSelect(item: SelectMenuItem): React.JSX.Element {
  const mutedColor = useCSSVariable('--color-muted') as string;

  return (
    <SelectField
      options={item.options}
      value={item.options.find((opt) => opt.value === item.value)}
      onChange={item.onSelect}
      trigger={
        <PressableFeedback className="gap-sm px-lg py-md flex-row">
          <AppText variant="label" className="flex-1">
            {item.title}
          </AppText>
          {item.value && (
            <AppText variant="small" color="muted">
              {item.options.find((opt) => opt.value === item.value)?.label}
            </AppText>
          )}
          <Accordion.Indicator>
            <Entypo name="chevron-thin-right" size={12} color={mutedColor} />
          </Accordion.Indicator>
        </PressableFeedback>
      }
    />
  );
}
