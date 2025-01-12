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
