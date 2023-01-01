import {EMOJI_LIST} from './../constants';

export class EmojiUtils {

    protected getEmojiList() {
        return EMOJI_LIST;
    }
    
    protected getKeyByValue(object: any, value: string) {
        return Object.keys(object).find(key => object[key] === value);
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