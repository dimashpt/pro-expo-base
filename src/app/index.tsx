import React from 'react';
import { Text, View } from 'react-native';

import { Button, useToast } from 'heroui-native';

export default function Index(): React.JSX.Element {
  const { toast } = useToast();

  return (
    <View className="mt-safe flex-1 items-center justify-center">
      <Text>Hello world</Text>
      <Button
        onPress={() =>
          toast.show({
            variant: 'success',
            label: 'You have upgraded your plan',
            description: 'You can continue using HeroUI Chat',
            actionLabel: 'Close',
            onActionPress: ({ hide }) => hide(),
          })
        }
      >
        Get Started
      </Button>
    </View>
  );
}
