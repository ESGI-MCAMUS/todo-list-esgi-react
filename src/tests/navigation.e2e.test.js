import puppeteer from "puppeteer";

describe("Navigation", () => {
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

  it("Can open the home screen", async () => {
    await page.goto("http://localhost:3000/");
    await page.waitForSelector("#main-title");
    const text = await page.$eval("#main-title", (e) => e.textContent);
    expect(text).toContain("✅ TODO List");
    await page.screenshot({
      path: "./src/tests/screenshots/navigation/open-homepage.png",
    });
  });

  it("Can navigate to login page", async () => {
    await page.goto("http://localhost:3000/");
    await page.click("#login-link");
    await page.waitForSelector("#login-title");
    const text = await page.$eval("#login-title", (e) => e.textContent);
    expect(text).toContain("Connexion");
    await page.screenshot({
      path: "./src/tests/screenshots/navigation/nav-to-login.png",
    });
  });

  it("Can navigate to register page", async () => {
    await page.goto("http://localhost:3000/");
    await page.click("#register-link");
    await page.waitForSelector("#register-title");
    const text = await page.$eval("#register-title", (e) => e.textContent);
    expect(text).toContain("Inscription");
    await page.screenshot({
      path: "./src/tests/screenshots/navigation/nav-to-register.png",
    });
  });

  afterAll(() => browser.close());
});
