import React from 'react';
import { View } from 'react-native';

import Entypo from '@expo/vector-icons/Entypo';
import { Accordion, PressableFeedback } from 'heroui-native';
import { useCSSVariable } from 'uniwind';

import { AppText } from '../app-text';
import { SwitchField } from '../switch-field';

export type MenuListData = Array<MenuListItem>;
type BaseMenuListDataItem = {
  title: string;
  description?: string;
};
type MenuListItem =
  | (BaseMenuListDataItem & {
      action: 'select' | 'press';
    })
  | (BaseMenuListDataItem & {
      action: 'switch';
      value: boolean;
      onChange: (value: boolean) => void;
    });

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
