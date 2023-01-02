import { EMOJI_LIST } from './../constants';

export class EmojiUtils {

  protected static getEmojiList() {
    return EMOJI_LIST;
  }

  protected static getKeyByValue(object: any, value: string) {
    return Object.keys(object).find(key => object[key] === value);
  }

  protected static getEmojiNameByEmoji(emoji: string): string {
    const emojis = this.getEmojiList();
    return this.getKeyByValue(emojis, emoji)
  }

  protected static checkIfEmojiExist = (emoji?: string) => {
    const emojis = this.getEmojiList();
    return Boolean(this.getKeyByValue(emojis, emoji))
  }

}
