import React, { JSX, useState } from 'react';
import { Text } from 'react-native';

import Entypo from '@expo/vector-icons/Entypo';
import { Accordion, PressableFeedback } from 'heroui-native';

import { CheckboxField, SwitchField } from '@/components';
import { ScreenScrollView } from '@/components/screen-scrollview';

const menu = [
  { title: 'Theme' },
  { title: 'Language' },
  { title: 'Notifications' },
  { title: 'Developer Tools' },
  { title: 'Clear Cache' },
];

export default function ProfileScreen(): JSX.Element {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  return (
    <ScreenScrollView>
      <Accordion isCollapsible={false} variant="surface">
        {menu.map((item) => (
          <Accordion.Item key={item.title} value={item.title}>
            <Accordion.Trigger onPress={() => {}} asChild>
              <PressableFeedback>
                <Text className="text-foreground ml-1 text-base">
                  {item.title}
                </Text>
                <Accordion.Indicator>
                  <Entypo name="chevron-thin-right" size={12} color="black" />
                </Accordion.Indicator>
              </PressableFeedback>
            </Accordion.Trigger>
          </Accordion.Item>
        ))}
      </Accordion>
      <CheckboxField
        isSelected={notificationsEnabled}
        onSelectedChange={setNotificationsEnabled}
        title="Notifications"
        description="Enable notifications for updates and offers"
      />
      <SwitchField
        isSelected={notificationsEnabled}
        onSelectedChange={setNotificationsEnabled}
        title="Notifications"
        description="Enable notifications for updates and offers"
      />
    </ScreenScrollView>
  );
}
