import React, { JSX } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import { Badge, Icon, Label, VectorIcon } from 'expo-router';
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
        <Icon src={<VectorIcon family={Ionicons} name="home" />} />
        <Label>Home</Label>
        <Badge>3</Badge>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <Label>Profile</Label>
        <Icon src={<VectorIcon family={Ionicons} name="person-circle" />} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
