import fs from 'fs';
import path from 'path';

const root = process.cwd();

class EmojiUtils {

    protected getKeyByValue(object: any, value: string) {
        return Object.keys(object).find(key => object[key] === value);
    }

    protected getEmojiList(): string {
        const emojis = fs.readFileSync(
            path.join(root, 'src', 'constants', 'emoji-list.json')
        );
        return JSON.parse(emojis as any);
    }

    getEmojiNameByEmoji(emoji: string): string {
        const emojis = this.getEmojiList();
        return this.getKeyByValue(emojis, emoji)
    }

    emojiExistOnList(emoji: string): boolean {
        const emojis = this.getEmojiList();
        return Boolean(this.getKeyByValue(emojis, emoji))
    }

    protected checkIfEmojiExist = (emoji?: string) => {
        return this.emojiExistOnList(emoji);
    }

}

export default EmojiUtils;