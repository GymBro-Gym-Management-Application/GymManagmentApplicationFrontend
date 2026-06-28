import Constants from 'expo-constants';

export const API_BASE_URL: string =
  Constants.expoConfig?.extra?.apiBaseUrl ?? 'https://gymmanagmentapplication-3.onrender.com/api';
