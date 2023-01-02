import { describe, beforeEach, it } from "mocha";
import { expect } from 'chai';
import { isHexTooDark, isHexTooLight } from '../src/utils';
import emoji from '../src/core/Emoji';

describe("Emoji Toolbox - Package", () => {

  describe("~ Emoji data", () => {

    it("Should be the identifier name of the input emoji", async () => {
      expect(emoji.identifier("☢️")).to.equal("radioactive_sign");
    })

    it("Should be the exact name of the input emoji", async () => {
      expect(emoji.humanName("☢️")).to.equal("Radioactive Sign");
    })

    it("Darken color of emoji not should be lighten", async () => {
      expect(isHexTooLight(emoji.darkenColor("☢️", "hex").toString())).to.be.false;
    })

    it("Darken color of emoji not should be darken", async () => {
      expect(isHexTooDark(emoji.softColor("☢️", "hex").toString())).to.be.false;
    })

    it("Should be the exact unicode of the input emoji", async () => {
      expect(emoji.unicode("☢️")).to.equal("2622-fe0f");
    })

  })

  describe("~ Emoji utils", async () => {
    it("Phrase should contain emoji", async () => {
      expect(emoji.hasEmoji("🎉 Time to party!")).to.be.true;
    })

    it("Phrase should not contain emoji", async () => {
      expect(emoji.hasEmoji("Time to party!")).to.be.false;
    })

    it("Should remove emoji from string/phrase", async () => {
      expect(
        emoji.demojify("Time to party 🎉!")
      ).to.be.equal("Time to party", "Phrase does not contain emoji or is incorrect");
    })
  })
})
