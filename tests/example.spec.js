// @ts-check
import { test, expect } from '@playwright/test';
const {HomePage} = require('./BookingFlight/HomePage');

const url = 'https://www.booking.com/flights/index.en-gb.html.';
const FromLocation = "DEL";
const ToLocation = "BOM";
const Dates = "2025-04-12";
const adults = 2;
const Child = 4;
const ErrorText = 'Add an airport or city';


test.beforeEach('PreCondition testCase', async ({ page }) => {
 
  const Url = new HomePage(page, expect);
  await Url.goToUrl(url);
  
});

test('User Clicks on Search with All details', async ({ page }) => {



const searchFlight = new HomePage(page, expect);

await searchFlight.clickOnOneway();
await searchFlight.removeExistingFromLocation();
await searchFlight.selectFromLocation(FromLocation);
await searchFlight.selectToLocation(ToLocation);
await searchFlight.selectDateInOneWay(Dates);
await searchFlight.selectTravelers(adults, Child);
await searchFlight.clickOnSearch();

});


test('without All details Validate error code', async ({ page }) => {

  const searchFlight = new HomePage(page, expect);

  await searchFlight.clickOnOneway();
  await searchFlight.removeExistingFromLocation();
  await searchFlight.clickOnSearch();
  await searchFlight.validateErrors(ErrorText);
    
});




