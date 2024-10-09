//Responsible for token handeling
export const jwtSecret = process.env.JWT_SECRET || 'defaultsecret';
export const jwtExpiry = '1h'; // Token expiry time