import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import {COLORS} from '../utils/Colors';

interface CustomTextProps extends TextProps {
  weightType?: 'bold' | 'medium' | 'regular';
  isHyperlink?: boolean;
  truncateAt?: number; // Prop to truncate text at a specific length
}

const CustomText: React.FC<CustomTextProps> = ({
  children,
  style,
  onPress,
  weightType = 'medium',
  isHyperlink,
  accessibilityHint,
  truncateAt,
  ...rest
}) => {
  const fontsMap = {
    bold: 'Inter-Bold',
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
  };

  let text =
    typeof children === 'string' && truncateAt
      ? children.length > truncateAt
        ? `${children.substring(0, truncateAt)}...`
        : children
      : children;

  return (
    <Text
      accessible
      accessibilityHint={accessibilityHint}
      style={[
        styles.text,
        {fontFamily: fontsMap[weightType]},
        isHyperlink && {...styles.hyperlink, fontFamily: fontsMap.bold},
        style,
      ]}
      onPress={onPress}
      {...rest}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: COLORS.white,
  },
  hyperlink: {
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
});

export default CustomText;
