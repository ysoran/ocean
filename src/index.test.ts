import puppeteer from "puppeteer";

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

test("open puppeteer to meke the e2e test", async () => {
  let browser = await puppeteer.launch({
    headless: false,
    slowMo: 1,
  });
  let page = await browser.newPage();

  await page.goto("http://localhost:3000");
  await page.waitForSelector("#distance");
  await page.click("#distance");
  await page.type("#distance", "12");
  await page.click("#searchButton");
  const header = await page.$eval(".searchWarning", (e) => e.innerHTML);
  expect(header).toEqual("Please be sure you filled all fields");
  await page.click("#portField");
  await page.type("#portField", "istanbul");

  const port = await page.$("#portField");
  const rect = await page.evaluate((port) => {
    const { top, left, bottom, right } = port.getBoundingClientRect();
    return { top, left, bottom, right };
  }, port);
  await delay(600);
  await page.mouse.click(rect.left + 30, rect.top + 75);
  await page.click("#searchButton");

  //browser.close();
}, 100000);
