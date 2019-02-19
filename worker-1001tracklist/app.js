const puppeteer = require('puppeteer');

(async function main(){
    try{
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36');

        //Repeated code to get sections.length for loop
        await page.goto('https://www.1001tracklists.com/tracklist/2m1h0ryt/dabin-cosmicmeadow-edc-las-vegas-united-states-2018-05-19.html');
        await page.waitForSelector('#main');
        const tracklist = await page.$$('#main table.default tbody tr.tlpItem');

        for(let i = 0; i < tracklist.length; i++) {
            // await page.goto('https://www.livetracklist.com/illenium-unreleased-2018-live-edits/');
            // await page.waitForSelector('#TheList');
            // const tracklist = await page.$$('#TheList');

            const track = tracklist[i];
            // const trackName = await track.$eval('[itemprop="name"]', meta => meta.getAttribute("content"));
            let trackName = await track.$eval('.tlToogleData', h2 => h2.innerText);
            trackName = trackName.split(' [')[0]
            trackName = trackName.split('\n')[0]
            // const trackStyle = await track.$('style');
            // let trackTime = await page.evaluate(trackStyle => trackStyle.innerText, trackStyle);
            // trackTime = trackTime.split('{content: "')[1]
            // trackTime = trackTime.split('"}')[0]
            console.log(trackName);
            // console.log(trackTime);
        }
    } catch(e){
        console.log("main async function error:", e);
    }
})();
