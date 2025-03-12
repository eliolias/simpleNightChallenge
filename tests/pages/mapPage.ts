import { stringToInt } from "../utils/stringToInt";
import { BasePage } from "./basePage";
import { Locator, Page } from "@playwright/test";

export class MapPage extends BasePage {
  readonly mapLocator: Locator;
  readonly mapPin: Locator;
  readonly ratingElement: Locator;
  readonly priceElement: Locator;

  constructor(page: Page) {
    super(page);
    this.mapLocator = page.locator(".gm-style > div > div:nth-child(2)");
    this.mapPin = page.locator('gmp-advanced-marker[role="button"]').last();
    this.ratingElement = page.locator("//article/div[2]/div/div[2]/div[1]");
    this.priceElement = page.locator(
      "//article/div[2]/div/div[3]/div[1]/span[2]"
    );
  }

  async zoomMap(): Promise<void> {
    await this.mapLocator.isVisible();
    await this.mapLocator.hover();
    for (let i = 0; i < 4; i++) {
      await this.page.mouse.wheel(0, -50 * (i + 1));
      await this.page.waitForTimeout(500);
    }
  }

  async selectHotel(): Promise<void> {
    await this.mapPin.click({ force: true });
  }

  async getRating(): Promise<number> {
    console.log(stringToInt((await this.ratingElement.textContent()) ?? "0"));
    return stringToInt(await this.ratingElement.textContent());
  }

  async getPrice(): Promise<number> {
    console.log(stringToInt((await this.priceElement.textContent()) ?? "0"));
    return stringToInt(await this.priceElement.textContent());
  }
}
