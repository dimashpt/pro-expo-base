import type { AvatarRootProps } from 'heroui-native';

import React from 'react';
import { ImageSourcePropType } from 'react-native';

import { Avatar as HNAvatar } from 'heroui-native';

export type AvatarProps = AvatarRootProps & {
  /**
   * Image source for the avatar
   */
  source?: ImageSourcePropType;
  /**
   * Fallback content when image is not available (text initials or custom React node)
   */
  initial?: React.ReactNode;
  /**
   * Alternative text description for accessibility
   * @default ''
   */
  alt?: string;
};

export const Avatar: React.FC<AvatarProps> = ({
  source,
  initial,
  alt = '',
  ...props
}) => {
  return (
    <HNAvatar alt={alt} {...props}>
      {source && <HNAvatar.Image source={source} />}
      <HNAvatar.Fallback delayMs={300}>{initial}</HNAvatar.Fallback>
    </HNAvatar>
  );
};
