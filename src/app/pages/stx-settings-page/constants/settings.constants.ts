export const SETTINGS_ENDPOINT = 'settings';

export const SETTINGS_MESSAGES = {
  SETTINGS_REMOVED: 'Settings were removed!',
  SETTINGS_SETTED: 'Secret and Api keys were setted!',
  SOMETHING_WENT_WRONG: 'Something went wrong',
  CONNECTION_ON: 'CONNECTION_ON',
  CONNECTION_OFF: 'CONNECTION_OFF',
} as const;

export const SETTINGS_ERROR_MESSAGES = {
  INVALID_KEYS: 'Invalid API or Secret keys. Please check them and try again.',
  REMOVE_FAILED: 'Failed to remove settings. Please try later.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
} as const;
