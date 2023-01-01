import fs from 'fs';
import path from 'path';

const root = process.cwd();

export function getEmojiList(): string {
    const emojis = fs.readFileSync(
        path.join(root, 'src', 'constants', 'emoji-list.json')
    );
    return JSON.parse(emojis as any);
}

export function getEmojiNameByEmoji(emoji: string): string {
    const emojis = getEmojiList();
    return getKeyByValue(emojis, emoji)
}

export function emojiExistOnList(emoji: string): boolean {
    const emojis = getEmojiList();
    return Boolean(getKeyByValue(emojis, emoji))
}

export function getKeyByValue(object: any, value: string) {
    return Object.keys(object).find(key => object[key] === value);
}