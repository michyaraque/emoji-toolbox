import path from "path";
import fs from 'fs';
import { EmojiAccepted } from "./../types/emojiTypes";
import { rgbToHex } from "./../utils";
import { EmojiCore } from "./EmojiCore";

export class Emoji extends EmojiCore {

    /* A method that is being called in the constructor. */
    constructor (emoji?: EmojiAccepted) {
        super();
        
        if(emoji) {
            this._emoji = emoji;
            this.parseEmoji();
            this.createEmojiData();
        }

        return this;
    }

    /**
     * Get the human name of an emoji.
     * 
     * @returns The name in a human format of the emoji.
     */
    public name(): string {
        this.ensureEmojiData();

        return this.emojiData.emoji_name as string;
    }

    /**
     * Get the unicode value of an emoji.
     * 
     * @returns The unicode value of the emoji.
     */
    public unicode() {
        this.ensureEmojiData();

        return this.emojiData.unicode;
    }

    /**
     * This function ensures that the emoji data is loaded, 
     * and then returns the darken style of the emoji data.
     * 
     * @returns The normalColor() method returns the darken property of the styles object,
     *  access to the object "hexadecimal" or "rgb"
     */
    public normalColor() {
        this.ensureEmojiData();

        return this.emojiData.styles.base;
    }

    /**
     * This function ensures that the emoji data is loaded, 
     * and then returns the darken style of the emoji data.
     * 
     * @returns The softColor() method returns the darken property of the styles object,
     *  access to the object "hexadecimal" or "rgb"
     */
    public softColor() {
        this.ensureEmojiData();

        return this.emojiData.styles.soft;
    }

    /**
     * This function ensures that the emoji data is loaded, 
     * and then returns the darken style of the emoji data.
     * 
     * @returns The darkenColor() method returns the darken property of the styles object,
     *  access to the object "hexadecimal" or "rgb"
     */
    public darkenColor() {
        this.ensureEmojiData();
        return this.emojiData.styles.darken;
    }

    public emojiExist = () => {
        this.ensureEmojiData();
        return this.checkIfEmojiExist(this.emojiData.emoji);
    }

    /**
     * If there is no emoji data, throw an error.
     */
    private ensureEmojiData() {
        if (!this.emojiData) {
            throw new Error("No emoji data found");
        }
    }

    /**
     * It takes a base color, a soft color, and a darken color, and then it draws three rectangles on a
     * canvas, one for each color, and then it writes the canvas to a file.
     * 
     * @param {string} base - string,
     * @param {number[]} soft - [255, 255, 255]
     * @param {number[]} darken - [0, 0, 0]
     * @returns The return value is the instance of the class.
     */
    private save(base: string, soft: number[], darken: number[]): Emoji {

        const canvas = this.container.canvas;
        const context = this.container.context;

        context.fillStyle = rgbToHex(soft[0], soft[1], soft[2]);
        context.fillRect(0, 0, canvas.width / 3, canvas.height);

        context.fillStyle = base;
        context.fillRect(25, 0, canvas.width / 3, canvas.height);

        context.fillStyle = rgbToHex(darken[0], darken[1], darken[2]);
        context.fillRect(50, 0, canvas.width / 3, canvas.height);

        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(this._emoji, canvas.width / 2, canvas.height / 2);

        const buffer = canvas.toBuffer('image/png')
        fs.writeFileSync(path.join(__dirname, '..', '0.png'), buffer)
        return this;
    }
}