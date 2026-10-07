import { config } from '../config/env.js';

export function requireAdminAuth(req, res, next) {
  const apiKey = req.headers['x-api-key'] || req.query.apiKey;

  if (!apiKey || apiKey !== config.adminApiKey) {
    return res.status(401).json({
      error: 'Unauthorized: Valid x-api-key header required for admin document operations.'
    });
  }

  next();
}
