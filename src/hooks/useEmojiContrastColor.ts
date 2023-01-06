import { useState } from 'react'
import { EmojiAccepted } from 'emojiTypes'
import { Emoji as emoj } from '../core/Emoji';
import { useEffect } from 'react';
import color from "color";

export const useEmojiContrastColor = (emoji: EmojiAccepted) => {

  const [contrastColor, setEmojiContrastColor] = useState<string>();

  useEffect(() => {
    const contrast = color(emoj.darkenColor(emoji) || "#000").contrast(color("#000")) > 4.5 ? "#000" : "#fff";
    setEmojiContrastColor(contrast);
  }, [emoji])

  return contrastColor;
}
