export const hexToRgb = (hex, opacity = 1, brightness = 1) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (!result) {
    throw new Error('Invalid hex provided');
  }

  // Remove '#'
  result.shift();

  return `rgba(${result
    .map(value => parseInt(value, 16) * brightness)
    .join(', ')}, ${opacity})`;
};
