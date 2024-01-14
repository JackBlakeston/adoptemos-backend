import { capitalize } from './capitalize.js';

export const formatCamelcase = (input) => {
  if (!input) return;
  return capitalize(input.replace(/([A-Z])/g, ' $1').toLowerCase());
};
