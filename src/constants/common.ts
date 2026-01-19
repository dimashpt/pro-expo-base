import { applicationId } from 'expo-application';

export const IS_PRODUCTION = applicationId === 'id.sooon.app' && !__DEV__;
