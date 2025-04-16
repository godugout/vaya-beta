
/**
 * Typography System
 * 
 * This file serves as the central export point for all typography-related
 * utilities, constants, and configurations.
 */

// Export font configuration and utilities
export * from './fonts';

// Export React hook for using typography styles in components
export { default as useTypography } from './useTypography';

// Export typography theme
export { typography } from '../../styles/theme/typography';

// Document imports needed in the main CSS entry file
/**
 * To use the typography system, import the following files in your CSS:
 * 
 * @import './typography/utilities.css';
 * 
 * And include the font imports in your HTML head or CSS:
 * <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&family=Architects+Daughter&display=swap">
 */
