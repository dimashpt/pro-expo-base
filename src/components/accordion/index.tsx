import React from 'react';
import { View } from 'react-native';

import { cn, Accordion as HNAccordion } from 'heroui-native';

import { AppText } from '../app-text';

export type AccordionItem = {
  /**
   * Unique identifier for the accordion item
   */
  value: string;
  /**
   * Title text displayed in the trigger
   */
  title: string;
  /**
   * Content to display when expanded
   */
  content: React.ReactNode;
  /**
   * Trigger prefix icon
   */
  icon?: React.ReactNode;
};

export type AccordionProps = {
  /**
   * Array of accordion items with title and content
   */
  items: AccordionItem[];
  /**
   * Selection mode: single or multiple items can be expanded
   * @default 'single'
   */
  selectionMode?: 'single' | 'multiple';
  /**
   * Default expanded item(s)
   */
  defaultValue?: string | string[];
  /**
   * Visual variant of the accordion
   * @default 'default'
   */
  variant?: 'default' | 'surface';
  /**
   * Whether dividers are visible between items
   * @default true
   */
  isDividerVisible?: boolean;
  /**
   * Callback when expanded items change
   */
  onValueChange?: (value: string | string[] | undefined) => void;
};

/**
 * Accordion component - simplified wrapper for organizing content in collapsible sections
 */
export const Accordion: React.FC<AccordionProps> = ({
  items,
  selectionMode = 'single',
  defaultValue,
  variant = 'surface',
  isDividerVisible = true,
  onValueChange,
}) => {
  return (
    <HNAccordion
      selectionMode={selectionMode}
      defaultValue={defaultValue}
      variant={variant}
      isDividerVisible={isDividerVisible}
      onValueChange={onValueChange}
    >
      {items.map((item) => (
        <HNAccordion.Item key={item.value} value={item.value}>
          <HNAccordion.Trigger>
            <View className="gap-sm flex-1 flex-row items-center">
              {item.icon}
              <AppText variant="label">{item.title}</AppText>
            </View>
            <HNAccordion.Indicator />
          </HNAccordion.Trigger>
          <HNAccordion.Content>
            <View className={cn(item.icon && 'ml-2xl')}>{item.content}</View>
          </HNAccordion.Content>
        </HNAccordion.Item>
      ))}
    </HNAccordion>
  );
};
