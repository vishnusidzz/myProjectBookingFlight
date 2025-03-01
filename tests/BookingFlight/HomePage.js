class HomePage
{
    constructor(page, expect)
    {
        this.page = page;
        this.expect = expect;
        this.pageLoaded = page.locator('.a83ed08757');
        this.OneWayradioButton = page.locator('.InputRadio-module__field___FJluj');
        this.EnterLocation = page.locator('.ShellButton-module__btn___lMwQM');
        this.ExistingPlaces = page.locator('.Chip-module__root--selected___bMLUt');
        this.removeExistingPlaces = page.locator('.Chip-module__root--selected___bMLUt .Icon-module__root--scale___3uHST');
        this.flightsearchBox = page.locator('#flights-searchbox_suggestions li');
        this.calendar = page.locator('.Calendar-module__dates___D3JMK');
        this.noOfTravelers = page.locator('.InputStepper-module__wrapper___U6rrf .InputStepper-module__add___EZ6Kk');
        this.chilAge = page.locator("[name='sr_occupancy_children_age_0']");
        this.afterSearchClick = page.locator('.Container-module__container___QbI23');
        this.errorLocation = page.locator('.ErrorMessage-module__content___nDCzG');

    }

    async goToUrl(url)
    {
          await this.page.goto(url);
          await this.pageLoaded.first().waitFor();
          this.expect(await this.page.getByTitle('booking.com')).toBeTruthy();
    }
    async clickOnOneway()
    {
        await this.OneWayradioButton.nth(1).check();
    }
    async removeExistingFromLocation()
    {
        await this.EnterLocation.first().click();
        if(await this.ExistingPlaces.isEnabled)
            {
                await this.removeExistingPlaces.click();
            }
    }
    async selectFromLocation(FromLocation)
    {
                await this.page.getByPlaceholder('Airport or city').fill(FromLocation);
                await this.flightsearchBox.first().click();
    }
    async selectToLocation(ToLocation)
    {
        await this.page.getByRole('button', { name: 'Where to?' }).click();
        await this.page.getByPlaceholder('Airport or city').fill(ToLocation);
        await this.flightsearchBox.first().click();
        await this.EnterLocation.nth(2).click();
    }
    async selectDateInOneWay(Dates)
    {
        const loca = await  this.calendar.first();
        loca.locator('tbody tr td')
        .filter({has: this.page.locator("[data-date=\'"+Dates+"\']")}).click();
    }
    async selectTravelers(adults, Child)
    {
        if(adults+Child<=9)
          {
            await this.page.getByRole("button", {name: '1 adult'}).click();
          for(let i=0;i<adults-1;++i)
            {
              await this.noOfTravelers.first().click();
        
            }
        if(Child>0)
        {
          for(let i=0;i<Child;++i)
            {
              await this.noOfTravelers.nth(1).click();
        
            }
            await this.chilAge.selectOption({value:'3'});
            
          }
            await this.page.getByRole("button", {name:"Done"}).click();
          }
          else
          {
            await console.log("Only 9 travellers allowed");
          }
        
    }
    async clickOnSearch()
    {
        await this.page.getByRole("button", {name:"Search"}).click();
       // this.expect(await this.afterSearchClick.nth(1)).toBeEnabled();
    }
    async validateErrors(ErrorText)
    {
        const fromerror  = await this.errorLocation.first();
        const toerror  = await this.errorLocation.nth(2);
    
        await this.expect(fromerror).toHaveText(ErrorText);
        await this.expect(toerror).toHaveText(ErrorText);
    }

}
module.exports = {HomePage};