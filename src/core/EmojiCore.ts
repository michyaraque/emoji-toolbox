import { Canvas, createCanvas, SKRSContext2D } from "@napi-rs/canvas";
import { EmojiAccepted } from "../types/emojiTypes";
import { canvasRGBAToHex, canvasRGBAToRGB, brightness, saturation, rgbToHex } from "../utils";
import fs from 'fs';
import path from 'path';
import { EmojiUtils } from "./EmojiUtils";

export class EmojiCore extends EmojiUtils {

    protected baseColor: number[];
    public emojiData: { [key: string]: any };

    protected BASE_SIZE: number = 75;
    protected _emoji: EmojiAccepted;
    protected container: {
        canvas: Canvas;
        context: SKRSContext2D;
    }
    protected totalPixels: number;

    public createStaticEmojiBase = async () => {
        const formatedEmojis = Object.values(this.getEmojiList());
        let content = 'export const STATIC_EMOJI_DATA = [ ';
        formatedEmojis.map((item: EmojiAccepted, index) => {
            this.parseEmoji(item);
            const emojiData = this.createEmojiData().emojiData;

            content += JSON.stringify(emojiData, null, 2).replace(/[\[\]']+/g, '')  + ",";

            this.emojiData = null;
            if(index === 5) return;
        })
        content += '];';
        await fs.promises.writeFile(path.join(
            __dirname,
            '..',
            'constants',
            'staticEmojiBase.ts'
        ), content);
    }

    public createEmojiTypes = async () => {
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

    /**
     * @version alpha 1.0
     * @returns EmojiCore
     */
    protected parseEmoji = (emoji?: EmojiAccepted): EmojiCore => {

        if(emoji) this._emoji = emoji;

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
        context.fillText(this._emoji, 0, 28);

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

        this.container = {
            canvas,
            context
        };
        this.baseColor = [colors.red, colors.green, colors.blue];
        this.totalPixels = totalPixels;

        return this;
    }

    /**
     * Parse and create the emoji data, contains colors, name,
     * unicode, rgba and other useful properties.
     * 
     * @version alpha 1.0
     * @return Emoji
     */
    protected createEmojiData = (emoji?: EmojiAccepted): EmojiCore => {

        if(emoji) this._emoji = emoji;

        const [r, g, b] = [...this.baseColor];
        const [red, green, blue] = canvasRGBAToRGB(
            r,
            g,
            b,
            this.totalPixels
        )

        const soft = brightness(saturation([red, green, blue], 0.1), 1.5);
        const darken = brightness(saturation([red, green, blue], 0.9), 0.48);
        const baseColor = canvasRGBAToHex(r, g, b, this.totalPixels);

        //this.save(baseColor, soft, darken);

        this.emojiData = {
            emoji: this._emoji,
            emoji_name: this.getEmojiNameByEmoji(this._emoji),
            unicode: [...this._emoji].map(e => e.codePointAt(0).toString(16)).join(`-`),
            styles: {
                base: {
                    hexadecimal: baseColor,
                    rgb: {
                        red: red,
                        green: green,
                        blue: blue
                    }
                },
                soft: {
                    hexadecimal: rgbToHex(soft[0], soft[1], soft[2]),
                    rgb: {
                        red: soft[0],
                        green: soft[1],
                        blue: soft[2]
                    }
                },
                darken: {
                    hexadecimal: rgbToHex(darken[0], darken[1], darken[2]),
                    rgb: {
                        red: darken[0],
                        green: darken[1],
                        blue: darken[2]
                    }
                },
            }
        }
        return this;
    }
}