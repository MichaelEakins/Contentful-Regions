const isDebugMode =
  typeof process !== 'undefined'
    ? process.env.NODE_ENV !== 'production' // Server-side
    : import.meta.env.VITE_ENVIRONMENT === 'development'; // Client-side

export const debug = (...args: any[]) => {
  if (isDebugMode) {
    console.log('[DEBUG]', ...args);
  }
};
