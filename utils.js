// utils.js

/**
 * Sanitizes a string to be safe for filenames.
 * Removes special characters and trims length.
 */
export function sanitizeFilename(str) {
  return str.replace(/[^a-z0-9_\-]/gi, "_").slice(0, 50);
}
