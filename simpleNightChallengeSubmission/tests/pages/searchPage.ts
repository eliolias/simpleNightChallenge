import { BasePage } from "./basePage";
import { Locator, Page } from "@playwright/test";

export class SearchPage extends BasePage {
    minPriceSlider: Locator;
    maxPriceSlider: Locator;
    guestScoreCheckbox: Locator;

  constructor(page: Page) {
    super(page);
    this.minPriceSlider = page.getByRole("slider").first();
    this.maxPriceSlider = page.getByRole("slider").nth(1);
    this.guestScoreCheckbox = page.getByRole("checkbox", { name: "Very Good (7+)" });

  }

  stringToInt(value: string | null): number {
    return value ? parseInt(value.replace("$", "")) : 0;
  }

  async adjustMinPrice(targetValue: number): Promise<void> {
    const minBoundingBox = await this.minPriceSlider.boundingBox();
    const minStartCoords = {
    x: minBoundingBox.x + minBoundingBox.width / 2,
    y: minBoundingBox.y + minBoundingBox.height / 2,
        };
        while (this.stringToInt(await this.minPriceSlider.textContent()) < 99) {
        await this.minPriceSlider.hover();
        await this.page.mouse.down();
        await this.page.mouse.move((minStartCoords.x = minStartCoords.x + 1),
        minStartCoords.y);
        await this.page.mouse.up();
        }
        await this.page.waitForTimeout(1000)
    }

  async adjustMaxPrice(targetValue: number): Promise<void> {
    const maxBoundingBox = await this.maxPriceSlider.boundingBox();
    const maxStartCoords = {
    x: maxBoundingBox.x + maxBoundingBox.width / 2,
    y: maxBoundingBox.y + maxBoundingBox.height / 2,
        };
    //This is a BUG, it's showing less than 1000
    while (this.stringToInt(await this.maxPriceSlider.textContent()) > 999) {
      await this.maxPriceSlider.hover();
      await this.page.mouse.down();
      await this.page.mouse.move((maxStartCoords.x = maxStartCoords.x - 1),
      maxStartCoords.y);
      await this.page.mouse.up();
    }
    while (this.stringToInt(await this.maxPriceSlider.textContent()) > 1001) {
      await this.maxPriceSlider.hover();
      await this.page.mouse.down();
      await this.page.mouse.move((maxStartCoords.x = maxStartCoords.x + 1),
      maxStartCoords.y);
      await this.page.mouse.up();
    }
  }

  async setGuestScoreFilter(): Promise<void> {
    await this.guestScoreCheckbox.check();
  }
}
