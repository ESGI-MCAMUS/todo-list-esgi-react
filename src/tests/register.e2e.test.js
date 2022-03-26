import puppeteer from "puppeteer";
import { randomString } from "../utils/functions";

describe("Register", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080,
    });
  });

  it("Cannot register (user already exists)", async () => {
    await page.goto("http://localhost:3000/inscription");
    // Fill firstname
    await page.click("#firstname");
    await page.type("#firstname", "John");
    // Fill lastname
    await page.click("#lastname");
    await page.type("#lastname", "Doe");
    // Fill birthdate
    await page.click("#birthdate");
    await page.type("#birthdate", "01/01/1999");
    // Fill email
    await page.click("#email");
    await page.type("#email", "jdoe@gmail.com");
    // Fill password
    await page.click("#password");
    await page.type("#password", "password");
    // Click on login button
    await page.click("#submit");
    // Check for error message
    await page.waitForSelector("#error-msg");
    const text = await page.$eval("#error-msg", (e) => e.textContent);
    expect(text).toContain("The user already exist !");
    await page.screenshot({
      path: "./src/tests/screenshots/register/user-already-exists.png",
    });
  });

  it("Cannot register (missing parameter)", async () => {
    await page.goto("http://localhost:3000/inscription");
    // Fill firstname
    await page.click("#firstname");
    await page.type("#firstname", "John");
    // Fill lastname
    await page.click("#lastname");
    await page.type("#lastname", "Doe");
    // Fill birthdate
    await page.click("#birthdate");
    await page.type("#birthdate", "01/01/1999");
    // Fill email
    await page.click("#email");
    await page.type("#email", "missing@parameter.com");
    // Click on login button
    await page.click("#submit");
    // Check for error message
    await page.waitForSelector("#error-msg");
    const text = await page.$eval("#error-msg", (e) => e.textContent);
    expect(text).toContain("Missing parameters!");
    await page.screenshot({
      path: "./src/tests/screenshots/register/missing-parameter.png",
    });
  });

  it("Cannot register (not old enough)", async () => {
    const date = new Date();
    await page.goto("http://localhost:3000/inscription");
    // Fill firstname
    await page.click("#firstname");
    await page.type("#firstname", "Jeanne");
    // Fill lastname
    await page.click("#lastname");
    await page.type("#lastname", "Doe");
    // Fill birthdate
    await page.click("#birthdate");
    await page.type("#birthdate", `01/01/${date.getFullYear()}`);
    // Fill email
    await page.click("#email");
    await page.type("#email", "jeannedoe@gmail.com");
    // Fill password
    await page.click("#password");
    await page.type("#password", "N0tOld3nough!");
    // Click on login button
    await page.click("#submit");
    // Check for error message
    await page.waitForSelector("#error-msg");
    const text = await page.$eval("#error-msg", (e) => e.textContent);
    expect(text).toContain("The user isn't valid !");
    await page.screenshot({
      path: "./src/tests/screenshots/register/not-old-enough.png",
    });
  });

  it("Can register", async () => {
    const date = new Date();
    await page.goto("http://localhost:3000/inscription");
    // Fill firstname
    await page.click("#firstname");
    await page.type("#firstname", "Jeanne");
    // Fill lastname
    await page.click("#lastname");
    await page.type("#lastname", "Doe");
    // Fill birthdate
    await page.click("#birthdate");
    await page.type(
      "#birthdate",
      `${date.getDate()}/${date.getMonth()}/${date.getFullYear() - 18}`
    );
    // Fill email
    await page.click("#email");
    await page.type("#email", `${randomString(16)}@gmail.com`);
    // Fill password
    await page.click("#password");
    await page.type("#password", randomString(16));
    // Click on login button
    await page.click("#submit");
    // Check for error message
    await page.waitForSelector("#login-title");
    const text = await page.$eval("#login-title", (e) => e.textContent);
    expect(text).toContain("Connexion");
    await page.screenshot({
      path: "./src/tests/screenshots/register/can-register.png",
    });
  });

  afterAll(() => browser.close());
});
