import { EmojiAccepted, IEmojiData, TColor } from "./../types/emojiTypes";
import { brightness, saturation } from "./../utils";
import { EmojiCore } from "./EmojiCore";
import { EmojiUtils } from "./EmojiUtils";

export class Emoji extends EmojiCore {

  public static emojiData(emoji: EmojiAccepted): IEmojiData {

    const [red, green, blue] = Emoji.pickColorBaseOfEmoji(emoji);
    const normalColor = Emoji.normalColor(emoji, "both", [red, green, blue]);
    const softColor = Emoji.softColor(emoji, "both", [red, green, blue]);
    const darkenColor = Emoji.darkenColor(emoji, "both", [red, green, blue]);

    return {
      base: normalColor,
      soft: softColor,
      darken: darkenColor,
    }
  }

  private static pickColorBaseOfEmoji(emoji: EmojiAccepted, rgb: number[] = undefined) {
    let [red, green, blue] = [0, 0, 0];
    if (rgb !== undefined) {
      return [red, green, blue] = rgb;
    }

    return [red, green, blue] = EmojiCore.getColorBaseOfEmoji(emoji)
  }

  /**
   * It returns the name of the emoji.
   * @param {EmojiAccepted} emoji - EmojiAccepted type
   * @returns The name of the emoji
   */
  public static identifier(emoji: EmojiAccepted): string {
    return EmojiUtils.getEmojiNameByEmoji(emoji);
  }

  /**
   * Get the human name of an emoji.
   *
   * @param {EmojiAccepted} emoji to get the name
   * @returns {string} The name in a human format of the emoji.
   */
  public static humanName(emoji: EmojiAccepted): string {
    return Emoji.identifier(emoji)
      .split("_")
      .map((wordPart: string) => wordPart.charAt(0).toUpperCase() + wordPart.slice(1))
      .join(" ");
  }

  /**
   * Get the unicode value of an emoji.
   *
   * @returns The unicode value of the emoji.
   */
  public static unicode(emoji: EmojiAccepted): string {
    return [...emoji].map(e => "U+" + e.codePointAt(0).toString(16)).join(`-`);
  }

  /**
   * This function ensures that the emoji data is loaded,
   * and then returns the darken style of the emoji data.
   *
   * @returns The normalColor() method returns the darken property of the styles object,
   *  access to the object "hexadecimal" or "rgb"
   */
  public static normalColor(emoji: EmojiAccepted, type: TColor = "rgb", rgb: number[] = undefined) {
    let [red, green, blue] = Emoji.pickColorBaseOfEmoji(emoji, rgb);
    return Emoji.colorComposer(type, [red, green, blue]);
  }

  /**
   * This function ensures that the emoji data is loaded,
   * and then returns the darken style of the emoji data.
   *
   * @returns The softColor() method returns the darken property of the styles object,
   *  access to the object "hexadecimal" or "rgb"
   */
  public static softColor(emoji: EmojiAccepted, type: TColor = "rgb", rgb: number[] = undefined) {
    let [red, green, blue] = Emoji.pickColorBaseOfEmoji(emoji, rgb);
    const soft = brightness(saturation([red, green, blue], 0.1), 0.99);
    return Emoji.colorComposer(type, soft);
  }

  /**
   * This function ensures that the emoji data is loaded,
   * and then returns the darken style of the emoji data.
   *
   * @returns The darkenColor() method returns the darken property of the styles object,
   *  access to the object "hexadecimal" or "rgb"
   */
  public static darkenColor(emoji: EmojiAccepted, type: TColor = "rgb", rgb: number[] = undefined) {
    let [red, green, blue] = Emoji.pickColorBaseOfEmoji(emoji, rgb);
    const darken = brightness(saturation([red, green, blue], 0.9), 0.48);
    return Emoji.colorComposer(type, darken);
  }

  /* A function that checks if an emoji exists in the source list */
  public static emojiExist(emoji: EmojiAccepted): boolean {
    return EmojiUtils.checkIfEmojiExist(emoji);
  }

  /**
 * Iterates over the code points of an input string and returns true if an emoji is found.
 *
 * see https://unicode.org/Public/emoji/13.0/emoji-sequences.txt
 *
 * @param {string} input the string to check
 * @return {boolean} true if an emoji is found
 */
  public static hasEmoji(input: string): boolean {
    for (let character of input) {
      let cHex = character.codePointAt(0).toString(16);
      if (cHex.length > 3) {
        let prefix = cHex.substring(0, 2);

        const validHex = ["20", "21", "23", "24", "25", "26", "27", "2B", "29", "30", "32"];
        if (cHex.length == 5 && prefix == "1f" || cHex.length == 4 && validHex.includes(prefix)) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * It removes all emoji characters from a string.
   * @param {string} input - The string to remove the emoji from.
   * @returns A string with all emojis removed.
   */
  public static demojify(input: string): string {

    const inpArray = input.split(" ");
    const phrase = inpArray.map((word) => {
      return Emoji.hasEmoji(word) ? '' : word;
    }).filter(Boolean)

    return phrase.join(" ");
  }

}
