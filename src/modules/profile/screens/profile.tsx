import React, { JSX } from 'react';

import { Accordion } from 'heroui-native';

import { AppText } from '@/components';
import { MenuList, MenuListData } from '@/components/menu-list';
import { ScreenScrollView } from '@/components/screen-scrollview';
import { useAppStore } from '@/store';

export default function ProfileScreen(): JSX.Element {
  const {
    pushNotificationsEnabled,
    setPushNotificationsEnabled,
    devtoolsEnabled,
    setDevtoolsEnabled,
    theme,
    setTheme,
    language,
    setLanguage,
  } = useAppStore();
  const menu: MenuListData = [
    {
      title: 'Theme',
      action: 'select',
      value: theme,
      onSelect: (option) =>
        setTheme(option!.value as 'light' | 'dark' | 'system'),
      options: [
        {
          label: 'Light',
          value: 'light',
        },
        {
          label: 'Dark',
          value: 'dark',
        },
        {
          label: 'System',
          value: 'system',
        },
      ],
    },
    {
      title: 'Language',
      action: 'select',
      value: language,
      onSelect: (option) => setLanguage(option!.value),
      options: [
        {
          label: 'English',
          value: 'en',
        },
        {
          label: 'Indonesian',
          value: 'id',
        },
      ],
    },
    {
      title: 'Notifications',
      description: 'Enable notifications for updates and offers',
      action: 'switch',
      value: pushNotificationsEnabled,
      onChange: setPushNotificationsEnabled,
    },
    {
      title: 'Developer Tools',
      action: 'switch',
      description: 'Enable developer options and tools',
      value: devtoolsEnabled,
      onChange: setDevtoolsEnabled,
    },
    {
      title: 'Clear Cache',
      action: 'press',
      onPress: () => {},
    },
  ];

  return (
    <ScreenScrollView contentContainerClassName="gap-lg" className="py-lg">
      <AppText variant="h1">Settings</AppText>
      <Accordion isCollapsible={false} variant="surface">
        <MenuList menu={menu} />
      </Accordion>
    </ScreenScrollView>
  );
}
