
import { useMemo } from 'react';
import { textStyles, fontFamilies, fontWeights, fontSizes, lineHeights, letterSpacings } from './fonts';

type TextStyleKey = keyof typeof textStyles;
type CustomStyleOptions = {
  family?: keyof typeof fontFamilies;
  weight?: keyof typeof fontWeights;
  size?: keyof typeof fontSizes;
  lineHeight?: keyof typeof lineHeights;
  letterSpacing?: keyof typeof letterSpacings;
  color?: string;
};

/**
 * Hook to generate typography styles for React components
 * 
 * @example
 * // Using a predefined text style
 * const { getStyle } = useTypography();
 * const h1Style = getStyle('h1');
 * 
 * @example
 * // Using a predefined style with overrides
 * const { getStyle } = useTypography();
 * const customHeading = getStyle('h2', { weight: 'bold', color: 'text-primary' });
 * 
 * @example
 * // Create custom style
 * const { createStyle } = useTypography();
 * const customStyle = createStyle({ 
 *   family: 'heading', 
 *   weight: 'semibold', 
 *   size: '2xl' 
 * });
 */
function useTypography() {
  /**
   * Get a predefined text style with optional overrides
   */
  const getStyle = (styleName: TextStyleKey, overrides?: CustomStyleOptions) => {
    if (!textStyles[styleName]) {
      console.warn(`Typography style "${styleName}" not found`);
      return {};
    }

    // Return the base style if no overrides
    if (!overrides) {
      return textStyles[styleName];
    }

    // Apply overrides to the base style
    return {
      ...textStyles[styleName],
      ...(overrides.family && { fontFamily: fontFamilies[overrides.family] }),
      ...(overrides.weight && { fontWeight: fontWeights[overrides.weight] }),
      ...(overrides.size && { fontSize: fontSizes[overrides.size] }),
      ...(overrides.lineHeight && { lineHeight: lineHeights[overrides.lineHeight] }),
      ...(overrides.letterSpacing && { letterSpacing: letterSpacings[overrides.letterSpacing] }),
      ...(overrides.color && { color: overrides.color }),
    };
  };

  /**
   * Create a custom text style from specified properties
   */
  const createStyle = (options: CustomStyleOptions) => {
    return {
      ...(options.family && { fontFamily: fontFamilies[options.family] }),
      ...(options.weight && { fontWeight: fontWeights[options.weight] }),
      ...(options.size && { fontSize: fontSizes[options.size] }),
      ...(options.lineHeight && { lineHeight: lineHeights[options.lineHeight] }),
      ...(options.letterSpacing && { letterSpacing: letterSpacings[options.letterSpacing] }),
      ...(options.color && { color: options.color }),
    };
  };

  /**
   * Get a class name for a predefined text style
   */
  const getStyleClass = (styleName: TextStyleKey) => {
    return `text-style-${styleName}`;
  };

  return {
    getStyle,
    createStyle,
    getStyleClass,
    textStyles,
    fontFamilies,
    fontWeights,
    fontSizes,
    lineHeights,
    letterSpacings,
  };
}

export default useTypography;
