import Ionicons from '@expo/vector-icons/Ionicons';
import { BlurView as ExpoBlurView } from 'expo-blur';
import { Image as ExpoImage } from 'expo-image';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import RNLottieView from 'lottie-react-native';
import RNPagerView from 'react-native-pager-view';
import { withUniwind } from 'uniwind';

export const LinearGradient = withUniwind(ExpoLinearGradient);
export const Image = withUniwind(ExpoImage);
export const LottieView = withUniwind(RNLottieView);
export const BlurView = withUniwind(ExpoBlurView);
export const PagerView = withUniwind(RNPagerView);
export const IonIcon = withUniwind(Ionicons);
export type PagerView = RNPagerView;
