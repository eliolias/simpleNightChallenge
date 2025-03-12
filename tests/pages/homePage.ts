import { BasePage } from "./basePage";
import { Locator, Page } from "@playwright/test";

export class HomePage extends BasePage {
  readonly hotelsCategory: Locator;
  readonly locationTrigger: Locator;
  readonly locationInput: Locator;
  readonly searchResultMiami: Locator;
  readonly datesTrigger: Locator;
  readonly guestsTrigger: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    super(page);
    this.hotelsCategory = page.getByTestId(
      "category-search-bar-tab(static:hotels)"
    );
    this.locationTrigger = page.getByTestId(
      "category(static:hotels)_search-form_location_trigger"
    );
    this.locationInput = page.getByTestId(
      "category(static:hotels)_search-form_location_input"
    );
    this.searchResultMiami = page.getByRole("button", {
      name: "Miami Miami, FL, USA",
    });
    this.datesTrigger = page.getByTestId(
      "category(static:hotels)_search-form_dates_trigger"
    );
    this.guestsTrigger = page.getByTestId(
      "category(static:hotels)_search-form_guests_trigger"
    );
    this.searchButton = page.getByTestId(
      "category(static:hotels)_search-form_search-button"
    );
  }

  async selectHotelCategory(): Promise<void> {
    await this.hotelsCategory.click();
  }

  async enterLocation(location: string): Promise<void> {
    await this.locationTrigger.click();
    await this.locationInput.fill(location);
    await this.searchResultMiami.click();
  }

  async selectDates(): Promise<void> {
    await this.datesTrigger.click();

    await this.page
      .getByRole("button")
      .filter({ hasText: /^$/ })
      .nth(4)
      .click();
    await this.page
      .getByRole("button")
      .filter({ hasText: /^$/ })
      .nth(4)
      .click();
    await this.page.getByRole("button", { name: "20 May" }).click();
    await this.page.getByRole("button", { name: "20 May" }).click();
    await this.page.getByRole("button", { name: "22 May" }).click();
    await this.page.mouse.wheel(0, 100);
    await this.page
      .getByTestId("category(static:hotels)_search-form_dates_apply-button")
      .click();
  }

  async addGuest(): Promise<void> {
    await this.guestsTrigger.click();
    await this.page
      .getByTestId(
        "category(static:hotels)_search-form_guests_room(1)_age(children)_add-button"
      )
      .click();
  }

  async searchHotels(): Promise<void> {
    await this.searchButton.click();
  }
}
