import React from 'react';
import { View } from 'react-native';

import Entypo from '@expo/vector-icons/Entypo';
import { Accordion, PressableFeedback, Select } from 'heroui-native';
import { useCSSVariable } from 'uniwind';

import { AppText } from '../app-text';
import { SwitchField } from '../switch-field';

export type Option = {
  label: string;
  value: string;
};

type BaseMenuListDataItem = {
  title: string;
  description?: string;
};

type SelectMenuItem = BaseMenuListDataItem & {
  action: 'select';
  onSelect: (value?: Option) => void;
  options: Array<Option>;
  value?: string;
};

type PressMenuItem = BaseMenuListDataItem & {
  action: 'press';
  onPress: () => void;
};

type SwitchMenuItem = BaseMenuListDataItem & {
  action: 'switch';
  value: boolean;
  onChange: (value: boolean) => void;
};

export type MenuListItem = SelectMenuItem | PressMenuItem | SwitchMenuItem;

export type MenuListData = Array<MenuListItem>;

type MenuListProps = {
  menu: MenuListData;
};

export function MenuList({ menu }: MenuListProps): React.JSX.Element {
  const mutedColor = useCSSVariable('--color-muted') as string;

  return (
    <Accordion isCollapsible={false} variant="surface">
      {menu.map((item) => (
        <Accordion.Item key={item.title} value={item.title}>
          <Accordion.Trigger onPress={() => {}} asChild>
            {item.action === 'switch' ? (
              <View>
                <SwitchField
                  isSelected={item.value}
                  onSelectedChange={item.onChange}
                  title={item.title}
                  description={item.description}
                />
              </View>
            ) : item.action === 'select' ? (
              <Select onValueChange={item.onSelect}>
                <Select.Trigger asChild className="flex-row">
                  <PressableFeedback className="gap-sm">
                    <AppText variant="label" className="flex-1">
                      {item.title}
                    </AppText>
                    {item.value && (
                      <AppText variant="small" color="muted">
                        {item.value}
                      </AppText>
                    )}
                    <Accordion.Indicator>
                      <Entypo
                        name="chevron-thin-right"
                        size={12}
                        color={mutedColor}
                      />
                    </Accordion.Indicator>
                  </PressableFeedback>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Overlay className="bg-default/70" />
                  <Select.Content width="trigger" placement="bottom">
                    {item.options?.map((option) => (
                      <Select.Item
                        key={option.value}
                        value={option.value}
                        label={option.label}
                      />
                    ))}
                  </Select.Content>
                </Select.Portal>
              </Select>
            ) : (
              <PressableFeedback>
                <AppText className="text-foreground text-base font-medium">
                  {item.title}
                </AppText>
                <Accordion.Indicator>
                  <Entypo
                    name="chevron-thin-right"
                    size={12}
                    color={mutedColor}
                  />
                </Accordion.Indicator>
              </PressableFeedback>
            )}
          </Accordion.Trigger>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
