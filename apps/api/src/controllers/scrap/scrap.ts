import { Req, Res } from "../../type"
import puppeteer from 'puppeteer'
import * as cheerio from 'cheerio'
import Turndown from 'turndown'

export const scrapeUrl = async (req: Req, res: Res) => {
 const { url } = req.body
 try {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.setViewport({ width: 1080, height: 1024 });
  const htmlContent = await page.content();

  await browser.close();
  const $ = cheerio.load(htmlContent)
  const body = $('body').html()
  if (body) {
   const turndownService = new Turndown();
   const markdownContent = turndownService.turndown(body);
   res.send({ htmlContent: markdownContent })
  } else {
   res.status(400).send({ message: 'No data found', error: 'No data found' })
  }
 } catch (error) {
  res.status(400).send({ message: 'Error while fetching data from url', error: error })
 }
}
