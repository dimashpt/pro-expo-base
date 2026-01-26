import React, { JSX } from 'react';
import { ScrollView } from 'react-native';

import { useRouter } from 'expo-router';
import { Accordion } from 'heroui-native';

import { AppText, Button } from '@/components';
import { MenuList, MenuListData } from '@/components/menu-list';
import { LANGUAGES } from '@/constants/languages';
import { THEMES } from '@/constants/ui';
import { useAppStore, useAuthStore } from '@/store';

export default function ProfileScreen(): JSX.Element {
  const router = useRouter();
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
  const { logout } = useAuthStore();

  function handleLogout(): void {
    logout();
    router.replace('/login');
  }

  const menu: MenuListData = [
    {
      title: 'Theme',
      action: 'select',
      value: theme,
      onSelect: (option) =>
        setTheme(option!.value as 'light' | 'dark' | 'system'),
      options: THEMES,
    },
    {
      title: 'Language',
      action: 'select',
      value: language,
      onSelect: (option) => setLanguage(option!.value),
      options: LANGUAGES,
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
    <ScrollView className="p-xl" contentContainerClassName="gap-lg">
      <AppText variant="h1">Settings</AppText>
      <Accordion isCollapsible={false} variant="surface">
        <MenuList menu={menu} />
      </Accordion>
      <Button
        label="Logout"
        variant="danger-soft"
        size="sm"
        onPress={handleLogout}
      />
    </ScrollView>
  );
}
