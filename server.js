const http = require('http');
const path = require('path');
const express = require('express');

const app = express(); 
//서버 어플리케이션을 만들어서 app이라는 변수에 저장해주는거
const server = http.createServer(app); 
//만들어진 서버 어플리케이션을 넣어서 http 서버를 만든다.
const {getCoronaData} = require('./crawler.js'); //코로나 가져오는 함수
const {getToon, getToonInfo} = require('./lib/toon.js');
const {Pool} = require('./lib/DB.js');
const { response } = require('express');

app.set('port', 50000); //앱서버의 포트지정
app.set('views', path.join(__dirname, 'views')); 
//앱의 페이지들을 모아둘 장소
app.set('view engine', 'ejs');
//앱의 페이지들을 렌더링할 렌더링 엔진

let publicPath = path.join(__dirname, 'public');
let staticMiddleware = express.static(publicPath);
app.use(staticMiddleware);


const wordList = [
  "삶이 있는 한 희망은 있다. - 키케로",
  "산다는것 그것은 치열한 전투이다. -로망로랑",
  "하루에 3시간을 걸으면 7년 후에 지구를 한바퀴 돌 수 있다. -사무엘존슨",
  "도망쳐라 아직 늦지 않았다 - 최선한"
];

const RandInt = () =>  Math.floor(Math.random() * 3);

app.get("/", (request, response) => {
  let name = request.query.name;
  let msg = `안녕하세요! ${name} 님`;
  response.render("main");
})

app.get('/game', (requirem, response) => {
  response.render("dodge");
});

//post
app.get('/game/record', (request, response) => {
  const {time, name} = request.query;
  const sql = `INSERT INTO  score(time, name) VALUES (?,?)`;
  Pool.query(sql, [time*1, name]);

  response.json({msg: '성공적으로 기록 완료'});
});

app.get('/game/ranking', async(request, response) => {
  const sql = "SELECT * FROM score ORDER BY time DESC LIMIT 0, 5";
  let data = await Pool.query(sql);
  response.json(data[0]);
})
app.get('/corona', (request, response)=>{
  getCoronaData( (data)=>{
    let word = wordList[RandInt()];
    response.render("corona", {data, word});  
  });
});

app.get("/todo", (request, response)=>{
  response.render("todo");
});

app.get("/webtoon", (request, response) =>{
  getToon((toonList) => {
    response.render("webtoon", {toonList});
  })
});

app.get("/webtoon/info", (request, response) => {
  getToonInfo(request.query.id, (toonInfo) => {
    if(toonInfo !== false) {
      response.json(toonInfo);
    }else {
      response.json({msg:'없는 웹툰입니다'},404);
    }
  })
});
server.listen(50000, () => {
  console.log("Express engine 가동중");
});