export const environment = {
  isProduction: process.env.NODE_ENV === 'production',
  apiUrl: process.env.VITE_API_URL || '',
};
