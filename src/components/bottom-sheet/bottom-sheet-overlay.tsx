import { StyleSheet } from 'react-native';

import { BottomSheet, useBottomSheetAnimation } from 'heroui-native';
import { interpolate, useDerivedValue } from 'react-native-reanimated';
import { useUniwind } from 'uniwind';

import { AnimatedBlurView } from '../animated-blur-view';

export function BottomSheetBlurOverlay(): React.JSX.Element {
  const { theme } = useUniwind();
  const { progress } = useBottomSheetAnimation();
  const blurIntensity = useDerivedValue(() => {
    return interpolate(progress.get(), [0, 1, 2], [0, 40, 0]);
  });

  return (
    <BottomSheet.Close style={StyleSheet.absoluteFill}>
      <AnimatedBlurView
        blurIntensity={blurIntensity}
        tint={theme === 'dark' ? 'dark' : 'systemUltraThinMaterialDark'}
        style={StyleSheet.absoluteFill}
      />
    </BottomSheet.Close>
  );
}
