export function brightness(rgb: number[], percent: number) {
  let [red, green, blue] = rgb;

  return [
    Math.min(255, Math.floor(red * percent)),
    Math.min(255, Math.floor(green * percent)),
    Math.min(255, Math.floor(blue * percent))
  ]
}

export function saturation(rgb: number[], s: number): number[] {
  let minIndex = rgb.indexOf(Math.min(...rgb));
  const maxIndex = rgb.indexOf(Math.max(...rgb));
  const midIndex = [0, 1, 2].filter((i) => i !== minIndex && i !== maxIndex)[0];
  let a = rgb[maxIndex] - rgb[minIndex];
  const b = rgb[midIndex] - rgb[minIndex];
  const x = rgb[maxIndex];
  const arr: number[] = [x, x, x];
  if (minIndex === maxIndex) {
    minIndex = 2;
    a = 1;
  }

  arr[maxIndex] = x;
  arr[minIndex] = Math.round(x * (1 - s));
  arr[midIndex] = Math.round(x * ((1 - s) + s * b / a));

  return arr;
}
