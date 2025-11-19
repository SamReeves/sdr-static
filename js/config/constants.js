/**
 * Application-wide constants
 * Centralizes all magic numbers and configuration values
 */

export const LOGO_CONFIG = {
  TOTAL_CURVES: 15,
  CURVE_SPACING: 12,
  START_OFFSET: 10,
  BASE_WIDTH: 85,
  WIDTH_INCREMENT: 7,
  HEIGHT: 190,
  MARGIN_BOTTOM: 10,
  NUM_POINTS: 20,
  
  ANIMATION: {
    BASE_DELAY: 0.05,
    ALTERNATING_DELAY: 0.15,
    SPLIT_DELAY: 0.4,
    MIDDLE_INDEX: 7
  }
};

export const ANIMATION_CONFIG = {
  SCROLL: {
    THRESHOLD: 0.1,
    ROOT_MARGIN: '0px 0px -50px 0px'
  },
  CARD: {
    FADE_DURATION: 0.6,
    TRANSLATE_Y: 20
  }
};

export const NOTIFICATION_CONFIG = {
  DURATION: 4000,
  ANIMATION_DELAY: 300
};

