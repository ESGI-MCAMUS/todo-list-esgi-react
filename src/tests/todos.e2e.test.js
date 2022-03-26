import puppeteer from "puppeteer";
import { delay, randomString } from "../utils/functions";

describe("Todos", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.setViewport({
      width: 1920,
      height: 1080,
    });
    await page.goto("http://localhost:3000/connexion");
    await page.click("#email");
    await page.type("#email", "jdoe@gmail.com");
    await page.click("#password");
    await page.type("#password", "ABC123abc");
    await page.click("#loginButton");
    await page.screenshot({
      path: "./src/tests/screenshots/todos/after-login.png",
    });
  });

  it("Can't add todo (too long)", async () => {
    await page.goto("http://localhost:3000/todos");
    // Open modal
    await page.click("#modal");
    await delay(200);
    // Fill title
    await page.click("#title");
    await page.type("#title", "Too long content");
    // Fill content
    await page.click("#content");
    await page.type("#content", randomString(1001));
    // Click on login button
    await page.click("#submit");
    // Check for error message
    await page.waitForSelector("#error-msg");
    const text = await page.$eval("#error-msg", (e) => e.textContent);
    expect(text).toContain(
      "The todo content can't be longer than 1000 characters !"
    );
    await page.screenshot({
      path: "./src/tests/screenshots/todos/too-long.png",
    });
  }, 15000);

  it("Can't add todo (already exists)", async () => {
    await page.goto("http://localhost:3000/todos");
    // Open modal
    await page.click("#modal");
    await delay(200);
    // Fill title
    await page.click("#title");
    await page.type("#title", "Demo TODO");
    // Fill content
    await page.click("#content");
    await page.type(
      "#content",
      "SaDlY i CaNt AdD tHiS tOdO cUz ThIs NaMe Is AlReAdY tAkEn 🤪"
    );
    // Click on login button
    await page.click("#submit");
    // Check for error message
    await page.waitForSelector("#error-msg");
    const text = await page.$eval("#error-msg", (e) => e.textContent);
    expect(text).toContain("The todo using this name already exist !");
    await page.screenshot({
      path: "./src/tests/screenshots/todos/already-taken.png",
    });
  }, 15000);

  it("Can add todo", async () => {
    await page.goto("http://localhost:3000/todos");
    // Open modal
    await page.click("#modal");
    await delay(200);
    // Fill title
    await page.click("#title");
    await page.type("#title", "New TODO");
    // Fill content
    await page.click("#content");
    await page.type("#content", "This todo will be deleted soon 🥸 Oopsie!");
    // Click on login button
    await page.click("#submit");
    // Check if TODO has been added
    await page.goto("http://localhost:3000/todos");
    const texts = await page.$$eval(".todo-name", (elements) =>
      elements.map((item) => item.textContent)
    );
    expect(texts[1]).toContain("New TODO");
    await page.screenshot({
      path: "./src/tests/screenshots/todos/added-todo.png",
    });
  }, 15000);

  it("Can delete todo", async () => {
    await page.goto("http://localhost:3000/todos");
    const items = await page.$$eval(".todo-delete", (elements) =>
      elements.map((item) => item.id)
    );
    await page.waitForSelector(`#${items[1]}`);
    await page.click(`#${items[1]}`);
    delay(500);
    await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
    await page.screenshot({
      path: "./src/tests/screenshots/todos/removed-todo.png",
    });
  }, 15000);

  afterAll(() => browser.close());
});
