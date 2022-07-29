import Player from "/Player.js";
import {Stage as S} from "/Info.js";
import Bullet from "/Bullet.js";
import Button from "/Button.js";
import Timer from "/Timer.js";
import DOMUtil from "/DOMUtil.js";

class App 
{
  constructor()
  {
    this.canvas = document.querySelector("#gameCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.before = 0;
    this.img = {
      player:null,
      bullet:null,
    };
    this.gameObjectList = []; //모든 게임오브젝트
    this.bulletList = []; //총알 리스트들
    this.uiList = []; //UI 리스트
    this.player;
    this.gameStart = false; //게임 시작을 제어하는 변수
    this.level = 0; //레벨을 올릴 타이머
    this.domUtil = new DOMUtil();
    this.init();
  }

  start() {
    this.gameStart = true;
    this.bulletList = [];
    this.gameObjectList = [];
    //플레이어 생성기
    this.player = new Player(185, 650, 30, 30, 140, this.img.player);
    this.gameObjectList.push(this.player);
    //총알 생성
    for(let i = 0; i < 15; i++){
      const bullet = new Bullet(0, 0, 15, 30, 110, this.img.bullet, i * 0.6);
      this.bulletList.push(bullet);
      this.gameObjectList.push(bullet);
    }
    this.timer.reset();
  }

  async init(){
    const h = window.innerHeight - 25;
    const x = 600 * h / 700;
    this.canvas.style.width = `${x}px`;
    this.canvas.style.height = `${h}px`;
    this.img.player = await this.loadImage("/img/Player16x16.png");
    this.img.bullet = await this.loadImage("/img/bullet.png");
    
    //UI 생성
    const startBtn = new Button(450, 50, 120, 40, "Game Start", e => {
      this.start();
    }, this.canvas);
    this.uiList.push(startBtn);

    this.timer = new Timer(470, 200, 120, 0);
    this.uiList.push(this.timer);

    this.frame();
  }

  frame() {
    const delta = 1 / 60;
    setInterval(()=>{
      this.update(delta);
      this.render(this.ctx);
    }, 1000 / 60);
  }

  update(d)
  {
    if(this.gameStart == false) return;

    this.uiList.forEach(x => x.update(d));  //여기 추가했고
    this.gameObjectList.forEach(x => x.update(d));

    for(let i = 0; i < this.bulletList.length; i++)
    {
      if(this.bulletList[i].checkColl(this.player) == true){
        this.gameOver();
        break;
      }
    }

    this.level += d; //흘러간 시간을 더해주고
    if(this.level >= 10) {
      this.level = 0; //초기화시켜주고
      this.bulletList.forEach(x => x.addSpeedFactor(0.2));
      const currentFactor = this.bulletList[0].speedFactor;

      for(let i = 0; i < 5; i++){
        const bullet = new Bullet(0, 0, 15, 30, 110, this.img.bullet, i * 0.6);
        bullet.speedFactor = currentFactor;
        this.bulletList.push(bullet);
        this.gameObjectList.push(bullet);
      }

    }

  }
  gameOver(){
    this.gameStart = false; //이게 게임오버
    this.domUtil.openPopup(this.timer.time);
  }
  render(ctx)
  {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.strokeRect(S.startX, S.startY, S.width, S.height);
    this.uiList.forEach(x => x.render(ctx)); //여기 추가했어

    this.gameObjectList.forEach(x => x.render(ctx));
  }

  loadImage(name)
  {
    return new Promise((res, rej)=>{
      const img = new Image();
      img.src = name;
      img.addEventListener("load", () => res(img));
      img.addEventListener("error", e => rej(e));
    });
  }
}

window.onload = () => {
  let app = new App();
  
}
