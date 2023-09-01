const chromium = require('chrome-aws-lambda');
export const getPDFBuffer = async (html, options) => {
  let browser = null;
  try {
    const executablePath = process.env.IS_OFFLINE ? null : await chromium.executablePath;
    console.log(process.env.IS_OFFLINE);

    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      executablePath,
    });

    const page = await browser.newPage();
    const loaded = page.waitForNavigation({
      waitUntil: 'load',
    });

    await page.setContent(html);
    await loaded;

    return await page.pdf(options);
  } catch (error) {
    return error;
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
};
