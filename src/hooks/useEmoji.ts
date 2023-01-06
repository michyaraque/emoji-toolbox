import { useState } from 'react'
import { EmojiAccepted, IEmojiData } from 'emojiTypes'
import { Emoji as emoj } from '../core/Emoji';
import { useEffect } from 'react';

export const useEmoji = (emoji: EmojiAccepted): IEmojiData => {

  const [emojiData, setEmojiData] = useState<IEmojiData>({
    base: undefined,
    soft: undefined,
    darken: undefined,
  });

  useEffect(() => {
    setEmojiData(emoj.emojiData(emoji));
  }, [emoji])

  return emojiData;
}
