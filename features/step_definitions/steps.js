const {Given, When, Then} = require('@cucumber/cucumber')
const {test, expect} = require('@playwright/test')
const {playwright} = require('@playwright/test')



         Given('Travel Website is open and asked details to search.', async function () {
            const browser = await playwright.chromium.launch();
            
            const Context = await browser.Context();
            const page = await Context.newPage();
            
            const url = 'https://www.booking.com/flights/index.en-gb.html.';
            const Url = new HomePage(page, expect);
            await Url.goToUrl(url);
         });
         When('User Selects From location {string}, to Location {string}', async function (FromLocation, ToLocation) {
            this.searchFlight = new HomePage(page, expect);

            await searchFlight.clickOnOneway();
            await searchFlight.removeExistingFromLocation();
            await searchFlight.selectFromLocation(FromLocation);
            await searchFlight.selectToLocation(ToLocation);
            
          });
          When('Selects Date {string}',async function (Dates) {
            await this.searchFlight.selectDateInOneWay(Dates);
            
          });
          When('entered No of adults {int} and No of Child  {int}',async function (adults, Child) {
            await this.searchFlight.selectTravelers(adults, Child);
            
            });
            Then('Click on Search and validate all flights list as per the dates and locations.', async function () {
                await this.searchFlight.clickOnSearch();
              });

              ////Tc2 

              When('User didnt select From location, to Location', async function () {
                this.searchFlight = new HomePage(page, expect);

                await searchFlight.clickOnOneway();
                await searchFlight.removeExistingFromLocation();
               
              });
              Then('It will throw an error and guides user to select From location and To location.',async function () {
                
                await this.searchFlight.clickOnSearch();
                await this.searchFlight.validateErrors(ErrorText);   
                });