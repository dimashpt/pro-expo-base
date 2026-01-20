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
  } = useAppStore();
  const menu: MenuListData = [
    {
      title: 'Theme',
      action: 'select',
    },
    {
      title: 'Language',
      action: 'select',
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
    },
  ];

  return (
    <ScreenScrollView contentContainerClassName="gap-lg">
      <AppText variant="h1">Settings</AppText>
      <Accordion isCollapsible={false} variant="surface">
        <MenuList menu={menu} />
      </Accordion>
    </ScreenScrollView>
  );
}
