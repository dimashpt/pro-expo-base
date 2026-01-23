import type { ChipProps as HNChipProps } from 'heroui-native';

import React from 'react';

import { Chip as HNChip } from 'heroui-native';

export type ChipProps = Omit<HNChipProps, 'children'> & {
  /**
   * The label text content of the chip (string only)
   */
  label?: string;
  /**
   * Content to render before the label
   */
  prefix?: React.ReactNode;
  /**
   * Content to render after the label
   */
  suffix?: React.ReactNode;
};

export const Chip: React.FC<ChipProps> = ({
  label,
  prefix,
  suffix,
  ...props
}) => {
  return (
    <HNChip {...props}>
      {prefix}
      {label && <HNChip.Label>{label}</HNChip.Label>}
      {suffix}
    </HNChip>
  );
};
