import puppeteer from "puppeteer";

describe("Login", () => {
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

  it("Cannot login (missing paramter)", async () => {
    await page.goto("http://localhost:3000/connexion");
    // Fill email
    await page.click("#email");
    await page.type("#email", "missing@parameter.com");
    // Click on login button
    await page.click("#loginButton");
    // Check for error message
    await page.waitForSelector("#error-msg");
    const text = await page.$eval("#error-msg", (e) => e.textContent);
    expect(text).toContain("Missing parameters!");
    await page.screenshot({
      path: "./src/tests/screenshots/login/missing-parameter.png",
    });
  });

  it("Cannot login (user doesn't exists)", async () => {
    await page.goto("http://localhost:3000/connexion");
    // Fill email
    await page.click("#email");
    await page.type("#email", "doesnt@exists.com");
    // Fill password
    await page.click("#password");
    await page.type("#password", "password");
    // Click on login button
    await page.click("#loginButton");
    // Check for error message
    await page.waitForSelector("#error-msg");
    const text = await page.$eval("#error-msg", (e) => e.textContent);
    expect(text).toContain(
      "Unknown user! The user you trying to get insn't present in the database."
    );
    await page.screenshot({
      path: "./src/tests/screenshots/login/user-doesnt-exists.png",
    });
  });

  it("Cannot login (wrong password)", async () => {
    await page.goto("http://localhost:3000/connexion");
    // Fill email
    await page.click("#email");
    await page.type("#email", "jdoe@gmail.com");
    // Fill password
    await page.click("#password");
    await page.type("#password", "Wr0ngP@ssword!");
    // Click on login button
    await page.click("#loginButton");
    // Check for error message
    await page.waitForSelector("#error-msg");
    const text = await page.$eval("#error-msg", (e) => e.textContent);
    expect(text).toContain(
      "Unknown user! The user you trying to get insn't present in the database."
    );
    await page.screenshot({
      path: "./src/tests/screenshots/login/password-missmatch.png",
    });
  });

  it("Can login", async () => {
    await page.goto("http://localhost:3000/connexion");
    // Fill email
    await page.click("#email");
    await page.type("#email", "jdoe@gmail.com");
    // Fill password
    await page.click("#password");
    await page.type("#password", "ABC123abc");
    // Click on login button
    await page.click("#loginButton");
    // Check for error message
    await page.waitForSelector("#todos-title");
    const text = await page.$eval("#todos-title", (e) => e.textContent);
    expect(text).toContain("Mes TODOS");
    await page.screenshot({
      path: "./src/tests/screenshots/login/connected.png",
    });
  });

  afterAll(() => browser.close());
});
