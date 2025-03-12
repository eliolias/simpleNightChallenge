import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/homePage";
import { SearchPage } from "./pages/searchPage";
import { MapPage } from "./pages/mapPage";
import { testData } from "./utils/testData";

test("Goes through the booking process for a hotel and verifies that rating and price are within set thresholds", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const searchPage = new SearchPage(page);
  const mapPage = new MapPage(page);

  // Open Simplenight App
  await homePage.navigate("https://app.simplenight.com/");

  // Search for hotels in Miami with given parameters
  await homePage.selectHotelCategory();
  await homePage.enterLocation(testData.location);
  await homePage.selectDates();
  await homePage.addGuest();
  await homePage.searchHotels();

  //Change view to map (a bit early, to let it load)
  await searchPage.changeViewToMap();

  // Adjust filters
  await searchPage.setGuestScoreFilter();
  await searchPage.adjustMinPrice();
  //Timeout is here because for some reason the page will load the slider and place the maxPrice slider at the end of the slider track, then the page will update and all of a sudden the slider will update it's position so that the slider will not be at the end of the track.
  await page.waitForTimeout(2000);
  await searchPage.adjustMaxPrice();

  // Interact with the map
  await mapPage.zoomMap();
  await mapPage.selectHotel();

  // Assertions
  expect(await mapPage.getRating()).toBeGreaterThanOrEqual(
    testData.ratingThreshold
  );
  expect(await mapPage.getPrice()).toBeGreaterThanOrEqual(testData.minPrice);
  expect(await mapPage.getPrice()).toBeLessThanOrEqual(testData.maxPrice);
});
