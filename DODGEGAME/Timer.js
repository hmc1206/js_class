import GameObject from "/GameObject.js";
export default class Timer extends GameObject
{
  constructor(x, y, w, h)
  {
    super(x, y, w, h);
    this.time = 0; //버틴 시간을 측정
  }

  reset() {
    this.time = 0;
  }

  update(d)
  {
    this.time += d; //시간을 지속적으로 더해나간다.
  }

  render(ctx)
  {
    ctx.save();
    ctx.font = "14px Arial";
    let timeStr = Math.round(this.time * 100)/10;
    ctx.fillText(timeStr, this.x, this.y, this.w);  //최대 너비
    ctx.restore();
  }
}