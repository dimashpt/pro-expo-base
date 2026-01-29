import React, { JSX } from 'react';

import Octicons from '@expo/vector-icons/Octicons';
import { VectorIcon } from 'expo-router';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useCSSVariable } from 'uniwind';

export default function TabLayout(): JSX.Element {
  const [accentColor, dangerColor] = useCSSVariable([
    '--accent',
    '--danger',
  ]) as string[];

  return (
    <NativeTabs
      minimizeBehavior="onScrollDown"
      tintColor={accentColor}
      badgeBackgroundColor={dangerColor}
    >
      <NativeTabs.Trigger name="home">
        <NativeTabs.Trigger.Icon
          src={<VectorIcon family={Octicons} name="home-fill" />}
        />
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={<VectorIcon family={Octicons} name="person-fill" />}
        />
        <NativeTabs.Trigger.Badge>3</NativeTabs.Trigger.Badge>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
