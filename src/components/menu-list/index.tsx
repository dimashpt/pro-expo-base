import React from 'react';

import Entypo from '@expo/vector-icons/Entypo';
import { Accordion, PressableFeedback } from 'heroui-native';
import { useCSSVariable } from 'uniwind';

import { BaseMenuListDataItem } from '@/@types/component';
import { AppText } from '../app-text';
import { SwitchField } from '../switch-field';
import { MenuListSelect, SelectMenuItem } from './menu-list-select';

export type Option = {
  label: string;
  value: string;
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
              <SwitchField
                isSelected={item.value}
                onSelectedChange={item.onChange}
                title={item.title}
                description={item.description}
                className="px-lg py-md"
              />
            ) : item.action === 'select' ? (
              <MenuListSelect {...item} />
            ) : (
              <PressableFeedback className="px-lg py-md">
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
