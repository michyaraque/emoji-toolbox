import { Emoji } from '../src/index';
import { describe, beforeEach, it } from "mocha";
import { expect } from 'chai';
import { isHexTooDark, isHexTooLight } from '../src/utils';

describe("Show", () => {

    it("Should be instance of Emoji", async () => {
        const emoji = new Emoji;
        expect(emoji).to.be.instanceOf(Emoji);
    })

    describe("~ Emoji data", () => {

        let emoji: Emoji;
        beforeEach(() => {
            emoji = new Emoji("☢️");
        })

        it("Should contain emoji data", async () => {
            expect(emoji.emojiData).to.ok;
        })

        it("Should be the exact name of the input emoji", async () => {
            expect(emoji.name()).to.equal("radioactive_sign");
        })

        it("Darken color of emoji not should be lighten", async() => {
            expect(isHexTooLight(emoji.darkenColor().hexadecimal)).to.be.false;
        })

        it("Darken color of emoji not should be darken", async() => {
            expect(isHexTooDark(emoji.softColor().hexadecimal)).to.be.false;
        })

        it("Should be the exact unicode of the input emoji", async () => {
            expect(emoji.unicode()).to.equal("2622-fe0f");
        })

        it("Should contain exact nested keys", async () => {
            expect(emoji.normalColor()).to.have.nested.property("hexadecimal");
            expect(emoji.normalColor()).to.have.nested.property("rgb");

            expect(emoji.normalColor()).to.have.nested.property("rgb.red");
            expect(emoji.normalColor()).to.have.nested.property("rgb.green");
            expect(emoji.normalColor()).to.have.nested.property("rgb.blue");
        })

    })
})