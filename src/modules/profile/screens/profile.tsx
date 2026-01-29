import React, { JSX } from 'react';
import { ScrollView, View } from 'react-native';

import { useRouter } from 'expo-router';

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
      title: 'Clear Cache',
      action: 'press',
      onPress: () => {},
    },
  ];

  const devMenu: MenuListData = [
    {
      title: 'Developer Tools',
      action: 'switch',
      description: 'Enable developer options and tools',
      value: devtoolsEnabled,
      onChange: setDevtoolsEnabled,
    },
  ];

  return (
    <ScrollView
      className="bg-background p-xl"
      contentContainerClassName="gap-lg"
    >
      <View className="gap-md">
        <AppText variant="h1">Settings</AppText>
        <MenuList menu={menu} />
      </View>

      <View className="gap-sm">
        <AppText variant="h5">Developer Settings</AppText>
        <MenuList menu={devMenu} />
      </View>

      <Button
        label="Logout"
        variant="danger-soft"
        size="sm"
        onPress={handleLogout}
      />
    </ScrollView>
  );
}
