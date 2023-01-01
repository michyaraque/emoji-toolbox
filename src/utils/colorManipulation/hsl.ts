export function brightness(rgb: any[], percent: number) {
    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];

    return [
        Math.min(255, Math.floor(r * percent)),
        Math.min(255, Math.floor(g * percent)),
        Math.min(255, Math.floor(b * percent))
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
  