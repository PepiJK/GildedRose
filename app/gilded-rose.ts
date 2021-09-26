export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    static readonly AgedBrie = 'Aged Brie';
    static readonly BackstagePass = 'Backstage passes to a TAFKAL80ETC concert';
    static readonly Sulfuras = 'Sulfuras, Hand of Ragnaros';

    private readonly maxQuality = 50;
    private readonly minQuailty = 0;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality(): Array<Item> {
        this.items.forEach(item => {
            switch (item.name) {
                case GildedRose.AgedBrie: {
                    this.increaseQuality(item, 1);
                    item.sellIn--;
                    break;
                }
                case GildedRose.BackstagePass: {
                    if (item.sellIn <= 0) {
                        item.quality = 0;
                    } else if (item.sellIn <= 5) {
                        this.increaseQuality(item, 3);
                    } else if (item.sellIn <= 10) {
                        this.increaseQuality(item, 2);
                    } else {
                        this.increaseQuality(item, 1);
                    }
                    item.sellIn--;
                    break;
                }
                case GildedRose.Sulfuras: break;
                default: {
                    item.sellIn <= 0 ? this.decreaseQuality(item, 2) : this.decreaseQuality(item, 1);
                    item.sellIn--;
                }
            }
        });

        return this.items;
    }

    private increaseQuality(item: Item, by: number): void {
        item.quality = item.quality <= this.maxQuality - by ? item.quality + by : this.maxQuality;
    }

    private decreaseQuality(item: Item, by: number): void {
        item.quality = item.quality > by - 1 ? item.quality - by : this.minQuailty;
    }

}
