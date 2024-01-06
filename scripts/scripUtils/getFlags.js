export const getFlags = () => {
  return process.argv.slice(2).join(' ');
};
