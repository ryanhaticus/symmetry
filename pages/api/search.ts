import { NextApiRequest, NextApiResponse } from 'next';

import chromium from 'chrome-aws-lambda';
import UserAgent from 'user-agents';

interface QueryType {
  topicSearchTerm: string;
  originPreference: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  const { topicSearchTerm, originPreference } = query as unknown as QueryType;
  // If topicSearchTerm or originPreference is not provided, return 400 error
  if (topicSearchTerm == null || originPreference == null) {
    res.status(400).json({ error: 'Incomplete query' });
    return;
  }
  // Create puppeteer browser
  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: {
      width: 1920,
      height: 1080
    },
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true
  });
  // Create a new page
  const page = await browser.newPage();
  // Set a user agent to prevent flagging
  const userAgent = new UserAgent();
  await page.setUserAgent(userAgent.toString());
  // Enhance the search query
  const enhancedSearchQuery = `${topicSearchTerm} ${
    originPreference === ''
      ? ''
      : originPreference === 'Educational Institutions'
      ? 'site:edu'
      : 'site:org'
  } filetype:pdf after:${new Date().getFullYear() - 10}`;
  // Navigate to the Google search page
  await page.goto(
    `https://www.google.com/search?q=${enhancedSearchQuery}&num=100`
  );
  // Wait until the page is loaded
  await page.waitForSelector('#result-stats');
  // Gather results from Google
  const results = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('h3'));
    return els
      .filter(
        (el) =>
          el.parentElement !== null &&
          el.parentElement.getAttribute('href') !== null
      )
      .map((el) => ({
        label: el.innerHTML, // If we don't use innerHTML, some labels will be missing.
        href: el.parentElement?.getAttribute('href'),
        description:
          // Excuse the mess. Experienced more issues with cleaner code? Submit a PR!
          el.parentElement?.parentElement?.parentElement?.getElementsByTagName(
            'span'
          )[6]?.parentElement?.innerText || 'No description available.'
      }));
  });
  res.json({ results });
  await browser.close();
};

export default handler;
