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