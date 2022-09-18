export const NODE_ENV = process.env.APP_ENV || process.env.NODE_ENV;
export const isDevelopment = NODE_ENV === 'development';
export const isProduction = NODE_ENV === 'production';
