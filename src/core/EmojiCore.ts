import { Canvas, createCanvas, SKRSContext2D } from "@napi-rs/canvas";
import { EmojiAccepted, TColor } from "../types/emojiTypes";
import { canvasRGBAToHex, canvasRGBAToRGB, brightness, saturation, rgbToHex } from "../utils";
import fs from 'fs';
import path from 'path';
import { EmojiUtils } from "./EmojiUtils";

export class EmojiCore extends EmojiUtils {

  protected static baseColor: number[];

  protected static BASE_SIZE: number = 75;
  protected static container: {
    canvas: Canvas;
    context: SKRSContext2D;
  }

  /* protected static createStaticEmojiBase = async () => {
    const formatedEmojis = Object.values(this.getEmojiList());
    let content = 'export const STATIC_EMOJI_DATA = [ ';
    formatedEmojis.map((item: EmojiAccepted, index) => {
      this.parseEmoji(item);
      const emojiData = EmojiCore.emojiData;

      content += JSON.stringify(emojiData, null, 2).replace(/[\[\]']+/g, '') + ",";

      this.emojiData = null;
      if (index === 5) return;
    })
    content += '];';
    await fs.promises.writeFile(path.join(
      __dirname,
      '..',
      'constants',
      'staticEmojiBase.ts'
    ), content);
  } */

  protected static createEmojiTypes = async () => {
    try {
      const formatedEmojis = Object.values(this.getEmojiList());
      let content = 'export type EmojiAccepted = ' + formatedEmojis.map((item) => `"${item}"`).join(" | ");
      await fs.promises.writeFile(path.join(
        __dirname,
        '..',
        'types',
        'emojiTypes.ts'
      ), content);
      console.log(`Suscesfully types creates for: ${formatedEmojis.length} emojis`);
    } catch (error) {
      console.error(error);
    }
  }

  protected static getColorBaseOfEmoji = (emoji: EmojiAccepted): number[] => {

    let totalPixels = 0;
    const colors = {
      red: 0,
      green: 0,
      blue: 0,
      alpha: 0
    };
    const canvas = createCanvas(this.BASE_SIZE, this.BASE_SIZE);
    const context = canvas.getContext("2d");

    context.font = "30px Arial";
    context.fillText(emoji, 0, 28);

    const { data: imageData } = context.getImageData(0, 0, 30, 30);
    for (let i = 0; i < imageData.length; i += 4) {
      let [r, g, b, a] = imageData.slice(i, i + 4);
      if (a > 50) {
        totalPixels += 1;
        colors.red += r;
        colors.green += g;
        colors.blue += b;
        colors.alpha += a;
      }
    }

    const [red, green, blue] = canvasRGBAToRGB(
      colors.red,
      colors.green,
      colors.blue,
      totalPixels
    )


    return [red, green, blue, totalPixels];
  }

  protected static colorComposer(type: TColor = "rgb", rgb: number[]) {
    const [red, green, blue] = rgb;
    const hexColor = rgbToHex(red, green, blue);

    if (type === "rgb") {
      return [red, green, blue];
    }

    if (type === "hex") {
      return hexColor;
    }

    return {
      rgb: {
        r: red,
        g: green,
        b: blue
      },
      hex: hexColor
    }
  }
}
