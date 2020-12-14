import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';
const { Eyes, Target, BatchInfo, RectangleSize } = require('@applitools/eyes-protractor');

describe('personal-budget App', () => {
  let page: AppPage;
  let  eyes;
  beforeAll(() => {
    browser.waitForAngularEnabled(false)
  })
  beforeEach(() => {
    page = new AppPage();
      // Initialize the eyes SDK
    eyes = new Eyes();

    // Add  API key (API key can be set via APPLITOOLS_API_KEY env variable)
    eyes.setApiKey('SoJ4ygOjNTrGVpjvx7hq0flL8iEFZwGcBhGsFi6f8Ak110');

    // set new batch
    eyes.setBatch(new BatchInfo('PB batch'))
  });

  it('e2e test', async () => {
    await page.navigateTo();
    expect(await page.getTitleText()).toEqual('Skip to content');
  });

  it('visual Test', async () => {

    // Start the test by setting AUT's name, test name and viewport size (width X height)
    await eyes.open(browser, 'Personal Budget App', 'visual Test');


    // Navigate the browser
    await page.navigateTo();

    // Visual checkpoint #1 - Check the home page.
    await eyes.check("Home Window", Target.window().fully());

    // This will create a test with two test steps.
    element(by.id("about")).click();

    // Visual checkpoint #1 - Check the about page.
    await eyes.check("About Window", Target.window().fully());
    // End the test.
    const results = await eyes.close();
    console.log(results);
  });

  afterEach(async () => {
    //Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));

       // If the test was aborted before eyes.close was called, ends the test as aborted.
       await eyes.abortIfNotClosed();
  });
});
