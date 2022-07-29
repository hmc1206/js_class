const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const { threadId } = require('worker_threads');

if(process.argv.length < 4) {
  console.log(`잘못된 사용법 : node webtoon.js 작품ID 회차`);
  process.exit();
}
const titleId = process.argv[2];
const no = process.argv[3];
const url = `https://comic.naver.com/webtoon/detail?titleId=${titleId}&no=${no}`;

request.get(url, (err, response, body)=>{
  const $ = cheerio.load(body);

  if(fs.existsSync(titleId + "_" + no) == false)
    fs.mkdirSync(titleId + "_" + no);

  let html = "<div>";
  [...$(".wt_viewer > img")].forEach(x => {
    let src = $(x).attr("src");
    let idx = src.lastIndexOf("/"); //마지막 슬래시의 위치가 나온다.
    let name = src.substring(idx+1);
    
    fileDown(src, `./${titleId}_${no}/${name}`);
    html += `<img src="${name}">`;
  });

  html += "</div>";
  fs.writeFile(`${threadId}_${no}/index.html`, html, () => {
      console.log("saved");
  })
});

function fileDown(url, dest)
{
  const option = {
    url,
    headers: {
      'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
    }
  }
  let file = fs.createWriteStream(dest);
  request.get(option).pipe(file);
}