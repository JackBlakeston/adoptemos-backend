export const capitalize = (input) => {
  if (!input) return;
  return `${input.charAt(0).toUpperCase()}${input.slice(1)}`;
};
