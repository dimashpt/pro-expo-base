import type { DividerProps as HNDividerProps } from 'heroui-native';

import React from 'react';

import { Divider as HNDivider } from 'heroui-native';

export type DividerProps = HNDividerProps;

export const Divider: React.FC<DividerProps> = ({ ...props }) => {
  return <HNDivider {...props} />;
};
