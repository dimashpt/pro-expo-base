import React from 'react';
import { View } from 'react-native';

import { useRouter } from 'expo-router';
import { PressableFeedback } from 'heroui-native';

import { AppText } from '@/components/app-text';
import { IonIcon } from '@/components/mapped';

export interface AuthHeaderProps {
  /**
   * The title to display in the header
   */
  title?: string;
  /**
   * Whether to show the back button
   * @default true
   */
  showBackButton?: boolean;
  /**
   * Custom onPress handler for the back button
   * If not provided, uses router.back()
   */
  onBackPress?: () => void;
}

/**
 * AuthHeader component - displays a navigation header with back button and title
 * Used across authentication screens for consistent navigation
 */
export const AuthHeader: React.FC<AuthHeaderProps> = ({
  title,
  showBackButton = true,
  onBackPress,
}) => {
  const router = useRouter();

  const handleBackPress = (): void => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View className="py-md px-xl pt-safe flex-row items-center justify-between">
      {/* Back Button */}
      {showBackButton ? (
        <PressableFeedback onPress={handleBackPress} className="w-10">
          <IonIcon name="arrow-back" size={20} className="text-foreground" />
        </PressableFeedback>
      ) : (
        <View className="w-10" />
      )}

      {/* Title */}
      <AppText variant="h5" className="font-semibold">
        {title}
      </AppText>

      {/* Spacer for centering */}
      <View className="w-10" />
    </View>
  );
};
