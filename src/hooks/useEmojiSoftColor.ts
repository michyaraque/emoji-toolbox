import React, { useMemo, useState } from 'react'
import { EmojiAccepted } from 'emojiTypes'
import { Emoji as emoj } from './../core/Emoji';
import { useEffect } from 'react';

export const useEmojiSoftColor = (emoji: EmojiAccepted) => {

  const [color, setColor] = useState<string>("#FFF");

  useEffect(() => {
    setColor(emoj.softColor(emoji, "hex").toString());
  }, [emoji])

  return color;
}
