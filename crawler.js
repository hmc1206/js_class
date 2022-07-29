const request = require('request');
const cheerio = require('cheerio');

const url = "http://ncov.mohw.go.kr/bdBoardList_Real.do";

function getCoronaData( callback) {
  request.get(url, (err, response, body) => {
    let dataArr = [
      {name:"사망", count:'', index:0},
      {name:"재원 위중증", count:'', index:2},
      {name:"신규입원", count:'', index:4},
      {name:"확진", count:'', index:6},
    ];
    const $ = cheerio.load(body);
    let values = $(".caseTable .ca_value");
    dataArr.forEach(x => {
      x.count = values.eq(x.index).html();
    });
    callback(dataArr);
  });
}

module.exports = {
  getCoronaData
}