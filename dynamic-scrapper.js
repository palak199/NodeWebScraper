
    const cheerio = require('cheerio');
    const puppeteer = require('puppeteer');

    const url = 'https://www.reddit.com/r/news/';

    puppeteer
      .launch()
      .then(browser => browser.newPage())
      .then(page => {
        return page.goto(url).then(function() {
          return page.content();
        });
      })
      .then(html => {
        const $ = cheerio.load(html);
        const newsHeadlines = [];
        $('h1').each(function() {
          newsHeadlines.push({
            title: $(this).text(),
          });
        });

        console.log(newsHeadlines);
      })
      .catch(console.error);
      

    //   (async () => {
    //     const browser = await puppeteer.launch();
    //     const page = await browser.newPage();
      
    //     await page.goto(url);
    //     const newsHeadlines=[];
    //     const textContent = await page.evaluate(() => {
          
    //       $('a[href*="/r/news/comments"] > h2').each(function() {
    //                newsHeadlines.push({
    //                title: $(this).text(),
    //           });
    //     });
      
    //     console.log(newsHeadlines); /* No Problem Mate */
      
    //     browser.close();
    //   })
    // })