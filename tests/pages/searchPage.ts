import { BasePage } from "./basePage";
import { Locator, Page } from "@playwright/test";
import { stringToInt } from "../utils/stringToInt";

export class SearchPage extends BasePage {
  readonly minPriceSlider: Locator;
  readonly maxPriceSlider: Locator;
  readonly guestScoreCheckbox: Locator;
  readonly viewChangingDropdown: Locator;
  readonly mapButton: Locator;

  constructor(page: Page) {
    super(page);
    this.minPriceSlider = page.getByRole("slider").first();
    this.maxPriceSlider = page.getByRole("slider").nth(1);
    this.guestScoreCheckbox = page.getByRole("checkbox", {
      name: "Very Good (7+)",
    });
    this.viewChangingDropdown = page.getByRole("button", { name: "Grid" });
    this.mapButton = page.getByText("Map");
  }

  async changeViewToMap(): Promise<void> {
    await this.viewChangingDropdown.isVisible();
    await this.viewChangingDropdown.click();
    await this.mapButton.click();
  }

  async adjustMinPrice(): Promise<void> {
    const minBoundingBox = await this.minPriceSlider.boundingBox();
    const minStartCoords = {
      x: minBoundingBox.x + minBoundingBox.width / 2,
      y: minBoundingBox.y + minBoundingBox.height / 2,
    };
    while (stringToInt(await this.minPriceSlider.textContent()) < 99) {
      await this.minPriceSlider.hover();
      await this.page.mouse.down();
      await this.page.mouse.move(
        (minStartCoords.x = minStartCoords.x + 1),
        minStartCoords.y
      );
      await this.page.mouse.up();
    }
    await this.page.waitForTimeout(1000);
  }

  async adjustMaxPrice(): Promise<void> {
    const maxBoundingBox = await this.maxPriceSlider.boundingBox();
    const maxStartCoords = {
      x: maxBoundingBox.x + maxBoundingBox.width / 2,
      y: maxBoundingBox.y + maxBoundingBox.height / 2,
    };
    while (stringToInt(await this.maxPriceSlider.textContent()) > 999) {
      await this.maxPriceSlider.hover();
      await this.page.mouse.down();
      await this.page.mouse.move(
        (maxStartCoords.x = maxStartCoords.x - 1),
        maxStartCoords.y
      );
      await this.page.mouse.up();
    }
    while (stringToInt(await this.maxPriceSlider.textContent()) < 1001) {
      let temp = stringToInt(await this.maxPriceSlider.textContent());

      await this.maxPriceSlider.hover();
      await this.page.mouse.down();
      await this.page.mouse.move(
        (maxStartCoords.x = maxStartCoords.x + 1),
        maxStartCoords.y
      );
      await this.page.mouse.up();
      if (temp === stringToInt(await this.maxPriceSlider.textContent())) {
        break;
      }
    }
  }

  async setGuestScoreFilter(): Promise<void> {
    await this.guestScoreCheckbox.check();
  }
}
