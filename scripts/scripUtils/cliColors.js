const getColorCodesString = (colorCodes) => {
  return colorCodes.map((code) => `\x1b[${code}m`).join('');
};

export const color = (colorCodes, text) => {
  return `${getColorCodesString(colorCodes)}${text}\x1b[0m`;
};

export const logColor = (colorCodes, text) => {
  console.log(`\n${color(colorCodes, text)}\n`);
};
