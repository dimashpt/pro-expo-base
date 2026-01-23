import React from 'react';
import { View } from 'react-native';

import { AppText } from '../app-text';
import { IonIcon } from '../mapped';

type Props = {
  title?: string;
  subtitle?: string;
};

export function ComingSoon({
  title = 'Coming Soon',
  subtitle = 'This feature is under development. Stay tuned!',
}: Props): React.JSX.Element {
  return (
    <View className="gap-lg px-lg flex-1 items-center justify-center">
      {/* <Icon name="rocket" size={64} className="text-foreground" /> */}
      <IonIcon name="rocket" size={64} className="text-foreground" />
      <View className="gap-sm items-center">
        <AppText variant="h4" className="text-center">
          {title}
        </AppText>
        <AppText variant="body" color="muted" className="text-center">
          {subtitle}
        </AppText>
      </View>
    </View>
  );
}
