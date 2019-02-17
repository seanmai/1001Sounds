const puppeteer = require('puppeteer');

(async function main(){
    try{
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36');

        //Repeated code to get sections.length for loop
        await page.goto('https://www.livetracklist.com/illenium-unreleased-2018-live-edits/');
        await page.waitForSelector('#TheList');
        const tracklist = await page.$$('#TheList > li');

        for(let i = 0; i < tracklist.length; i++) {
            // await page.goto('https://www.livetracklist.com/illenium-unreleased-2018-live-edits/');
            // await page.waitForSelector('#TheList');
            // const tracklist = await page.$$('#TheList');

            const track = tracklist[i];
            const trackName = await page.evaluate(track => track.innerText, track);
            const trackStyle = await track.$('style');
            let trackTime = await page.evaluate(trackStyle => trackStyle.innerText, trackStyle);
            trackTime = trackTime.split('{content: "')[1]
            trackTime = trackTime.split('"}')[0]

            console.log(trackName);
            console.log(trackTime);
        }
    } catch(e){
        console.log("main async function error:", e);
    }
})();
