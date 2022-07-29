import GameObject from "/GameObject.js";

export default class Button extends GameObject
{
  constructor(x, y, w, h, text, action, canvas)
  {
    super(x, y, w, h, 0);
    this.text = text;
    this.action = action;
    this.hover = false;
    this.scale = canvas.width / parseInt(getComputedStyle(canvas).width);
    
    canvas.addEventListener("mousemove", this.moveHandle);
    canvas.addEventListener("mousedown", this.downHandle);
  }

  downHandle = e => {
      if(this.hover == true){
          this.action();
      }
  }

  moveHandle = e => {
    const {offsetX:mx, offsetY:my} = e;
    this.hover = mx * this.scale > this.x
                && mx * this.scale < this.x + this.w
                && my * this.scale > this.y
                && my * this.scale < this.y + this.h;
  };

  update(d){}

  render(ctx)
  {
      ctx.save();
    ctx.font = "17px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    if(this.hover){
      ctx.fillStyle = "#555";
      ctx.fillRect(this.x, this.y, this.w, this.h);
      ctx.fillStyle = "#fff";
      ctx.fillText("Start", this.x + this.w / 2, this.y + this.h / 2);
    }else{
      ctx.strokeStyle = "#555";
      ctx.strokeRect(this.x, this.y, this.w, this.h);
      ctx.fillStyle = "#555";
      ctx.fillText(this.text, this.x + this.w / 2, this.y + this.h / 2);
    }
    ctx.restore();
  }
}