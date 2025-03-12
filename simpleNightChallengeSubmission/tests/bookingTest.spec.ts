import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/homePage";
import { SearchPage } from "./pages/searchPage";
import { MapPage } from "./pages/mapPage";

test("Goes through the booking process for a hotel", async ({ page }) => {
  const homePage = new HomePage(page);
  const searchPage = new SearchPage(page);
  const mapPage = new MapPage(page);

  // Open Simplenight App
  await homePage.navigate("https://app.simplenight.com/");

  // Search for hotels in Miami
  await homePage.selectHotelCategory();
  await homePage.enterLocation("Miami");
  await page.mouse.wheel(0, 100);

  await homePage.selectDates();
  await homePage.addGuest();
  await homePage.searchHotels();
  

  await page.waitForLoadState('networkidle');

  // Adjust filters
  await searchPage.adjustMinPrice(99);
  await searchPage.adjustMaxPrice(1000);
  await searchPage.setGuestScoreFilter();

  // Interact with the map
  //await mapPage.zoomMap();
  await mapPage.selectHotel();

  // Assertions
  expect(await mapPage.getRating()).toBeGreaterThanOrEqual(7);
  expect(await mapPage.getPrice()).toBeGreaterThanOrEqual(100);
  expect(await mapPage.getPrice()).toBeLessThanOrEqual(1000);
});
