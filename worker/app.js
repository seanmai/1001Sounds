const puppeteer = require('puppeteer');

(async function main(){
    try{
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36');

        //Repeated code to get sections.length for loop
        await page.goto('https://www.livetracklist.com/illenium-unreleased-2018-live-edits/');
        await page.waitForSelector('#TheList');
        const tracklist = await page.$$('#TheList');

        for(let i = 0; i < tracklist.children.length; i++) {
            // await page.goto('https://www.livetracklist.com/illenium-unreleased-2018-live-edits/');
            // await page.waitForSelector('#TheList');
            // const tracklist = await page.$$('#TheList');

            const track = tracklist.children[i];
            const trackString = track.innerText;
            const trackTime = await track$('span .time-item');
            const timeString = window.getComputedStyle(trackTime, ':before').content;

            console.log(trackString);
            console.log(timeString);
        }

    } catch(e){
        console.log("main async function error:", e);
    }
})();
