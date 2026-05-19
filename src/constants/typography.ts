import { TextStyle } from 'react-native';

export const Typography: Record<string, TextStyle> = {
  heading1: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
    lineHeight: 34,
  },
  heading2: {
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: -0.3,
    lineHeight: 28,
  },
  heading3: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.2,
    lineHeight: 22,
  },
  body: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
  },
  bodySmall: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
};
