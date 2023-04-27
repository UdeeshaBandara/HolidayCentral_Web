/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

/**
 * Colors
 */
export const Colors = {
  // Example colors:
  transparent: 'rgba(0,0,0,0)',
  inputBackground: '#FFFFFF',
  white: '#ffffff',
  text: '#212529',
  primaryBlack: '#181818',
  primaryLightGreen: '#A9F2DF',
  lightGreen: '#02B287',
  green002: '#26617F',
  primaryOrange: '#F39F2F',
  primaryLightBlue: '#4BC3FE',
  primaryDarkBlue: '#35277F',
  primaryGray: '#F8F8F8',
  gray001: '#D9D9D9',
  gray002: '#7E7E7E',
  gray003: '#6F6E6E',
  gray004: '#EFEFF1',
  gray5: '#E0E0E0',
  gray6: '#F2F2F2',
  gray005: '#919095',
  gray006: '#EDEDED',
  gray007: '#D8D8D8',
  gray008: '#929197',
  gray009: '#F3F3F3',
  primaryPurple: '#6E50FF',
  primaryYellow: '#FFF79A',
  yellow: '#F2C94C',
  primaryRed: '#D41F3A',
  lightPink: '#FDA4D5',
  lightPurple: '#884D9D',
  primaryRedGradient: 'linear-gradient(90deg, #FE5057 0%, #F39734 108.87%)',
  primaryGreenGradient: ['#17CEA0', '#44F0C6'],
  primaryPurpleGradient: 'linear-gradient(90deg, #6F51FF 0%, #8B74FE 100%)',
  primaryPurpleGradient2: 'linear-gradient(180deg, #6B4CFF 0%, #7C67DE 100%)',
  primaryPurpleGradient3: ['#6F51FF', '#8B74FE'],
  blackGradient: 'linear-gradient(90deg, #1C1B20 0%, #A2A1A7 100%)',
  primaryPinkGradient: 'linear-gradient(90deg, #FE56ED 1.41%, #FF91F4 100.13%)',
  whiteTransparent: 'rgba(232, 232, 232, 0.67)',
  inputFieldBorderColor: '#EFEFEF',
  calculatorKeyBackground: '#FAFAFA',
};

export const NavigationColors = {
  primary: Colors.primary,
};

/**
 * FontSize
 */
export const FontSize = {
  small: 16,
  regular: 20,
  large: 40,
};

/**
 * Metrics Sizes
 */
const tiny = 5; // 10
const small = tiny * 2; // 10
const regular = tiny * 3; // 15
const large = regular * 2; // 30
export const MetricsSizes = {
  tiny,
  small,
  regular,
  large,
};
