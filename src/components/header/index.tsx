import React, { Ref, useImperativeHandle, useRef } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';

import { useRouter } from 'expo-router';
import { PressableFeedback } from 'heroui-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { AppText } from '@/components/app-text';
import { IonIcon } from '@/components/mapped';

export type HeaderRef = {
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

export interface HeaderProps {
  /**
   * The title to display in the header
   */
  title?: string;
  /**
   * The subtitle to display below the title
   */
  subtitle?: string;
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
  /**
   * Whether to enable scroll-based animation
   * @default false
   */
  animated?: boolean;
  /**
   * Scroll threshold before header collapses (in pixels)
   * @default 50
   */
  scrollThreshold?: number;
  /**
   * Scroll up distance to reset header to expanded state (in pixels)
   * @default 100
   */
  scrollUpResetThreshold?: number;
  /**
   * Ref to access the onScroll handler
   */
  ref?: Ref<HeaderRef>;
}

const AnimatedPressableFeedback =
  Animated.createAnimatedComponent(PressableFeedback);

/**
 * Header component - displays a navigation header with back button and title
 * Used across screens for consistent navigation
 *
 * @example
 * // Basic usage
 * <Header title="My Screen" />
 *
 * @example
 * // With scroll animation
 * const headerRef = useRef<HeaderRef>(null);
 *
 * <Header ref={headerRef} title="My Screen" animated />
 * <ScrollView onScroll={headerRef.current?.onScroll} scrollEventThrottle={16}>
 *   ...
 * </ScrollView>
 */
export const Header = ({
  title,
  showBackButton = true,
  onBackPress,
  animated = false,
  scrollThreshold = 50,
  scrollUpResetThreshold = 100,
  ref,
}: HeaderProps): React.ReactNode => {
  const router = useRouter();

  // Animation state
  const animatedValue = useSharedValue(0);
  const lastScrollY = useRef(0);
  const scrollUpDistance = useRef(0);
  const isCollapsed = useRef(false);

  // Expose onScroll handler via ref
  useImperativeHandle(ref, () => ({ onScroll }));

  const handleBackPress = (): void => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    if (!animated) return;

    const currentY = event.nativeEvent.contentOffset.y;
    const deltaY = currentY - lastScrollY.current;

    if (deltaY > 0) {
      // Scrolling down
      scrollUpDistance.current = 0;

      if (currentY > scrollThreshold && !isCollapsed.current) {
        animatedValue.value = withTiming(1, { duration: 200 });
        isCollapsed.current = true;
      }
    } else if (deltaY < 0) {
      // Scrolling up
      scrollUpDistance.current += Math.abs(deltaY);

      if (
        scrollUpDistance.current > scrollUpResetThreshold &&
        isCollapsed.current
      ) {
        animatedValue.value = withTiming(0, { duration: 200 });
        isCollapsed.current = false;
      }
    }

    lastScrollY.current = currentY;
  };

  // Animated style for the header container height and padding
  const animatedContainerStyle = useAnimatedStyle(() => {
    if (!animated) return {};

    const paddingVertical = interpolate(animatedValue.value, [0, 1], [12, 0]);

    return {
      paddingVertical,
    };
  });

  // Animated style for the back button
  const animatedBackButtonStyle = useAnimatedStyle(() => {
    if (!animated) return {};

    const opacity = interpolate(animatedValue.value, [0, 0.5], [1, 0], 'clamp');
    const scale = interpolate(animatedValue.value, [0, 1], [1, 0.8], 'clamp');

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  // Animated style for the title
  const animatedTitleStyle = useAnimatedStyle(() => {
    if (!animated) return {};

    const scale = interpolate(animatedValue.value, [0, 1], [1, 0.7], 'clamp');

    return {
      transform: [{ scale }],
    };
  });

  return (
    <View className="bg-background pt-safe">
      <Animated.View
        className="px-xl border-border flex-row items-center justify-between border-b"
        style={animatedContainerStyle}
      >
        {/* Back Button */}
        {showBackButton ? (
          <AnimatedPressableFeedback
            onPress={handleBackPress}
            className="size-6 items-center justify-center"
            style={animatedBackButtonStyle}
          >
            <IonIcon name="arrow-back" size={16} className="text-foreground" />
          </AnimatedPressableFeedback>
        ) : (
          <View className="w-10" />
        )}

        {/* Title */}
        <Animated.View style={animatedTitleStyle}>
          <AppText variant="h5" className="text-xl font-semibold">
            {title}
          </AppText>
        </Animated.View>

        {/* Spacer for centering */}
        <View className="size-6" />
      </Animated.View>
    </View>
  );
};
