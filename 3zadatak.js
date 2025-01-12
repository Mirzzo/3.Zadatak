import { Builder, By, until, Key } from "selenium-webdriver";
import { expect } from "chai";
import { after } from "mocha";
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
describe("Booking.com Test", function () {
    this.timeout(90000);
    let driver;
    beforeEach(async () => {
        driver = await new Builder().forBrowser("chrome").build();
        await driver.get('https://www.booking.com');
        await driver.manage().window().maximize();
        driver.wait(until.elementLocated(By.className('a83ed08757 c21c56c305 f38b6daa18 d691166b09 ab98298258 f4552b6561')), 50000)
            .then(closeButton => {
                return closeButton.click();
            })
        await sleep(5000);
        driver.wait(until.elementLocated(By.id('close')), 50000)
            .then(closeButton => {
                return closeButton.click();
            })
        await sleep(2000);
        driver.wait(until.elementLocated(By.className('a83ed08757 c21c56c305 f38b6daa18 f671049264 fd3248769f')), 50000)
            .then(openLanguageSelect => {
                return openLanguageSelect.click();
            })

        driver.wait(until.elementLocated(By.xpath('//span[contains(text(), "English")]')), 50000)
            .then(selectLanguage => {
                return selectLanguage.click();
            })
        // Assert that the element is visible and contains the correct text
        await sleep(2000);

        driver.wait(until.elementLocated(By.xpath('//span[contains(text(), "Euro")]')), 50000)
            .then(selectCurrency => {
                return selectCurrency.click();  // Click on the element with "Euro" text
            })

    });

    this.afterEach(async () => {
        await driver.quit();
    });
    it('Searching for accomodation', async () => {
        this.timeout(60000); // Set timeout to 60 seconds

        await sleep(2000);

        const locationInput = driver.wait(until.elementLocated(By.name('ss')), 50000);
        locationInput.click();
        locationInput.sendKeys('Tuzla');
        await sleep(2000);
        console.log('Location input entered successfully.');
        await sleep(2000);
        const locationSelect = driver.wait(until.elementLocated(By.id('autocomplete-result-0')), 50000);
        locationSelect.click();
        console.log('Location selected successfully.');
        await sleep(2000);
        const startDate = await driver.findElement(By.css('[aria-label="20 January 2025"]'));
        const endDate = await driver.findElement(By.css('[aria-label="25 January 2025"]'));
        startDate.click();
        endDate.click();
        const openOccupancyConfig = await driver.findElement(By.className('d777d2b248'));
        openOccupancyConfig.click();
        await sleep(2000);
        const pathSelectorAdult = By.css('svg path[d="M20.25 11.25h-7.5v-7.5a.75.75 0 0 0-1.5 0v7.5h-7.5a.75.75 0 0 0 0 1.5h7.5v7.5a.75.75 0 0 0 1.5 0v-7.5h7.5a.75.75 0 0 0 0-1.5"]');
        const addAdult = await driver.findElement(pathSelectorAdult);
        addAdult.click();
        const buttonDone = await driver.findElement(By.xpath('//span[contains(text(), "Done")]'));
        buttonDone.click();

        await sleep(2000);
        const buttonSearch = await driver.findElement(By.xpath('//span[contains(text(), "Search")]'));
        buttonSearch.click();
        await sleep(3000);

        // ASSERT
        const loadedResults = await driver.findElement(By.css('h1[aria-label*="Search results updated."]')).getText();
        expect(loadedResults).to.include("Tuzla");
    });


    it('Searching for attractions', async () => {
        this.timeout(60000); // Set timeout to 60 seconds

        await sleep(2000);

        const attractionsLink = driver.wait(until.elementLocated(By.id('attractions')), 50000);
        attractionsLink.click();
        await sleep(2000);
        const locationInput = driver.wait(until.elementLocated(By.name('query')), 50000);
        locationInput.click();
        locationInput.sendKeys('Banja Luka');
        await sleep(2000);
        const locationSelect = driver.wait(until.elementLocated(By.id('autocomplete-result-0')), 50000);
        locationSelect.click();
        console.log('Location selected successfully.');
        await sleep(2000);
        const datePicker = driver.wait(until.elementLocated(By.css('button[aria-label="Select your dates"]')), 50000);
        datePicker.click();
        await sleep(2000);
        const startDate = await driver.findElement(By.css('[aria-label="20 January 2025"]'));
        const endDate = await driver.findElement(By.css('[aria-label="25 January 2025"]'));
        startDate.click();
        endDate.click();
        await sleep(2000);
        const buttonSearch = await driver.findElement(By.xpath('//span[contains(text(), "Search")]'));
        buttonSearch.click();
        await sleep(5000);
        // ASSERT
        const loadedResults = await driver.findElement(By.className('af8fbdf136 css-1uk1gs8')).getText();
        expect(loadedResults).to.include("Banja Luka");
    });

    it('should book an airport taxi', async function () {

        // Klikni na link "Airport taxis"

        await driver.sleep(3000);
        await driver.wait(until.elementLocated(By.linkText('Airport taxis')), 10000);
        const airportTaxisLink = await driver.findElement(By.linkText('Airport taxis'));
        await airportTaxisLink.click();
        await driver.sleep(5000);

        // Klikni na polje "Enter pick-up location"
        await driver.wait(until.elementLocated(By.css("input[placeholder='Enter pick-up location']")), 10000);
        const pickupField = await driver.findElement(By.css("input[placeholder='Enter pick-up location']"));
        await pickupField.click();

        // Unesi lokaciju u "Pick-up location" polje
        await driver.sleep(3000);
        await pickupField.sendKeys('Sarajevo International Airport');


        await driver.wait(until.elementLocated(By.css("[data-testid='taxi-autocomplete-search-drop-down__item-pickup-0']")), 10000);
        const dropDownElement = await driver.findElement(By.css("[data-testid='taxi-autocomplete-search-drop-down__item-pickup-0']"));
        await dropDownElement.click();


        // Klikni na polje "Enter destination"
        await driver.wait(until.elementLocated(By.css('[placeholder="Enter destination"]')), 10000);
        const destinationField = await driver.findElement(By.css('[placeholder="Enter destination"]'));
        await destinationField.click();

        // Unesi destinaciju u "Enter destination" polje
        await destinationField.sendKeys('Bascarsija');

        // await driver.wait(until.elementLocated(By.css('[data-testid="taxi-autocomplete-search-drop-down__container-dropoff"]')), 10000);
        // Klikni na željenu lokaciju iz dropdown-a
        await driver.sleep(3000);
        await driver.wait(until.elementLocated(By.css('[data-testid="taxi-autocomplete-search-drop-down__item-dropoff-0"]')), 10000);
        const selectDestination = await driver.findElement(By.css('[data-testid="taxi-autocomplete-search-drop-down__item-dropoff-0"]'));
        await selectDestination.click();

        // // Klikni na polje za selektovanje datuma
        await driver.wait(until.elementLocated(By.css('[data-testid="taxi-date-time-picker-form-element__button-oneway"]')), 10000);
        const dateField = await driver.findElement(By.css('[data-testid="taxi-date-time-picker-form-element__button-oneway"]'));
        await dateField.click();
        await driver.sleep(3000);
        const date = await driver.findElement(By.css('[aria-label="20 Jan 2025"]'));
        await date.click();


        await sleep(3000);

        const hourDropdown = await driver.findElement(By.name('hours-oneway'));
        await hourDropdown.click();
        await sleep(3000);
        const hours = await driver.findElement(By.css('option[value="12"]'));
        await hours.click();
        await sleep(2000);

        // Klikni na dropdown za minute
        const minuteDropdown = await driver.findElement(By.name('minutes-oneway'));
        await minuteDropdown.click();
        await sleep(2000);
        const minutes = await driver.findElement(By.css('option[value="0"]'));
        await minutes.click();
        await sleep(2000);


        // Klikni na polje za selektovanje broja putnika
        await driver.wait(until.elementLocated(By.name('passengers')), 10000);
        const passengersField = await driver.findElement(By.name('passengers'));
        await passengersField.click();
        await sleep(2000);

        const passengerOption = await driver.findElement(By.css('option[value="2"]'));
        await passengerOption.click();
        await sleep(2000);

        // Klikni na dugme "Search"
        const searchButton = await driver.findElement(By.xpath('//span[contains(text(), "Search")]'));
        await searchButton.click();
        await sleep(2000);

        // potvrdi uspješnu pretragu
        const element = await driver.wait(
            until.elementLocated(By.xpath('//*[contains(text(), "The latest prices from our trusted partners")]')),
            10000
        );
        const isVisible = await element.isDisplayed();
        expect(isVisible).to.be.true; // Using Chai for assertion

    });

    it('Select accomodation', async () => {
        this.timeout(60000); // Set timeout to 60 seconds

        await sleep(2000);

        const locationInput = driver.wait(until.elementLocated(By.name('ss')), 50000);
        locationInput.click();
        locationInput.sendKeys('Tuzla');
        await sleep(2000);
        console.log('Location input entered successfully.');
        await sleep(2000);
        const locationSelect = driver.wait(until.elementLocated(By.id('autocomplete-result-0')), 50000);
        locationSelect.click();
        console.log('Location selected successfully.');
        await sleep(2000);
        const startDate = await driver.findElement(By.css('[aria-label="20 January 2025"]'));
        const endDate = await driver.findElement(By.css('[aria-label="25 January 2025"]'));
        startDate.click();
        endDate.click();
        const openOccupancyConfig = await driver.findElement(By.className('d777d2b248'));
        openOccupancyConfig.click();
        await sleep(2000);
        const pathSelectorAdult = By.css('svg path[d="M20.25 11.25h-7.5v-7.5a.75.75 0 0 0-1.5 0v7.5h-7.5a.75.75 0 0 0 0 1.5h7.5v7.5a.75.75 0 0 0 1.5 0v-7.5h7.5a.75.75 0 0 0 0-1.5"]');
        const addAdult = await driver.findElement(pathSelectorAdult);
        addAdult.click();
        const buttonDone = await driver.findElement(By.xpath('//span[contains(text(), "Done")]'));
        buttonDone.click();

        await sleep(2000);
        const buttonSearch = await driver.findElement(By.xpath('//span[contains(text(), "Search")]'));
        buttonSearch.click();
        await sleep(5000);
        const firstFilter = await driver.findElement(By.xpath('//div[contains(text(), "Breakfast Included")]'));
        firstFilter.click();
        await sleep(5000);
        const secondFilter = await driver.findElement(By.xpath('//div[contains(text(), "Parking")]'));
        secondFilter.click();
        await sleep(5000);
        const openRatings = await driver.findElement(By.xpath('//span[contains(text(), "Sort by:")]'));
        openRatings.click();
        await sleep(5000);
        const rating = await driver.findElement(By.xpath('//span[contains(text(), "Property rating (high to low)")]'));
        rating.click();
        await sleep(2000);
        const originalTab = await driver.getWindowHandle();
        const selection = await driver.findElement(By.xpath('//div[contains(text(), "Grand Hotel Tuzla")]'));
        selection.click();
        await sleep(2000);
        const allTabs = await driver.getAllWindowHandles();
        let newTab;
        for (let handle of allTabs) {
            if (handle !== originalTab) {
                newTab = handle; // this is the handle for the new tab
                break;
            }
        }

        await driver.switchTo().window(newTab); // Switch to the new tab
        await sleep(2000);
        // ASSERT
        const loadedResults = await driver.findElement(By.className('d2fee87262 pp-header__title')).getText();
        expect(loadedResults).to.include("Grand Hotel Tuzla");
    });

    it('Looking up the reviews ', async () => {
        this.timeout(60000); // Set timeout to 60 seconds

        await sleep(2000);

        const locationInput = driver.wait(until.elementLocated(By.name('ss')), 50000);
        locationInput.click();
        locationInput.sendKeys('Tuzla');
        await sleep(2000);
        console.log('Location input entered successfully.');
        await sleep(2000);
        const locationSelect = driver.wait(until.elementLocated(By.id('autocomplete-result-0')), 50000);
        locationSelect.click();
        console.log('Location selected successfully.');
        await sleep(2000);
        const startDate = await driver.findElement(By.css('[aria-label="20 January 2025"]'));
        const endDate = await driver.findElement(By.css('[aria-label="25 January 2025"]'));
        startDate.click();
        endDate.click();
        const openOccupancyConfig = await driver.findElement(By.className('d777d2b248'));
        openOccupancyConfig.click();
        await sleep(2000);
        const pathSelectorAdult = By.css('svg path[d="M20.25 11.25h-7.5v-7.5a.75.75 0 0 0-1.5 0v7.5h-7.5a.75.75 0 0 0 0 1.5h7.5v7.5a.75.75 0 0 0 1.5 0v-7.5h7.5a.75.75 0 0 0 0-1.5"]');
        const addAdult = await driver.findElement(pathSelectorAdult);
        addAdult.click();
        const buttonDone = await driver.findElement(By.xpath('//span[contains(text(), "Done")]'));
        buttonDone.click();

        await sleep(2000);
        const buttonSearch = await driver.findElement(By.xpath('//span[contains(text(), "Search")]'));
        buttonSearch.click();
        await sleep(5000);
        const firstFilter = await driver.findElement(By.xpath('//div[contains(text(), "Breakfast included")]'));
        firstFilter.click();
        await sleep(5000);
        const secondFilter = await driver.findElement(By.xpath('//div[contains(text(), "Parking")]'));
        secondFilter.click();
        await sleep(5000);
        const openRatings = await driver.findElement(By.xpath('//span[contains(text(), "Sort by:")]'));
        openRatings.click();
        await sleep(5000);
        const rating = await driver.findElement(By.xpath('//span[contains(text(), "Property rating (high to low)")]'));
        rating.click();
        await sleep(2000);
        const originalTab = await driver.getWindowHandle();
        const selection = await driver.findElement(By.xpath('//div[contains(text(), "Grand Hotel Tuzla")]'));
        selection.click();
        await sleep(2000);
        const allTabs = await driver.getAllWindowHandles();
        let newTab;
        for (let handle of allTabs) {
            if (handle !== originalTab) {
                newTab = handle; // this is the handle for the new tab
                break;
            }
        }

        await driver.switchTo().window(newTab); // Switch to the new tab
        await driver.executeScript('window.scrollTo(0, 0);'); // Scroll to the top
        await sleep(5000);

        const reviews = await driver.findElement(By.xpath('//span[contains(text(), "Guest reviews")]'));
        reviews.click();
        await sleep(4000);
        const filterSelection = driver.wait(until.elementLocated(By.name('languages')), 50000);
        filterSelection.click();
        await sleep(2000);
        const filterEnglish = await driver.findElement(By.xpath('//option[contains(text(), "English")]'));
        filterEnglish.click();
        await sleep(2000);

        const openSorting = await driver.findElement(By.name('reviewListSorters'));
        openSorting.click();
        await sleep(5000);
        const sorting = await driver.findElement(By.xpath('//option[contains(text(), "Newest first")]'));
        sorting.click();
        await sleep(5000);
        // ASSERT

        const sorterElement = await driver.findElement(By.name('reviewListSorters'));
        const sorterValue = await sorterElement.getAttribute('value');
        expect(sorterValue).to.equal('NEWEST_FIRST');
    });

});
