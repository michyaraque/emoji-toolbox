const getAvgHex = (color: number, total: number) =>
    Math.round(color / total)
        .toString(16)
        .padStart(2, "0");

const formatRGB = (rgb: number[] | string[]) => `#` + rgb.join("");

export function rgbToHex(red: number, green: number, blue: number): string {
    const r = red.toString(16).padStart(2, "0");
    const g = green.toString(16).padStart(2, "0");
    const b = blue.toString(16).padStart(2, "0");
    return formatRGB([r, g, b]);
}

export const canvasRGBAToHex = (
    red: number,
    green: number,
    blue: number,
    totalPixels: number
): string => {
    const r = getAvgHex(red, totalPixels);
    const g = getAvgHex(green, totalPixels);
    const b = getAvgHex(blue, totalPixels);
    return formatRGB([r, g, b]);
}

export const canvasRGBAToRGB = (red: number, green: number, blue: number, totalPixels: number): number[] => {
    const r = Math.round(red / totalPixels);
    const g = Math.round(green / totalPixels);
    const b = Math.round(blue / totalPixels);
    return [r, g, b];
}


const hexToRgb = (hex: string) => {
    const hexadecimal = hex.replace('#', '');
    return hexadecimal.length === 3
            ? hexadecimal.split('').map(c => parseInt(c.repeat(2), 16))
            : hexadecimal.match(/.{1,2}/g).map(v => parseInt(v, 16))
}

export const isHexTooDark = (hexColor: string) => {
    const [r, g, b] = hexToRgb(hexColor)
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) < 40
       
}

export const isHexTooLight = (hexColor: string) => {
    const [r, g, b] = hexToRgb(hexColor)
    return (((r * 299) + (g * 587) + (b * 114)) / 1000) > 155
}