import { View } from 'react-native';

import { FormField } from 'heroui-native';

interface SwitchFieldProps {
  isSelected: boolean;
  onSelectedChange: (value: boolean) => void;
  title: string;
  description?: string;
  className?: string;
}

export const SwitchField: React.FC<SwitchFieldProps> = ({
  isSelected,
  onSelectedChange,
  title,
  description,
  className,
}) => (
  <FormField
    isSelected={isSelected}
    onSelectedChange={onSelectedChange}
    className={className}
  >
    {title || description ? (
      <View className="flex-1">
        {title && <FormField.Label>{title}</FormField.Label>}
        {description && (
          <FormField.Description>{description}</FormField.Description>
        )}
      </View>
    ) : null}
    <FormField.Indicator />
  </FormField>
);
