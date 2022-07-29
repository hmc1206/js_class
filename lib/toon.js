const request = require("request");
const cheerio = require('cheerio');

const url = 'https://comic.naver.com/webtoon/weekday';

const headers = { 
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
}

const option = {url,headers};

function getToon(Callback) {
    request.get(option, (err, res, body) => {
        const $ = cheerio.load(body);
        let dupulicateCheck = {};
    
        let returndata = [...$(".col_inner ul > li > a")].map( t => {
            let toonData = { id:0, title:'', link:''};
            toonData.link = $(t).attr("href");
            toonData.title = $(t).html();
    
            let startIdx = toonData.link.indexOf("=");
            let endIdx = toonData.link.indexOf("&");
            toonData.id =  toonData.link.substring(startIdx+1, endIdx);
    
            if(dupulicateCheck[toonData.id] !== undefined){
                return false;
            }
            return toonData;
        }).filter(x => x !== false);
        Callback(returndata);
    });
}

function getToonInfo(toonId, Callback) {
    const url = `https://comic.naver.com/webtoon/list?titleId=${toonId}`;
    const option2 = {url,headers};
    request.get(option2, (err,res,body) => {
        const $= cheerio.load(body);
        try{
            const artist = $(".wrt_nm").text().trim();
            const desc = $(".detail > p").eq(0).text();

            const link = $(".viewList tr > .title > a").eq(0).attr("href");
            const profile = $(".thumb img").attr("src");

            let startIndex = link.indexOf("no=") + 3;
            let endIndex = link.lastIndexOf("&");
            let no = link.substring(startIndex, endIndex);
            let returnData = {artist, desc, no, profile};
            Callback(returnData);
        } catch (err){
            Callback(false);
        }
    });
}

module.exports = {
    getToon,getToonInfo
}

