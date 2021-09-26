import { expect } from 'chai';

import { GildedRose, Item } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('should decrease quality and sell in', function () {
        const gildedRose = new GildedRose([new Item('foo', 2, 2)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(1);
        expect(items[0].sellIn).to.equal(1);
    });

    it('should not decrease quality below 0', function () {
        const gildedRose = new GildedRose([new Item('foo', 2, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
        expect(items[0].sellIn).to.equal(1);
    });

    it('should decrease quality twice as fast', function () {
        const gildedRose = new GildedRose([new Item('foo', 0, 2)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
        expect(items[0].sellIn).to.equal(-1);
    });

    it('should increase "Aged Brie" quality', function () {
        const gildedRose = new GildedRose([new Item(GildedRose.AgedBrie, 2, 2)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(3);
        expect(items[0].sellIn).to.equal(1);
    });

    it('should increase "Backstage passes" quality by 1', function () {
        const gildedRose = new GildedRose([new Item(GildedRose.BackstagePass, 11, 2)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(3);
        expect(items[0].sellIn).to.equal(10);
    });

    it('should increase "Backstage passes" quality by 2', function () {
        const gildedRose = new GildedRose([new Item(GildedRose.BackstagePass, 6, 2)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(4);
        expect(items[0].sellIn).to.equal(5);
    });

    it('should increase "Backstage passes" quality by 3', function () {
        const gildedRose = new GildedRose([new Item(GildedRose.BackstagePass, 1, 2)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(5);
        expect(items[0].sellIn).to.equal(0);
    });

    it('should set "Backstage passes" quality to 0 after concert', function () {
        const gildedRose = new GildedRose([new Item(GildedRose.BackstagePass, 0, 2)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
        expect(items[0].sellIn).to.equal(-1);
    });


    it('should not increase "Aged Brie" quality over 50', function () {
        const gildedRose = new GildedRose([new Item(GildedRose.AgedBrie, 2, 50)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(50);
        expect(items[0].sellIn).to.equal(1);
    });

    it('should not increase "Backstage passes" quality over 50', function () {
        const gildedRose = new GildedRose([new Item(GildedRose.BackstagePass, 2, 50)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(50);
        expect(items[0].sellIn).to.equal(1);
    });

    it('should never change "Sulfuras" quality and sellIn', function () {
        const gildedRose = new GildedRose([new Item(GildedRose.Sulfuras, 2, 80)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(80);
        expect(items[0].sellIn).to.equal(2);
    });

});
