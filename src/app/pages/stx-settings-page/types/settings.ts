export type SettingsRequest = {
  secretKey: string;
  apiKey: string;
};

export type SettingsResponse<T> = {
  data: T | null;
  code: string;
};

export type SettingsResponseDTO = {
  apiKey: string | null;
  hasSecret: boolean;
};
